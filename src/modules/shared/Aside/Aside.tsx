import React from "react";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import { Logout } from "../Logout";
import { Roles } from "../../../types/Roles";
import { useAuthStore } from "../../../stores/authStore";

const setActive = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    {
      "bg-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100":
        isActive,
    }
  );

export const Aside: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  "flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
                  {
                    "bg-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100":
                      isActive,
                  }
                )
              }
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a4 4 0 100 8 4 4 0 000-8zm-6 14a6 6 0 1112 0H4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-3">Profile</span>
            </NavLink>
          </li>

          <li>
            <button
              type="button"
              className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-pages"
              data-collapse-toggle="dropdown-pages"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Pages
              </span>
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <ul id="dropdown-pages" className="hidden py-2 space-y-2">
              {[Roles.Admin, Roles.ProjectManager, Roles.TeamMember].includes(
                user?.role as Roles
              ) && (
                <>
                  <li>
                    <NavLink to="projects" className={setActive}>
                      Projects
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="tasks" className={setActive}>
                      Kanban
                    </NavLink>
                  </li>
                </>
              )}

              {[Roles.Admin].includes(user?.role as Roles) && (
                <li>
                  <NavLink to="peoples" className={setActive}>
                    Peoples
                  </NavLink>
                </li>
              )}

              {[Roles.Admin, Roles.ProjectManager].includes(
                user?.role as Roles
              ) && (
                <li>
                  <NavLink to="create" className={setActive}>
                    Create
                  </NavLink>
                </li>
              )}
            </ul>
          </li>
        </ul>

        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700  bottom-0 left-0 justify-center space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20">
          <Logout />
        </ul>
      </div>
    </aside>
  );
};
