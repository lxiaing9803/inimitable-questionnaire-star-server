/**
 * @description dto: data transfer object 数据传输对象，用于传输数据
 *
 */
export class QuestionDto {
  readonly title: string;
  readonly componentList: {
    fe_id: string;
    type: string;
    title: string;
    isHidden: boolean;
    isLocked: boolean;
    props: object;
  }[];
  readonly desc?: string;
  readonly js?: string;
  readonly css?: string;
  readonly isPublished?: boolean;
  readonly isDeleted?: boolean;
  readonly isStar?: boolean;
}
