import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/typeorm/comment.entity';
import { Repository } from 'typeorm';
import { CommentDto } from '../dto/comment.dto';
import { Interview } from 'src/typeorm/interview.entity';
import { ICreateCommentResult } from '../interface/interview';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Interview)
    private interviewRepository: Repository<Interview>,
  ) {}

  async createCommentInterview(
    commentDto: CommentDto,
  ): Promise<ICreateCommentResult> {
    try {
      const interviewId = commentDto.interview_id;
      const isInterviewIdExist = await this.interviewRepository.findOne({
        where: { interview_id: interviewId },
      });

      if (!interviewId) {
        throw new BadRequestException(
          'Failed to create a comment due to no interview_id ',
        );
      }
      if (!isInterviewIdExist) {
        throw new NotFoundException(`interview_id: ${interviewId} not found`);
      }

      const newComment = new Comment();
      newComment.detail = commentDto.detail;
      newComment.commented_by = commentDto.commented_by;
      newComment.interview = isInterviewIdExist;

      const createdComment = await this.commentRepository.save(newComment);

      return {
        statusCode: 201,
        newComment: createdComment,
      };
    } catch (error) {
      throw new BadRequestException('Failed to create a comment.', {
        cause: error,
        description: error.message,
      });
    }
  }
}
