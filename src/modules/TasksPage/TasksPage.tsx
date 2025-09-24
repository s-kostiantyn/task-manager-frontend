import React, { useState, useEffect } from "react";
import { TasksBoardList } from "./components/TasksBoardList";
import { Filter } from "../shared/Filter";
import { TaskStatuses } from "../../types/TaskStatuses";
import { useProjectStore } from "../../stores/projectsStore";
import { GoCreate } from "../shared/GoCreate";

export const TasksPage: React.FC = () => {
  const [filterBy, setFilterBy] = useState<TaskStatuses | null>(null);
  const [sortBy, setSortBy] = useState(false);

  const statuses = Object.values(TaskStatuses);

  const { fetchProjects, loading, error, projects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Filter
        filterBy={filterBy}
        statuses={statuses}
        sortBy={sortBy}
        setFilterBy={setFilterBy}
        setSortBy={setSortBy}
      />

      <div className="tasks__wrapper">
        {loading && <div className="message">loading...</div>}
        {!loading && error && <div className="message">{error}</div>}
        {!loading && !error && !projects.length && (
          <div className="message">
            <p className="dark:text-gray-200">You have no projects</p>
            <GoCreate />
          </div>
        )}
        {!loading && !error && projects.length !== 0 && (
          <TasksBoardList
            projects={projects}
            filterBy={filterBy}
            sortBy={sortBy}
          />
        )}
      </div>
    </>
  );
};
