/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import mongoose, { Model } from 'mongoose';
import { nanoid } from 'nanoid';

@Injectable()
export class QuestionService {
  constructor(
    // 依赖注入
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
  ) {}
  async create(username: string) {
    const question = new this.questionModel({
      title: '问卷标题' + Date.now(),
      desc: '问卷描述',
      author: username,
      componentList: [
        {
          fe_id: nanoid(),
          type: 'questionInfo',
          title: '问卷信息',
          props: {
            title: '问卷标题',
            desc: '问卷描述',
          },
        },
      ],
    });
    return await question.save();
  }
  async delete(id: string, author: string) {
    // return await this.questionModel.findByIdAndDelete(id);
    return await this.questionModel.findOneAndDelete({ _id: id, author });
  }
  async deleteMay(ids: string[], author: string) {
    return await this.questionModel.deleteMany({ _id: { $in: ids }, author });
  }
  async update(id: string, updateData: Question, author: string) {
    return await this.questionModel.updateOne({ _id: id, author }, updateData);
  }
  async findOne(id: string) {
    return await this.questionModel.findById(id);
  }
  async findAllList({
    keyword = '',
    page = 1,
    pageSize = 10,
    isDeleted = false,
    isStar = false,
    author = '',
  }) {
    const whereOpt: any = {
      isDeleted,
      author,
    };
    if (isStar) {
      whereOpt.isStar = isStar;
    }
    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      whereOpt.title = { $regex: reg };
    }
    return await this.questionModel
      .find(whereOpt)
      .sort({ _id: -1 }) // 倒序
      .skip((page - 1) * pageSize) // 跳过多少条
      .limit(pageSize);
  }
  async countAll({ isDeleted = false, author = '', isStar = false }) {
    const whereOpt: any = {
      isDeleted,
      author,
    };
    if (isStar) {
      whereOpt.isStar = isStar;
    }

    return await this.questionModel.countDocuments(whereOpt);
  }
  async duplicate(id: string, author: string) {
    const question = await this.questionModel.findById(id);
    const newQuestion = new this.questionModel({
      ...question?.toObject(),
      _id: new mongoose.Types.ObjectId(),
      title: `${question?.title}副本`,
      author,
      isPublished: false,
      isStar: false,
      componentList: question?.componentList?.map((item) => {
        return {
          ...item,
          _id: nanoid(),
        };
      }),
    });
    return await newQuestion.save();
  }
}
