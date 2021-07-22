import { Injectable, UnauthorizedException } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { AuthRepository } from './auth-repository';
import { SiginInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private mailService: MailService,
  ) {}
  async signIn(email: string): Promise<SiginInDto> {
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
    return { id: update._id, message: 'Otp has been successfully sent' };
  }
  async verifyOtp(id: number, otp: number): Promise<any> {
    const user = await this.authRepository.findUser(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    const OtpTime = new Date().getTime();
    if ((OtpTime - user.OtpTime) / 1000 > 60) {
      return 'Otp expired';
    }
  }
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
