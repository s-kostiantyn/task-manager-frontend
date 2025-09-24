import { Task } from "../types/Task";
import { TaskStatuses } from "../types/TaskStatuses";

export function getPreparedTasks(tasks: Task[], status: TaskStatuses) {
  let preparedTasks = [...tasks];

  if (status) {
    preparedTasks = preparedTasks.filter((task) => task.status === status);
  }

  return preparedTasks;
}
