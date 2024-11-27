import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

import noTask1 from "../assets/tasks/noTasks1.jpg";
import noTask2 from "../assets/tasks/noTasks2.jpg";
import noTask3 from "../assets/tasks/noTasks3.jpg";

export const NoTasks = () => {
	const [randomImage, setRandomImage] = useState("");

	const images = [noTask1, noTask2, noTask3];

	const getRandomImage = () => {
		const randomIndex = Math.floor(Math.random() * images.length);
		return images[randomIndex];
	};

	useEffect(() => {
		setRandomImage(getRandomImage());
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "flex-end",
				padding: "10px",
				minHeight: "100px",
			}}
		>
			<Typography
				variant="h5"
				sx={{
					position: "absolute",
					paddingBlockEnd: "50px",
					color: "oldlace",
					textShadow: `
			0 0 3px #000000,  
			0 0 6px #000000, 
			0 0 12px #000000, 
			0 0 20px #000000 
		`,
				}}
			>
				No hay tareas disponibles
			</Typography>

			{randomImage && (
				<img
					src={randomImage}
					alt="No hay tareas disponibles"
					style={{
						width: "100%",
						maxWidth: "400px",
					}}
				/>
			)}
		</Box>
	);
};
