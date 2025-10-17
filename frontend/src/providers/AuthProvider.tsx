"use client";

import { sessionLogin } from "@/service/auth";
import useAuthStore from "@/store/useAuthStore";
import React, { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, setAuth } = useAuthStore();

  const onAuthSessionLogin = async () => {
    try {
      const res = await sessionLogin({ token });

      setAuth({
        token,
        id: res?.data.data.id,
        name: res?.data.data.name,
        role: res?.data.data.role,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) onAuthSessionLogin();
  }, [token]);

  return <>{children}</>;
}
