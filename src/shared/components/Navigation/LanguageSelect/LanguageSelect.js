import React from 'react';
import { useTranslation } from 'react-i18next';

import ukFlag from '../../../../assets/images/uk.png';
import polandFlag from '../../../../assets/images/poland.png';

import classes from './LanguageSelect.module.scss';

const LanguageSelect = () => {
	const { i18n } = useTranslation();

	const changeLanguageHandler = () => {
		const newLng = i18n.language === 'en' ? 'pl' : 'en';
		i18n.changeLanguage(newLng);
	};

	return (
		<li className={classes.LanguageSelect}>
			<button
				onClick={changeLanguageHandler}
				className={classes.LanguageSelect__Button}
			>
				<img
					src={i18n.language === 'en' ? polandFlag : ukFlag}
					alt="uk flag"
					className={classes.LanguageSelect__Image}
				/>
			</button>
		</li>
	);
};

export default LanguageSelect;
