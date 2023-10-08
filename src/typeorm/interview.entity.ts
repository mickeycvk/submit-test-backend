import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class Interview {
  @PrimaryGeneratedColumn('uuid')
  interview_id: string;

  @Column({ type: 'text', nullable: false })
  detail: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  interview_status: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  created_by: string;

  @Column({ type: 'boolean', nullable: false })
  is_saved_flag: boolean;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Comment, (comment) => comment.interview)
  comment: Comment[];
}
