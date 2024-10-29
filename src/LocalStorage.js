export const getAddedTasks = () => {
	return JSON.parse(localStorage.getItem("tasks")) || [];
};

export const setTasksLS = (tasks) => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
};
