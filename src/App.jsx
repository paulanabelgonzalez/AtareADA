import { Box } from "@mui/material";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { Main } from "./layout/Main";

export const App = () => {
	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateRows: "auto 1fr auto",
				height: "100vh",
				padding: 0,
			}}
		>
			<Header />
			<Main />
			<Footer />
		</Box>
	);
};
