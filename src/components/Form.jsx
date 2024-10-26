import { Box, Button, TextField } from "@mui/material";

export const Form = () => {
	return (
		<Box
			as="form"
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
				InputProps={{
					sx: {
						"&:focus-within .MuiOutlinedInput-notchedOutline": {
							borderColor: "#9B3522",
							boxShadow: "0 0 10px #9B3522",
						},
					},
				}}
			/>
			<Button
				variant="outlined"
				sx={{
					color: "#9B3522",
					border: "2px solid #9B3522",
					fontWeight: 600,
					transition: "0.5s ease",
					"&:hover": { backgroundColor: "#9B3522bf", color: "#ffe3e0" },
				}}
			>
				Agregar
			</Button>
		</Box>
	);
};
