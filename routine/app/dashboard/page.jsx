"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import TaskList from "../components/tasks/tasklist";
import CreateTask from "../components/Tasks/createTask"

export default function Dashboard() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [tasks, setTasks] = useState([]);
  const [phone, setPhone] = useState("")

  useEffect(() => {
  if (!isLoaded || !isSignedIn || !user) return;

  async function loginOrCreateUser() {
    const res = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clerk_id: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName,
      }),
    });

    return res.json();
  }

  async function getData() {
    const userRes = await fetch("http://localhost:3001/users/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clerk_id: user.id }),
    });

    const userData = await userRes.json();
    console.log("Fetched user:", userData[0].phone);
    setPhone(userData[0].phone);

    const tasksRes = await fetch("http://localhost:3001/tasks/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clerk_id: user.id }),
    });

    setTasks(await tasksRes.json());
  }

  async function init() {
    await loginOrCreateUser();
    await getData();
  }

  init();
}, [isLoaded, isSignedIn, user]);


  if (!isLoaded) return <p>Loading...</p>;
  if (!isSignedIn) return <p>Please sign in</p>;

  return (
    <div style={styles.container}>
      <h1>Welcome, {user.firstName}</h1>
      <p>{phone}</p>

      <CreateTask
        clerkId={user.id}
        phone={phone}
        onTaskCreated={(newTask) =>
          setTasks((prev) => [...prev, newTask])
        }
      />

      <TaskList tasks={tasks} />
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "system-ui",
  },
};
