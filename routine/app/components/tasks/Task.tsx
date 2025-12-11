
export default function Tasks(props){

    async function deleteTask() {
    const res = await fetch("/api/tasks/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        body: {
            clerk_id: user.id,
            task_name: props.task_name,
        },
        }),
    });}

    return (
        <div>
            <input type="checkbox" defaultChecked={props.completed} />
            <span>{props.task_name}</span>

            <button onClick={() => deleteTask(props.task_name)}>
                delete
            </button>
        </div>
    )
}