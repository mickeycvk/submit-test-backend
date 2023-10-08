import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InterviewDto } from '../dto/interview.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Interview } from 'src/typeorm/interview.entity';
import { Repository } from 'typeorm';
import {
  ICreateInterviewCardResult,
  IGetInterviewCardsByIdResult,
  IGetManyInterview,
} from '../interface/interview';
import { InterviewGetManyResponseDto } from '../dto/interviewResponse.dto';

@Injectable()
export class InterviewsService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
  ) {}
  async createInterviewCard(
    interviewDto: InterviewDto,
  ): Promise<ICreateInterviewCardResult> {
    try {
      const createdInterview = await this.interviewRepository.save(
        interviewDto,
      );

      return {
        statusCode: 201,
        newUser: createdInterview,
      };
    } catch (error) {
      throw new BadRequestException('Failed to create an interview card', {
        cause: error,
        description: error.message,
      });
    }
  }

  async getManyInterviewCards(
    pageOptions: IGetManyInterview,
  ): Promise<InterviewGetManyResponseDto> {
    try {
      const queryBuilder =
        this.interviewRepository.createQueryBuilder('interview');

      const pageOffset = (pageOptions.page - 1) * pageOptions.limit;
      const pageTotal = pageOptions.page * pageOptions.limit;

      queryBuilder
        .select([
          'interview.detail',
          'interview.interview_status',
          'interview.created_at',
          'interview.created_by',
        ])
        .where('interview.is_saved_flag = :is_saved_flag', {
          is_saved_flag: false,
        })
        .orderBy('interview.created_at', 'ASC')
        .skip(pageOffset)
        .take(pageOptions.limit);

      const [interviewCards, interviewCount] =
        await queryBuilder.getManyAndCount();

      return {
        data: interviewCards,
        pagination: {
          page: pageOptions.page,
          take: pageOptions.limit,
          totalCount: interviewCount,
          hasNextPage: pageTotal < interviewCount,
        },
      };
    } catch (error) {
      throw new BadRequestException('Failed to get all interview cards', {
        cause: error,
        description: error.message,
      });
    }
  }

  async setSaveFlag(interviewId: string, status: string) {
    try {
      const interview = await this.interviewRepository.findOne({
        where: { interview_id: interviewId },
      });
      if (!interview) {
        throw new NotFoundException(`interview_id: ${interviewId} not found`);
      }
      if (!status) {
        throw new BadRequestException('interview_status error');
      }
      await this.interviewRepository.update(interviewId, {
        is_saved_flag: true,
        interview_status: status,
      });
      return { result: `set interview_id:${interviewId} is_saved_flag = True` };
    } catch (error) {
      throw new BadRequestException('Failed to set interview flag true', {
        cause: error,
        description: error.message,
      });
    }
  }

  async getInterviewCardById(
    interviewId: string,
  ): Promise<IGetInterviewCardsByIdResult> {
    try {
      const interview = await this.interviewRepository.findOne({
        where: { interview_id: interviewId, is_saved_flag: false },
        relations: ['comment'],
      });

      if (!interview) {
        throw new NotFoundException(`interview_id: ${interviewId} not found`);
      }
      return { data: interview };
    } catch (error) {
      throw new BadRequestException('Failed to get interview cards by id', {
        cause: error,
        description: error.message,
      });
    }
  }
}
