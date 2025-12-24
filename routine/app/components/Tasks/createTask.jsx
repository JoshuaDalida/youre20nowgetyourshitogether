"use client";

import { useState } from "react";

export default function CreateTask({ clerkId, phone , onTaskCreated }) {
  const [taskName, setTaskName] = useState("");
  const [reminder, setReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!taskName.trim()) return;

    try {
        console.log(phone)
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:3001/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerk_id: clerkId,
          task_name: taskName,
          reminder,
          reminder_time: reminder ? reminderTime : null,
          phone: reminder? phone : null,
        }),
      });

      if (!res.ok) throw new Error("Failed to create task");

      const newTask = await res.json();

      setTaskName("");
      setReminder(false);
      setReminderTime("");

      if (onTaskCreated) onTaskCreated(newTask);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4 max-w-md">
      <input
        type="text"
        placeholder="Task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="p-2 border rounded-lg"
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={reminder}
          onChange={(e) => setReminder(e.target.checked)}
        />
        Set reminder
      </label>

      {reminder && (
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => {
            const value = e.target.value;
            setReminderTime(value ? `${value}:00` : "");
          }}
          className="p-2 border rounded-lg"
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded-lg bg-black text-white disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
