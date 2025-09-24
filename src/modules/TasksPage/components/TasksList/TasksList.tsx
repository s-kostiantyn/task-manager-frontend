import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Task as TaskType } from "../../../../types/Task";
import { Task } from "../Task/Task";
import { TaskStatuses } from "../../../../types/TaskStatuses";
import { getPreparedTasks } from "../../../../services/getPreparedTasks";
import { Project } from "../../../../types/Project";
import { AddTask } from "../AddTask";
import { useAuthStore } from "../../../../stores/authStore";
import { Roles } from "../../../../types/Roles";

type Props = {
  tasks: TaskType[];
  taskStatus: TaskStatuses;
  project: Project;
};

export const TasksList: React.FC<Props> = ({ tasks, taskStatus, project }) => {
  const preparedTasks = getPreparedTasks(tasks, taskStatus);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <>
      <ul className="grid grid-rows gap-2">
        {preparedTasks.length !== 0 &&
          preparedTasks.map((task, index) => {
            return (
              <Draggable
                key={`${project.id}-${task.id}`}
                draggableId={`${project.id}-${task.id}`}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task project={project} task={task} />
                  </li>
                )}
              </Draggable>
            );
          })}

        {user && [Roles.Admin, Roles.ProjectManager].includes(user?.role) && (
          <button
            type="button"
            onClick={() => setModalIsOpen(true)}
            className="flex justify-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm p-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        )}
      </ul>

      {modalIsOpen && (
        <AddTask
          modalIsOpen={modalIsOpen}
          onModalIsOpen={setModalIsOpen}
          project={project}
          taskStatus={taskStatus}
        />
      )}
    </>
  );
};
