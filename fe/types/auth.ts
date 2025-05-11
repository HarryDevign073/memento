import { z } from "zod";

export const authRequest = z.object({
	username: z.string().min(1),
	password: z.string().min(1),
});
export type AuthRequest = z.infer<typeof authRequest>;

export const authResponse = z.object({
	token: z.string(),
});
export type AuthResponse = z.infer<typeof authResponse>;

export const occupation = z.enum([
	"student",
	"teacher",
	"developer",
	"designer",
	"marketer",
	"manager",
	"writer",
	"other",
]);
export type Occupation = z.infer<typeof occupation>;

export const newUserRequest = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	username: z.string().min(1),
	password: z.string().min(1),
	confirmPassword: z.string().min(1),
	occupation: occupation.optional(),
});
export type NewUserRequest = z.infer<typeof newUserRequest>;