import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnswerDocument = HydratedDocument<Answer>;

@Schema({
  timestamps: true, // 记录时间戳
})
export class Answer {
  @Prop({ required: true })
  /** 问卷_id */
  questionId: string;
  @Prop()
  answerList: {
    /** 组件fe_id */
    componentFeId: string;
    value: string[];
  }[];
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
