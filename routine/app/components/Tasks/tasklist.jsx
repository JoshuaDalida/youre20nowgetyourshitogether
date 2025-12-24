export default function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.task_id}>
            <p>{task.task_name}</p>
        </li>
      ))}
    </ul>
  );
}
