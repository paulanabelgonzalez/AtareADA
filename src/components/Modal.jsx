import React, { useContext } from "react";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
} from "@mui/material";

import { TaskContext } from "../context/TaskContext";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
export const Modal = () => {
	const {
		dialogContent,
		handleCloseModal,
		handleDeleteAll,
		handleDeleteTask,
		openModal,
	} = useContext(TaskContext);

	const { id, name } = dialogContent || {};

	const handleDelete = (id) => {
		if (id === null) {
			handleDeleteAll();
		} else {
			handleDeleteTask(id);
		}
	};

	return (
		<React.Fragment>
			<Dialog
				open={openModal}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleCloseModal}
				sx={{
					"& .MuiDialog-paper": {
						background: "linear-gradient(to top, #e79ea2, #ffffff)",
						borderRadius: "10px",
						boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
					},

					"& .MuiDialogTitle-root": {
						color: "#9B3522",
						fontWeight: "bold",
					},

					"& .MuiButton-root": {
						color: "#9B3522",
						"&:hover": {
							backgroundColor: "#c37c82",
							color: "#fff",
						},
					},
				}}
			>
				<DialogTitle>Eliminar</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Está seguro que quiere eliminar{" "}
						<span style={{ fontWeight: 600, color: "#c37c82" }}>{name}</span>?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseModal}>cerrar</Button>
					<Button
						onClick={() => {
							handleDelete(id);
						}}
					>
						Si, eliminar
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};
