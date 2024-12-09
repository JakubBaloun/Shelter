import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new Error(`User with email: ${email} does not exist!`);
    }
    return user;
  }
}
