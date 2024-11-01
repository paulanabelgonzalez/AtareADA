import { createContext, useEffect, useState } from "react";

import { getAddedTasks, setTasksLS } from "../LocalStorage";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
	const [tasks, setTasks] = useState(getAddedTasks());

	const [completedTasks, setCompletedTasks] = useState([]);

	useEffect(() => {
		setTasksLS(tasks);
	}, [tasks]);

	const addTask = (newTask) => {
		setTasks((tasks) => [...tasks, newTask]);
	};

	const findByTaskId = (taskId) => tasks.find((task) => task.id === taskId);

	const updateTaskAttribute = (taskId, attribute, value) => {
		const taskToUpdate = findByTaskId(taskId);
		if (taskToUpdate) {
			const updatedTask = {
				...taskToUpdate,
				[attribute]: value,
			};
			replaceTask(updatedTask);
			console.log(updatedTask);
		}
	};

	const replaceTask = (updatedTask) => {
		const updatedTasks = tasks.map((task) =>
			task.id === updatedTask.id ? updatedTask : task
		);
		setTasks(updatedTasks);
	};

	const handleTaskCompleted = (selectedTaskId) => {
		const taskToComplete = findByTaskId(selectedTaskId);
		if (taskToComplete) {
			const updatedTask = { ...taskToComplete, completed: true };
			setTasks((prevTasks) =>
				prevTasks.filter((task) => task.id !== selectedTaskId)
			);
			setCompletedTasks((prevCompleted) => [...prevCompleted, updatedTask]);
		}
	};
	console.log(completedTasks);

	const handleDeleteTask = (taskId) => {
		const updatedTasks = tasks.filter((task) => task.id !== taskId);
		setTasks(updatedTasks);
	};

	const handleDeleteAll = () => {
		setTasks([]);
	};

	return (
		<TaskContext.Provider
			value={{
				addTask,
				findByTaskId,
				handleDeleteAll,
				handleDeleteTask,
				handleTaskCompleted,
				tasks,
				updateTaskAttribute,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};
