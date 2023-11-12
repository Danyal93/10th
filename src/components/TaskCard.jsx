function TaskCard({ task }) {
	return (
		<div className="taskCard p-3 flex flex-col gap-4 bg-gray-100 shadow-md">
			<div className="top flex items-center justify-between">
				<h1 className="taskHeading">{task.taskHeading}</h1>
				<div className="assignedTo">
					<p>{task.assignedTo}</p>
				</div>
			</div>

			<div className="tagsContainer flex items-center gap-3">
				{task.tags.map((tag, ind) => {
					return (
						<div key={ind} className="tags bg-blue-100 px-3 rounded">
							<p>{tag}</p>
						</div>
					);
				})}
				<button>+</button>
			</div>
			<div className="icons flex items-center gap-7">
				<div className="priority">{task.priority}</div>
				<div className="date text-red-500">
					<p>{task.dueDate}</p>
				</div>
			</div>
		</div>
	);
}

export default TaskCard;
