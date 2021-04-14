import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';
export class TaskStatusValidationPipe implements PipeTransform {
  private allowedStatuses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  transform(value: any) {
    if (this.isStatusValid(value)) {
      return value;
    } else {
      throw new BadRequestException(`Status ${value} is not a valid status`);
    }
  }

  private isStatusValid(status): boolean {
    if (this.allowedStatuses.indexOf(status) === -1) {
      return false;
    } else {
      return true;
    }
  }
}
