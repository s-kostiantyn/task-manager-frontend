import { ID } from "../ID";
import { People } from "../People";

export interface PeopleState {
  users: People[];
  loading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
  addUser: (newUser: Omit<People, "id">) => Promise<void>;
  updateUser: (id: ID, updatedData: Partial<People>) => Promise<void>;
  deleteUser: (id: ID) => Promise<void>;
}
