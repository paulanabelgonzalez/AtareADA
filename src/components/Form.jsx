import { useContext } from "react";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { v4 as uuidv4 } from "uuid";

import { Box, Button, TextField } from "@mui/material";

import { TaskContext } from "../context/TaskContext";

export const Form = () => {
	const { addTask } = useContext(TaskContext);
	const {
		formState: { errors },
		handleSubmit,
		register,
		reset,
	} = useForm({ criteriaMode: "all" });

	const onSubmit = (data) => {
		const newTask = {
			id: uuidv4(),
			task: data.task.charAt(0).toUpperCase() + data.task.slice(1),
			completed: false,
			// description: data.description,
		};
		addTask(newTask);
		reset();
	};

	return (
		<Box
			as="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				maxWidth: "1200px",
				m: "auto",
				paddingBlock: "40px 10px",
			}}
		>
			<Box
				sx={{
					maxWidth: "1200px",
					m: "auto",
					display: "flex",
					justifyContent: "center",
					gap: "15px",
				}}
			>
				<TextField
					type="text"
					placeholder="Ingresa una tarea"
					sx={{
						minWidth: "50%",
						"& input": {
							textTransform: "capitalize",
						},
					}}
					variant="outlined"
					{...register("task", {
						required: "Este campo es obligatorio.",
						minLength: {
							value: 6,
							message: "La tarea igresada debe tener como min. 4 caracteres.",
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

				<Button
					variant="outlined"
					type="submit"
					sx={{
						color: "#c37c82",
						border: "2px solid #c37c82",
						fontWeight: 600,
						transition: "0.5s ease",
						"&:hover": {
							backgroundColor: "#e79ea2",
							color: "#ffe0dd",
							border: "2px solid #e79ea2",
						},
					}}
				>
					Agregar
				</Button>
			</Box>
			<ErrorMessage
				errors={errors}
				name="task"
				render={({ messages }) =>
					messages &&
					Object.entries(messages).map(([type, message]) => (
						<p style={{ color: "#d32f2f", textAlign: "center" }} key={type}>
							{message}
						</p>
					))
				}
			/>
		</Box>
	);
};
