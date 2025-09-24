import React from "react";
import { Project } from "../../../../types/Project";
import { TaskBoard } from "../TaskBoard/TaskBoard";
import { TaskStatuses } from "../../../../types/TaskStatuses";

type Props = {
  projects: Project[];
  filterBy: TaskStatuses | null;
  sortBy: boolean;
};

export const TasksBoardList: React.FC<Props> = ({
  projects,
  filterBy,
  sortBy,
}) => {
  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>
          <TaskBoard project={project} filterBy={filterBy} sortBy={sortBy} />
        </div>
      ))}
    </div>
  );
};
