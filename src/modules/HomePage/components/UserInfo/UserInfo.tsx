import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../../stores/authStore";
import { Roles } from "../../../../types/Roles";

export const UserInfo: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-wrap flex-col items-start">
          <div className="flex flex-wrap flex-col items-center">
            <p className="w-24 h-24 text-2xl rounded-full flex items-center bg-gray-200 text-gray-600 justify-center dark:bg-gray-500 dark:text-gray-100">{`${user?.firstName[0].toUpperCase()}${user?.lastName[0].toUpperCase()}`}</p>

            <div className="mt-4">
              {user?.role === Roles.Admin && (
                <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest dark:bg-blue-500 dark:text-gray-100">
                  {user?.role}
                </span>
              )}

              {user?.role === Roles.ProjectManager && (
                <span className="inline-block py-1 px-2 rounded bg-red-50 text-red-500 text-xs font-medium tracking-widest dark:bg-red-500 dark:text-gray-100">
                  {user?.role}
                </span>
              )}

              {user?.role === Roles.TeamMember && (
                <span className="inline-block py-1 px-2 rounded bg-green-100 text-green-600 text-xs font-medium tracking-widest dark:bg-green-500 dark:text-gray-100">
                  {user?.role}
                </span>
              )}
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col items-start dark:text-gray-400">
            <p className="leading-relaxed mb-2 mt-4">
              <span className="text-black dark:text-white">Name: </span>
              {user?.firstName}
            </p>
            <p className="leading-relaxed mb-2">
              <span className="text-black dark:text-white">Surname: </span>
              {user?.lastName}
            </p>
            <p className="leading-relaxed mb-2">
              <span className="text-black dark:text-white">Login: </span>
              {user?.login}
            </p>
            <p className="leading-relaxed mb-2">
              <span className="text-black dark:text-white">Password: </span>
              {user?.password}
            </p>

            <div className="mt-6 flex items-center flex-wrap pb-4 mb-4 w-full">
              {[Roles.Admin, Roles.ProjectManager, Roles.TeamMember].includes(
                user?.role as Roles
              ) && (
                <>
                  <Link
                    to="tasks"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Tasks
                  </Link>

                  <Link
                    to="projects"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Projects
                  </Link>
                </>
              )}

              {[Roles.Admin, Roles.ProjectManager].includes(
                user?.role as Roles
              ) && (
                <Link
                  to="create"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Create
                </Link>
              )}

              {[Roles.Admin].includes(user?.role as Roles) && (
                <Link
                  to="peoples"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Peoples
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
