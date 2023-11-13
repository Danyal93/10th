import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProject, getAllProject } from "../redux/projectSlice";

function Sidebar() {
	const projectsData = useSelector(getAllProject);
	console.log("setProjectsData");
	const dispatch = useDispatch();
	const handleAddProject = () => {
		dispatch(addProject());
	};
	return (
		<>
			<div className="sidebar bg-gray-100  w-2/12  overflow-y-scroll no-scrollbar">
				<div className="analyticsContainer">
					<div className="analytics p-2">
						<p className="text-2xl font-bold ">Weekly</p>
					</div>
				</div>
				<div className="list">
					<div className="heading p-1 px-3 mx-1 flex justify-between items-center rounded bg-blue-200 text-slate-900 shadow hover:bg-blue-300">
						<p className=" text-3xl font-bold ">Projects</p>
						<button onClick={handleAddProject} className="text-4xl">
							+
						</button>
					</div>
					<div className="listContainer p-3 pt-0">
						{projectsData?.map((project) => (
							<Link to={`/tasks/${project.projectId}`} key={project.projectId}>
								<div className=" my-2 bg-blue-100 rounded text-center shadow-md hover:bg-blue-200 cursor-pointer">
									<p className=" text-xl">{project.name}</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default Sidebar;
