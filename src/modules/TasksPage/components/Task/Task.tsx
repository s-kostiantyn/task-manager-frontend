import React from "react";
import { Link } from "react-router-dom";
import { Task as TaskType } from "../../../../types/Task";
import { Project } from "../../../../types/Project";
import { TaskStatuses } from "../../../../types/TaskStatuses";

type Props = {
  task: TaskType;
  project: Project;
};

export const Task: React.FC<Props> = ({ task, project }) => {
  return (
    <>
      <div className="p-2 bg-white rounded shadow-sm border-gray-100 border-2 dark:bg-gray-700 dark:border-gray-600">
        <h3 className="flex justify-between items-center text-sm mb-3 text-gray-700 dark:text-gray-100">
          {task.title}
          <div className="flex flex-row items-center mt-2">
            <Link
              to="details"
              className="text-xs text-gray-500 dark:text-gray-300"
              state={{ task, project }}
            >
              Details
            </Link>
          </div>
        </h3>

        {task.status === TaskStatuses.toDo && (
          <p className="bg-red-100 text-xs w-max p-1 rounded mr-2 text-gray-700">
            {task.status}
          </p>
        )}

        {task.status === TaskStatuses.inProgress && (
          <p className="bg-yellow-100 text-xs w-max p-1 rounded mr-2 text-gray-700">
            {task.status}
          </p>
        )}

        {task.status === TaskStatuses.done && (
          <p className="bg-blue-100 text-xs w-max p-1 rounded mr-2 text-gray-700">
            {task.status}
          </p>
        )}

        <p className="text-xs text-gray-500 mt-2 dark:text-gray-300">
          Deadline: {task.deadline}
        </p>
      </div>
    </>
  );
};
