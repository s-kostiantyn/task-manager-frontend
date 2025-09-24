import React, { useState, useEffect } from "react";
import { Dropdown } from "flowbite";
import cn from "classnames";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { People } from "../../../../types/People";
import { usePeopleStore } from "../../../../stores/peoplesStore";
import { ID } from "../../../../types/ID";
import { Roles } from "../../../../types/Roles";

type Props = {
  people: People;
};

export const PeopleItem: React.FC<Props> = ({ people }) => {
  const { id, firstName, lastName, role, login, password } = people;
  const { deleteUser } = usePeopleStore();
  const { peopleId } = useParams();

  const deletePeople = (id: ID) => {
    deleteUser(id)
      .then(() => {
        toast.success("User deleted successfully");
      })
      .catch(() => {
        toast.success("Failed to delete the user");
      });
  };

  useEffect(() => {
    const button = document.getElementById(`${id}-dropdown-button`);
    const dropdown = document.getElementById(`${id}-dropdown`);

    if (button && dropdown) {
      new Dropdown(dropdown, button);
    }
  }, []);

  return (
    <tr
      className={cn(
        "border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700",
        {
          "bg-gray-200 hover:bg-gray-200 dark:bg-gray-700": peopleId === id,
        }
      )}
    >
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {id}
      </th>
      <td className="px-4 py-3">{firstName}</td>
      <td className="px-4 py-3">{lastName}</td>
      <td className="px-4 py-3">{role}</td>
      <td className="px-4 py-3">{login}</td>
      <td className="px-4 py-3">{password}</td>

      {people?.role !== Roles.Admin && (
        <td className="px-4 py-3 flex items-center justify-end">
          <button
            id={`${id}-dropdown-button`}
            data-dropdown-toggle={`${id}-dropdown`}
            className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
          <div
            id={`${id}-dropdown`}
            className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="apple-imac-27-dropdown-button"
            >
              {peopleId === id ? (
                <li>
                  <Link
                    to="."
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Cancel
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to={`${id}`}
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    state={{ people }}
                  >
                    Edit
                  </Link>
                </li>
              )}
            </ul>
            <div className="py-1">
              <button
                onClick={() => deletePeople(id)}
                className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </td>
      )}
    </tr>
  );
};
