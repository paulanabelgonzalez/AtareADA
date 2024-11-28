import { useContext } from "react";

import { Box, Snackbar } from "@mui/material";

import { Form } from "../components/Form";
import { List } from "../components/List";
import { Modal } from "../components/Modal";
import { TaskContext } from "../context/TaskContext";

export const Main = () => {
	const { handleClose, isFiltered, state } = useContext(TaskContext);
	const { vertical, horizontal, open } = state;

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
								position: "relative",
								top: "-40px",
								boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
								borderRadius: "8px",
							},
						}}
					/>{" "}
					<Modal />
				</>
			) : (
				<>
					<List /> <Modal />
				</>
			)}
		</Box>
	);
};
