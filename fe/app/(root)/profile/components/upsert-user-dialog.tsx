"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { useToast } from "@/context/toast-context";
import { useUser } from "@/context/user-context";

import { updateProfile } from "@/actions/user";

import { handleHttpResponse } from "@/utils/http";
import { UserDetail } from "@/types/user";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { occuptions } from "@/constants";

interface UpsertUserDialogProps {
	open: boolean;

	userDetails?: UserDetail;

	onClose: () => void;
}

const UpsertUserDialog: React.FC<UpsertUserDialogProps> = ({ open, userDetails, onClose }) => {
	const { setToast } = useToast();
	const { setCurrentUser, currentUser } = useUser();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const form = useForm({
		defaultValues: userDetails,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		control,
	} = form;

	const firstName = watch("user_first_name");
	const lastName = watch("user_last_name");
	const occupation = watch("user_occupation");

	useEffect(() => {
		if (!open) return;
		form.reset(userDetails);
	}, [open]);

	const onSaveProfile = async (data: UserDetail) => {
		try {
			setIsLoading(true);
			const res = await updateProfile(data);

			handleHttpResponse({
				response: res,
				successState: {
					message: "Profile updated successfully",
				},
				errorState: {
					message: "Failed to update profile",
				},
				setToast,
				callback: () => {
					console.info("res", res);

					setCurrentUser({
						...currentUser,
						user: {
							...currentUser?.user,
							...(res as UserDetail),
						},
						quizzes: currentUser?.quizzes || [],
					});

					onClose();
				},
			});
		} catch (error) {
			console.error("Error updating profile:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				if (!open) {
					onClose();
					form.reset();
				}
			}}
		>
			<DialogContent
				className="sm:max-w-[60%]"
				onInteractOutside={(e) => {
					e.preventDefault();
				}}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<DialogHeader>
					<DialogTitle>Edit your profile</DialogTitle>
					<DialogDescription>
						Keep your information up to date so others can recognize and connect with you.
					</DialogDescription>
				</DialogHeader>

				{/* Content */}

				<div className="flex flex-col md:flex-row items-center justify-center gap-3">
					<div className="grid gap-2 w-full">
						<Label htmlFor="firstname">First Name</Label>
						<Input
							id="firstname"
							className={cn({ "border-red-500": errors.user_first_name })}
							type="text"
							placeholder="Harry"
							required
							{...register("user_first_name")}
						/>
					</div>
					<div className="grid gap-2 w-full">
						<Label htmlFor="lastname">Last Name</Label>
						<Input
							id="lastname"
							className={cn({ "border-red-500": errors.user_last_name })}
							type="text"
							placeholder="Devign"
							required
							{...register("user_last_name")}
						/>
					</div>
				</div>

				<div className="flex items-center justify-center gap-3">
					<div className="grid gap-2 w-full">
						<Controller
							name="user_occupation"
							control={control}
							render={({ field }) => (
								<>
									<Label htmlFor="occupations">Occupations</Label>
									<Select value={occupation || ""} onValueChange={field.onChange}>
										<SelectTrigger className={cn({ "border-red-500": errors.user_occupation, "w-full": true })}>
											<SelectValue placeholder="Select your job" />
										</SelectTrigger>
										<SelectContent>
											{occuptions.map((occupation) => (
												<SelectItem key={occupation.value} value={occupation.value}>
													{occupation.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</>
							)}
						/>
					</div>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button size="lg" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button
						size="lg"
						type="submit"
						onClick={handleSubmit(onSaveProfile)}
						disabled={(!firstName?.trim() && !lastName?.trim() && !occupation?.trim()) || isLoading}
					>
						{isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default UpsertUserDialog;
