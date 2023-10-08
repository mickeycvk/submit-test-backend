import { Comment } from 'src/typeorm/comment.entity';
import { Interview } from 'src/typeorm/interview.entity';

export interface IGetManyInterview {
  page: number;
  limit: number;
}

export interface ICreateInterviewCardResult {
  statusCode: number;
  newUser: Interview;
}

export interface ICreateCommentResult {
  statusCode: number;
  newComment: Comment;
}

export interface IGetInterviewCardsByIdResult {
  data: Interview;
}
