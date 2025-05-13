import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer, AnswerDocument } from './schema/answer.schema';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name)
    private readonly answerModel: Model<AnswerDocument>,
  ) {}
  async create(answerInfo: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!answerInfo.questionId) {
      throw new HttpException('QuestionId is required', HttpStatus.BAD_REQUEST);
    }
    const createdAnswer = new this.answerModel(answerInfo);
    return createdAnswer.save();
  }
  async count(questionId: string) {
    if (!questionId) return 0;
    await this.answerModel.countDocuments({ questionId });
  }
  async findAll(questionId: string, opt: { page: number; pageSize: number }) {
    if (!questionId) return [];
    const { page = 1, pageSize = 10 } = opt;
    return await this.answerModel
      .find({ questionId })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 });
  }
}
