import { ID } from "./ID";
import { Project } from "./Project";
import { Roles } from "./Roles";
import { Task } from "./Task";

export interface People {
  id: ID;
  firstName: string;
  lastName: string;
  role: Roles;
  login: string;
  password: string;
  projects: Project[];
  task?: Task[];
}
