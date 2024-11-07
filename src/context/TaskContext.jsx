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
	const [isFiltered, setIsFiltered] = useState(false);
	const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
	const [item, setItem] = useState("");
	const [showBubble, setShowBubble] = useState(false);
	const [selectedTasks, setSelectedTasks] = useState(getAllTasks());
	const [selectedTaskId, setSelectedTaskId] = useState(null);
	const [tasks, setTasks] = useState(getAddedTasks());

	useEffect(() => {
		setTasksLS(tasks);
	}, [tasks]);

	useEffect(() => {
		setAllTasksLS(allTasks);
	}, [allTasks]);

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
		}, 3000);
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

				if (isFiltered && item === "Tareas no realizadas") {
					setSelectedTasks((prevSelectedTasks) =>
						prevSelectedTasks.filter((task) => task.id !== selectedTaskId)
					);
				}

				handleBubbleShow();
			}, 700);
		}
	};

	const handleDeleteTask = (taskId) => {
		const updatedTasks = tasks.filter((task) => task.id !== taskId);
		setTasks(updatedTasks);

		setAllTasks((allTasks) => allTasks.filter((task) => task.id !== taskId));

		if (isFiltered) {
			setSelectedTasks((selectedTasks) =>
				selectedTasks.filter((task) => task.id !== taskId)
			);
		}
	};

	const handleDeleteAll = () => {
		const taskCompleted = (array, boolean) =>
			array.filter((task) => task.completed === boolean);

		if (!isFiltered) {
			setTasks([]);
			setAllTasks([]);
		} else {
			if (item === "Todas las tareas") {
				setSelectedTasks([]);
				setTasks([]);
				setAllTasks([]);
			} else if (item === "Tareas realizadas") {
				setSelectedTasks(taskCompleted(selectedTasks, false));
				setAllTasks(taskCompleted(allTasks, false));
			} else {
				setSelectedTasks(taskCompleted(selectedTasks, true));
				setAllTasks(taskCompleted(allTasks, true));
				setTasks([]);
			}
		}
	};

	// console.log(allTasks, selectedTasks);

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
				item,
				selectedTasks,
				selectedTaskId,
				setIsDrawerOpen,
				setIsFiltered,
				setItem,
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
