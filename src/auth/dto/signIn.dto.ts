import { IsNumber, IsString } from 'class-validator';

export class SiginInDto {
  @IsString()
  message: string;
  @IsNumber()
  id: number;
}
