"use client";

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { getStoredToken } from "@/actions/auth";
import { getUserById } from "@/actions/user";

import { UserProfile } from "@/types/user";
import { handleHttpResponse } from "@/utils/http";

interface UserContextProps {
	currentUser: UserProfile | undefined;
	setCurrentUser: Dispatch<SetStateAction<UserProfile | undefined>>;
}

const UserContext = createContext<UserContextProps>({
	currentUser: undefined,
	setCurrentUser: () => {},
});

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
	const [currentUser, setCurrentUser] = useState<UserProfile | undefined>(undefined);

	useEffect(() => {
		getCurrentUser();
	}, []);

	const getCurrentUser = async () => {
		if (currentUser) return;

		const accessToken = await getStoredToken();

		if (!accessToken) return;

		const decodedToken = jwtDecode(accessToken);

		const userId = (decodedToken as any)?._id;

		if (!userId) return;

		const userProfile = await getUserById(userId);

		handleHttpResponse({
			response: userProfile,
			callback: () => {
				setCurrentUser(userProfile as UserProfile);
			},
		});
	};

	return (
		<UserContext.Provider
			value={{
				currentUser,
				setCurrentUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export const useUser = () => useContext(UserContext);
