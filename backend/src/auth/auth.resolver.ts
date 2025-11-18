import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  async hello(): Promise<string> {
    return 'Hello from Auth!';
  }

  @Mutation(() => String)
  async login(
    @Args('clerkId') clerkId: string,
    @Args('email') email: string,
    @Args('name', { nullable: true }) name?: string,
  ): Promise<string> {
    const user = await this.authService.createOrUpdateUser(clerkId, email, name);
    return this.authService.generateToken(user.id);
  }
}
