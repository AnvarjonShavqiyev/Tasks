import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './activity-log.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLog)
    private activityLogRepository: Repository<ActivityLog>,
  ) {}

  async createLog(user: User, activityType: string, description: string, time:string): Promise<ActivityLog> {
    const log = new ActivityLog();
    log.user = user;
    log.activityType = activityType;
    log.description = description;
    log.time = time;
    return this.activityLogRepository.save(log);
  }

  async findLogsByUserId(userId: number): Promise<ActivityLog[]> {
    return this.activityLogRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { time: 'DESC' },
    });
  }
}
