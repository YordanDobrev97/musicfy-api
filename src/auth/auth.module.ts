import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './services/auth.service'
import { AuthResolver } from './resolver/auth.resolver'
import { JwtStrategy } from './strategies/jwt.strategy'
import { PrismaService } from '../prisma/prisma.service'
import { UsersService } from '../users/services/users.service'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, PrismaService, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
