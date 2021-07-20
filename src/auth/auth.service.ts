import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { AuthRepository } from './auth-repository';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private mailService: MailService,
  ) {}
  async signIn(email: string): Promise<string> {
    // const user = await this.findUser(email);
    // if(user){

    // }
    const hash = 985;
    const query = { email: email };
    const otp = (new Date().getTime() % 10000) + hash;
    const OtpTime = new Date().getTime();
    const data = {
      email,
      Otp: otp,
      OtpTime,
    };
    const update = await this.authRepository.findAndUpdate(query, data);
    // await update.save();
    console.log(update);
    const result = await this.mailService.sendUserConfirmation({
      email,
      Otp: otp,
    });
    console.log(result);
    return 'Otp has been successfully sent';
  }
}
