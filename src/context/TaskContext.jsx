import { createContext, useEffect, useState } from "react";

import { getAddedTasks, setTasksLS } from "../LocalStorage";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
	const [tasks, setTasks] = useState(getAddedTasks());

	useEffect(() => {
		setTasksLS(tasks);
	}, [tasks]);

	const addTask = (newTask) => {
		setTasks((tasks) => [...tasks, newTask]);
	};

	const replaceTask = (updatedTask) => {
		const updatedTasks = tasks.map((task) =>
			task.id === updatedTask.id ? updatedTask : task
		);
		setTasks(updatedTasks);
	};

	const handleDeleteTask = (taskId) => {
		const updatedTasks = tasks.filter((task) => task.id !== taskId);
		setTasks(updatedTasks);
	};

	const handleDeleteAll = () => {
		setTasks([]);
	};

	return (
		<TaskContext.Provider
			value={{ addTask, handleDeleteAll, handleDeleteTask, replaceTask, tasks }}
		>
			{children}
		</TaskContext.Provider>
	);
};
