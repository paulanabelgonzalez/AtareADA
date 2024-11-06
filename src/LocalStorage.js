export const getAddedTasks = () => {
	return JSON.parse(localStorage.getItem("tasks")) || [];
};

export const setTasksLS = (tasks) => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const getAllTasks = () =>
	JSON.parse(localStorage.getItem("allTasks")) || [];

export const setAllTasksLS = (allTasks) =>
	localStorage.setItem("allTasks", JSON.stringify(allTasks));
