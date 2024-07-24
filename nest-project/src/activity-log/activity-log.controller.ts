import { Controller, Get, Param } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';

@Controller('activity-log')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Get(':id')
  async getLogsByUserId(@Param('id') id: number) {
    return this.activityLogService.findLogsByUserId(id);
  }
}
