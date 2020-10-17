// * -- libraries imports
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jwt from 'jsonwebtoken';

// * -- my own imports
// ---- components
import Card from '../../shared/components/UIElements/Card/Card';
import ActivationForm from '../components/ActivationForm/ActivationForm';

// ---- styles
import classes from './Activate.module.scss';

const Activate = (props) => {
	// * -- variables
	const [tokenData, setTokenData] = useState({
		name: null,
	});

	const incomingToken = useParams().token;

	// * - -functions
	useEffect(() => {
		try {
			let { name } = jwt.decode(incomingToken);
			setTokenData({ name });
		} catch (err) {
			setTokenData({ name: 'unknown user' });
		}
	}, [incomingToken]);
	return (
		<Card>
			<h1 className={classes.Header}>Welcome {tokenData.name}</h1>
			<ActivationForm token={incomingToken} />
		</Card>
	);
};

export default Activate;
