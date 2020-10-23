import React, { useContext } from 'react';

import { LanguageContext } from '../../../context/language-context';

import ukFlag from '../../../../assets/images/uk.png';
import polandFlag from '../../../../assets/images/poland.png';

import classes from './LanguageSelect.module.scss';

const LanguageSelect = (props) => {
	const lng = useContext(LanguageContext);

	const changeLanguageHandler = () => {
		lng.changeLanguage();
	};

	return (
		<li className={classes.LanguageSelect}>
			<button
				onClick={changeLanguageHandler}
				className={classes.LanguageSelect__Button}
			>
				<img
					src={lng.language === 'en' ? ukFlag : polandFlag}
					alt="uk flag"
					className={classes.LanguageSelect__Image}
				/>
			</button>
		</li>
	);
};

export default LanguageSelect;
