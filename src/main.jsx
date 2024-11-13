import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import CssBaseline from "@mui/material/CssBaseline";

import { DrawerProvider } from "./context/DrawerContext.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";

import { App } from "./App.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<DrawerProvider>
			<TaskProvider>
				<CssBaseline />
				<App />
			</TaskProvider>
		</DrawerProvider>
	</StrictMode>
);
