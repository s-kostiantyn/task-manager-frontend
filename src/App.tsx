import React, { useEffect } from "react";
import cn from "classnames";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { Nav } from "./modules/shared/Nav";
import { Aside } from "./modules/shared/Aside";
import "flowbite";
import { initFlowbite } from "flowbite";
import { useAuthStore } from "./stores/authStore";

export const App: React.FC = () => {
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      initFlowbite();
    }
  }, [user]);

  return (
    <div className="antialiased">
      {user && <Nav />}
      {user && <Aside />}

      <main className={cn({ "p-4 md:ml-64 h-auto pt-20": user })}>
        <Outlet />
      </main>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
