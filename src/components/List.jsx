import { useContext } from "react";

import { Box, Button, Typography } from "@mui/material";

import { DrawerBottom } from "./DrawerBottom";
import { Item } from "./Item";
import { TaskContext } from "../context/TaskContext";

export const List = () => {
	const {
		bubbleMessage, // Obtén bubbleMessage del contexto
		handleDeleteAll,
		isFiltered,
		item,
		selectedTasks,
		showBubble,
		tasks,
	} = useContext(TaskContext);

	const displayedTasks = isFiltered ? selectedTasks : tasks;
	const hasTask = displayedTasks?.length === 0;

	return (
		<Box
			sx={{
				width: "95%",
				maxWidth: "1200px",
				m: "auto",
			}}
		>
			{isFiltered && (
				<Typography
					sx={{
						fontSize: "20px",
						color: "#9b3522",
						paddingBlockStart: { xs: "10px", md: "30px" },
						textAlign: "center",
					}}
				>
					{item}
				</Typography>
			)}

			<Box sx={{ textAlign: "end", paddingBlock: { xs: 1, sm: 2 } }}>
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
					maxHeight: isFiltered
						? { xs: "59vh", md: "60vh" }
						: { xs: "50vh", md: "55vh" },
					overflowY: "auto",
					overflowX: "hidden",

					"&::-webkit-scrollbar": {
						width: "8px",
					},
					"&::-webkit-scrollbar-thumb": {
						backgroundColor: "#9b3522",
						borderRadius: "4px",
						border: "2px solid transparent",
						backgroundClip: "content-box",
					},
				}}
			>
				{hasTask ? (
					<Item key="no-task" task={{ task: "No hay tareas" }} isEmpty />
				) : (
					displayedTasks.map((task) => <Item key={task.id} task={task} />)
				)}
			</Box>
			<Box>
				{showBubble && <Box className="task-completed">{bubbleMessage}</Box>}
			</Box>
			<DrawerBottom />
		</Box>
	);
};
