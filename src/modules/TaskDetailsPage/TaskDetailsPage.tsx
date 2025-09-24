import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Task } from "../../types/Task";
import { GoBack } from "../shared/GoBack";
import { Modal } from "../shared/Modal";
import { ModalTypes } from "../../types/ModalTypes";
import { FormTypes } from "../../types/FormTypes";
import { useAuthStore } from "../../stores/authStore";
import { Roles } from "../../types/Roles";
import { TaskStatuses } from "../../types/TaskStatuses";

export const TaskDetailsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalTypes>("delete");

  const { state } = useLocation();
  const [task, setTask] = useState(state?.task as Task);
  const project = state?.project;

  if (!task) {
    return <Navigate to="" />;
  }

  const handleModalDelete = () => {
    setModalType("delete");
    setModalIsOpen(true);
  };

  const handleModalEdit = () => {
    setModalType("edit");
    setModalIsOpen(true);
  };

  return (
    <>
      <section className="">
        <div className="">
          <h2 className="flex items-center justify-between text-gray-500 dark:text-gray-300">
            <p className="text-gray-700 text-2xl dark:text-gray-100">
              Task: {task.title}
            </p>
            <p className="">Created: {task.date}</p>
          </h2>

          <header className="mt-4 flex items-center justify-between">
            <GoBack />

            <div className="flex">
              {user &&
                [Roles.Admin, Roles.ProjectManager].includes(user?.role) && (
                  <>
                    <button
                      onClick={handleModalDelete}
                      type="button"
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      delete
                    </button>

                    <button
                      onClick={handleModalEdit}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      edit
                    </button>
                  </>
                )}
            </div>
          </header>

          <div className="p-2 bg-white rounded shadow-sm border-gray-100 border-2 mt-2 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
            <div className="flex items-center gap-2">
              <h3 className="">Description:</h3>

              <p className="text-gray-600 text-sm dark:text-gray-300">
                {task.description}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <h3 className="">Deadline:</h3>

              <p className="text-gray-600 bg-orange-100 p-1 rounded text-sm">
                {task.deadline}
              </p>
            </div>

            <div className="flex gap-2 mt-3 items-center">
              <h3 className="">Status:</h3>

              {TaskStatuses.toDo === task.status && (
                <p className="text-gray-600 bg-red-100 p-1 rounded text-sm">
                  {task.status}
                </p>
              )}

              {TaskStatuses.inProgress === task.status && (
                <p className="text-gray-600 bg-yellow-100 p-1 rounded text-sm">
                  {task.status}
                </p>
              )}

              {TaskStatuses.done === task.status && (
                <p className="text-gray-600 bg-blue-100 p-1 rounded text-sm">
                  {task.status}
                </p>
              )}
            </div>

            <div className="mt-3">
              <h3 className="">List of peoples:</h3>

              <ul className="flex gap-2 wrap mt-2 text-sm">
                {task.peoples.map((people) => (
                  <li
                    className="bg-gray-200 p-1 rounded text-gray-600"
                    key={people.id}
                  >
                    {people.firstName} {people.lastName}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Modal
        modalIsOpen={modalIsOpen}
        onModalOpen={setModalIsOpen}
        title={task.title}
        type={modalType}
        formType={FormTypes.Task}
        datas={task}
        updateDatas={setTask}
        project={project}
      />
    </>
  );
};
