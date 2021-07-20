import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoConnectionUrl } from './constants/db';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [MongooseModule.forRoot(MongoConnectionUrl), AuthModule, MailModule],
})
export class AppModule {}
