import { useContext, useState } from "react";

import {
	Box,
	SwipeableDrawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";

// import { getAllTasks } from "../LocalStorage";

import { TaskContext } from "../context/TaskContext";

export const DrawerRight = () => {
	const {
		allTasks,
		isFiltered,
		isRightDrawerOpen,
		selectedTasks,
		setIsFiltered,
		setSelectedTasks,
		toggleRightDrawer,
	} = useContext(TaskContext);

	console.log(selectedTasks);
	console.log(isFiltered);
	const handleItemClick = (item) => {
		setIsFiltered(true);
		console.log(`${item}`);
		if (item === "Todas las tareas") {
			setSelectedTasks(allTasks);
		}
		if (item === "Tareas realizadas") {
			setSelectedTasks(allTasks.filter((task) => task.completed === true));
		}
		if (item === "Tareas no realizadas") {
			setIsFiltered(false);
		}
	};
	return (
		<>
			<SwipeableDrawer
				anchor="right"
				open={isRightDrawerOpen}
				onClose={toggleRightDrawer(false)}
				onOpen={toggleRightDrawer(true)}
				SwipeAreaProps={{ width: 0 }}
				sx={{
					"& .MuiDrawer-paper": {
						width: 250,
						borderTopLeftRadius: 0,
						borderTopRightRadius: 0,
						height: "100%",
						backgroundColor: "#c37c82",
						color: "white",
					},
				}}
			>
				<Box
					sx={{}}
					role="presentation"
					onClick={toggleRightDrawer(false)}
					onKeyDown={toggleRightDrawer(false)}
				>
					<Typography
						variant="h5"
						sx={{ padding: "15px 15px 0px 10px", textDecoration: "underLine" }}
					>
						Buscar Por :
					</Typography>

					<List>
						{[
							"Todas las tareas",
							"Tareas realizadas",
							"Tareas no realizadas",
						].map((text) => (
							<ListItem key={text} disablePadding>
								<ListItemButton onClick={() => handleItemClick(text)}>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Box>
			</SwipeableDrawer>
		</>
	);
};
