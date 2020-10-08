// * -- libraries imports
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// * -- my own imports
// ---- components
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';
import EmailSent from '../../../shared/components/UIElements/Modal/SuccessModal/EmailSent/EmailSent';

// ---- functions / hooks
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { VALIDATOR_EMAIL } from '../../../shared/utils/validators';

// ---- styles
import classes from './ActivationForm.module.scss';

/**
 * Signup Component
 * * PARAMS:
 * ! WARNINGS:
 *      ! name of fileds in formState has to match with ids of inputs
 */
const ActivationForm = (props) => {
	const [activationFailed, setActivationFailed] = useState(false);
	const {
		isLoading,
		msg,
		sendRequest,
		clearMsg,
		requestSent,
		clearRequestSent,
		status,
	} = useHttpClient();
	const [formState, inputHandler, setFormData] = useForm({}, true);
	let history = useHistory();

	const changeModeHandler = () => {
		setFormData(
			{
				email: {
					value: '',
					isValid: false,
				},
			},
			false
		);
		setActivationFailed(true);
	};

	const activationSubmitHandler = async (event) => {
		event.preventDefault();

		if (!activationFailed) {
			try {
				await sendRequest(
					`${process.env.REACT_APP_SERVER_API_URL}/account/activate`,
					'POST',
					{
						'Content-Type': 'application/json',
						Authorization: `Bearer ${props.token}`,
					}
				);
				// !autologin
				history.replace({
					pathname: '/auth',
					search: '?action=login',
				});
			} catch (err) {
				changeModeHandler();
			}
		} else {
			// send request to /sendActivationEmail with email
		}
	};

	return (
		<React.Fragment>
			<EmailSent
				msg={msg}
				show={requestSent}
				onClear={clearRequestSent}
			/>
			<ErrorModal
				error={msg}
				onClear={clearMsg}
				show={!requestSent && !!msg}
			/>
			{isLoading && <LoadingSpinner asOverlay />}
			<form className={classes.Form} onSubmit={activationSubmitHandler}>
				{activationFailed && status === 403 && (
					<Input
						id="email"
						element="input"
						type="email"
						placeholder="E-mail"
						validators={[VALIDATOR_EMAIL()]}
						initialErrorMsg="Please enter a valid email address."
						onInput={inputHandler}
					/>
				)}
				<Button type="submit" disabled={!formState.isValid}>
					{activationFailed
						? 'Send activation email'
						: 'Activate your account'}
				</Button>
			</form>
		</React.Fragment>
	);
};

export default ActivationForm;

/* 

try {
			await sendRequest(
				`${process.env.REACT_APP_SERVER_API_URL}/account/activate`,
				'POST',
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${incomingToken}`,
				}
			);
		} catch (err) {}
*/
