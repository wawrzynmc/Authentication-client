// * -- libraries imports
import React, { useEffect, useState, useParams } from 'react';
import jwt from 'jsonwebtoken';

// * -- my own imports
// ---- components

// ---- functions / hooks
import { useHttpClient } from '../../shared/hooks/http-hook';

const Activate = (props) => {
	// * -- variables
	const {
		isLoading,
		msg,
		sendRequest,
		clearMsg,
		requestSent,
		clearRequestSent,
	} = useHttpClient();
	const [tokenData, setTokenData] = useState({
		name: null,
	});
	const incomingToken = useParams().token;

	// * - -functions
	useEffect(() => {
		let { name } = jwt.decode(incomingToken);
		setTokenData({ name: name });
	}, [incomingToken, setTokenData]);

	const activateSubmitHandler = async (event) => {
		event.preventDefault();

		try {
			await sendRequest(
				`${process.env.REACT_APP_SERVER_API_URL}/account/signup`,
				'POST',
				JSON.stringify({
					token: incomingToken,
				}),
				{ 'Content-Type': 'application/json' }
			);
		} catch (err) {}
	};

	return <h1>Activate me</h1>;
};

export default Activate;
