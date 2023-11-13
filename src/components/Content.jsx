import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllProjectData } from "../redux/projectSlice";
import StatusBlock from "./StatusBlock";
import StatusInputForm from "./StatusInputForm";

function Content() {
	const { projectId } = useParams();
	console.log(projectId);
	const allProjectsData = useSelector(getAllProjectData);

	const projectData = allProjectsData.find((d) => d.projectId === Number(projectId));
	const allStatusData = projectData?.statusData ?? [];

	return (
		<>
			<div className="content  bg-gray-50 flex flex-1 overflow-x-scroll ">
				<div className="statusContainer flex flex-1 flex-col gap-10 bg-gray-50 p-6 ">
					<h3 className=""> Project {projectId}</h3>
					<div className="flex gap-10">
						{allStatusData?.map((statusData, index) => {
							return <StatusBlock key={index} {...{ projectId, allStatusData, statusData, index }} />;
						})}

						{/* Add Status */}

						<StatusInputForm {...{ allStatusData, projectId }} />
					</div>
				</div>
			</div>
		</>
	);
}

export default Content;
