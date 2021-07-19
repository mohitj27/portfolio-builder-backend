import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user.entity';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel('Users') private UserModel: Model<any>) {}
  async findUser(email: string): Promise<any> {
    return this.UserModel.find({ email: email });
  }
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
    const update = await this.UserModel.findOneAndUpdate(query, data, {
      upsert: true,
    });
    // await update.save();
    console.log(update);
    return 'Otp has been successfully sent';
  }
}
