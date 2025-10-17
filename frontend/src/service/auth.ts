import { IAuth } from "@/features/auth/types";
import { axiosInstance } from "@/lib/axiosInstances";
import snakecaseKeys from "snakecase-keys";

const AUTH_URL = "/auth";

export const register = ({ name, email, password, role }: IAuth) => {
  return axiosInstance.post(
    `${AUTH_URL}/register`,
    snakecaseKeys({
      name,
      email,
      password,
      role,
    })
  );
};

export const login = ({ email, password }: IAuth) => {
  return axiosInstance.post(`${AUTH_URL}/login`, {
    email,
    password,
  });
};

export const logout = ({ token }: { token: string }) => {
  return axiosInstance.post(
    `${AUTH_URL}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const sessionLogin = ({ token }: { token: string }) => {
  return axiosInstance.get(`${AUTH_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
