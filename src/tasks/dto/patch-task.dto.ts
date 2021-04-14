import { TaskStatus } from '../task.model';

// the id is extracted from the url param
export class PatchTaskDto {
  status: TaskStatus;
}
