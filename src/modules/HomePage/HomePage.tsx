import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { UserInfo } from "./components/UserInfo";

export const HomePage: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="container mx-auto px-4">
      <div className="">
        <UserInfo />
      </div>
    </section>
  );
};
