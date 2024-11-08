import { createContext, useState } from "react";

export const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

	const toggleDrawer = (newOpen) => () => {
		setIsDrawerOpen(newOpen);
	};

	const toggleRightDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setIsRightDrawerOpen(open);
	};

	return (
		<DrawerContext.Provider
			value={{
				isDrawerOpen,
				setIsDrawerOpen,
				isRightDrawerOpen,
				setIsRightDrawerOpen,
				toggleDrawer,
				toggleRightDrawer,
			}}
		>
			{children}
		</DrawerContext.Provider>
	);
};
