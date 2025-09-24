import React from "react";
import cn from "classnames";
import { Statuses } from "../../../types/Statuses";
import { TaskStatuses } from "../../../types/TaskStatuses";

type Props = {
  filterBy: Statuses | TaskStatuses | null;
  sortBy: boolean;
  setFilterBy: (v: any | null) => void;
  setSortBy: React.Dispatch<React.SetStateAction<boolean>>;
  statuses: any[];
};

export const Filter: React.FC<Props> = ({
  filterBy,
  sortBy,
  setFilterBy,
  setSortBy,
  statuses,
}) => {
  return (
    <div className="flex flex-wrap gap-4 md:gap-8">
      <div className="">
        <div className="flex flex-wrap">
          <button
            type="button"
            className={cn(
              "text-gray-900 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 h-8",
              {
                "bg-white dark:bg-gray-800": filterBy !== null,
                "bg-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100":
                  filterBy === null,
              }
            )}
            onClick={() => setFilterBy(null)}
          >
            All
          </button>

          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              className={cn(
                "text-gray-900 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 h-8",
                {
                  "bg-white dark:bg-gray-800": filterBy !== status,
                  "bg-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100":
                    filterBy === status,
                }
              )}
              onClick={() => setFilterBy(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="">
        <button
          type="button"
          className={cn(
            "text-gray-900 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:border-gray-700 dark:text-white me-2 mb-2 h-8",
            {
              "bg-white dark:bg-gray-800": !sortBy,
              "bg-gray-300 dark:bg-gray-600 dark:text-gray-100": sortBy,
            }
          )}
          onClick={() => setSortBy((prev) => !prev)}
        >
          Date
        </button>
      </div>
    </div>
  );
};
