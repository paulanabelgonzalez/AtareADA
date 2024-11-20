import { useContext } from "react";

import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";

import { IoMenu } from "react-icons/io5";

import { DrawerContext } from "../context/DrawerContext";

import { DrawerRight } from "../components/DrawerRight";

import logo from "../assets/ocupada.jpg";

export const Header = () => {
	const { toggleRightDrawer } = useContext(DrawerContext);

	return (
		<AppBar
			position="static"
			sx={{
				flexGrow: 1,
				backgroundColor: "#ffe0dd",
				boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
				zIndex: "1",
				paddingInline: "8px",
			}}
		>
			<Toolbar
				sx={{
					width: "100%",
					maxWidth: "1200px",
					margin: "auto",
					display: "flex",
					justifyContent: "space-between",
					paddingInline: 0,
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center" }}>
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
				</Box>

				<IconButton
					onClick={toggleRightDrawer(true)}
					aria-label="menu"
					sx={{ marginInlineStart: "3px", display: { xs: "flex", sm: "none" } }}
				>
					<IoMenu
						style={{
							fontSize: "30px",
							color: "#c37c82",
						}}
					/>
				</IconButton>
				<Button
					onClick={toggleRightDrawer(true)}
					sx={{
						display: { xs: "none", sm: "flex" },
						color: "#c37c82",
						marginBlockStart: "7%",
						fontWeight: 600,
						border: "2px solid #c37c82",
						transition: "0.5s ease",

						"&:hover": {
							border: "2px solid #e79ea2 ",
							backgroundColor: "#e79ea2",
							color: "#ffe0dd",
						},
					}}
				>
					Menu
				</Button>
			</Toolbar>

			<DrawerRight />
		</AppBar>
	);
};
