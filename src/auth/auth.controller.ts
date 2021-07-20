import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthRepository } from './auth-repository';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/loginotp')
  loginOtp(@Body('email') email: string): Promise<string> {
    return this.authService.signIn(email);
  }
}
