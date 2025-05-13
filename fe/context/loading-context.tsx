"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

import Loading from "@/components/ui/loading";

interface LoadingContextProps {
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextProps>({
	loading: false,
	setLoading: () => {},
});

export default function LoadingContextProvider({ children }: { children: React.ReactNode }) {
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<LoadingContext.Provider
			value={{
				loading,
				setLoading,
			}}
		>
			{children}
			{loading && <Loading />}
		</LoadingContext.Provider>
	);
}

export const useLoadingContext = () => useContext(LoadingContext);