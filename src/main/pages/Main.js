import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../shared/context/auth-context';
import Card from '../../shared/components/UIElements/Card/Card';
import Lock from '../../shared/components/UIElements/Lock/Lock';

import classes from './Main.module.scss';

const Main = (props) => {
	const { t } = useTranslation(['translation', 'error']);
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
			<Card className={classes.MainCard}>
				<div className={classes.MainTypewriter}>
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
				<Lock
					className={classes.MainLock}
					lockClick={lockClickedHandler}
					closed={lockIsClosed}
				/>
			</Card>
		</React.Fragment>
	);
};

export default Main;
