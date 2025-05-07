import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { ServiceController } from './service/service.controller';

@Module({
  imports: [QuestionModule],
  controllers: [AppController, ServiceController],
  providers: [AppService],
})
export class AppModule {}
