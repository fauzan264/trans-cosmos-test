"use client";
import TaskListTable from "@/features/task/components/TaskListTable";
import AuthGuard from "@/hoc/AuthGuard";
import Link from "next/link";

function TaskPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Task Management
            </h1>
          </div>
          <Link
            href={`/admin/tasks/create`}
            className="btn btn-sm bg-blue-700 text-white hover:shadow-md m-1 px-3 py-1 text-sm rounded-md"
          >
            Create Task
          </Link>
        </header>
        {/* Main Content */}
        <section>
          <TaskListTable />
        </section>
      </div>
    </div>
  );
}

export default AuthGuard(TaskPage, ["admin", "user"]);
