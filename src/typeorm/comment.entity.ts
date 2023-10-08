import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Interview } from './interview.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  comment_id: string;

  @Column({ type: 'text', nullable: false })
  detail: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  commented_by: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Interview, (interview) => interview.comment)
  @JoinColumn({ name: 'interview_id' })
  interview: Interview;
}
