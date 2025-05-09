import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import { Model } from 'mongoose';

@Injectable()
export class QuestionService {
  constructor(
    // 依赖注入
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
  ) {}
  async create() {
    const question = new this.questionModel({
      title: 'title' + Date.now(),
      desc: 'desc',
    });
    return await question.save();
  }
  async delete(id: string) {
    return await this.questionModel.findByIdAndDelete(id);
  }
  async update(id: string, updateData: Question) {
    return await this.questionModel.updateOne({ _id: id }, updateData);
  }
  async findOne(id: string) {
    return await this.questionModel.findById(id);
  }
  async findAllList({ keyword = '', page = 1, pageSize = 10 }) {
    const whereOpt: any = {};
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      whereOpt.title = { $regex: reg };
    }
    return await this.questionModel
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .find(whereOpt)
      .sort({ _id: -1 }) // 倒序
      .skip((page - 1) * pageSize) // 跳过多少条
      .limit(pageSize);
  }
  async countAll({ keyword = '' }) {
    const whereOpt: any = {};
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      whereOpt.title = { $regex: reg };
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await this.questionModel.countDocuments(whereOpt);
  }
}
