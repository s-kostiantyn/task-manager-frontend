import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Task } from "../../../../types/Task";
import { Statuses } from "../../../../types/Statuses";
import { TaskStatuses } from "../../../../types/TaskStatuses";
import { usePeopleStore } from "../../../../stores/peoplesStore";
import { Deadlines } from "../../../../types/Deadlines";
import { Project } from "../../../../types/Project";
import { useProjectStore } from "../../../../stores/projectsStore";
import { ID } from "../../../../types/ID";

export const CreateForm: React.FC = () => {
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    status: Statuses.Planned,
    peoples: [] as ID[],
    start: "",
    end: "",
  });

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    deadline: Deadlines.Day,
    status: TaskStatuses.toDo,
    peoples: [] as ID[],
  });

  const tasksRef = useRef<HTMLDivElement | null>(null);
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const { users, loading, error, fetchUsers } = usePeopleStore();
  const { addProject } = useProjectStore();

  const navigate = useNavigate();

  const canDoTask = users.filter((u) => projectData.peoples.includes(u.id));

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (tasksRef.current) {
      tasksRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [tasksList.length]);

  const handleTaskAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    const normilizeTitle = taskData.title.trim();
    const normilizeDesc = taskData.description.trim();

    if (normilizeTitle && normilizeDesc && taskData.peoples.length !== 0) {
      const today = new Date();
      const newId =
        tasksList.length > 0
          ? Math.max(...tasksList.map((task) => task.id)) + 1
          : 1;

      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();

      const newTask: Task = {
        id: newId,
        description: taskData.description,
        title: taskData.title,
        status: taskData.status,
        date: `${month}/${day}/${year}`,
        deadline: taskData.deadline,
        peoples: [...canDoTask.filter((c) => taskData.peoples.includes(c.id))],
      };

      setTasksList((curr) => [newTask, ...curr]);
      setTaskData((prev) => ({
        ...prev,
        title: "",
        description: "",
        deadline: Deadlines.Day,
        status: TaskStatuses.toDo,
      }));
    } else {
      toast.error("Please fill all fields");
    }
  };

  const Submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const normilizeTitle = projectData.title.trim();

    if (normilizeTitle) {
      const newProject: Omit<Project, "id"> = {
        title: projectData.title,
        description: projectData.description,
        status: projectData.status,
        peoples: [...users.filter((u) => projectData.peoples.includes(u.id))],
        tasks: tasksList,
        date: projectData.start,
        dateEnd: projectData.end,
      };

      addProject(newProject)
        .then(() => {
          toast.success("Project created successfully");
          navigate("/projects");
        })
        .catch(() => {
          toast.error("Failed a created the project");
        });
    }
  };

  return (
    <form className="" onSubmit={Submit}>
      <div className="lg:flex lg:gap-6">
        <div className="basis-1/2 grow shrink-1">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Project name
            </label>
            <input
              required
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
                setProjectData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              value={projectData.description}
              required
              placeholder="Description"
            />
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
                  <div
                    key={s}
                    className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                  >
                    <div className="flex items-center ps-3">
                      <input
                        name="status"
                        type="radio"
                        id={s}
                        checked={projectData.status === s}
                        onChange={() =>
                          setProjectData((prev) => ({ ...prev, status: s }))
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor={s}
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {s}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select the people who will work on this project
            </h3>

            {loading && <p className="text-center p-3">Loading...</p>}
            {error && (
              <p className="text-center p-3" style={{ color: "red" }}>
                {error}
              </p>
            )}

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
                      disabled={!!tasksList.length}
                      id={`people-${people.id}`}
                      onChange={() => {
                        if (projectData.peoples.includes(people.id)) {
                          return setProjectData((prev) => ({
                            ...prev,
                            peoples: prev.peoples.filter(
                              (p) => p !== people.id
                            ),
                          }));
                        }

                        return setProjectData((prev) => ({
                          ...prev,
                          peoples: [...prev.peoples, people.id],
                        }));
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor={`people-${people.id}`}
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {`${people.firstName} ${people.lastName}`}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 basis-1/2 grow shrink-1 relative lg:mt-0">
          {!projectData.peoples.length && (
            <div
              role="status"
              title="Please select the peoples"
              className="absolute bg-white opacity-50 w-full h-full dark:bg-gray-800"
            ></div>
          )}

          <div>
            <label
              htmlFor="task-title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Add task for this project{" "}
            </label>
            <input
              type="text"
              name="task-title"
              id="task-title"
              placeholder="Title"
              value={taskData.title}
              onChange={(e) =>
                setTaskData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="task-description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="task-description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={taskData.description}
              onChange={(e) =>
                setTaskData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Description"
            />
          </div>

          <div className="mt-4">
            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Deadline
            </p>

            <div className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {Object.values(Deadlines).map((dl) => (
                <div
                  key={dl}
                  className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                >
                  <div className="flex items-center ps-3">
                    <input
                      id={dl}
                      type="radio"
                      name="task-deadline"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      checked={taskData.deadline === dl}
                      onChange={() =>
                        setTaskData((prev) => ({ ...prev, deadline: dl }))
                      }
                    />

                    <label
                      htmlFor={dl}
                      key={dl}
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {dl}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Status
            </h3>

            <div className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {Object.values(TaskStatuses).map((status) => {
                return (
                  <div
                    key={status + "task"}
                    className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                  >
                    <div className="flex items-center ps-3">
                      <input
                        name="task-status"
                        type="radio"
                        id={status + "task"}
                        checked={taskData.status === status}
                        onChange={() =>
                          setTaskData((prev) => ({ ...prev, status }))
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor={status + "task"}
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {status}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select the people for this task
            </p>

            <div className="max-h-[200px] overflow-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {!canDoTask.length && (
                <p className="text-center p-3">
                  List is empty {"(please choose peoples for this project)"}
                </p>
              )}

              {canDoTask.map((people) => (
                <div
                  key={people.id + "people-task"}
                  className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                >
                  <div className="flex items-center ps-3">
                    <input
                      id={`${people.id}-task`}
                      type="checkbox"
                      name="task-people"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => {
                        if (taskData.peoples.includes(+people.id)) {
                          return setTaskData((prev) => ({
                            ...prev,
                            peoples: prev.peoples.filter(
                              (p) => p !== people.id
                            ),
                          }));
                        }
                        return setTaskData((prev) => ({
                          ...prev,
                          peoples: [...prev.peoples, people.id],
                        }));
                      }}
                    />

                    <label
                      htmlFor={`${people.id}-task`}
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      key={people.id + "people"}
                    >
                      {people.firstName} {people.lastName}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleTaskAdd}
            type="button"
            className="w-full mt-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="mt-8" ref={tasksRef}>
        {tasksList.length !== 0 && (
          <>
            <p className="text-gray-700 text-sm dark:text-gray-200">
              List of tasks
            </p>
            <ul className="mt-4 grid sm:grid-cols-3 gap-2">
              {tasksList.map((task) => (
                <li
                  className="p-2 px-[8px] bg-white rounded shadow-sm border-gray-100 border-2 dark:bg-gray-700 dark:border-gray-600"
                  key={task.id}
                >
                  <h3 className="flex justify-between items-center text-sm mb-3 text-gray-700 dark:text-gray-200">
                    {task.title}
                    <button
                      type="button"
                      onClick={() =>
                        setTasksList((prev) =>
                          prev.filter((t) => t.id !== task.id)
                        )
                      }
                      className="flex flex-row items-center mt-2"
                    >
                      Delete
                    </button>
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

                  <p className="text-xs text-start text-gray-500 mt-2 dark:text-gray-200">
                    Deadline: {task.deadline}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create Project
        </button>
      </div>
    </form>
  );
};
