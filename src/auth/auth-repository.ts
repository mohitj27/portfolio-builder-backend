import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user.entity';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel('Users') private UserModel: Model<any>) {}
  async findUser(id: number): Promise<any> {
    return this.UserModel.find({ _id: id });
  }
  async findAndUpdate(query, data: User): Promise<any> {
    const update = await this.UserModel.findOneAndUpdate(query, data, {
      upsert: true,
    });
    // await update.save();
    console.log(update);
    return update;
  }
}
