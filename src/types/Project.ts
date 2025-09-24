import { ID } from "./ID";
import { People } from "./People";
import { Statuses } from "./Statuses";
import { Task } from "./Task";

export interface Project {
  id: ID;
  title: string;
  description: string;
  peoples: People[];
  tasks: Task[];
  date: string;
  dateEnd: string;
  status: Statuses;
}
