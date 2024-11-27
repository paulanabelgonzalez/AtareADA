import { useContext } from "react";

import { Box, Button, Typography } from "@mui/material";

import { DrawerBottom } from "./DrawerBottom";
import { Item } from "./Item";
import { NoTasks } from "./NoTasks";

import { TaskContext } from "../context/TaskContext";

export const List = () => {
	const {
		bubbleMessage,
		handleDeleteAll,
		isFiltered,
		item,
		selectedTasks,
		showBubble,
		setIsFiltered,
		tasks,
	} = useContext(TaskContext);

	const displayedTasks = isFiltered ? selectedTasks : tasks;
	const hasTask = displayedTasks?.length === 0;

	return (
		<Box
			sx={{
				width: hasTask ? { xs: "350px", sm: "400px" } : "95%",
				maxWidth: hasTask ? { xs: "350px", sm: "400px" } : "1200px",
				m: "auto",
				paddingBlockStart: hasTask ? { xs: "15px", sm: "30px" } : undefined,
			}}
		>
			{isFiltered && (
				<>
					<Button
						sx={{
							fontSize: ".7rem",
							marginBlockStart: "10px",
							color: "#c37c82",
							border: "2px solid #c37c82",
							transition: "0.5s ease",
							"&:hover": {
								backgroundColor: "#e79ea2",
								color: "#ffe0dd",
								border: "2px solid #e79ea2",
							},
						}}
						onClick={() => {
							setIsFiltered(false);
							console.log("sin bucle");
						}}
					>
						cerrar
					</Button>

					<Typography
						sx={{
							fontSize: "20px",
							color: "#9b3522",
							textAlign: "center",
							paddingBlockEnd: "25px",
						}}
					>
						{item}
					</Typography>
				</>
			)}
			{!hasTask && (
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
			)}
			<Box
				sx={{
					position: "sticky",
					minWidth: { xs: "96%" },
					width: hasTask ? { xs: "350px", sm: "400px" } : { lg: "1200px" },
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
					<NoTasks />
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
