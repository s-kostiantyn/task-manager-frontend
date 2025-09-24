import React from "react";
import { Outlet } from "react-router-dom";

export const TaskPage: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
