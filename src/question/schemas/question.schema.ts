import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({
  timestamps: true, // 记录时间戳
})
export class Question {
  @Prop({ required: true })
  title: string;

  @Prop()
  desc?: string;

  @Prop()
  js?: string;

  @Prop()
  css?: string;

  @Prop({ default: false })
  isPublished?: boolean;

  @Prop({ default: false })
  isStar?: boolean;

  @Prop({ default: false })
  isDeleted?: boolean;

  @Prop()
  componentList: {
    /** 组件id，前端生成 */
    fe_id: string;
    type: string;
    title: string;
    isHidden: boolean;
    isLocked: boolean;
    props: object;
  }[];

  @Prop()
  author?: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
