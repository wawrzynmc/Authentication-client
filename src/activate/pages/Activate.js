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
import Button from '../../shared/components/FormElements/Button/Button';
import TextBetweenLines from '../../shared/components/UIElements/Text/TextBetweenLines/TextBetweenLines';
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
			setTokenData({ name: name });
		} catch (err) {
			setTokenData({ name: 'unknown user' });
		}
	}, [incomingToken]);
	return (
		<React.Fragment>
			<Card>
				<h1 className={classes.Header}>Welcome {tokenData.name}</h1>
				<ActivationForm token={incomingToken} />
				<TextBetweenLines>or</TextBetweenLines>
				<Button
					inverse
					// type="button"
					to={{ pathname: '/auth', search: '?action=signup' }}
				>
					Signup
				</Button>
			</Card>
		</React.Fragment>
	);
};

export default Activate;

/* 
<React.Fragment>
			<SuccessModal
				msg={msg}
				show={requestSent}
				onCancel={clearRequestSent}
			/>
			<ErrorModal
				error={msg}
				onClear={clearMsg}
				show={!requestSent && !!msg}
			/>
			{isLoading && <LoadingSpinner />}
			<Card>
				<h1 className={classes.Header}>Welcome {tokenData.name}!</h1>
				<form
					className={classes.Form}
					onSubmit={activateAccountHandler}
				>
					<div>
						<Button type="submit">Activate your account</Button>
					</div>
					<TextBetweenLines>or</TextBetweenLines>
					<div>
						<Button
							inverse
							// type="button"
							to={{ pathname: '/auth', search: '?action=signup' }}
						>
							Signup
						</Button>
					</div>
				</form>
			</Card>
		</React.Fragment>

*/
