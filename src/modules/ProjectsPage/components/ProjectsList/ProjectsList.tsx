import React from "react";
// import "./ProjectsList.scss";
import { Project } from "../Projects/Project";
import { Project as ProjectType } from "../../../../types/Project";

type Props = {
  projects: ProjectType[];
};

export const ProjectList: React.FC<Props> = ({ projects }) => {
  return (
    <ul className="mt-6 flex flex-col gap-4">
      {projects.map((project) => (
        <li className="" key={project.id}>
          <Project project={project} />
        </li>
      ))}
    </ul>
  );
};
