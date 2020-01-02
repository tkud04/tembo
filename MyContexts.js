import React, {createContext} from 'react';

export const ThemeContext = createContext('green');
const user = {
	name: 'Guest',
	password: '',
	email: 'Sign in',
	phone: '0'
};

export const UserContext = createContext({
	user: user,
	up: () => {},
	loggedIn: false
});
