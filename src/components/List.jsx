import { useContext } from "react";

import { Box, Button } from "@mui/material";

import { DrawerBottom } from "./DrawerBottom";
import { Item } from "./Item";
import { TaskContext } from "../context/TaskContext";

export const List = () => {
	const { handleDeleteAll, isFiltered, selectedTasks, showBubble, tasks } =
		useContext(TaskContext);

	const displayedTasks = isFiltered ? selectedTasks : tasks;
	const hasTask = displayedTasks?.length === 0;

	return (
		<Box sx={{ width: "95%", maxWidth: "1200px", m: "auto" }}>
			<Box sx={{ textAlign: "end", padding: 1 }}>
				<Button
					onClick={handleDeleteAll}
					sx={{
						padding: 1,
						fontSize: ".6rem",
						color: "#9B3522",
						transition: "0.5s ease",
						"&:hover": { backgroundColor: "#e79ea2", color: "#ffe0dd" },
					}}
				>
					Borrar Lista
				</Button>
			</Box>
			<Box
				sx={{
					position: "sticky",
					minWidth: { xs: "96%" },
					width: { lg: "1200px" },
					maxWidth: "1200px",
					m: "auto",
					p: "0px 10px",
					boxShadow:
						"0 10px 20px rgba(0, 0, 0, 0.4), 0 14px 40px rgba(0, 0, 0, 0.4)",
					borderRadius: "15px",
				}}
			>
				{hasTask ? (
					<Item key="example-task" task={{ task: "No hay tareas" }} />
				) : (
					displayedTasks.map((task) => <Item key={task.id} task={task} />)
				)}
			</Box>
			<Box>
				{showBubble && <Box className="task-completed">Realizada.</Box>}
			</Box>
			<DrawerBottom />
		</Box>
	);
};
