import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStatus } from "../redux/projectSlice";

function StatusInputForm({ allStatusData, projectId }) {
	const dispatch = useDispatch();
	const [statusInputData, setStatusInputData] = useState("");
	const [statusFormOpened, setStatusFormOpened] = useState(false);

	const handleInputChange = (e) => {
		setStatusInputData(e.target.value);
	};
	const handleAddStatus = (e) => {
		setStatusFormOpened(false);
		//TODO: handle this in slice
		const newAllStatusData = [...allStatusData, { id: allStatusData.length, name: statusInputData, tasks: [] }];
		dispatch(addStatus({ data: newAllStatusData, projectId: Number(projectId) }));
	};
	const handleCancelButton = (e) => {
		setStatusInputData("");
		setStatusFormOpened(false);
	};

	return (
		<>
			{statusFormOpened ? (
				<div className="taskInput p-3 flex flex-col gap-4 h-fit bg-gray-100 shadow-md w-56">
					<div className="inputGroup flex justify-between items-center w-full">
						<label className=" block" htmlFor="statusHeading">
							Heading
						</label>
						<input onChange={handleInputChange} value={statusInputData} className=" block w-2/3" id="statusHeading" type="text" />
					</div>
					<div className="btnGroup flex items-center justify-between">
						<button className="text-center w-full" onClick={() => handleAddStatus()}>
							submit
						</button>
						<button className="text-center w-full text-red-400" onClick={() => handleCancelButton()}>
							cancel
						</button>
					</div>
				</div>
			) : (
				<div className="statusBlock flex flex-col gap-3 w-56">
					<div
						onClick={() => setStatusFormOpened(true)}
						className="statusHeading flex items-center justify-between p-3 py-5 text-2xl bg-gray-200 shadow cursor-pointer"
					>
						<div className="text-center">
							<button>Add Status</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default StatusInputForm;
