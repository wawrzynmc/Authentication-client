import { createContext } from 'react';

export const AuthContext = createContext({
	isLoggedIn: false,
	token: null,
	userId: null,
	userRole: null,
	login: (userId, userRole, token, expirationDate) => {},
	logout: () => {},
});
