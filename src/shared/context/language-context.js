import React, { createContext } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageContext = createContext({
	language: null,
});

const LanguageContextProvider = (props) => {
	const { i18n } = useTranslation();

	return (
		<LanguageContext.Provider value={{ language: i18n.language }}>
			{props.children}
		</LanguageContext.Provider>
	);
};

export default LanguageContextProvider;
