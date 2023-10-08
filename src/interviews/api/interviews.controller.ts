import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { InterviewsService } from '../service/interviews.service';
import { InterviewDto, SetFlagInterviewDto } from '../dto/interview.dto';
import { CommentService } from '../service/comment.service';
import { CommentDto } from '../dto/comment.dto';
import { IGetManyInterview } from '../interface/interview';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateInterviewResponseDto,
  InterviewByIdResponseDto,
  InterviewGetManyResponseDto,
  UpdateSaveFlagResponseDto,
} from '../dto/interviewResponse.dto';
import { CreateCommentResponseDto } from '../dto/commentResponse.dto';

@ApiTags('Interviews')
@Controller('interviews')
export class InterviewsController {
  constructor(
    private readonly interviewsService: InterviewsService,
    private readonly commentService: CommentService,
  ) {}

  @Get('cards')
  @ApiOperation({
    summary: 'FindManyInterviewCards',
    description:
      'แสดงข้อมูลนัดสัมภาษณ์งานหลายจำนวน รองรับ pagination สามารถปรับขนาดที่แสดงได้ เมื่อกด See more ที่ฝั่ง front end สามารถเขียน logic ให้แสดงข้อมูลโหลดเพิ่มได้ โดยข้อมูลที่นำมาแสดงจะมีการเช็ค field is_saved_flag ที่เป็น False เท่านั้น',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: true,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: true,
    description: 'Items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: InterviewGetManyResponseDto,
  })
  async findAllInterviewsCard(@Query() query: IGetManyInterview) {
    return this.interviewsService.getManyInterviewCards(query);
  }

  @Get('cards/:id')
  @ApiOperation({
    summary: 'FindOneInterviewCardById',
    description:
      'แสดงข้อมูลรายละเอียดนัดสัมภาษณ์งานตาม interview_id โดยแสดง array ของข้อมูล comment ของ นัดสัมภาษณ์งานนั้นๆด้วยเช่นกัน โดยข้อมูลที่นำมาแสดงจะมีการเช็ค field is_saved_flag ที่เป็น False เท่านั้น ',
  })
  @ApiParam({ name: 'id', type: String, description: 'interview_id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: InterviewByIdResponseDto,
  })
  async findInterviewsCardById(@Param('id') id: string) {
    return this.interviewsService.getInterviewCardById(id);
  }

  @Post('card')
  @ApiOperation({
    summary: 'CreateInterviewCard',
    description: 'สร้างนัดสัมภาษณ์งาน',
  })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: CreateInterviewResponseDto,
  })
  async createInterviewCard(@Body() cardDto: InterviewDto) {
    return this.interviewsService.createInterviewCard(cardDto);
  }

  @Post('comment')
  @ApiOperation({
    summary: 'CreateCommentInsideEachInterview',
    description:
      'สร้าง Comment ภายในแต่ละนัดสัมภาษณ์งาน โดยระบุ payload field interview_id ให้ตรงกับ interview ที่ต้องการ',
  })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: CreateCommentResponseDto,
  })
  async createCommentByCardId(@Body() commentDto: CommentDto) {
    return this.commentService.createCommentInterview(commentDto);
  }

  @Patch('card/:id')
  @ApiOperation({
    summary: 'UpdateIsSavedFlagTrue',
    description:
      'ปรับสถานะ is_saved_flag ให้เป็น True กรณีกดจัดเก็บ เพื่อไม่นำมาแสดงในหน้า แสดง list ข้อมูล และรับ payload field status เพื่อปรับสถานะ',
  })
  @ApiParam({ name: 'id', type: String, description: 'interview_id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: UpdateSaveFlagResponseDto,
  })
  async setIsSaveFlag(
    @Param('id') id: string,
    @Body() status: SetFlagInterviewDto,
  ) {
    return this.interviewsService.setSaveFlag(id, status.interview_status);
  }
}
