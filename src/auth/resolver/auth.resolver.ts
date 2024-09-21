import { Args, Resolver, Mutation, Query } from '@nestjs/graphql'
import { AuthService } from '../services/auth.service'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!'
  }
  
  @Mutation(() => String)
  async signUp(@Args('email') email: string, @Args('password') password: string) {
    const user = await this.authService.signUp(email, password)
    return `User ${user.email} successfully registered`
  }

  @Mutation(() => String)
  async login(@Args('email') email: string, @Args('password') password: string) {
    const user = await this.authService.validateUser(email, password)
    if (!user) {
      throw new Error('Invalid credentials')
    }
    const token = await this.authService.login(user)
    return token.access_token
  }
}