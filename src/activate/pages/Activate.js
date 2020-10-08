// * -- libraries imports
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jwt from 'jsonwebtoken';

// * -- my own imports
// ---- components
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';
import SuccessModal from '../../shared/components/UIElements/Modal/SuccessModal/SuccessModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import Card from '../../shared/components/UIElements/Card/Card';
// ---- functions / hooks
import { useHttpClient } from '../../shared/hooks/http-hook';

const Activate = (props) => {
	// * -- variables
	const {
		isLoading,
		msg: httpMsg,
		sendRequest,
		clearMsg: clearHttpMsg,
		requestSent,
		clearRequestSent,
	} = useHttpClient();
	const [tokenData, setTokenData] = useState({
		name: null,
	});
	const [internalError, setInternalError] = useState(null);
	const incomingToken = useParams().token;

	// * - -functions
	useEffect(() => {
		try {
			let { name } = jwt.decode(incomingToken);
			setTokenData({ name: name });
		} catch (err) {
			setInternalError('Invalid token. This is pretty disturbing 🤔');
		}
	}, [incomingToken]);

	const clearMsgs = () => {
		clearHttpMsg();
		setInternalError(null);
	};

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

	return (
		<React.Fragment>
			<SuccessModal
				msg={httpMsg}
				show={requestSent}
				onCancel={clearRequestSent}
			/>
			<ErrorModal
				error={httpMsg || internalError}
				onClear={clearMsgs}
				show={(!requestSent && !!httpMsg) || !!internalError}
			/>
			{isLoading && <LoadingSpinner />}
			<Card>Activate your account {tokenData.name}</Card>
		</React.Fragment>
	);
};

export default Activate;
