import { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import {
	Box,
	Button,
	IconButton,
	Stack,
	styled,
	SwipeableDrawer,
	TextField,
	Tooltip,
	tooltipClasses,
	Typography,
} from "@mui/material";

import { Global } from "@emotion/react";

import { FaCheck } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import { TaskContext } from "../context/TaskContext";

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

const drawerBleeding = 50;

const StyledBox = styled("div")({
	backgroundColor: "#e79ea2",
	borderTopLeftRadius: 8,
	borderTopRightRadius: 8,
});

const Puller = styled("div")({
	width: 50,
	height: 4,
	backgroundColor: "#9B3522",
	borderRadius: 6,
	position: "absolute",
	top: 13,
	left: "50% ",
	transform: "translateX(-50%)",
});

export const List = () => {
	const { handleDeleteAll, handleDeleteTask, replaceTask, tasks } =
		useContext(TaskContext);
	const { handleSubmit, register, setValue, reset } = useForm();

	const [open, setOpen] = useState(false);
	const [editedTask, setEditedTask] = useState(null);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	const handleEditClick = (taskId) => {
		setOpen(true);
		setEditedTask(taskId);
	};
	console.log(editedTask);

	useEffect(() => {
		if (editedTask) {
			const taskToEdit = tasks.find((task) => task.id === editedTask);
			if (taskToEdit) {
				setValue("task", taskToEdit.task);
			}
		}
	}, [editedTask, setValue, tasks]);

	const onSubmit = (data) => {
		console.log(data);
		const taskToUpdate = tasks.find((task) => task.id === editedTask);

		if (taskToUpdate) {
			const updatedTask = {
				...taskToUpdate,
				task: data.task.charAt(0).toUpperCase() + data.task.slice(1),
			};
			replaceTask(updatedTask);
			console.log(updatedTask);
		}

		reset();
		setOpen(false);
	};

	const hasTask = tasks?.length === 0;

	return (
		<Box sx={{ width: "95%", maxWidth: "1200px", m: "auto" }}>
			<Box sx={{ textAlign: "end", padding: 1 }}>
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
			<Box
				sx={{
					width: "100%",
					maxWidth: "1200px",
					m: "auto",
					p: "0px 10px",
					boxShadow:
						"0 10px 20px rgba(0, 0, 0, 0.4), 0 14px 40px rgba(0, 0, 0, 0.4)",
					borderRadius: "15px",
				}}
			>
				{hasTask ? (
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							paddingBlock: 1,
						}}
					>
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
									<FaCheck style={{ fontSize: "20px" }} />
								</IconButton>
							</CheckTooltip>
							<EditTooltip title="Editar">
								<IconButton sx={{ color: "#3434ff" }}>
									<FaRegEdit style={{ fontSize: "20px" }} />
								</IconButton>
							</EditTooltip>
							<DeleteTooltip title="Eliminar">
								<IconButton color="error">
									<RiDeleteBin6Line style={{ fontSize: "20px" }} />
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
				) : (
					tasks.map((task) => (
						<Box
							key={task.id}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								padding: "10px",
							}}
						>
							<Typography sx={{ display: "flex", alignItems: "center" }}>
								{task.task}
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
									<IconButton
										onClick={() => handleEditClick(task.id)}
										sx={{ color: "#3434ff" }}
									>
										<FaRegEdit />
									</IconButton>
								</EditTooltip>
								<DeleteTooltip title="Eliminar">
									<IconButton
										color="error"
										onClick={() => {
											handleDeleteTask(task.id);
										}}
									>
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
					))
				)}
			</Box>
			<Global
				styles={{
					".MuiDrawer-root > .MuiPaper-root": {
						height: `calc(50% - 1px)`,
						overflow: "visible",
						borderTopLeftRadius: 9,
						borderTopRightRadius: 9,
					},
				}}
			/>
			<SwipeableDrawer
				anchor="bottom"
				open={open}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
			>
				<StyledBox
					sx={{
						position: "absolute",
						top: -drawerBleeding,
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8,
						visibility: "visible",
						right: 0,
						left: 0,
					}}
				>
					<Puller />
				</StyledBox>
				<StyledBox sx={{ p: 2, height: "100%", overflow: "auto" }}>
					<Typography variant="h6">Editar Tarea</Typography>
					<Box
						as="form"
						onSubmit={handleSubmit(onSubmit)}
						sx={{
							backgroundColor: "#fde7e5",
							height: `calc(100% - 32px)`,
							borderRadius: "9px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							padding: "20px",
						}}
					>
						<TextField
							type="text"
							sx={{
								minWidth: "50%",
								"& input": {
									textTransform: "capitalize",
								},
							}}
							variant="outlined"
							{...register("task")}
							InputProps={{
								sx: {
									"&:focus-within .MuiOutlinedInput-notchedOutline": {
										borderColor: "#e79ea2",
										boxShadow: "0 0 10px #e79ea2",
									},
								},
							}}
						/>
						<Button type="submit" sx={{}}>
							Guardar
						</Button>
					</Box>
				</StyledBox>
			</SwipeableDrawer>
		</Box>
	);
};
