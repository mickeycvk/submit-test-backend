import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewsModule } from './interviews/interviews.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import appConfig from './config/app.config';
import { Interview } from './typeorm/interview.entity';
import { Comment } from './typeorm/comment.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    InterviewsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('app.dbHost'),
        port: parseInt(configService.get('app.dbPort')),
        username: configService.get<string>('app.dbUser'),
        password: configService.get<string>('app.dbPass'),
        database: configService.get<string>('app.dbName'),
        entities: [Interview, Comment],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
