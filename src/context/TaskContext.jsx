import { createContext, useEffect, useState } from "react";

import {
	getAllTasks,
	getAddedTasks,
	setAllTasksLS,
	setTasksLS,
} from "../LocalStorage";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
	const [allTasks, setAllTasks] = useState(getAllTasks());
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	//2
	const [isFiltered, setIsFiltered] = useState(false);
	const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
	const [showBubble, setShowBubble] = useState(false);
	//1
	const [selectedTasks, setSelectedTasks] = useState(getAllTasks());
	const [selectedTaskId, setSelectedTaskId] = useState(null);
	const [tasks, setTasks] = useState(getAddedTasks());

	useEffect(() => {
		setTasksLS(tasks);
	}, [tasks]);

	useEffect(() => {
		setAllTasksLS(allTasks);
	}, [allTasks]);

	// console.log(allTasks);

	const addTask = (newTask) => {
		setTasks((tasks) => [...tasks, newTask]);
		setAllTasks((allTasks) => [...allTasks, newTask]);
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

		setAllTasks((allTasks) =>
			allTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
		);
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

			setAllTasks((prevAllTasks) =>
				prevAllTasks.map((task) =>
					task.id === selectedTaskId ? { ...task, completed: true } : task
				)
			);

			setTimeout(() => {
				setTasks((prevTasks) =>
					prevTasks.filter((task) => task.id !== selectedTaskId)
				);

				handleBubbleShow();
			}, 700);
		}
	};

	const handleDeleteTask = (taskId) => {
		const updatedTasks = tasks.filter((task) => task.id !== taskId);
		setTasks(updatedTasks);

		setAllTasks((allTasks) => allTasks.filter((task) => task.id !== taskId));
	};

	const handleDeleteAll = () => {
		setTasks([]);
		setAllTasks([]);
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
				allTasks,
				findByTaskId,
				handleDeleteAll,
				handleDeleteTask,
				handleEditClick,
				handleTaskCompleted,
				isDrawerOpen,
				isFiltered,
				isRightDrawerOpen,
				selectedTasks,
				selectedTaskId,
				setIsDrawerOpen,
				setIsFiltered,
				setSelectedTasks,
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
