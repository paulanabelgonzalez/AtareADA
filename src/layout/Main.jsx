import { useContext } from "react";

import { Box } from "@mui/material";

import { Form } from "../components/Form";
import { List } from "../components/List";
import { TaskContext } from "../context/TaskContext";

export const Main = () => {
	const { isFiltered } = useContext(TaskContext);
	return (
		<Box
			as="main"
			sx={{ background: "linear-gradient(to bottom, #ffceca , white)" }}
		>
			{!isFiltered ? (
				<>
					<Form /> <List />
				</>
			) : (
				<List />
			)}
		</Box>
	);
};
