"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("You must be signed in.");
  }

  return session.user;
}

export async function getTasks() {
  const user = await getCurrentUser();

  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return tasks;
}

export async function createTask(title: string) {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    throw new Error("Task title is required.");
  }

  if (trimmedTitle.length > 200) {
    throw new Error(
      "Task title must be 200 characters or less."
    );
  }

  const user = await getCurrentUser();

  const task = await prisma.task.create({
    data: {
      title: trimmedTitle,
      status: "later",
      userId: user.id,
    },
  });

  return task;
}

export async function deleteTask(id: number) {
  const user = await getCurrentUser();

  await prisma.task.deleteMany({
    where: {
      id,
      userId: user.id,
    },
  });
}

export async function updateTaskStatus(
  id: number,
  status: string
) {
  if (!["today", "later", "completed"].includes(status)) {
    throw new Error("Invalid task status.");
  }

  const user = await getCurrentUser();

  if (status === "today") {
    const todayCount = await prisma.task.count({
      where: {
        userId: user.id,
        status: "today",
      },
    });

    if (todayCount >= 3) {
      throw new Error(
        "Today already has 3 unfinished tasks."
      );
    }
  }

  const existingTask = await prisma.task.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!existingTask) {
    throw new Error("Task not found.");
  }

  const updatedTask = await prisma.task.update({
    where: {
      id: existingTask.id,
    },
    data: {
      status,
    },
  });

  return updatedTask;
}