import { useContext } from "react";

import { Box, Button } from "@mui/material";

import { Form } from "../components/Form";
import { List } from "../components/List";

export const Main = () => {
	return (
		<Box
			as="main"
			sx={{ background: "linear-gradient(to bottom, #ffceca , white)" }}
		>
			<Form />
			<List />
		</Box>
	);
};
//#ffe0dd
