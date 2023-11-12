import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { allProjectsData as projectData } from "../utils/db";
import StatusBlock from "./StatusBlock";

function Content() {
	const { projectId } = useParams();
	console.log(projectId);
	const [allStatusData, setAllStatusData] = useState([]);
	const [statusFormOpened, setStatusFormOpened] = useState(false);
	const [statusInputData, setStatusInputData] = useState("");
	useEffect(() => {
		const _data = projectData.find((d) => d.projectId === Number(projectId));
		setAllStatusData(_data?.statusData);
	}, [projectId]);

	const handleInputChange = (e) => {
		setStatusInputData((prev) => {
			return e.target.value;
		});
	};
	const handleAddStatus = (e) => {
		setStatusFormOpened(false);
		const newAllStatusData = [...allStatusData, { id: allStatusData.length, name: statusInputData, tasks: [] }];
		setAllStatusData(newAllStatusData);
	};

	return (
		<>
			<div className="content  bg-gray-50 flex flex-1 overflow-x-scroll ">
				<div className="statusContainer flex flex-1 flex-col gap-10 bg-gray-50 p-6 ">
					<h3 className=""> Project {projectId}</h3>
					<div className="flex gap-10">
						{allStatusData?.map((statusData, index) => {
							return <StatusBlock key={index} {...{ allStatusData, statusData, index, setAllStatusData }} />;
						})}

						{/* Add Status */}
						{statusFormOpened ? (
							<div className="taskInput p-3 flex flex-col gap-4 h-fit bg-gray-100 shadow-md w-56">
								<div className="inputGroup flex justify-between items-center w-full">
									<label className=" block" htmlFor="statusHeading">
										Heading
									</label>
									<input onChange={handleInputChange} className=" block w-2/3" id="statusHeading" type="text" />
								</div>
								<div className="btnGroup flex items-center justify-between">
									<button className="text-center w-full" onClick={() => handleAddStatus()}>
										submit
									</button>
									<button className="text-center w-full text-red-400" onClick={() => setStatusFormOpened(false)}>
										cancel
									</button>
								</div>
							</div>
						) : (
							<div onClick={() => setStatusFormOpened(true)} className="statusBlock flex flex-col gap-3 w-56 cursor-pointer">
								<div className="statusHeading flex items-center justify-between p-3 py-6 text-2xl bg-gray-200 shadow">
									<div className="text-center">
										<button>Add Status</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default Content;
