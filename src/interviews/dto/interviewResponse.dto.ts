import { ApiProperty } from '@nestjs/swagger';
import { CommentResponseDto } from './commentResponse.dto';

class InterviewDataDto {
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean risus eros, pharetra in ante in, laoreet varius nulla. Sed finibus dapibus magna vel vehicula. Sed eget elementum urna.',
  })
  detail: string;

  @ApiProperty({ example: 'In Progress' })
  interview_status: string;

  @ApiProperty({ example: 'โรบินฮู้ด' })
  created_by: string;

  @ApiProperty()
  created_at: Date;
}

class PaginationDto {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 3 })
  take: number;

  @ApiProperty({ example: 1 })
  totalCount: number;

  @ApiProperty({ example: false })
  hasNextPage: boolean;
}

export class InterviewGetManyResponseDto {
  @ApiProperty({ type: [InterviewDataDto] })
  data: InterviewDataDto[];

  @ApiProperty({ type: PaginationDto })
  pagination: PaginationDto;
}

class InterviewResponseDto {
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

  @ApiProperty({ type: [CommentResponseDto] })
  comment: CommentResponseDto[];
}

export class InterviewByIdResponseDto {
  @ApiProperty({ type: InterviewResponseDto })
  data: InterviewResponseDto;
}

class NewUserDto {
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

  @ApiProperty({ example: 'dab4f6df-d4b2-4482-bbe3-22d17946df6c' })
  interview_id: string;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  created_at: Date;
}

export class CreateInterviewResponseDto {
  @ApiProperty({ example: 201 })
  statusCode: number;
  @ApiProperty({ type: NewUserDto })
  newUser: NewUserDto;
}

export class UpdateSaveFlagResponseDto {
  @ApiProperty({
    example:
      'set interview_id:5fc93bb5-e3e9-42d9-94e7-ac887e25c069 is_saved_flag = True',
  })
  result: string;
}
