import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { People } from "../../../../types/People";
import { Roles } from "../../../../types/Roles";
import { usePeopleStore } from "../../../../stores/peoplesStore";

export const PeopleForm: React.FC = () => {
  const { peopleId } = useParams();
  const { state } = useLocation();
  const { updateUser, addUser, loading } = usePeopleStore();
  const navigate = useNavigate();
  const titleRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isCreate = peopleId === "create";
  const selectedPeople =
    !isCreate && state?.people ? (state.people as People) : null;

  const getInitialData = () => ({
    firstName: selectedPeople?.firstName || "",
    lastName: selectedPeople?.lastName || "",
    login: selectedPeople?.login || "",
    password: selectedPeople?.password || "",
    role: selectedPeople?.role || Roles.TeamMember,
  });

  const [peopleInfo, setPeopleInfo] = useState(getInitialData);

  useEffect(() => {
    setPeopleInfo(getInitialData());
    titleRef.current?.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, [peopleId]);

  const reset = () => {
    setPeopleInfo({
      firstName: "",
      lastName: "",
      login: "",
      password: "",
      role: Roles.TeamMember,
    });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isCreate && selectedPeople) {
      updateUser(selectedPeople.id, peopleInfo)
        .then(() => {
          reset();
          navigate("/peoples");
          toast.success("User updated successfully");
        })
        .catch(() => {
          toast.error("Failed to update the user");
        });
    } else {
      addUser({ ...peopleInfo, projects: [], task: [] })
        .then(() => {
          reset();
          navigate("/peoples");
        })
        .catch(() => {
          toast.error("Failed to add the user");
        });
    }
  };

  return (
    <section className="flex bg-white mt-5 dark:bg-gray-800" ref={titleRef}>
      <div className="bg-white w-full md:w-1/2 p-4 dark:bg-gray-800 relative shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {isCreate ? "Create user" : `Edit user: ${selectedPeople?.id}`}
        </h2>
        <form onSubmit={submit} onReset={reset}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="sm:col-span-2">
              <label
                htmlFor="firstname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                ref={inputRef}
                type="text"
                name="firstname"
                id="firstname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={peopleInfo.firstName}
                onChange={(e) =>
                  setPeopleInfo((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                placeholder="Name"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={peopleInfo.lastName}
                onChange={(e) =>
                  setPeopleInfo((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                placeholder="Surname"
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="login"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Login
              </label>
              <input
                type="text"
                name="login"
                id="login"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={peopleInfo.login}
                onChange={(e) =>
                  setPeopleInfo((prev) => ({
                    ...prev,
                    login: e.target.value,
                  }))
                }
                placeholder="Login"
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={peopleInfo.password}
                onChange={(e) =>
                  setPeopleInfo((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="Password"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Role
              </p>

              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {Object.values(Roles).map((role) => (
                  <li
                    key={role}
                    className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                  >
                    <div className="flex items-center ps-3">
                      <input
                        id={role}
                        type="radio"
                        checked={role === peopleInfo.role}
                        onChange={() =>
                          setPeopleInfo((prev) => ({ ...prev, role }))
                        }
                        value={peopleInfo.password}
                        name="user-role"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor={role}
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {role}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              disabled={loading}
              type="submit"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {loading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}

              {loading ? "Loading..." : "Send"}
            </button>

            {isCreate && (
              <Link
                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                to="/peoples"
              >
                Close
              </Link>
            )}
            {!isCreate && (
              <button
                type="reset"
                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
