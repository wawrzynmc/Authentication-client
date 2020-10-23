import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../shared/context/auth-context';
import { LanguageContext } from '../../shared/context/language-context';
import Card from '../../shared/components/UIElements/Card/Card';
import Lock from '../../shared/components/UIElements/Lock/Lock';

import classes from './Main.module.scss';

const Main = (props) => {
	const { t, i18n } = useTranslation();
	const [lockIsClosed, setLockIsClose] = useState(false);
	const auth = useContext(AuthContext);
	const lng = useContext(LanguageContext);

	const history = useHistory();

	const toggleLockStateHandler = () => {
		setLockIsClose((prevState) => {
			return !prevState;
		});
		setTimeout(() => {
			history.push({ pathname: '/auth', search: '?action=signup' });
		}, 500);
	};

	console.log(lng.language);

	return (
		<React.Fragment>
			<Card information>
				<div className={classes.Typing}>
					<Typewriter
						options={{
							strings: [t('Main.Card.TypeWriter')],
							autoStart: true,
							cursor: '_',
							delay: '70',
							deleteSpeed: 3600000, // temp solution
						}}
					/>
				</div>
				<div>
					<Lock
						logo
						lockClick={toggleLockStateHandler}
						closed={lockIsClosed}
					/>
				</div>
			</Card>
		</React.Fragment>
	);
};

export default Main;

// options={{
// autoStart: true,
// loop: false,
// }}

// onInit={(typewriter) => {
// 	typewriter
// 		.typeString(`> ${t('Main.Card.1')} 👋`)
// 		.pauseFor(1500)
// 		.typeString('<br>> Fajnie Cię tu widzieć! 🙃')
// 		.pauseFor(1500)
// 		.typeString(
// 			'<br><br><br>> Naciśnij na poniższą 🔒 by założyć konto.'
// 		)
// 		.pauseFor(1500)
// 		.deleteAll()
// 		.start();
// }}
