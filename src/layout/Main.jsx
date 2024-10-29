import { useState } from "react";

import { Box } from "@mui/material";

import { getAddedTasks, setTasksLS } from "../LocalStorage";

import { Form } from "../components/Form";
import { List } from "../components/List";

export const Main = () => {
	const [tasks, setTasks] = useState(getAddedTasks());

	const addTask = (newTask) => {
		const updatedTasks = [...tasks, newTask];
		setTasks(updatedTasks);
		setTasksLS(updatedTasks);
	};
	return (
		<Box
			as="main"
			sx={{ background: "linear-gradient(to bottom, #ffceca , white)" }}
		>
			<Form addTask={addTask} />
			<List tasks={tasks} />
		</Box>
	);
};
//#ffe0dd
