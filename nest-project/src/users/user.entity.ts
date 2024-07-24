import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import { Role } from './role.enum';
import { ActivityLog } from 'src/activity-log/activity-log.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
 
  @Column({type:'enum', enum: Role, default: Role.USER})
  role: Role;

  @Column({ nullable: true })
  imageUrl: string;

  @BeforeInsert()
  setDefaultImage() {
    if (!this.imageUrl) {
      this.imageUrl = process.env.DEFAULT_USER_IMAGE_URL;
    }
  }

  @OneToMany(() => ActivityLog, activityLog => activityLog.user)
  activityLogs: ActivityLog[];
}
