import React, { createContext, useState } from 'react';

export const LanguageContext = createContext({
	language: null,
	changeLanguage: () => {},
});

const LanguageContextProvider = (props) => {
	const [language, setLanguage] = useState('en');

	const changeLanguageHandler = () => {
		setLanguage((prevState) => {
			return prevState === 'en' ? 'pl' : 'en';
		});
	};

	return (
		<LanguageContext.Provider
			value={{
				changeLanguage: changeLanguageHandler,
				language: language,
			}}
		>
			{props.children}
		</LanguageContext.Provider>
	);
};

export default LanguageContextProvider;
