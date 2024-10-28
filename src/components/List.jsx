import {
	Box,
	Button,
	IconButton,
	Stack,
	styled,
	Tooltip,
	tooltipClasses,
	Typography,
} from "@mui/material";

import { FaCheck } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const createStyledTooltip = (bgColor) =>
	styled(({ className, ...props }) => (
		<Tooltip {...props} classes={{ popper: className }} />
	))(({ theme }) => ({
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: bgColor,
			color: "white",
			boxShadow: theme.shadows[1],
			fontSize: 11,
		},
	}));

const CheckTooltip = createStyledTooltip("#4caf50");
const CheckedTooltip = createStyledTooltip("#d32f2f");
const EditTooltip = createStyledTooltip("#3434ff");
const DeleteTooltip = createStyledTooltip("#d32f2f");
const DescriptionTooltip = createStyledTooltip("grey");

export const List = () => {
	return (
		<Box
			sx={{
				width: "95%",
				maxWidth: "1200px",
				m: "auto",
				p: "0px 10px",
				// display: "flex",
				// justifyContent: "space-between",
				boxShadow:
					"0 10px 20px rgba(0, 0, 0, 0.4), 0 14px 40px rgba(0, 0, 0, 0.4)",
				borderRadius: "15px",
			}}
		>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography sx={{ display: "flex", alignItems: "center" }}>
					Tarea de ejemplo
				</Typography>
				<Stack
					direction="row"
					spacing={{ xs: 0, md: 2 }}
					sx={{ gap: { xs: "" } }}
				>
					<CheckTooltip title="Marcar como realizada">
						<IconButton sx={{ color: "#4caf50" }}>
							<FaCheck />
						</IconButton>
					</CheckTooltip>
					<EditTooltip title="Editar">
						<IconButton sx={{ color: "#3434ff" }}>
							<FaRegEdit />
						</IconButton>
					</EditTooltip>
					<DeleteTooltip title="Eliminar">
						<IconButton color="error">
							<RiDeleteBin6Line />
						</IconButton>
					</DeleteTooltip>
					{/* <DescriptionTooltip title="Agregar Descripción">
						<Button sx={{ padding: 0, fontSize: ".7rem", color: "#e79ea2" }}>
							{" "}
							descripción
						</Button>
					</DescriptionTooltip> */}
				</Stack>
			</Box>
		</Box>
	);
};
