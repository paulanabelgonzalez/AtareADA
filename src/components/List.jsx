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
import { SiListmonk } from "react-icons/si";
import { TbPointFilled } from "react-icons/tb";

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
	const {
		findByTaskId,
		handleDeleteAll,
		handleDeleteTask,
		handleTaskCompleted,
		showBubble,
		tasks,
		updateTaskAttribute,
	} = useContext(TaskContext);
	const { handleSubmit, register, setValue, reset } = useForm();

	const [open, setOpen] = useState(false);
	const [selectedTaskId, setSelectedTaskId] = useState(null);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	const handleEditClick = (taskId) => {
		setOpen(true);
		setSelectedTaskId(taskId);
	};
	console.log(selectedTaskId);

	useEffect(() => {
		if (selectedTaskId) {
			const taskToEdit = findByTaskId(selectedTaskId);
			if (taskToEdit) {
				setValue("task", taskToEdit.task);
			}
		}
	}, [selectedTaskId, setValue, tasks]);

	const onSubmit = (data) => {
		console.log(data);
		const capitalizedTask =
			data.task.charAt(0).toUpperCase() + data.task.slice(1);
		updateTaskAttribute(selectedTaskId, "task", capitalizedTask);
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
					position: "sticky", //por ahora, preguntarle a aldi como pasarlo a fixed
					minWidth: { xs: "96%" },
					width: { lg: "1200px" },
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
						key="example-task"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							padding: "10px",
						}}
					>
						<Typography sx={{ display: "flex", alignItems: "center" }}>
							<span style={{ display: "flex" }}>
								<TbPointFilled
									style={{ fontSize: "1.5rem", color: "#9b3522" }}
								/>
							</span>
							<span
								style={{
									marginInlineStart: "15px",
									fontWeight: 600,
									color: "#615e5e",
								}}
							>
								Ejemplo
							</span>
						</Typography>
						<Stack
							direction="row"
							spacing={{ xs: 0, md: 2 }}
							sx={{ gap: { xs: "" } }}
						>
							<CheckTooltip title="Ingresa una tarea">
								<IconButton sx={{ color: "#4caf50" }}>
									<FaCheck style={{ fontSize: "20px" }} />
								</IconButton>
							</CheckTooltip>
							<EditTooltip title="Ingresa una tarea">
								<IconButton sx={{ color: "#3434ff" }}>
									<FaRegEdit style={{ fontSize: "20px" }} />
								</IconButton>
							</EditTooltip>
							<DeleteTooltip title="Ingresa una tarea">
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
					tasks.map((task, index) => (
						<Box
							key={task.id || index}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								padding: "10px",
							}}
						>
							<Typography sx={{ display: "flex", alignItems: "center" }}>
								<span style={{ display: "flex" }}>
									<TbPointFilled
										style={{ fontSize: "1.5rem", color: "#9b3522" }}
									/>{" "}
								</span>
								<span
									className={`task-text ${task.completed ? "completed" : ""}`}
									style={{ marginInlineStart: "15px", color: "#615e5e" }}
								>
									{task.task}
								</span>
							</Typography>
							<Stack
								direction="row"
								spacing={{ xs: 0, md: 2 }}
								sx={{ gap: { xs: "" } }}
							>
								<CheckTooltip title="Marcar como realizada">
									<Box>
										<Box className="button">
											<IconButton
												onClick={() => handleTaskCompleted(task.id)}
												sx={{ color: "#4caf50" }}
											>
												<FaCheck style={{ fontSize: "20px" }} />
											</IconButton>
										</Box>
									</Box>
								</CheckTooltip>
								<EditTooltip title="Editar">
									<IconButton
										onClick={() => handleEditClick(task.id)}
										sx={{ color: "#3434ff" }}
									>
										<FaRegEdit style={{ fontSize: "20px" }} />
									</IconButton>
								</EditTooltip>
								<DeleteTooltip title="Eliminar">
									<IconButton
										color="error"
										onClick={() => {
											handleDeleteTask(task.id);
										}}
									>
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
					))
				)}
			</Box>
			<Box>
				{showBubble && <Box className="task-completed">Realizada.</Box>}
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
					<Typography variant="h6" sx={{ color: "#9B3522" }}>
						Editar Tarea
					</Typography>
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
						<Button
							type="submit"
							sx={{
								color: "#e79ea2",
								fontWeight: 600,
								transition: "0.5s ease",
								"&:hover": { color: "white", backgroundColor: "#e79ea2" },
							}}
						>
							Guardar
						</Button>
					</Box>
				</StyledBox>
			</SwipeableDrawer>
		</Box>
	);
};
