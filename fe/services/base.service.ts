import { cookies } from "next/headers";

import { TOKEN_KEY } from "@/constants/key";

export class BaseService {
	protected readonly baseUrl: string = process.env.NEXT_PUBLIC_API_URL as string;
	protected headers: Record<string, string> = {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
	};

	constructor() {}

	getHeaders(token: string | null, headers?: Record<string, string>) {
		return {
			...this.headers,
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...(headers ? headers : {}),
		};
	}

	async post<U, T>(data: T, url: string): Promise<U> {
		const accessToken = (await cookies()).get(TOKEN_KEY)?.value ?? null;
		this.headers = this.getHeaders(accessToken);

		return this.interceptRequest<U, T>(() =>
			fetch(`${this.baseUrl}/${url}`, {
				method: "POST",
				headers: this.headers,
				body: JSON.stringify(data),
			})
		);
	}

	async get<T>(id: string, url: string): Promise<T> {
		const accessToken = (await cookies()).get(TOKEN_KEY)?.value ?? null;
		this.headers = this.getHeaders(accessToken);

		return this.interceptRequest<T, void>(() =>
			fetch(`${this.baseUrl}/${url}/${id}`, {
				headers: this.headers,
			})
		);
	}

	async put<T>(id: string, data: T, url: string): Promise<T> {
		const accessToken = (await cookies()).get(TOKEN_KEY)?.value ?? null;
		this.headers = this.getHeaders(accessToken);

		return this.interceptRequest<T, T>(() =>
			fetch(`${this.baseUrl}/${url}/${id}`, {
				method: "PUT",
				headers: this.headers,
				body: JSON.stringify(data),
			})
		);
	}

	async delete(id: string, url: string): Promise<void> {
		const accessToken = (await cookies()).get(TOKEN_KEY)?.value ?? null;
		this.headers = this.getHeaders(accessToken);

		return this.interceptRequest<void, void>(() =>
			fetch(`${this.baseUrl}/${url}/${id}`, {
				method: "DELETE",
				headers: this.headers,
			})
		);
	}

	async getList<T>(url: string): Promise<T[]> {
		const accessToken = (await cookies()).get(TOKEN_KEY)?.value ?? null;
		this.headers = this.getHeaders(accessToken);

		return this.interceptRequest<T[], void>(() =>
			fetch(`${this.baseUrl}/${url}`, {
				headers: this.headers,
			})
		);
	}

	protected async handleResponse<T>(response: Response): Promise<T> {
		if (!response.ok) {
			const error = await response.json();
			console.info("Error happens from server side:", error);
			throw new Error(error.message || "An error occurred");
		}
		return response.json();
	}

	protected async interceptRequest<U, T>(request: () => Promise<Response>): Promise<U> {
		try {
			const response = await request();
			return this.handleResponse<U>(response);
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error("An unexpected error occurred");
		}
	}
}