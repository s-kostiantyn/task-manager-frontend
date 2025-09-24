import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Project } from "../../../../../types/Project";
import { Statuses } from "../../../../../types/Statuses";
import { usePeopleStore } from "../../../../../stores/peoplesStore";
import { useProjectStore } from "../../../../../stores/projectsStore";
import { People } from "../../../../../types/People";
import { TaskStatuses } from "../../../../../types/TaskStatuses";
import { Spinner } from "../../../Spinner";

type Props = {
  projectEdit: Project;
  onModalOpen: (v: boolean) => void;
};

export const EditProject: React.FC<Props> = ({ projectEdit, onModalOpen }) => {
  const [projectData, setProjectData] = useState({
    title: projectEdit.title,
    description: projectEdit.description,
    peoples: projectEdit.peoples,
    start: projectEdit.date,
    end: projectEdit.dateEnd,
    status: projectEdit.status,
  });

  const { users, fetchUsers, loading, error } = usePeopleStore();
  const { updateProject } = useProjectStore();
  const [peopleIdsOnProject, setPeopleIdsOnProject] = useState(
    projectEdit.peoples.map((p) => p.id)
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCheckboxChange = (people: People) => {
    setPeopleIdsOnProject((curr) => {
      if (curr.includes(people.id)) {
        return curr.filter((p) => p !== people.id);
      }

      return [...curr, people.id];
    });
  };

  const editProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedProject = {
      title: projectData.title,
      description: projectData.description,
      peoples: users.filter((u) => peopleIdsOnProject.includes(u.id)),
      date: projectData.start,
      dateEnd: projectData.end,
      status: projectData.status,
    };

    updateProject(projectEdit.id, updatedProject)
      .then(() => {
        onModalOpen(true);
        toast.success("Project edited successfully");
      })
      .catch(() => {
        toast.success("Failed to update the Project");
      });
  };

  return (
    <form onSubmit={editProject}>
      <div>
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={projectData.title}
          onChange={(e) =>
            setProjectData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          id="description"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          onChange={(e) =>
            setProjectData((prev) => ({ ...prev, description: e.target.value }))
          }
          value={projectData.description}
          placeholder="Description"
        />
      </div>

      <div className="mt-4">
        <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Peoples:
        </h3>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="max-h-[200px] overflow-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {users.map((people) => (
            <div
              key={people.id}
              className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div className="flex items-center ps-3">
                <input
                  type="checkbox"
                  name="status"
                  id={`people-${people.id}${projectEdit.id}`}
                  checked={peopleIdsOnProject.includes(people.id)}
                  onChange={() => handleCheckboxChange(people)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={`people-${people.id}${projectEdit.id}`}
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {`${people.firstName} ${people.lastName}`}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Tasks:
        </h3>
        <div className="max-h-[300px] overflow-auto flex flex-col gap-2">
          {projectEdit.tasks.map((task) => {
            const project = projectEdit;

            return (
              <div
                className="flex items-center justify-between p-2 bg-white rounded shadow-sm border-gray-100 border-2 dark:bg-gray-800 dark:border-gray-700"
                key={task.id}
              >
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    {task.title}
                  </p>

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
                </div>

                <Link
                  to="/tasks/details"
                  state={{ task, project }}
                  className="text-sm text-gray-500 dark:text-gray-300"
                >
                  edit
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="w-full">
          <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Start date
          </h3>

          <input
            type="date"
            value={projectData.start}
            className="rounded w-full border-gray-200 border-2 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-700"
            onChange={(e) =>
              setProjectData((prev) => ({ ...prev, start: e.target.value }))
            }
            required
          />
        </div>

        <div className="w-full">
          <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Finish date
          </h3>

          <input
            type="date"
            value={projectData.end}
            onChange={(e) =>
              setProjectData((prev) => ({ ...prev, end: e.target.value }))
            }
            className="rounded w-full border-gray-200 border-2 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-700"
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Status
        </h3>

        <div className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {Object.values(Statuses).map((s) => {
            return (
              <>
                <div
                  key={s}
                  className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                >
                  <div className="flex items-center ps-3">
                    <input
                      name="status"
                      type="radio"
                      id={s + projectEdit.id}
                      checked={projectData.status === s}
                      onChange={() =>
                        setProjectData((prev) => ({ ...prev, status: s }))
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor={s + projectEdit.id}
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {s}
                    </label>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        {loading ? <Spinner /> : "Edit"}
      </button>
    </form>
  );
};
