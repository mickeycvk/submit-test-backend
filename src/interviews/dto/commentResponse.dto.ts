import { ApiProperty } from '@nestjs/swagger';

export class CommentResponseDto {
  @ApiProperty({ example: 'dab4f6df-d4b2-4482-bbe3-22d17946df6c' })
  comment_id: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean risus eros, pharetra in ante in, laoreet varius nulla. Sed finibus dapibus magna vel vehicula. Sed eget elementum urna.',
  })
  detail: string;

  @ApiProperty({ example: 'โรบินฮู้ด' })
  commented_by: string;

  @ApiProperty()
  created_at: Date;
}

class CommentInterviewResponseDto {
  @ApiProperty({ example: 'dab4f6df-d4b2-4482-bbe3-22d17946df6c' })
  interview_id: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean risus eros, pharetra in ante in, laoreet varius nulla. Sed finibus dapibus magna vel vehicula. Sed eget elementum urna.',
  })
  detail: string;

  @ApiProperty({ example: 'In Progress' })
  interview_status: string;

  @ApiProperty({ example: 'โรบินฮู้ด' })
  created_by: string;

  @ApiProperty({ example: false })
  is_saved_flag: boolean;

  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  created_at: Date;
}

class CommentResponseInterviewDto {
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean risus eros, pharetra in ante in, laoreet varius nulla. Sed finibus dapibus magna vel vehicula. Sed eget elementum urna.',
  })
  detail: string;

  @ApiProperty({ example: 'โรบินฮู้ด' })
  commented_by: string;

  @ApiProperty({ type: CommentInterviewResponseDto })
  interview: CommentInterviewResponseDto;

  @ApiProperty({ example: 'dab4f6df-d4b2-4482-bbe3-22d17946df6c' })
  comment_id: string;

  @ApiProperty()
  created_at: Date;
}

export class CreateCommentResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ type: CommentResponseInterviewDto })
  newComment: CommentResponseInterviewDto;
}
