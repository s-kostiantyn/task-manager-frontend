import { ID } from "../ID";
import { Project } from "../Project";
import { Task } from "../Task";

export interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;

  fetchProjects: () => Promise<void>;
  addProject: (newProject: Omit<Project, "id">) => Promise<void>;
  updateProject: (id: ID, updatedData: Partial<Project>) => Promise<void>;
  deleteProject: (id: ID) => Promise<void>;
  deleteTaskFromProject: (projectId: ID, taskId: number) => Promise<void>;
  updateTaskInProject: (
    project: Project,
    taskId: ID,
    updatedTaskData: Partial<Task>,
    withLoading: boolean
  ) => Promise<void>;
  updateTaskOrderInProject: (
    project: Project,
    updatedTasks: Task[]
  ) => Promise<void>;
  addTaskToProject: (projectId: ID, newTask: Task) => Promise<void>;
}
