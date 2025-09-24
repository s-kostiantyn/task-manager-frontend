import { create } from "zustand";
import { persist } from "zustand/middleware";
import { usePeopleStore } from "./peoplesStore";
import { AuthState } from "../types/storeTypes/AuthState";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (login, password) => {
        set({ loading: true, error: null });

        const {
          users,
          fetchUsers,
          loading: usersLoading,
        } = usePeopleStore.getState();

        if (users.length === 0 && !usersLoading) {
          await fetchUsers();
        }

        const updatedUsers = usePeopleStore.getState().users;
        const user = updatedUsers.find(
          (user) => user.login === login && user.password === password
        );

        if (user) {
          const token = "some-generated-token";
          set({
            user,
            token,
            loading: false,
          });

          localStorage.setItem("token", token);
          return Promise.resolve();
        } else {
          set({ error: "Invalid credentials", loading: false });
          return Promise.reject("Invalid credentials");
        }
      },

      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem("token");
      },
    }),
    { name: "auth-storage" }
  )
);
