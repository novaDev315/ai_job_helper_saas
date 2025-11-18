import { Controller, Post, Body, Headers, RawBodyRequest, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Request } from 'express';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() body: { userId: string; priceId: string },
  ) {
    const session = await this.stripeService.createCheckoutSession(
      body.userId,
      body.priceId,
    );
    return { url: session.url };
  }

  @Post('create-portal-session')
  async createPortalSession(@Body() body: { userId: string }) {
    const session = await this.stripeService.createCustomerPortalSession(
      body.userId,
    );
    return { url: session.url };
  }

  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: RawBodyRequest<Request>,
  ) {
    await this.stripeService.handleWebhook(signature, request.rawBody);
    return { received: true };
  }
}
