import { createContext, useEffect, useState } from "react";

import { getAddedTasks, setTasksLS } from "../LocalStorage";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
	const [completedTasks, setCompletedTasks] = useState([]);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
	const [showBubble, setShowBubble] = useState(false);
	const [selectedTaskId, setSelectedTaskId] = useState(null);
	const [tasks, setTasks] = useState(getAddedTasks());

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

	const handleBubbleShow = () => {
		setShowBubble(true);

		setTimeout(() => {
			setShowBubble(false);
		}, 2000);
	};

	const handleTaskCompleted = (selectedTaskId) => {
		const taskToComplete = findByTaskId(selectedTaskId);

		if (taskToComplete) {
			const updatedTasks = tasks.map((task) =>
				task.id === selectedTaskId ? { ...task, completed: true } : task
			);
			setTasks(updatedTasks);

			setTimeout(() => {
				const taskWithCompletion = { ...taskToComplete, completed: true };

				setCompletedTasks((prevCompleted) => [
					...prevCompleted,
					taskWithCompletion,
				]);

				setTasks((prevTasks) =>
					prevTasks.filter((task) => task.id !== selectedTaskId)
				);

				handleBubbleShow();
			}, 700);
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

	const toggleDrawer = (newOpen) => () => {
		setIsDrawerOpen(newOpen);
	};

	const handleEditClick = (taskId) => {
		setSelectedTaskId(taskId);
		setIsDrawerOpen(true);
	};

	const toggleRightDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setIsRightDrawerOpen(open);
	};

	return (
		<TaskContext.Provider
			value={{
				addTask,
				findByTaskId,
				handleDeleteAll,
				handleDeleteTask,
				handleEditClick,
				handleTaskCompleted,
				isRightDrawerOpen,
				isDrawerOpen,
				selectedTaskId,
				setIsDrawerOpen,
				setSelectedTaskId,
				showBubble,
				tasks,
				toggleDrawer,
				toggleRightDrawer,
				updateTaskAttribute,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};
