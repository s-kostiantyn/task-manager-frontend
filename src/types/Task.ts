import { People } from "./People";
import { TaskStatuses } from "./TaskStatuses";

export interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  date: string;
  status: TaskStatuses;
  peoples: People[];
}
