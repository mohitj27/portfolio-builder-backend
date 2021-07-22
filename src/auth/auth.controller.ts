import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SiginInDto } from './dto/signIn.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/loginotp')
  loginOtp(@Body('email') email: string): Promise<SiginInDto> {
    return this.authService.signIn(email);
  }
  @Post('/verifyOtp')
  verifyOtp(@Body('otp') otp: number, @Body('id') id: number): Promise<any> {
    return this.authService.verifyOtp(otp, id);
  }
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
