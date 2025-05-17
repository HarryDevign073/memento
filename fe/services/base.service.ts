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

	constructor(headers?: Record<string, string>) {
		this.headers = {
			...this.headers,
			...headers,
		};
	}

	private getHeaders(token: string | null, headers?: Record<string, string>) {
		return {
			...this.headers,
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...(headers ? headers : {}),
		};
	}

	protected async post<U, T>(url: string, data?: T, customizedPayload?: any, isFormData?: boolean): Promise<U> {
		console.info(
			"POST PAYLOAD: ",
			JSON.stringify({
				data,
				url,
				customizedPayload,
			})
		);

		const accessToken = (await cookies()).get(TOKEN_KEY)?.value ?? null;
		this.headers = this.getHeaders(accessToken);

		const payload = data ? (isFormData ? customizedPayload : JSON.stringify(customizedPayload ?? data)) : null;

		return this.interceptRequest<U, T>(() =>
			fetch(`${this.baseUrl}/${url}`, {
				method: "POST",
				headers: this.headers,
				...(payload ? { body: payload } : {}),
			})
		);
	}

	protected async get<T>(url: string, id?: string, query?: Record<string, any>): Promise<T> {
		console.info(
			"GET PAYLOAD: ",
			JSON.stringify({
				id,
				url,
			})
		);

		const accessToken = (await cookies()).get(TOKEN_KEY)?.value ?? null;
		this.headers = this.getHeaders(accessToken);

		const urlWithId = id ? `${url}/${id}` : url;

		let queryString = "";
		if (query) {
			queryString = new URLSearchParams(query).toString();
		}

		const urlWithQuery = queryString ? `${urlWithId}?${queryString}` : urlWithId;
		console.info("urlWithQuery", urlWithQuery);

		return this.interceptRequest<T, void>(() =>
			fetch(`${this.baseUrl}/${urlWithQuery}`, {
				headers: this.headers,
			})
		);
	}

	protected async patch<T, Q>(id: string, data: T, url: string): Promise<Q> {
		console.info(
			"PUT PAYLOAD: ",
			JSON.stringify({
				id,
				data,
				url,
			})
		);

		const accessToken = (await cookies()).get(TOKEN_KEY)?.value ?? null;
		this.headers = this.getHeaders(accessToken);

		return this.interceptRequest<Q, T>(() =>
			fetch(`${this.baseUrl}/${url}/${id}`, {
				method: "PATCH",
				headers: this.headers,
				body: JSON.stringify(data),
			})
		);
	}

	protected async delete(url: string): Promise<void> {
		console.info(
			"DELETE PAYLOAD: ",
			JSON.stringify({
				url,
			})
		);

		const accessToken = (await cookies()).get(TOKEN_KEY)?.value ?? null;
		this.headers = this.getHeaders(accessToken);

		return this.interceptRequest<void, void>(() =>
			fetch(`${this.baseUrl}/${url}`, {
				method: "DELETE",
				headers: this.headers,
			})
		);
	}

	protected async getList<T>(url: string, query?: Record<string, any>): Promise<T[]> {
		const accessToken = (await cookies()).get(TOKEN_KEY)?.value ?? null;
		this.headers = this.getHeaders(accessToken);

		let queryString = "";
		if (query) {
			queryString = new URLSearchParams(query as Record<string, string>).toString();
		}

		const urlWithQuery = queryString ? `${url}?${queryString}` : url;

		console.info(
			"GET LIST QUERY: ",
			JSON.stringify({
				query,
				url: urlWithQuery,
			})
		);

		return this.interceptRequest<T[], void>(() =>
			fetch(`${this.baseUrl}/${urlWithQuery}`, {
				headers: this.headers,
			})
		);
	}

	protected async handleResponse<T>(response: Response): Promise<T> {
		if (!response.ok) {
			const error = await response.json();
			console.info("Error happens from server side:", error);
			throw new Error(error.error || "An error occurred");
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
