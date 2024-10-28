import { useForm } from "react-hook-form";

import { Box, Button, TextField } from "@mui/material";

export const Form = () => {
	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		console.log(data);
		const dataTask = {
			// id:
			task: data.task,
			completed: false,
			description: data.description,
		};
		console.log(dataTask);
	};

	return (
		<Box
			as="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				maxWidth: "1200px",
				m: "auto",
				display: "flex",
				justifyContent: "center",
				gap: "15px",
				paddingBlock: "40px",
			}}
		>
			<TextField
				type="text"
				placeholder="Ingresa una tarea"
				sx={{ minWidth: "50%" }}
				variant="outlined"
				{...register("task")}
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
					color: "#e79ea2",
					border: "2px solid #9B3522",
					fontWeight: 600,
					transition: "0.5s ease",
					"&:hover": {
						backgroundColor: "#e79ea2",
						color: "#9B3522",
						border: "2px solid #e79ea2",
					},
				}}
			>
				Agregar
			</Button>
		</Box>
	);
};
