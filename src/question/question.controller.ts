/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { QuestionDto } from './dto/question.dto';
import { QuestionService } from './question.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Post()
  create(@Request() req) {
    return this.questionService.create(req.user.username as string);
  }
  @Get('list')
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('isDeleted') isDeleted: boolean = false,
    @Query('isStar') isStar: boolean = false,
    @Request() req,
  ) {
    const { username } = req.user;

    const list = await this.questionService.findAllList({
      page,
      pageSize,
      isDeleted,
      isStar,
      author: username,
    });
    const total = await this.questionService.countAll({
      isDeleted,
      isStar,
      author: username,
    });
    return {
      data: {
        list,
        total,
      },
      msg: '获取成功',
    };
  }
  @Public()
  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() questionDto: QuestionDto,
    @Request() req,
  ) {
    const { username } = req.user;

    return this.questionService.update(id, questionDto, username);
  }
  @Delete('delete/:id')
  deleteOne(@Param('id') id: string, @Request() req) {
    const { username } = req.user;
    return this.questionService.delete(id, username);
  }

  @Delete()
  deleteMay(@Body() body, @Request() req) {
    const { username } = req.user;
    return this.questionService.deleteMay(body.ids ?? [], username);
  }

  @Post('duplicate/:id')
  async duplicate(@Param('id') id: string, @Request() req) {
    const { username } = req.user;
    return this.questionService.duplicate(id, username);
  }
}
