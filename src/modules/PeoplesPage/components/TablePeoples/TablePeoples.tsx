import React from "react";
import { PeopleItem } from "../PeopleItem";
import { People } from "../../../../types/People";

type Props = {
  peoples: People[];
};

export const TablePeoples: React.FC<Props> = ({ peoples }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-4 py-3">
            ID
          </th>
          <th scope="col" className="px-4 py-3">
            First Name
          </th>
          <th scope="col" className="px-4 py-3">
            Last Name
          </th>
          <th scope="col" className="px-4 py-3">
            Role
          </th>
          <th scope="col" className="px-4 py-3">
            Login
          </th>
          <th scope="col" className="px-4 py-3">
            Password
          </th>
          <th scope="col" className="px-4 py-3">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>

      <tbody>
        {peoples.map((people) => (
          <PeopleItem key={people.id} people={people} />
        ))}
      </tbody>
    </table>
  );
};
