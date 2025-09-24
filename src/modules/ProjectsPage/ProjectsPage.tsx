import React, { useState, useEffect } from "react";
import { ProjectList } from "./components/ProjectsList";
import { Project } from "../../types/Project";
import { Filter } from "../shared/Filter";
import { Statuses } from "../../types/Statuses";
import { getPreparedDatas } from "../../services/getPreparedDatas";
import { useProjectStore } from "../../stores/projectsStore";
import { GoCreate } from "../shared/GoCreate";

export const ProjectsPage: React.FC = () => {
  const { projects, fetchProjects, loading, error } = useProjectStore();

  const [filterBy, setFilterBy] = useState<Statuses | null>(null);
  const [sortBy, setSortBy] = useState(false);

  const statuses = Object.values(Statuses);

  const preparedProjects = getPreparedDatas<Project[], Statuses | null>(
    projects,
    {
      filterBy,
      sortBy,
    }
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="">
      <header className="flex gap-4 items-start flex-col justify-between md:flex-row md:items-center">
        <div className="">
          <Filter
            filterBy={filterBy}
            statuses={statuses}
            setFilterBy={setFilterBy}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
        <p className="text-gray-600 dark:text-gray-300 whitespace-nowrap">
          Projects: {projects.length}
        </p>
      </header>

      {loading && <div className="message">loading...</div>}
      {!loading && error && <div className="message">{error}</div>}
      {!loading && !error && !projects.length && (
        <div className="message">
          <p className="dark:text-gray-200">You have no projects</p>
          <GoCreate />
        </div>
      )}
      {!loading && !error && projects.length !== 0 && (
        <ProjectList projects={preparedProjects} />
      )}
    </section>
  );
};
