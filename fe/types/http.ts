import { z } from "zod";

// const HttpStatus = {
// 	OK: 200,
// 	CREATED: 201,
// 	BAD_REQUEST: 400,
// 	UNAUTHORIZED: 401,
// 	FORBIDDEN: 403,
// };

export const httpResponse = z.object({
	status: z.number().optional(),
	data: z.any().optional(),
	error: z.string().optional(),
});

export type HttpResponse = z.infer<typeof httpResponse>;