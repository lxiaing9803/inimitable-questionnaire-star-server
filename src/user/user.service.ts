import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async createUser(user: CreateUserDto) {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }
  async findOne(username: string, password: string) {
    return await this.userModel.findOne({
      username,
      password,
    });
  }
}
