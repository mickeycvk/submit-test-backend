import { Module } from '@nestjs/common';
import { InterviewsService } from './service/interviews.service';
import { InterviewsController } from './api/interviews.controller';
import { CommentService } from './service/comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from 'src/typeorm/interview.entity';
import { Comment } from 'src/typeorm/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interview, Comment])],
  controllers: [InterviewsController],
  providers: [InterviewsService, CommentService],
})
export class InterviewsModule {}
