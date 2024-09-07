import { Module } from '@nestjs/common'

import { AuthService } from './services/auth.service'
import { AuthResolver } from './resolver/auth.resolver'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
    imports: [PrismaModule],
    providers: [AuthService, AuthResolver]
})
export class AuthModule { }
