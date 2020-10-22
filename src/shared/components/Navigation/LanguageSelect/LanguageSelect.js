import React from 'react';

import ukFlag from '../../../../assets/images/uk.png';
import polandFlag from '../../../../assets/images/poland.png';

import classes from './LanguageSelect.module.scss';

const LanguageSelect = (props) => {
	return (
		<li className={classes.LanguageSelect}>
			<button className={classes.LanguageSelect__Button}>
				<img
					src={ukFlag}
					alt="uk flag"
					className={classes.LanguageSelect__Image}
				/>
			</button>
		</li>
	);
};

export default LanguageSelect;
