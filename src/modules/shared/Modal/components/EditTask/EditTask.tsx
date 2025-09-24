import React, { useState } from "react";
import { toast } from "react-toastify";
import { Task } from "../../../../../types/Task";
import { Deadlines } from "../../../../../types/Deadlines";
import { TaskStatuses } from "../../../../../types/TaskStatuses";
import { Project } from "../../../../../types/Project";
import { useProjectStore } from "../../../../../stores/projectsStore";
import { Spinner } from "../../../Spinner";

type Props = {
  taskEdit: Task;
  project: Project;
  updateDatas: (v: Task) => void;
  onModalOpen: (v: boolean) => void;
};

export const EditTask: React.FC<Props> = ({
  taskEdit,
  project,
  updateDatas,
  onModalOpen,
}) => {
  const [taskData, setTaskData] = useState({
    title: taskEdit.title,
    description: taskEdit.description,
    deadline: taskEdit.deadline,
    status: taskEdit.status,
  });
  const { updateTaskInProject, loading } = useProjectStore();

  const [peopleIdsOnTask, setPeopleIdsOnTask] = useState(
    taskEdit.peoples.map((p) => p.id)
  );

  const updateTask = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTask = {
      title: taskData.title,
      description: taskData.description,
      deadline: taskData.deadline,
      status: taskData.status,
      peoples: project.peoples.filter((p) => peopleIdsOnTask.includes(p.id)),
    };

    updateTaskInProject(project, taskEdit.id, updatedTask, true)
      .then(() => {
        updateDatas({ ...taskEdit, ...updatedTask });
        onModalOpen(false);

        toast.success("Task updated successfully");
      })
      .catch(() => {
        toast.error("Failed to update the task");
      });
  };

  return (
    <form onSubmit={updateTask}>
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
          value={taskData.title}
          placeholder="Title"
          onChange={(e) =>
            setTaskData((prev) => ({ ...prev, title: e.target.value }))
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
          placeholder="Write a description..."
          value={taskData.description}
          onChange={(e) =>
            setTaskData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      <div className="mt-4">
        <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Deadline:
        </h3>

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
                  checked={dl === taskData.deadline}
                  onChange={() =>
                    setTaskData((prev) => ({ ...prev, deadline: dl }))
                  }
                  name="deadline"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={dl}
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
          Status:
        </h3>

        <div className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {Object.values(TaskStatuses).map((status) => (
            <div
              key={status}
              className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
            >
              <div className="flex items-center ps-3">
                <input
                  id={status}
                  type="radio"
                  checked={status === taskData.status}
                  onChange={() => setTaskData((prev) => ({ ...prev, status }))}
                  name="status"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={status}
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {status}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
          List of peoples:
        </h3>

        <div className="max-h-[200px] overflow-auto text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {project.peoples.map((p) => (
            <div
              key={p.id}
              className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div className="flex items-center ps-3">
                <input
                  id={`people-${p.id}`}
                  type="checkbox"
                  name="status"
                  checked={peopleIdsOnTask.includes(p.id)}
                  onChange={() => {
                    if (peopleIdsOnTask.includes(p.id)) {
                      return setPeopleIdsOnTask((curr) =>
                        curr.filter((c) => c !== p.id)
                      );
                    }

                    return setPeopleIdsOnTask((curr) => [...curr, p.id]);
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={`people-${p.id}`}
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {`${p.firstName} ${p.lastName}`}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        disabled={loading}
        type="submit"
        className="mt-6 flex justify-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        {loading ? <Spinner /> : "Edit"}
      </button>
    </form>
  );
};
