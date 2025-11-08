import React from "react";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Project } from "../../../../types/Project";
import { TaskStatuses } from "../../../../types/TaskStatuses";
import { TasksList } from "../TasksList";
import { Task as TaskType } from "../../../../types/Task";
import { getPreparedDatas } from "../../../../services/getPreparedDatas";
import { useProjectStore } from "../../../../stores/projectsStore";

type Props = {
  project: Project;
  filterBy: TaskStatuses | null;
  sortBy: boolean;
};

export const TaskBoard: React.FC<Props> = ({ project, filterBy, sortBy }) => {
  const { updateTaskOrderInProject } = useProjectStore();

  const tasks = Array.isArray(project.tasks) ? project.tasks : [];

  const preparedTasks = getPreparedDatas<TaskType[], TaskStatuses | null>(tasks, { filterBy, sortBy });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;
    if (sourceStatus === destStatus && source.index === destination.index) return;

    const [projectIdStr, taskIdStr] = draggableId.split("-");
    const projectId = +projectIdStr;
    const taskId = +taskIdStr;

    const currentProject = useProjectStore.getState().projects.find((p) => p.id === projectId);
    if (!currentProject) return;

    const updatedTasks = Array.isArray(currentProject.tasks) ? [...currentProject.tasks] : [];
    const draggedTaskIndex = updatedTasks.findIndex((t) => t.id === taskId);
    const draggedTask = updatedTasks[draggedTaskIndex];
    if (!draggedTask) return;

    if (sourceStatus === destStatus) {
      const tasksInStatus = updatedTasks.filter((t) => t.status === sourceStatus);
      tasksInStatus.splice(source.index, 1);
      tasksInStatus.splice(destination.index, 0, draggedTask);

      updatedTasks.forEach((task, idx) => {
        if (task.status === sourceStatus) {
          updatedTasks[idx] = tasksInStatus.shift()!;
        }
      });
    } else {
      updatedTasks[draggedTaskIndex] = { ...draggedTask, status: destStatus as TaskStatuses };
    }

    updateTaskOrderInProject(currentProject, updatedTasks)
      .then(() => toast.success("Task updated successfully!"))
      .catch(() => toast.error("Failed to update task"));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mt-8">
        <header className="flex justify-between items-center">
          <h3 className="text-xl text-gray-700 dark:text-gray-100">{project.title}</h3>
          <p className="text-gray-700 text-sm dark:text-gray-300">Tasks: {tasks.length}</p>
        </header>

        <div className="flex flex-col gap-2 mt-4 sm:flex-row">
          {Object.values(TaskStatuses).map((panel) => (
            <Droppable droppableId={panel} key={panel}>
              {(provided) => (
                <div className="basis-1/3 grow shrink-1" ref={provided.innerRef} {...provided.droppableProps}>
                  <h4 className="text-center p-3 bg-gray-100 text-gray-700 dark:text-gray-300 dark:bg-gray-700">
                    {panel}
                  </h4>
                  <div className="mt-3">
                    <TasksList project={project} tasks={preparedTasks} taskStatus={panel} />
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};
