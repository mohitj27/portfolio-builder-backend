import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleStrategy } from 'src/google.strategy';
import { MailModule } from 'src/mail/mail.module';
import { UserSchema } from 'src/schemas/user.schema';
import { AuthRepository } from './auth-repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Users',
        schema: UserSchema,
      },
    ]),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthRepository, AuthService, GoogleStrategy],
})
export class AuthModule {}
