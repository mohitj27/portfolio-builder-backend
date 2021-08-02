import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
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
  async googleAuthRedirect(@Req() req,@Res() res) {
  
  const result=await this.authService.googleLogin(req);
  res.cookie('accessToken', 'accessToken', {
    domain: 'portfolio-builder-rho.vercel.app',
    path: '/',
    secure: true,
    // expires: new Date(new Date().getTime() + 30 * 1000),
  });
  // res.set('Authorization', 'Bearer ' + "ufuysegryuewrguyew765");
  res.redirect(302,'https://portfolio-builder-rho.vercel.app')  
}
  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}
