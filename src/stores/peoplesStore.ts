import { create } from "zustand";
import { toast } from "react-toastify";
import 'dotenv/config';
import axios from "axios";
import { PeopleState } from "../types/storeTypes/PeopleState";

const API_URL =
  `${process.env.API_BACKEND}/peoples`;

export const usePeopleStore = create<PeopleState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(API_URL);
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch people", loading: false });
    }
  },

  addUser: async (newUser) => {
    set({ loading: true });

    const { login } = newUser;

    const { users } = usePeopleStore.getState();
    const loginTaken = users.some((user) => user.login === login);

    if (loginTaken) {
      toast.error("Login is busy. Think up new");
      set({ loading: false });
      return;
    }

    try {
      const response = await axios.post(API_URL, newUser);
      set((state) => ({
        users: [...state.users, response.data],
        loading: false,
      }));

      toast.success("User added successfully!");
    } catch (error) {
      set({ error: "Failed to add user", loading: false });
    }
  },

  updateUser: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      await axios.patch(`${API_URL}/${id}`, updatedData);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, ...updatedData } : user
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to update user", loading: false });
    }
  },

  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete user", loading: false });
    }
  },
}));
