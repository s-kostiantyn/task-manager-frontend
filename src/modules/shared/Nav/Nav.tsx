import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";
import { Roles } from "../../../types/Roles";
import { ThemeToggleButton } from "../ThemeToggleButton";

export const Nav: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <button
            data-drawer-target="drawer-navigation"
            data-drawer-toggle="drawer-navigation"
            aria-controls="drawer-navigation"
            className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              aria-hidden="true"
              className="hidden w-6 h-6"
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
            <span className="sr-only">Toggle sidebar</span>
          </button>

          <Link to="/" className="flex items-center justify-between mr-4">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Manager
            </span>
          </Link>
        </div>

        <div className="flex items-center lg:order-2">
          <ThemeToggleButton />

          <button
            type="button"
            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
          >
            <span className="sr-only">Open user menu</span>
            <p className="w-8 h-8 rounded-full flex items-center bg-gray-200 text-gray-600 justify-center dark:bg-gray-500 dark:text-gray-100">{`${user?.firstName[0].toUpperCase()}${user?.lastName[0].toUpperCase()}`}</p>
          </button>
          <div
            className="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
            id="dropdown"
          >
            <div className="py-3 px-4">
              <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                {`${user?.firstName} ${user?.lastName}`}
              </span>
              <span className="mt-2 block text-sm text-gray-900 truncate dark:text-white">
                {user?.role === Roles.Admin && (
                  <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
                    {user?.role}
                  </span>
                )}

                {user?.role === Roles.ProjectManager && (
                  <span className="inline-block py-1 px-2 rounded bg-red-50 text-red-500 text-xs font-medium tracking-widest">
                    {user?.role}
                  </span>
                )}

                {user?.role === Roles.TeamMember && (
                  <span className="inline-block py-1 px-2 rounded bg-green-100 text-green-600 text-xs font-medium tracking-widest">
                    {user?.role}
                  </span>
                )}
              </span>
            </div>
            <ul
              className="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <Link
                  to="/"
                  className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                >
                  My profile
                </Link>
              </li>
            </ul>

            <ul
              className="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="w-full text-left block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
