import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../shared/context/auth-context';
import Card from '../../shared/components/UIElements/Card/Card';
import Lock from '../../shared/components/UIElements/Lock/Lock';

import classes from './Main.module.scss';

const Main = (props) => {
	const { t } = useTranslation();
	const auth = useContext(AuthContext);
	const [lockIsClosed, setLockIsClosed] = useState(auth.isLoggedIn);

	const history = useHistory();

	const lockClickedHandler = () => {
		const { isLoggedIn } = auth;
		let pathname, search;

		if (isLoggedIn) {
			pathname = '/';
			search = null;
			auth.logout();
		} else {
			pathname = '/auth';
			search = '?action=signup';
		}

		setLockIsClosed((prevState) => {
			return !prevState;
		});

		setTimeout(() => {
			history.push({ pathname: pathname, search: search });
		}, 500);
	};

	return (
		<React.Fragment>
			<Card information>
				<div className={classes.Typing}>
					<Typewriter
						options={{
							strings: [
								auth.isLoggedIn
									? t('Main.Card.TypeWriter.loggedIn')
									: t('Main.Card.TypeWriter.!loggedIn'),
							],
							autoStart: true,
							cursor: '_',
							delay: '40',
							deleteSpeed: 3600000, // workaround
						}}
					/>
				</div>
				<div>
					<Lock
						logo
						lockClick={lockClickedHandler}
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
