import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [msg, setMsg] = useState();
	const [requestSent, setRequestSent] = useState(false);
	const [status, setStatus] = useState();

	const activeHttpRequests = useRef([]);

	const sendRequest = useCallback(
		async (url, method = 'GET', body = null, headers = {}) => {
			console.log('useHttpClient - sendRequest');
			setIsLoading(true);
			const httpAbortCtrl = new AbortController(); // prevent error if you send request and change the page
			activeHttpRequests.current.push(httpAbortCtrl);

			try {
				const response = await fetch(url, {
					method,
					body,
					headers,
					signal: httpAbortCtrl.signal,
				});

				const responseData = await response.json();
				activeHttpRequests.current = activeHttpRequests.current.filter(
					(reqCtrl) => reqCtrl !== httpAbortCtrl
				);

				if (!response.ok) {
					// .ok exists on 200 like status codes
					const error = new Error(responseData.message);
					error.status = responseData.status;
					throw error;
				}
				setIsLoading(false);
				setRequestSent(true);
				setMsg(responseData.message);
				setStatus(responseData.status);
				return responseData;
			} catch (err) {
				setMsg(err.message);
				setStatus(err.status);
				setIsLoading(false);
				setRequestSent(false);
				throw err;
			}
		},
		[]
	);

	const clearMsg = useCallback(() => setMsg(null), []);

	const clearRequestSent = useCallback(() => {
		clearMsg();
		setRequestSent(false);
	}, [clearMsg]);

	useEffect(() => {
		// run on unmount component, or before next execution of useEffect function
		return () => {
			activeHttpRequests.current.forEach((abortCtrl) =>
				abortCtrl.abort()
			);
		};
	}, []);

	return {
		isLoading,
		msg,
		sendRequest,
		clearMsg,
		requestSent,
		clearRequestSent,
		status,
	};
};
