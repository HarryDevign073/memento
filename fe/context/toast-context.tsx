"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

import Toast, { ToastProps } from "@/components/ui/toast";

interface ToastContextProps {
	toast: ToastProps | undefined;
	setToast: Dispatch<SetStateAction<ToastProps | undefined>>;
}

const ToastContext = createContext<ToastContextProps>({
	toast: undefined,
	setToast: () => {},
});

export default function ToastContextProvider({ children }: { children: React.ReactNode }) {
	const [toast, setToast] = useState<ToastProps | undefined>(undefined);

	return (
		<ToastContext.Provider
			value={{
				toast,
				setToast,
			}}
		>
			{children}
			{toast != undefined && (
				<Toast
					type={toast.type}
					message={toast.message}
					title={toast.title}
					onClose={() => setToast(undefined)}
					closeAfter={toast.closeAfter}
				/>
			)}
		</ToastContext.Provider>
	);
}

export const useToast = () => useContext(ToastContext);
