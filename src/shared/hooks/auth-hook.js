import {useCallback, useEffect, useState} from 'react'

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState();
    const [tokenExpirationDate, setTokenExpirationDate] = useState()
    const [userId, setUserId] = useState();
    const [duringAutologin, setDuringAutologin] = useState(true)

	const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        setUserId(uid);

        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60) // 1h
        setTokenExpirationDate(tokenExpirationDate)

		localStorage.setItem(
            'userData',
            JSON.stringify({token: token})
			// JSON.stringify({ userId: uid, token: token, expiration: tokenExpirationDate.toISOString() })
		);
		
	}, []);

	const logout = useCallback(() => {
		setToken(null);
        setUserId(null);
        setTokenExpirationDate(null)
        localStorage.removeItem('userData')
	}, []);

	// autologin
	useEffect(() => {
        setDuringAutologin(true)
        const storedData = JSON.parse(localStorage.getItem('userData'));

		if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
			login(storedData.userId, storedData.token, new Date(storedData.expiration));
        }
        setDuringAutologin(false)
    }, [login]);
    
    // autologout (check expiration date)
    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
            logoutTimer = setTimeout(logout, remainingTime)
        } else {
            clearTimeout(logoutTimer)
        }
    }, [token, logout, tokenExpirationDate])

    return {token, login, logout, duringAutologin, userId}
}