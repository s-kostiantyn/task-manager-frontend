import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";

export const Logout: React.FC = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        logout();
        navigate("/login");
      }}
      className="w-full flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    >
      <svg
        aria-hidden="true"
        className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 12H9m0 0l3-3m-3 3l3 3"
        />
      </svg>
      <span className="ml-3">Log out</span>
    </button>
  );
};
