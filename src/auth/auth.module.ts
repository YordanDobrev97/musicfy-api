import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './services/auth.service'
import { AuthResolver } from './resolver/auth.resolver'
import { PrismaModule } from '../prisma/prisma.module'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
    imports: [PrismaModule,
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET || 'secretKey',
          signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [AuthService, AuthResolver, JwtStrategy]
})
export class AuthModule { }
