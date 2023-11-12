function Navbar() {
	return (
		<>
			<div className="header bg-red-400 p-3 text-3xl flex justify-between items-center text-gray-100">
				<div className="left">
					<span>Todoist</span>
				</div>
				<div className="middle">
					<input className="p-2 rounded focus:outline-none font-light text-slate-900" id="myInput" type="text" placeholder="Search..." />
				</div>
				<div className="right pr-1">
					<button className="text-5xl font-light">+</button>
				</div>
			</div>
		</>
	);
}

export default Navbar;
