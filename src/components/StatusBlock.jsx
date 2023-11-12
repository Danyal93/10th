import { useState } from "react";
import TaskCard from "./TaskCard";

function StatusBlock({ allStatusData, statusData, index, setAllStatusData }) {
	const [taskFormOpened, setTaskFormOpened] = useState(false);
	const [inputData, setInputData] = useState({
		taskHeading: "",
		assignedTo: "",
		tags: ["bugs", "DIY"],
		priority: "",
		dueDate: "",
	});
	const handleInputChange = (e) => {
		setInputData((prev) => {
			return { ...prev, [e.target.id]: e.target.value };
		});
	};
	const handleAddTask = (e) => {
		setTaskFormOpened(false);
		const newAllStatusData = allStatusData.map((d) => {
			if (d.id !== statusData.id) return d;
			else return { ...d, tasks: [...d.tasks, { ...inputData, id: d.tasks.length }] };
		});
		setAllStatusData(newAllStatusData);
	};
	return (
		<div key={index} className="statusBlock flex flex-col gap-3  w-56">
			<div className="statusHeading flex items-center justify-between p-3 py-6 text-2xl bg-gray-200 shadow">
				<h1 className="">{statusData.name}</h1>
				<h3 className="">{statusData.tasks.length}</h3>
			</div>
			{statusData.tasks.map((task, ind) => (
				<TaskCard key={ind} index={index} task={task} />
			))}
			{taskFormOpened ? (
				<div className="taskInput p-3 flex flex-col gap-4 bg-gray-100 shadow-md">
					<div className="inputGroup flex justify-between items-center w-full">
						<label className=" block" htmlFor="taskHeading">
							Heading
						</label>
						<input onChange={handleInputChange} className=" block w-2/3" id="taskHeading" type="text" />
					</div>
					<div className="inputGroup flex justify-between items-center w-full">
						<label className=" block" htmlFor="assignedTo">
							assignedTo
						</label>
						<input onChange={handleInputChange} className=" block w-2/3" id="assignedTo" type="text" />
					</div>
					<div className="inputGroup flex justify-between items-center w-full">
						<label className=" block" htmlFor="priority">
							priority
						</label>
						<input onChange={handleInputChange} className=" block w-2/3" id="priority" type="text" />
					</div>
					<div className="btnGroup flex items-center justify-between">
						<button className="text-center w-full" onClick={() => handleAddTask()}>
							submit
						</button>
						<button className="text-center w-full text-red-400" onClick={() => setTaskFormOpened(false)}>
							cancel
						</button>
					</div>
				</div>
			) : (
				<div onClick={() => setTaskFormOpened(true)} className="addTask p-1 bg-gray-200 text-center  hover:bg-gray-300 rounded shadow ">
					<button>Add Task</button>
				</div>
			)}
		</div>
	);
}

export default StatusBlock;
