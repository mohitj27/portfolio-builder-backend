import { IsString } from 'class-validator';

export class SiginInDto {
  @IsString()
  email: string;
}
