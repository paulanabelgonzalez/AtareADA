import { useContext, useState } from "react";

import { Box, Snackbar } from "@mui/material";

import { Form } from "../components/Form";
import { List } from "../components/List";
import { TaskContext } from "../context/TaskContext";

export const Main = () => {
	const { handleClose, isFiltered, open, state } = useContext(TaskContext);
	const { vertical, horizontal } = state;
	// const handleClick = () => {
	// 	setOpen(true);
	// };

	// const handleClose = (event, reason) => {
	// 	if (reason === "clickaway") {
	// 		return;
	// 	}

	// 	setOpen(false);
	// };

	return (
		<Box
			as="main"
			sx={{ background: "linear-gradient(to bottom, #ffceca , white)" }}
		>
			{!isFiltered ? (
				<>
					<Form /> <List />
					<Snackbar
						anchorOrigin={{ vertical, horizontal }}
						open={open}
						autoHideDuration={3000}
						onClose={handleClose}
						message="Encontraras esta tarea en las opciones de menú"
						key={vertical + horizontal}
						ContentProps={{
							sx: {
								backgroundColor: "#c37c82",
								color: "white",
								// 						textShadow: `
								// 	0 0 5px #ffffff,   /* Brillo suave */
								// 	0 0 10px #ffffff,  /* Extensión del brillo */
								// 	0 0 20px #ff69b4,  /* Brillo en rosa */
								// 	0 0 30px #ff69b4,  /* Brillo más intenso */
								// 	0 0 40px #ff1493,  /* Color más profundo */
								// 	0 0 50px #ff1493
								// `,
								position: "relative",
								top: "-40px",
								boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
								borderRadius: "8px",
							},
						}}
					/>
				</>
			) : (
				<>
					<List />
				</>
			)}
		</Box>
	);
};
