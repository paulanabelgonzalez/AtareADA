import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
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
	console.log(id);
	console.log(name);
	return (
		<React.Fragment>
			<Dialog
				open={openModal}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleCloseModal}
				sx={{
					// background: "linear-gradient(to bottom, #e79ea2, #ffffff)",
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
						<span style={{ fontWeight: 600 }}>{name}</span>?
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
