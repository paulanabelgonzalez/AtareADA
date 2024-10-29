import { useContext } from "react";

import { Box, Button } from "@mui/material";

import { Form } from "../components/Form";
import { List } from "../components/List";

import { TaskContext } from "../context/TaskContext";

export const Main = () => {
	const { handleDeleteAll } = useContext(TaskContext);

	return (
		<Box
			as="main"
			sx={{ background: "linear-gradient(to bottom, #ffceca , white)" }}
		>
			<Form />
			<Box sx={{ textAlign: "end", padding: 1, width: "95%" }}>
				<Button
					onClick={handleDeleteAll}
					sx={{
						padding: 1,
						fontSize: ".6rem",
						color: "#9B3522",
						transition: "0.5s ease",
						"&:hover": { backgroundColor: "#e79ea2", color: "#ffe0dd" },
					}}
				>
					Borrar Lista
				</Button>
			</Box>
			<List />
		</Box>
	);
};
//#ffe0dd
