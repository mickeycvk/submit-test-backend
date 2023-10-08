import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CommentDto {
  @ApiProperty({ example: 'dab4f6df-d4b2-4482-bbe3-22d17946df6c' })
  @IsUUID()
  @IsNotEmpty()
  interview_id: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean risus eros, pharetra in ante in, laoreet varius nulla. Sed finibus dapibus magna vel vehicula. Sed eget elementum urna.',
  })
  @IsString()
  @IsNotEmpty()
  detail: string;

  @ApiProperty({ example: 'โรบินฮู้ด' })
  @IsString()
  @IsNotEmpty()
  commented_by: string;
}
