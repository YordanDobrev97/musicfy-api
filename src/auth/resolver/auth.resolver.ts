import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthService } from '../services/auth.service'
import { CreateUserInput } from '../dto/create-user.input'
import { UserType } from '../model/user.model'
import { LoginResponse } from '../dto/login-response.dto'
import { LoginUserInput } from '../dto/login-user.input'

@Resolver(() => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {
  }

  @Query(() => [UserType])
  async getAllUsers(): Promise<UserType[]> {
    return this.authService.getAll()
  }

  @Mutation(() => LoginResponse)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    try {
        return this.authService.login(loginUserInput)
    } catch (error) {
      return error.message
    }
  }

  @Mutation(() => UserType)
  async createUser(@Args('data') createUserInput: CreateUserInput): Promise<UserType> {
    return this.authService.createUser(createUserInput)
  }
}
