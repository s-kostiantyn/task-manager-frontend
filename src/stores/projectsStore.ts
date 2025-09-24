import { create } from "zustand";
import axios from "axios";
import { ProjectState } from "../types/storeTypes/ProjectState";
import { ID } from "../types/ID";
import { Task } from "../types/Task";
import { Project } from "../types/Project";

const API_URL =
  `${process.env.API_BACKEND}/peoples`;;

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ projects: [...response.data].reverse(), loading: false });
    } catch (error) {
      set({ error: "Failed to fetch projects", loading: false });
    }
  },

  addProject: async (newProject) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(API_URL, newProject);
      set((state) => ({
        projects: [...state.projects, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to add project", loading: false });
    }
  },

  updateProject: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      await axios.patch(`${API_URL}/${id}`, updatedData);
      set((state) => ({
        projects: state.projects.map((project) =>
          project.id === id ? { ...project, ...updatedData } : project
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to update project", loading: false });
    }
  },

  deleteProject: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        projects: state.projects.filter((project) => project.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete project", loading: false });
    }
  },

  deleteTaskFromProject: async (projectId: ID, taskId: ID) => {
    set({ loading: true, error: null });

    try {
      const project = get().projects.find((p) => p.id === projectId);
      if (!project) {
        throw new Error("Project not found");
      }

      const updatedTasks = project.tasks.filter((task) => task.id !== taskId);

      const updatedProject = { ...project, tasks: updatedTasks };

      await axios.patch(`${API_URL}/${projectId}`, { tasks: updatedTasks });

      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId ? updatedProject : p
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete task", loading: false });
    }
  },

  updateTaskInProject: async (
    project: Project,
    taskId: ID,
    updatedTaskData: Partial<Task>,
    withLoading = true
  ) => {
    if (withLoading) set({ loading: true, error: null });

    try {
      if (!project) throw new Error("Project not found");

      const updatedTasks = project.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTaskData } : task
      );

      await axios.patch(`${API_URL}/${project.id}`, { tasks: updatedTasks });

      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === project.id ? { ...p, tasks: updatedTasks } : p
        ),
        ...(withLoading ? { loading: false } : {}),
      }));
    } catch (error) {
      set({ error: "Failed to update task", loading: false });
    }
  },

  updateTaskOrderInProject: async (project: Project, updatedTasks: Task[]) => {
    try {
      await axios.patch(`${API_URL}/${project.id}`, { tasks: updatedTasks });
      useProjectStore.setState((state) => ({
        projects: state.projects.map((p) =>
          p.id === project.id ? { ...p, tasks: updatedTasks } : p
        ),
      }));
    } catch (error) {
      console.error("Failed to update task order:", error);
    }
  },

  addTaskToProject: async (projectId: ID, newTask: Task) => {
    set({ loading: true, error: null });

    try {
      const project = get().projects.find((p) => p.id === projectId);
      if (!project) throw new Error("Project not found");

      const taskWithId: Task = {
        ...newTask,
      };

      const updatedTasks = [...project.tasks, taskWithId];
      await axios.patch(`${API_URL}/${projectId}`, { tasks: updatedTasks });

      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId ? { ...p, tasks: updatedTasks } : p
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to add task", loading: false });
    }
  },
}));
