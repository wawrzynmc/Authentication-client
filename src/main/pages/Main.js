import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

import { AuthContext } from '../../shared/context/auth-context';
import Card from '../../shared/components/UIElements/Card/Card';
import Lock from '../../shared/components/UIElements/Lock/Lock';
import Passwords from '../../shared/components/FormElements/Input/Passwords/Passwords';

import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
	VALIDATOR_PASSWORD,
	VALIDATOR_PASSWORDS_COHERESION,
} from '../../shared/utils/validators';

import classes from './Main.module.scss';

const Main = (props) => {
	const [lockIsClosed, setLockIsClose] = useState(false);
	const history = useHistory();

	const toggleLockStateHandler = () => {
		setLockIsClose((prevState) => {
			return !prevState;
		});
		setTimeout(() => {
			history.push('/auth');
		}, 500);
	};

	const auth = useContext(AuthContext);
	return (
		// <React.Fragment>
		// 	<Card information>
		// 		<div className={classes.Typing}>
		// 			<Typewriter
		// 				onInit={(typewriter) => {
		// 					typewriter
		// 						.typeString('> Cześć! 👋')
		// 						.pauseFor(1500)
		// 						.typeString('<br>> Fajnie Cię tu widzieć! 🙃')
		// 						.pauseFor(1500)
		// 						.typeString(
		// 							'<br><br><br>> Naciśnij na poniższą 🔒 by założyć konto.'
		// 						)
		// 						.start();
		// 				}}
		// 				options={{
		// 					cursor: '_',
		// 					delay: '40',
		// 				}}
		// 			/>
		// 		</div>
		// 		<Lock
		// 			logo
		// 			lockClick={toggleLockStateHandler}
		// 			closed={lockIsClosed}
		// 		/>
		// 	</Card>
		// </React.Fragment>
		<Passwords
			validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_PASSWORD()]}
		/>
	);
};

export default Main;

// options={{
// autoStart: true,
// loop: false,
// }}
