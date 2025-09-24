import React, { useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { Project as ProjectType } from "../../../../types/Project";
import { Modal } from "../../../shared/Modal";
import { ModalTypes } from "../../../../types/ModalTypes";
import { FormTypes } from "../../../../types/FormTypes";
import { Roles } from "../../../../types/Roles";
import { useAuthStore } from "../../../../stores/authStore";
import { Statuses } from "../../../../types/Statuses";
import { TaskStatuses } from "../../../../types/TaskStatuses";

type Props = {
  project: ProjectType;
};

export const Project: React.FC<Props> = ({ project }) => {
  const { user } = useAuthStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalTypes>("delete");

  const doneTasks = project.tasks.filter((t) => t.status === TaskStatuses.done);
  const doneOn = (100 / project.tasks.length) * doneTasks.length;

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(doneOn);
    }, 100);

    return () => clearTimeout(timer);
  }, [doneOn]);

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
      <div className="p-4 bg-white rounded shadow-sm border-gray-100 border-2 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between sm:items-center">
          <div className="text-l">{project.title}</div>

          <div className="flex items-start gap-4 flex-col-reverse sm:flex-row sm:items-center">
            <p className="hidden text-gray-500 text-sm dark:text-gray-200 sm:block">
              Tasks: {project.tasks.length}
            </p>

            <p className="hidden text-gray-500 text-sm dark:text-gray-200 sm:block">
              Completed: {doneOn.toFixed()}%
            </p>

            <div className="">
              {user &&
                [Roles.Admin, Roles.ProjectManager].includes(user?.role) && (
                  <>
                    <button
                      onClick={handleModalDelete}
                      title="Delete Project?"
                      type="button"
                      className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Delete
                    </button>

                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      title="Edit"
                      onClick={handleModalEdit}
                    >
                      Edit
                    </button>
                  </>
                )}
            </div>
          </div>
        </div>

        <div className="text-sm">
          <Accordion className="mt-4 dark:text-gray-200">
            <AccordionItem className="" header="Details">
              <div className="mt-2">
                <h4 className="">
                  Desctiptoin:{" "}
                  <span className="text-gray-600 dark:text-gray-300">
                    {project.description}
                  </span>
                </h4>
              </div>

              <div className="mt-2">
                <p className="text-gray-500 text-sm dark:text-gray-200 sm:hidden">
                  Tasks: {project.tasks.length}
                </p>

                <p className="text-gray-500 text-sm dark:text-gray-200 sm:hidden">
                  Completed: {doneOn.toFixed()}%
                </p>
              </div>

              <div className="mt-2">
                <h4 className="flex gap-2 items-center">
                  Status:{" "}
                  {project.status === Statuses.Planned && (
                    <p className="bg-red-100 text-xs w-max p-1 rounded mr-2 text-gray-700">
                      {project.status}
                    </p>
                  )}
                  {project.status === Statuses.InProgress && (
                    <p className="bg-yellow-100 text-xs w-max p-1 rounded mr-2 text-gray-700">
                      {project.status}
                    </p>
                  )}
                  {project.status === Statuses.completed && (
                    <p className="bg-blue-100 text-xs w-max p-1 rounded mr-2 text-gray-700">
                      {project.status}
                    </p>
                  )}
                </h4>
              </div>

              <div className="mt-2">
                <div className="">
                  <p className="">
                    Start:{" "}
                    <span className="text-gray-600 dark:text-gray-300">
                      {project.date}
                    </span>
                  </p>
                  <p className="">
                    Finish:{" "}
                    <span className="text-gray-600 dark:text-gray-300">
                      {project.dateEnd}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-2">
                <h4 className="">Peoples that working on this project</h4>

                <ul className="">
                  {project.peoples.map((people) => (
                    <li
                      className="flex gap-1 text-gray-600 dark:text-gray-300"
                      key={people.id}
                    >
                      <p className="">{people.firstName}</p>
                      <p className="">{people.lastName}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-6 w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${width}%` }}
          ></div>
        </div>
      </div>

      <Modal
        modalIsOpen={modalIsOpen}
        onModalOpen={setModalIsOpen}
        title={project.title}
        type={modalType}
        formType={FormTypes.Project}
        datas={project}
      />
    </>
  );
};
