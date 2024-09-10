import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { PrismaService } from '../../prisma/prisma.service'
import { CreateUserInput } from '../dto/create-user.input'
import { UserType } from '../model/user.model'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private jwtService: JwtService) { }

  async refreshAccessToken(refreshToken: string) {
    try {
      const decodedToken = await this.jwtService.verifyAsync(refreshToken)
      const user = await this.prisma.user.findUnique({
        where: { id: decodedToken.sub },
      })

      if (!user) {
        throw new Error('User not found')
      }

      const payload = { email: user.email, sub: user.id }
      const newAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' })

      return {
        access_token: newAccessToken,
      }
    } catch (error) {
      throw new Error('Invalid refresh token')
    }
  }


  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (user && isValidPassword) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async getAll(): Promise<UserType[]> {
    return this.prisma.user.findMany()
  }

  async login(loginUserInput: { email: string, password: string }) {
    const user = await this.validateUser(loginUserInput.email, loginUserInput.password)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const payload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async createUser(createUserInput: CreateUserInput): Promise<UserType> {
    const { email, password } = createUserInput

    const hashedPassword = await bcrypt.hash(password, 10)
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword
      },
    })
  }
}
