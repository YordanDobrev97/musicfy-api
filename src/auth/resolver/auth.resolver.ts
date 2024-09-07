import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthService } from '../services/auth.service'
import { CreateUserInput } from '../dto/create-user.input'
import { UserType } from '../model/user.model'

@Resolver(() => UserType)
export class AuthResolver {
    constructor(private authService: AuthService) {
    }

    @Query(() => [UserType])
    async getAllUsers(): Promise<UserType[]> {
      return this.authService.getAll()
    }
    
    @Mutation(() => UserType)
    async createUser(@Args('data') createUserInput: CreateUserInput): Promise<UserType> {
        return this.authService.createUser(createUserInput)
    }
}
