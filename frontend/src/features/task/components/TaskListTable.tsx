"use client";
import useAuthStore from "@/store/useAuthStore";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getTasks } from "@/service/task";
import { ITask } from "../types";

export default function TaskListTable() {
  const auth = useAuthStore();
  const [tasks, setTasks] = useState<ITask[]>();
  const searchParams = useSearchParams();
  const provinceId = searchParams.get("province_id");
  console.log(provinceId);

  const debounceFetch = useMemo(
    () =>
      _.debounce(async (token) => {
        try {
          const response = await getTasks({
            token,
          });

          if (response.data.success) {
            setTasks(response.data.data);
          }
        } catch (error: unknown) {
          toast.error(String(error));
        }
      }, 100),
    []
  );

  useEffect(() => {
    if (auth.token) {
      debounceFetch(auth.token);

      return () => debounceFetch.cancel();
    }
  }, [debounceFetch, auth.token]);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Task</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Province</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task) => (
              <tr
                key={task.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{task.title}</td>
                <td className="px-4 py-3">{task.status}</td>
                <td className="px-4 py-3">{task.priority}</td>
                <td className="px-4 py-3 flex space-x-2 justify-center">
                  <Link
                    href={`/admin/tasks/detail/${task.id}`}
                    className="btn btn-sm bg-emerald-500 text-white hover:shadow-md m-1 px-3 py-1 text-sm rounded-md"
                  >
                    Detail
                  </Link>
                  <Link
                    href={`/admin/tasks/edit/${task.id}`}
                    className="btn btn-sm bg-amber-400 text-white hover:shadow-md m-1 px-3 py-1 text-sm rounded-md"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`#`}
                    className="btn btn-sm bg-red-500 text-white hover:shadow-md m-1 px-3 py-1 text-sm rounded-md"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
            {tasks?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center">
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
