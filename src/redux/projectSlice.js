import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const URL = "http://localhost:8080";
const PROJECT_ROUTE = URL + "/project";
const initialState = {
	selectedProject: {
		projectId: 1,
		name: "project 1",
		statusData: [
			{
				id: 1,
				name: "Todo",
				tasks: [
					{
						id: 1,
						taskHeading: "taskHeading 1",
						assignedTo: "D",
						tags: ["bugs", "DIY"],
						priority: "H",
						dueDate: "25 Aug",
					},
					{
						id: 2,
						taskHeading: "taskHeading 2",
						assignedTo: "M",
						tags: ["feature", "LCS"],
						priority: "L",
						dueDate: "28 Jan",
					},
				],
			},
			{
				id: 2,
				name: "Inprogress",
				tasks: [
					{
						id: 1,
						taskHeading: "taskHeading 3",
						assignedTo: "DM",
						tags: ["idea", "DIY"],
						priority: "H",
						dueDate: "25 Aug",
					},
				],
			},
		],
	},
	projectList: [
		{
			projectId: 1,
			name: "project 1",
		},
		{
			projectId: 2,
			name: "project 2",
		},
	],
	allProjectsData: [],
	// [
	// 	{
	// 		projectId: 1,
	// 		name: "project 1",
	// 		statusData: [
	// 			{
	// 				id: 1,
	// 				name: "Todo",
	// 				tasks: [
	// 					{
	// 						id: 1,
	// 						taskHeading: "taskHeading 1",
	// 						assignedTo: "D",
	// 						tags: ["bugs", "DIY"],
	// 						priority: "H",
	// 						dueDate: "25 Aug",
	// 					},
	// 					{
	// 						id: 2,
	// 						taskHeading: "taskHeading 2",
	// 						assignedTo: "M",
	// 						tags: ["feature", "LCS"],
	// 						priority: "L",
	// 						dueDate: "28 Jan",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: 2,
	// 				name: "Inprogress",
	// 				tasks: [
	// 					{
	// 						id: 1,
	// 						taskHeading: "taskHeading 3",
	// 						assignedTo: "DM",
	// 						tags: ["idea", "DIY"],
	// 						priority: "H",
	// 						dueDate: "25 Aug",
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
	// 	{
	// 		projectId: 2,
	// 		name: "project 2",
	// 		statusData: [
	// 			{
	// 				id: 1,
	// 				name: "Todo",
	// 				tasks: [
	// 					{
	// 						id: 1,
	// 						taskHeading: "taskHeading 1",
	// 						assignedTo: "D",
	// 						tags: ["bugs", "DIY"],
	// 						priority: "H",
	// 						dueDate: "25 Aug",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: 2,
	// 				name: "Inprogress",
	// 				tasks: [
	// 					{
	// 						id: 1,
	// 						taskHeading: "taskHeading 3",
	// 						assignedTo: "DM",
	// 						tags: ["idea", "DIY"],
	// 						priority: "H",
	// 						dueDate: "25 Aug",
	// 					},
	// 					{
	// 						id: 2,
	// 						taskHeading: "taskHeading 4",
	// 						assignedTo: "MD",
	// 						tags: ["epic", "LCS"],
	// 						priority: "L",
	// 						dueDate: "28 Jan",
	// 					},

	// 					{
	// 						id: 3,
	// 						taskHeading: "taskHeading 2",
	// 						assignedTo: "M",
	// 						tags: ["feature", "LCS"],
	// 						priority: "L",
	// 						dueDate: "28 Jan",
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
	// ],
};

export const getAllProjectAsync = createAsyncThunk("project/getAllProjectAsync", async (args, { rejectWithValue }) => {
	try {
		const response = await fetch(`${PROJECT_ROUTE}`);
		const result = await response.json();
		return result;
	} catch (err) {
		return rejectWithValue("Opps found an error", err.response.data);
	}
});

export const getSingleProjectAsync = createAsyncThunk("project/getSingleProjectAsync", async (id, { rejectWithValue }) => {
	const response = await fetch(`${PROJECT_ROUTE}/${id}`);
	try {
		const result = await response.json();
		return result;
	} catch (err) {
		return rejectWithValue(err.message);
	}
});

export const createProjectAsync = createAsyncThunk("project/createProjectAsync", async (data, { rejectWithValue }) => {
	const response = await fetch(`${PROJECT_ROUTE}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	const result = await response.json();
	return result;
});

export const deleteProjectAsync = createAsyncThunk("project/deleteProjectAsync", async (id, { rejectWithValue }) => {
	try {
		const response = await fetch(`${PROJECT_ROUTE}/${id}`, {
			method: "DELETE",
		});
		const result = await response.json();
		return result;
	} catch (err) {
		console.log(err);
		return rejectWithValue(err.response.data);
	}
});

export const updateProjectAsync = createAsyncThunk(
	"project/updateProjectAsync",
	async ({ id, name, email, age, gender }, { rejectWithValue }) => {
		try {
			const response = await fetch(`${PROJECT_ROUTE}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, age, gender }),
			});
			const result = await response.json();
			return result;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		updateSelectedProject: (state, action) => {
			state.selectedProject = action.payload;
		},
		addTask: (state, action) => {
			const index = state.allProjectsData.findIndex((d) => d.projectId === action.payload.projectId);
			state.allProjectsData[index].statusData = action.payload.data;
		},
		addStatus: (state, action) => {
			const index = state.allProjectsData.findIndex((d) => d.projectId === action.payload.projectId);
			state.allProjectsData[index].statusData = action.payload.data;
		},
		addProject: (state, action) => {
			const length = state.allProjectsData.length + 1;
			state.allProjectsData.push({ name: /* action.payload */ `project ${length}`, projectId: length, statusData: [] });
		},
		deleteProject: (state, action) => {
			state.projectList = state.projectList.filter((project) => project.id !== action.payload);
		},
	},
	// /////////////
	extraReducers: {
		[getAllProjectAsync.pending]: (state) => {
			state.loading = true;
		},
		[getAllProjectAsync.fulfilled]: (state, action) => {
			state.loading = false;
			state.projectList = action.payload;
		},
		[getAllProjectAsync.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		[getSingleProjectAsync.pending]: (state) => {
			state.loading = true;
		},
		[getSingleProjectAsync.fulfilled]: (state, action) => {
			state.loading = false;
		},
		[getSingleProjectAsync.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		},
		[createProjectAsync.fulfilled]: (state, action) => {
			state.loading = false;
			state.projectList.push(action.payload);
		},
		[deleteProjectAsync.pending]: (state) => {
			state.loading = true;
		},
		[deleteProjectAsync.fulfilled]: (state, action) => {
			state.loading = false;
			const { id } = action.payload;
			if (id) {
				state.projectList = state.projectList.filter((post) => post.id !== id);
			}
		},
		[deleteProjectAsync.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		},

		[updateProjectAsync.pending]: (state) => {
			state.loading = true;
		},
		[updateProjectAsync.fulfilled]: (state, action) => {
			console.log("updated projectList fulfilled", action.payload);
			state.loading = false;
			state.projectList = state.projectList.map((ele) => (ele.id === action.payload.id ? action.payload : ele));
		},
		[updateProjectAsync.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		},
	},

	////////////
});

export const { updateSelectedProject, addTask, addStatus, addProject } = projectSlice.actions;
export const getAllProject = (state) => {
	return state.project.allProjectsData.map((project) => {
		return {
			projectId: project.projectId,
			name: project.name,
		};
	});
};
export const getAllProjectData = (state) => {
	return state.project.allProjectsData;
};
export const getSelectedProject = (state) => {
	return state.project.selectedProject;
};
export default projectSlice.reducer;
