import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class InterviewDto {
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean risus eros, pharetra in ante in, laoreet varius nulla. Sed finibus dapibus magna vel vehicula. Sed eget elementum urna.',
  })
  @IsString()
  @IsNotEmpty()
  detail: string;

  @ApiProperty({ example: 'In Progress' })
  @IsString()
  @IsNotEmpty()
  interview_status: string;

  @ApiProperty({ example: 'โรบินฮู้ด' })
  @IsString()
  @IsNotEmpty()
  created_by: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsNotEmpty()
  is_saved_flag: boolean;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class SetFlagInterviewDto {
  @ApiProperty({ example: 'In Progress' })
  @IsString()
  @IsNotEmpty()
  interview_status: string;
}
