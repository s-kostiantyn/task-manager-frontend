import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ModalTypes } from "../../../types/ModalTypes";
import { EditProject } from "./components/EditProject";
import { EditTask } from "./components/EditTask";
import { FormTypes } from "../../../types/FormTypes";
import { Task } from "../../../types/Task";
import { Project } from "../../../types/Project";
import { useProjectStore } from "../../../stores/projectsStore";
import { ID } from "../../../types/ID";
import { Spinner } from "../Spinner";

type Props = {
  modalIsOpen: boolean;
  onModalOpen: (v: boolean) => void;
  title: string;
  type: ModalTypes;
  formType: FormTypes;
  datas: Task | Project;
  updateDatas?: (v: Task) => void;
  project?: Project;
};

export const Modal: React.FC<Props> = ({
  modalIsOpen,
  onModalOpen,
  title,
  type,
  formType,
  datas,
  updateDatas,
  project,
}) => {
  const { deleteProject, deleteTaskFromProject, loading } = useProjectStore();
  const navigate = useNavigate();

  const handleDeleteProject = (id: ID) => {
    deleteProject(id)
      .then(() => {
        toast.success("Project deleted successfully");
      })
      .catch(() => {
        toast.success("Failed to delete the project");
      });
  };

  const handleDeleteTask = () => {
    if (project?.id !== undefined && typeof datas.id !== "string") {
      deleteTaskFromProject(project.id, datas.id)
        .then(() => {
          toast.success("Task deleted successfully");
          navigate("/tasks");
        })
        .catch(() => {
          toast.success("Failed to delete the task");
        });
    }
  };

  return (
    <>
      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-10 z-40"></div>
      )}

      <div
        tabIndex={-1}
        aria-hidden={!modalIsOpen}
        className={`${
          modalIsOpen ? "flex" : "hidden"
        } fixed inset-0 z-50 justify-center items-start bg-black bg-opacity-50 overflow-y-auto`}
      >
        <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg text-gray-900 dark:text-white">
                {type === "delete" ? "Delete" : "Edit"} this "{title}"{" "}
                {formType === FormTypes.Project ? "Project" : "Task"}?
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => onModalOpen(false)}
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

            {type === "edit" && formType === FormTypes.Project && (
              <EditProject
                onModalOpen={onModalOpen}
                projectEdit={datas as Project}
              />
            )}

            {type === "edit" &&
              formType === FormTypes.Task &&
              updateDatas &&
              project && (
                <EditTask
                  taskEdit={datas as Task}
                  project={project}
                  updateDatas={updateDatas}
                  onModalOpen={onModalOpen}
                />
              )}

            <div className="flex">
              {type === "delete" && formType === FormTypes.Project && (
                <button
                  disabled={loading}
                  className="w-full flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => handleDeleteProject(datas.id)}
                >
                  {loading ? <Spinner /> : "Delete"}
                </button>
              )}

              {type === "delete" && formType === FormTypes.Task && (
                <button
                  disabled={loading}
                  onClick={handleDeleteTask}
                  type="button"
                  className="w-full flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  {loading ? <Spinner /> : "Delete"}
                </button>
              )}

              <button
                onClick={() => onModalOpen(false)}
                type="button"
                className="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
