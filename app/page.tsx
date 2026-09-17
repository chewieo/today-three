"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTaskStatus,
} from "./actions";
import { authClient } from "@/lib/auth-client";

type Task = {
  id: number;
  title: string;
  status: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function Home() {
  const router = useRouter();

  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();

      setTasks(data);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not load tasks."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (sessionLoading) {
      return;
    }

    if (!session) {
      router.replace("/login");
      return;
    }

    loadTasks();
  }, [session, sessionLoading, router]);

  async function addTask() {
    if (!taskText.trim()) return;

    try {
      setError("");

      const newTask = await createTask(taskText);

      setTasks((current) => [...current, newTask]);

      setTaskText("");
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not add task."
      );
    }
  }

  async function changeStatus(id: number, status: string) {
    try {
      setError("");

      const updatedTask = await updateTaskStatus(
        id,
        status
      );

      setTasks((current) =>
        current.map((task) =>
          task.id === id ? updatedTask : task
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not update task."
      );
    }
  }

  async function removeTask(id: number) {
    try {
      setError("");

      await deleteTask(id);

      setTasks((current) =>
        current.filter((task) => task.id !== id)
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Could not delete task."
      );
    }
  }

  async function signOut() {
    try {
      setError("");

      await authClient.signOut();

      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error(err);

      setError("Could not sign out.");
    }
  }

  if (sessionLoading || !session) {
    return (
      <main className="min-h-screen bg-slate-100 p-8 text-black">
        <div className="mx-auto max-w-3xl">
          <p className="text-gray-600">
            Loading...
          </p>
        </div>
      </main>
    );
  }

  const todayTasks = tasks.filter(
    (task) => task.status === "today"
  );

  const laterTasks = tasks.filter(
    (task) => task.status === "later"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  );

  return (
    <main className="min-h-screen bg-slate-100 p-8 text-black">
      <div className="mx-auto max-w-3xl">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">
              Today Three
            </h1>

            <p className="mt-2 text-gray-700">
              Focus on the three most important tasks today.
            </p>
          </div>

          <button
            onClick={signOut}
            className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
          >
            Sign Out
          </button>
        </header>

        {error && (
          <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <section className="mt-8 rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">
            Add New Task
          </h2>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Enter a task..."
              value={taskText}
              onChange={(e) =>
                setTaskText(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
              className="flex-1 rounded-lg border border-gray-300 p-3 text-black outline-none focus:border-blue-500"
            />

            <button
              onClick={addTask}
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </section>

        {loading ? (
          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <p className="text-gray-600">
              Loading tasks...
            </p>
          </div>
        ) : (
          <>
            <section className="mt-8 rounded-xl bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    Today
                  </h2>

                  <p className="mt-1 text-sm text-gray-600">
                    {todayTasks.length}/3 tasks
                  </p>
                </div>
              </div>

              {todayTasks.length === 0 ? (
                <p className="mt-4 text-gray-500">
                  No tasks yet.
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {todayTasks.map((task) => (
                    <li
                      key={task.id}
                      className="rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-medium">
                          {task.title}
                        </span>

                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              changeStatus(
                                task.id,
                                "completed"
                              )
                            }
                            className="rounded-md bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
                          >
                            Complete
                          </button>

                          <button
                            onClick={() =>
                              changeStatus(
                                task.id,
                                "later"
                              )
                            }
                            className="rounded-md bg-gray-600 px-3 py-2 text-sm text-white hover:bg-gray-700"
                          >
                            Later
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="mt-8 rounded-xl bg-white p-6 shadow">
              <h2 className="text-2xl font-bold">
                Later
              </h2>

              {laterTasks.length === 0 ? (
                <p className="mt-4 text-gray-500">
                  No tasks yet.
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {laterTasks.map((task) => (
                    <li
                      key={task.id}
                      className="rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-medium">
                          {task.title}
                        </span>

                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              changeStatus(
                                task.id,
                                "today"
                              )
                            }
                            disabled={
                              todayTasks.length >= 3
                            }
                            className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                          >
                            {todayTasks.length >= 3
                              ? "Today Full"
                              : "Today"}
                          </button>

                          <button
                            onClick={() =>
                              removeTask(task.id)
                            }
                            className="rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="mt-8 rounded-xl bg-white p-6 shadow">
              <h2 className="text-2xl font-bold">
                Completed
              </h2>

              {completedTasks.length === 0 ? (
                <p className="mt-4 text-gray-500">
                  No completed tasks.
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {completedTasks.map((task) => (
                    <li
                      key={task.id}
                      className="rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-medium text-gray-500 line-through">
                          {task.title}
                        </span>

                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              changeStatus(
                                task.id,
                                "later"
                              )
                            }
                            className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                          >
                            Restore
                          </button>

                          <button
                            onClick={() =>
                              removeTask(task.id)
                            }
                            className="rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}