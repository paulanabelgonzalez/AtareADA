import { Box, Typography } from "@mui/material";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
	return (
		<>
			<Box
				as="footer"
				sx={{
					backgroundColor: "#ffe0dd",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: "9px",
				}}
			>
				<Typography variant="subtitle1" color="white" sx={{ pr: "15px" }}>
					© Agosto 2024 Paula Gonzalez
				</Typography>

				<Box
					component="a"
					href="https://github.com/paulanabelgonzalez"
					target="black"
					sx={{ display: "flex", color: "#b0280f" }}
				>
					<FaGithub style={{ fontSize: "22px" }} />
				</Box>
				<Box
					component="a"
					href=""
					target="black"
					sx={{ display: "flex", color: "#b0280f" }}
				>
					<FaLinkedin style={{ fontSize: "22px" }} />
				</Box>
			</Box>
		</>
	);
};
