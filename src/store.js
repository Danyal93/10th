import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./redux/projectSlice";

const store = configureStore({
	reducer: {
		project: projectSlice,
	},
});
export default store;
