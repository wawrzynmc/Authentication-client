import React, { useContext, useState } from 'react';
import { AuthContext } from '../../shared/context/auth-context';

import Card from '../../shared/components/UIElements/Card/Card';
import Lock from '../../shared/components/UIElements/Lock/Lock';

import classes from './Main.modules.scss';

const Main = (props) => {
	const [lockIsClosed, setLockIsClose] = useState(false);

	const toggleLockStateHandler = () => {
		setLockIsClose((prevState) => {
			return !prevState;
		});
	};

	const auth = useContext(AuthContext);
	return (
		<React.Fragment>
			<Card information>
				<div className={classes.Typing}>
					<p>Siemanko Co tam byczku</p>
				</div>
			</Card>
			<Lock lockClick={toggleLockStateHandler} closed={lockIsClosed} />
		</React.Fragment>
	);
};

export default Main;
