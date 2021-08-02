import { IsDate, IsNumber, IsString } from 'class-validator';

export class User {
  @IsString()
  email: string;
  @IsNumber()
  Otp: number;
  @IsDate()
  OtpTime: number;
}
