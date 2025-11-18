import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(clerkId: string) {
    return this.prisma.user.findUnique({
      where: { clerkId },
    });
  }

  async createOrUpdateUser(clerkId: string, email: string, name?: string) {
    return this.prisma.user.upsert({
      where: { clerkId },
      update: { email, name },
      create: {
        clerkId,
        email,
        name,
        subscriptionTier: 'FREE',
      },
    });
  }

  generateToken(userId: string) {
    return this.jwtService.sign({ sub: userId });
  }
}
