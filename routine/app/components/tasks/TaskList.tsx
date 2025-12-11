import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Task from './Task'

export default function TaskList() {
  const { isSignedIn, user } = useUser();

  const [taskList, setTaskList] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [message, setMessage] = useState("");

  async function createTask(e) {
    e.preventDefault();
    if (!taskName.trim()) return setMessage("Task name cannot be empty");

    try {
      const res = await fetch("/api/tasks/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body:{clerk_id: user.id,
          name: taskName,}
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Task created!");
        setTaskName("");

        // update the list without reloading
        setTaskList((prev) => [...prev, data]);
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      setMessage("Server error");
      console.log(err);
    }
  }

  useEffect(() => {
    if (!isSignedIn || !user) return;

    async function getTasks() {
      try {
        const res = await fetch("/api/tasks/select", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body: { clerk_id: user.id } }),
        });

        const data = await res.json();
        setTaskList(data);
      } catch (e) {
        console.log("Fetch error:", e);
      }
    }

    getTasks();
  }, [isSignedIn, user]);

  if (!isSignedIn) {
    return <p>Log in to view and create tasks</p>;
  }

  return (
    <div className="tasks-container">
      <h3>Task List</h3>

      <ul className="tasks-list">
        {taskList.map((task) => (
          <li key={task.task_id} className={`task-item`}>
            <Task clerk_id = {user.id} task_id = {task_name} />
          </li>
        ))}
      </ul>


      <h1>Create a New Task</h1>

      <form className="task-form" onSubmit={createTask}>
        <input
          type="text"
          className="task-input"
          placeholder="Enter task name..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <button className="task-btn" type="submit">
          Add Task
        </button>
      </form>

      {message && <p className="task-message">{message}</p>}
    </div>
  );
}
