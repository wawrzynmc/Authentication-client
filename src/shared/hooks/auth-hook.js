import { useCallback, useEffect, useState } from 'react';

let logoutTimer;

export const useAuth = () => {
	const [token, setToken] = useState();
	const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [userId, setUserId] = useState();
	const [userRole, setUserRole] = useState();
	const [duringAutologin, setDuringAutologin] = useState(true);

	const login = useCallback((userId, userRole, token, expirationDate) => {
		setToken(token);
		setUserId(userId);
		setUserRole(userRole);

		const tokenExpirationDate =
			expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // 1h
		setTokenExpirationDate(tokenExpirationDate);

		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: userId,
				userRole: userRole,
				token: token,
				expiration: tokenExpirationDate.toISOString(),
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		setTokenExpirationDate(null);
		localStorage.removeItem('userData');
	}, []);

	// autologin
	useEffect(() => {
		setDuringAutologin(true);
		const storedData = JSON.parse(localStorage.getItem('userData'));

		if (
			storedData &&
			storedData.token &&
			new Date(storedData.expiration) > new Date()
		) {
			login(
				storedData.userId,
				storedData.userRole,
				storedData.token,
				new Date(storedData.expiration)
			);
		}
		setDuringAutologin(false);
	}, [login]);

	// autologout (check expiration date)
	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime =
				tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	return { token, login, logout, userRole, duringAutologin, userId };
};
