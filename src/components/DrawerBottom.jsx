import { useContext, useEffect } from "react";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Global } from "@emotion/react";

import {
	Box,
	Button,
	styled,
	SwipeableDrawer,
	TextField,
	Typography,
} from "@mui/material";
import { TaskContext } from "../context/TaskContext";
import { DrawerContext } from "../context/DrawerContext";

const drawerBleeding = 55;

const StyledBox = styled("div")({
	backgroundColor: "#e79ea2",
	borderTopLeftRadius: 8,
	borderTopRightRadius: 8,
});

const Puller = styled("div")({
	width: 50,
	height: 4,
	backgroundColor: "#9B3522",
	borderRadius: 6,
	position: "absolute",
	top: 13,
	left: "50% ",
	transform: "translateX(-50%)",
});

export const DrawerBottom = () => {
	const { toggleDrawer, isDrawerOpen, setIsDrawerOpen } =
		useContext(DrawerContext);
	const { findByTaskId, selectedTaskId, updateTaskAttribute } =
		useContext(TaskContext);
	const {
		formState: { errors },
		handleSubmit,
		register,
		setValue,
	} = useForm({ criteriaMode: "all" });

	useEffect(() => {
		if (selectedTaskId) {
			const taskToEdit = findByTaskId(selectedTaskId);

			if (taskToEdit) {
				setValue("task", taskToEdit.task);
			}
		}
	}, [selectedTaskId, setValue]);

	const onSubmit = (data) => {
		const capitalizedTask =
			data.task.charAt(0).toUpperCase() + data.task.slice(1);
		updateTaskAttribute(selectedTaskId, "task", capitalizedTask);
		setIsDrawerOpen(false);
	};

	return (
		<>
			<Global
				styles={{
					".MuiDrawer-root > .MuiPaper-root": {
						height: `calc(50% - 1px)`,
						overflow: "visible",
						borderTopLeftRadius: 9,
						borderTopRightRadius: 9,
					},
				}}
			/>
			<SwipeableDrawer
				anchor="bottom"
				open={isDrawerOpen}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
			>
				<StyledBox
					sx={{
						position: "absolute",
						top: -drawerBleeding,
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8,
						visibility: "visible",
						right: 0,
						left: 0,
					}}
				>
					<Puller />
				</StyledBox>

				<StyledBox sx={{ p: 2, height: "100%", overflow: "auto" }}>
					<Typography variant="h6" sx={{ color: "#9B3522" }}>
						Editar Tarea
					</Typography>

					<Box
						as="form"
						onSubmit={handleSubmit(onSubmit)}
						sx={{
							backgroundColor: "#fde7e5",
							height: `calc(100% - 32px)`,
							borderRadius: "9px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							padding: "20px",
						}}
					>
						<Box
							sx={{ width: "100%", maxWidth: "500px", marginInline: "auto" }}
						>
							<TextField
								type="text"
								sx={{
									minWidth: "100%",

									"& input": {
										textTransform: "capitalize",
									},
								}}
								variant="outlined"
								{...register("task", {
									required: "Este campo es obligatorio.",
									minLength: {
										value: 6,
										message:
											"La tarea igresada debe tener como min. 4 caracteres.",
									},
									maxLength: {
										value: 20,
										message: "La tarea es muy larga, usa la descripción.",
									},
								})}
								InputProps={{
									sx: {
										"&:focus-within .MuiOutlinedInput-notchedOutline": {
											borderColor: "#e79ea2",
											boxShadow: "0 0 10px #e79ea2",
										},
									},
								}}
							/>
							<ErrorMessage
								errors={errors}
								name="task"
								render={({ messages }) =>
									messages &&
									Object.entries(messages).map(([type, message]) => (
										<p
											style={{ color: "#d32f2f", textAlign: "center" }}
											key={type}
										>
											{message}
										</p>
									))
								}
							/>
						</Box>

						<Button
							type="submit"
							sx={{
								width: "100%",
								maxWidth: "500px",
								marginInline: "auto",
								color: "#e79ea2",
								fontWeight: 600,
								transition: "0.5s ease",
								"&:hover": { color: "white", backgroundColor: "#e79ea2" },
							}}
						>
							Guardar
						</Button>
					</Box>
				</StyledBox>
			</SwipeableDrawer>
		</>
	);
};
