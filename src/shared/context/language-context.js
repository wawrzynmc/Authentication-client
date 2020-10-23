import React, { createContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageContext = createContext({
	language: null,
	changeLanguage: () => {},
});

const LanguageContextProvider = (props) => {
	const [language, setLanguage] = useState('en');
	const { t, i18n } = useTranslation();

	const changeLanguageHandler = () => {
		setLanguage((prevState) => {
			return prevState === 'en' ? 'pl' : 'en';
		});
		i18n.changeLanguage(language);
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
