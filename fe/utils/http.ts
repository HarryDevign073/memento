import { ToastProps } from "@/components/ui/toast";

import { HttpResponse } from "@/types/http";

interface IHttpResponse<T> {
	response: T | HttpResponse;
	setToast?: (toast: ToastProps | undefined) => void;
	successState?: {
		title?: string;
		message?: string;
	};
	errorState?: {
		title?: string;
		message?: string;
	};
	callback?: () => void;
}

export const handleHttpResponse = <T>({ response, setToast, successState, errorState, callback }: IHttpResponse<T>) => {
	if ((response as HttpResponse)?.error) {
		const res = response as HttpResponse;

		if (setToast) {
			setToast({
				type: "error",
				message: res?.error || errorState?.message || "Something went wrong",
				title: errorState?.title || "Error",
			});
		}
	} else {
		if (setToast) {
			setToast({
				type: "success",
				message: successState?.message || "Successfully",
				title: successState?.title || "Success",
			});

			if (callback) {
				callback();
			}
		}
	}
};