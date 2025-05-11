import { cookies } from "next/headers";

export class BaseService {
	protected readonly baseUrl: string = process.env.NEXT_PUBLIC_API_URL as string;
	protected token: string | null = null;

	constructor() {
		this.getToken();
		console.log(`Base URL: ${this.baseUrl}`);
		
	}

	async getToken() {
		if (this.token) return this.token;
		this.token = (await cookies()).get("token")?.value ?? null;
		return this.token;
	}

	getHeaders() {
		return {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
			Authorization: `Bearer ${this.token}`,
		};
	}

	async post<U, T>(data: T, url: string): Promise<U> {
		return this.interceptRequest<U, T>(() =>
			fetch(`${this.baseUrl}/${url}`, {
				method: "POST",
				headers: this.getHeaders(),
				body: JSON.stringify(data),
			})
		);
	}

	async get<T>(id: string, url: string): Promise<T> {
		return this.interceptRequest<T, void>(() => fetch(`${this.baseUrl}/${url}/${id}`));
	}

	async put<T>(id: string, data: T, url: string): Promise<T> {
		return this.interceptRequest<T, T>(() =>
			fetch(`${this.baseUrl}/${url}/${id}`, {
				method: "PUT",
				headers: this.getHeaders(),
				body: JSON.stringify(data),
			})
		);
	}

	async delete(id: string, url: string): Promise<void> {
		return this.interceptRequest<void, void>(() =>
			fetch(`${this.baseUrl}/${url}/${id}`, {
				method: "DELETE",
				headers: this.getHeaders(),
			})
		);
	}

	async getList<T>(url: string): Promise<T[]> {
		return this.interceptRequest<T[], void>(() =>
			fetch(`${this.baseUrl}/${url}`, {
				headers: this.getHeaders(),
			})
		);
	}

	protected async handleResponse<T>(response: Response): Promise<T> {
		if (!response.ok) {
			const error = await response.json();
			// TODO: Log error message
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
