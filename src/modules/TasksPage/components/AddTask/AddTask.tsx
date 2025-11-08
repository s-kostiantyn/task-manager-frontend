import React, { useState } from "react";
import { toast } from "react-toastify";
import { Project } from "../../../../types/Project";
import { TaskStatuses } from "../../../../types/TaskStatuses";
import { Task } from "../../../../types/Task";
import { Deadlines } from "../../../../types/Deadlines";
import { ID } from "../../../../types/ID";
import { useProjectStore } from "../../../../stores/projectsStore";
import { Spinner } from "../../../shared/Spinner";

type Props = {
  modalIsOpen: boolean;
  onModalIsOpen: (v: boolean) => void;
  project: Project;
  taskStatus: TaskStatuses;
};

export const AddTask: React.FC<Props> = ({
  modalIsOpen,
  onModalIsOpen,
  project,
  taskStatus,
}) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: Deadlines.Day,
    peoples: [] as ID[],
  });

  const { addTaskToProject, loading } = useProjectStore();

  const getTaskId = (tasks: Task[] = []) => {
    if (!tasks.length) return 0;
    return Math.max(...tasks.map((t) => t.id)) + 1;
  };

  const handleTaskAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = task.title.trim();
    const description = task.description.trim();

    if (!title || !description || task.peoples.length === 0) {
      toast.error("Please fill all fields and assign at least one person");
      return;
    }

    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    const newTask: Task = {
      id: getTaskId(project.tasks),
      title,
      description,
      status: taskStatus,
      date: `${month}/${day}/${year}`,
      deadline: task.deadline,
      peoples: (project.peoples || []).filter((p) => task.peoples.includes(p.id)),
    };

    addTaskToProject(project.id, newTask)
      .then(() => {
        setTask({ title: "", description: "", deadline: Deadlines.Day, peoples: [] });
        toast.success("Task added successfully");
        onModalIsOpen(false);
      })
      .catch(() => toast.error("Failed to add task"));
  };

  return (
    <>
      {modalIsOpen && <div className="fixed inset-0 bg-black bg-opacity-10 z-40"></div>}

      <div
        tabIndex={-1}
        aria-hidden={!modalIsOpen}
        className={`${
          modalIsOpen ? "flex" : "hidden"
        } fixed inset-0 z-50 justify-center items-start bg-black bg-opacity-50 overflow-y-auto`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg text-gray-900 dark:text-white">
                Add "{taskStatus}" Task to "{project.title}"
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => onModalIsOpen(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form onSubmit={handleTaskAdd}>
              {/* Title */}
              <div className="mb-4">
                <label htmlFor="task-title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Task title
                </label>
                <input
                  type="text"
                  id="task-title"
                  value={task.title}
                  onChange={(e) => setTask((prev) => ({ ...prev, title: e.target.value }))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Title"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label htmlFor="task-description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description
                </label>
                <textarea
                  id="task-description"
                  value={task.description}
                  onChange={(e) => setTask((prev) => ({ ...prev, description: e.target.value }))}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Write a description..."
                />
              </div>

              {/* Deadline */}
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Deadline</h3>
                <div className="flex gap-4">
                  {Object.values(Deadlines).map((dl) => (
                    <label key={dl} className="flex items-center gap-2 text-gray-900 dark:text-gray-300">
                      <input
                        type="radio"
                        checked={dl === task.deadline}
                        onChange={() => setTask((prev) => ({ ...prev, deadline: dl }))}
                        name="deadline"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 dark:focus:ring-blue-600"
                      />
                      {dl}
                    </label>
                  ))}
                </div>
              </div>

              {/* Peoples */}
              <div className="mb-4 max-h-[200px] overflow-auto">
                {(project.peoples || []).map((people) => (
                  <label key={people.id} className="flex items-center gap-2 text-gray-900 dark:text-gray-300 mb-1">
                    <input
                      type="checkbox"
                      checked={task.peoples.includes(people.id)}
                      onChange={() => {
                        setTask((prev) => ({
                          ...prev,
                          peoples: prev.peoples.includes(people.id)
                            ? prev.peoples.filter((p) => p !== people.id)
                            : [...prev.peoples, people.id],
                        }));
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 dark:focus:ring-blue-600"
                    />
                    {people.firstName} {people.lastName}
                  </label>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  disabled={loading}
                  type="submit"
                  className="flex-1 flex justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {loading ? <Spinner /> : "Add Task"}
                </button>

                <button
                  type="button"
                  onClick={() => onModalIsOpen(false)}
                  className="flex-1 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
