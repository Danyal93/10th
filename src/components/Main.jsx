import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Main() {
	return (
		<>
			<div className="content flex-grow flex overflow-hidden">
				<Sidebar />
				<Outlet/>
				{/* <Content /> */}
			</div>
		</>
	);
}
export default Main;
