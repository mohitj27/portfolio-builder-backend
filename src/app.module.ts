import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoConnectionUrl } from './constants/db';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ResumeParserModule } from './resume-parser/resume-parser.module';

@Module({
  imports: [
    MongooseModule.forRoot(MongoConnectionUrl),
    AuthModule,
    MailModule,
    FileUploadModule,
    ResumeParserModule,
  ],
})
export class AppModule {}
