import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'
import { CreateUserInput } from '../dto/create-user.input'
import { UserType } from '../model/user.model'

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(): Promise<UserType[]> {
        return this.prisma.user.findMany()
    }

    async createUser(createUserInput: CreateUserInput): Promise<UserType> {
        const { email, password } = createUserInput

        return this.prisma.user.create({
            data: {
              email,
              password, //hash password
            },
          })
    }
}
