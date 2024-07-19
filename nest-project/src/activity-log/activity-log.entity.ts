import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activityType: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  time: string;

  @ManyToOne(() => User, user => user.activityLogs)
  user: User;
}
