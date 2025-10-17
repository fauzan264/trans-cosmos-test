import { ITask } from "@/features/task/types";
import { axiosInstance } from "@/lib/axiosInstances";
import snakecaseKeys from "snakecase-keys";

const TASK_URL = "/tasks";

export const getTasks = ({ token }: { token: string }) => {
  return axiosInstance.get(`${TASK_URL}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTask = ({
  title,
  description,
  status,
  priority,
  assigned_user_id,
  due_date,
  token,
}: ITask & { token: string }) => {
  return axiosInstance.post(
    `${TASK_URL}`,
    snakecaseKeys({
      title,
      description,
      status,
      priority,
      assigned_user_id,
      due_date,
    }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateTask = ({
  id,
  title,
  description,
  status,
  priority,
  assigned_user_id,
  due_date,
  token,
}: ITask & { token: string }) => {
  return axiosInstance.put(
    `${TASK_URL}/${id}`,
    snakecaseKeys({
      title,
      description,
      status,
      priority,
      assigned_user_id,
      due_date,
    }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteTask = ({ id, token }: ITask & { token: string }) => {
  return axiosInstance.delete(`${TASK_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
