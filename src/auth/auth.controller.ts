import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthRepository } from './auth-repository';

@Controller('auth')
export class AuthController {
  constructor(private authRepository: AuthRepository) {}
  @Post('/loginotp')
  loginOtp(@Body('email') email: string): Promise<string> {
    return this.authRepository.signIn(email);
  }
}
