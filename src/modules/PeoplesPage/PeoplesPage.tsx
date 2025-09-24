import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { Outlet, Link } from "react-router-dom";
import { TablePeoples } from "./components/TablePeoples";
import { usePeopleStore } from "../../stores/peoplesStore";
import { People } from "../../types/People";

function getSortedUsers(
  users: People[],
  { appliedQuery }: { appliedQuery: string }
) {
  let sortedUser = [...users];
  const normilizeQuery = appliedQuery.toLowerCase().trim();

  if (appliedQuery) {
    sortedUser = sortedUser.filter((u) => {
      const name = u.firstName.toLowerCase().trim();
      const surname = u.lastName.toLowerCase().trim();
      const login = u.login.toLowerCase().trim();
      const role = u.role.toLowerCase().trim();

      return (
        name.includes(normilizeQuery) ||
        surname.includes(normilizeQuery) ||
        login.includes(normilizeQuery) ||
        role.includes(normilizeQuery)
      );
    });
  }

  return sortedUser;
}

export const PeoplesPage: React.FC = () => {
  const { loading, error, users, fetchUsers } = usePeopleStore();
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const applyQuery = useCallback(
    debounce((v: string) => {
      setAppliedQuery(v);
      setIsLoading(false);
    }, 1000),
    []
  );

  const sortedUsers = getSortedUsers(users, { appliedQuery });

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsLoading(true);
    applyQuery(e.target.value);
  };

  return (
    <section>
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                  value={query}
                  onChange={handleQueryChange}
                  required
                />
              </div>
            </form>
          </div>

          <Link
            to="create"
            type="button"
            className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            Add User
          </Link>
        </div>
        <div className="relative overflow-x-auto">
          {loading && (
            <div className="px-4 py-3 font-medium text-gray-400">
              loading...
            </div>
          )}
          {!loading && error && (
            <div className="px-4 py-3 font-medium text-gray-400">{error}</div>
          )}
          {!loading && !error && !sortedUsers.length && (
            <div className="px-4 py-3 font-medium text-gray-400">
              Have no peoples
            </div>
          )}
          {!loading && !error && sortedUsers.length !== 0 && (
            <>
              <TablePeoples peoples={sortedUsers} />

              {isLoading && (
                <div className="loading dark:bg-gray-800 opacity-50">
                  <div
                    role="status"
                    className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Outlet />
    </section>
  );
};
