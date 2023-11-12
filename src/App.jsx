
import { Routes, Route} from "react-router-dom";
import "./App.css";
import Content from "./components/Content";
import Main from "./components/Main";
import Navbar from "./components/Navbar";








function App() {
	return (
		<>
			<div className=" h-screen flex flex-col">
				<Navbar />
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/" element={<Main />}>
						<Route path="/tasks/:projectId" element={<Content />} />
					</Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
