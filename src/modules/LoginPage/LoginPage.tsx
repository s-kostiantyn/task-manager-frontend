import React, { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { SinginForm } from "./components/SinginForm";
import { useAuthStore } from "../../stores/authStore";

export const LoginPage: React.FC = () => {
  const { user } = useAuthStore();
  const [visibleForm, setVisibleForm] = useState(true);
  const backdrop = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const overlay = document.querySelector(
      "[drawer-backdrop]"
    ) as HTMLElement | null;

    backdrop.current = overlay;

    if (backdrop.current) {
      backdrop.current.remove();
    }
  }, []);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {visibleForm ? (
        <LoginForm setVisibleForm={setVisibleForm} />
      ) : (
        <SinginForm setVisibleForm={setVisibleForm} />
      )}
    </>
  );
};
