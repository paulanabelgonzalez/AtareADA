import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import logo from "../assets/ocupada.jpg";

export const Header = () => {
	return (
		<AppBar
			position="static"
			sx={{
				flexGrow: 1,
				backgroundColor: "#ffe0dd",
				boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
				zIndex: "1",
			}}
		>
			<Toolbar sx={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
				<Box
					sx={{ mr: 2, display: "flex", width: { xs: "150px", md: "220px" } }}
				>
					<img src={logo} alt="mujer atareada" style={{ width: "100%" }} />
				</Box>
				<Typography
					sx={{ fontSize: { xs: "32px", md: "40px" }, color: "#9b3522" }}
					component="h1"
				>
					AtareADA
				</Typography>
			</Toolbar>
		</AppBar>
	);
};
