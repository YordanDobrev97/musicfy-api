import { Resolver, Query, Args } from '@nestjs/graphql'
import { UsersService } from '../services/users.service'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Args('email') username: string) {
    return this.usersService.findByEmail(username)
  }
}