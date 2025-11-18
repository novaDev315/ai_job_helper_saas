import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../common/prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const apiKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (apiKey) {
      this.stripe = new Stripe(apiKey, {
        apiVersion: '2024-11-20.acacia',
      });
    }
  }

  async createCheckoutSession(
    userId: string,
    priceId: string,
  ): Promise<Stripe.Checkout.Session> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Create or retrieve Stripe customer
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await this.stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      });
      customerId = customer.id;

      await this.prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId },
      });
    }

    // Create checkout session
    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${this.configService.get('APP_URL')}/dashboard/billing?success=true`,
      cancel_url: `${this.configService.get('APP_URL')}/dashboard/billing?canceled=true`,
      metadata: {
        userId,
      },
    });

    return session;
  }

  async createCustomerPortalSession(
    userId: string,
  ): Promise<Stripe.BillingPortal.Session> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user?.stripeCustomerId) {
      throw new Error('No Stripe customer found');
    }

    const session = await this.stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${this.configService.get('APP_URL')}/dashboard/billing`,
    });

    return session;
  }

  async handleWebhook(signature: string, payload: Buffer): Promise<void> {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');

    if (!webhookSecret) {
      throw new Error('Stripe webhook secret not configured');
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );
    } catch (err) {
      throw new Error(`Webhook signature verification failed: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;

      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription,
        );
        break;

      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription,
        );
        break;

      case 'invoice.payment_succeeded':
        await this.handleInvoicePaymentSucceeded(
          event.data.object as Stripe.Invoice,
        );
        break;

      case 'invoice.payment_failed':
        await this.handleInvoicePaymentFailed(
          event.data.object as Stripe.Invoice,
        );
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }

  private async handleCheckoutSessionCompleted(
    session: Stripe.Checkout.Session,
  ): Promise<void> {
    const userId = session.metadata?.userId;
    if (!userId) return;

    const subscription = await this.stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    const tier = this.mapStripePriceToTier(subscription.items.data[0].price.id);

    await this.prisma.user.update({
      where: { id: userId },
      data: { subscriptionTier: tier },
    });

    await this.prisma.subscription.create({
      data: {
        stripeSubscriptionId: subscription.id,
        userId,
        tier,
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });

    console.log(`Subscription created for user ${userId}: ${tier}`);
  }

  private async handleSubscriptionUpdated(
    subscription: Stripe.Subscription,
  ): Promise<void> {
    const sub = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (!sub) return;

    const tier = this.mapStripePriceToTier(subscription.items.data[0].price.id);

    await this.prisma.subscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        tier,
        status: subscription.status,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });

    await this.prisma.user.update({
      where: { id: sub.userId },
      data: { subscriptionTier: tier },
    });

    console.log(`Subscription updated: ${subscription.id}`);
  }

  private async handleSubscriptionDeleted(
    subscription: Stripe.Subscription,
  ): Promise<void> {
    const sub = await this.prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (!sub) return;

    await this.prisma.subscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: { status: 'canceled' },
    });

    await this.prisma.user.update({
      where: { id: sub.userId },
      data: { subscriptionTier: 'FREE' },
    });

    console.log(`Subscription canceled: ${subscription.id}`);
  }

  private async handleInvoicePaymentSucceeded(
    invoice: Stripe.Invoice,
  ): Promise<void> {
    console.log(`Payment succeeded: ${invoice.id}`);
    // Could send receipt email here
  }

  private async handleInvoicePaymentFailed(
    invoice: Stripe.Invoice,
  ): Promise<void> {
    console.log(`Payment failed: ${invoice.id}`);
    // Could send payment failure email here
  }

  private mapStripePriceToTier(priceId: string): 'FREE' | 'PRO' | 'PREMIUM' | 'ENTERPRISE' {
    // Map Stripe price IDs to subscription tiers
    // These would be your actual Stripe price IDs
    const priceMap: Record<string, 'FREE' | 'PRO' | 'PREMIUM' | 'ENTERPRISE'> = {
      price_pro_monthly: 'PRO',
      price_premium_monthly: 'PREMIUM',
      price_enterprise_monthly: 'ENTERPRISE',
    };

    return priceMap[priceId] || 'FREE';
  }
}
