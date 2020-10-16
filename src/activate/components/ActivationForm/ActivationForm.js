// * -- libraries imports
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// * -- my own imports
// ---- components
import Input from '../../../shared/components/FormElements/Input/Input';
import Button from '../../../shared/components/FormElements/Button/Button';
import TextBetweenLines from '../../../shared/components/UIElements/Text/TextBetweenLines/TextBetweenLines';
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
	const [isRedirectToSignup, setIsRedirectToSignup] = useState(true);
	const [activationFailed, setActivationFailed] = useState(false);
	const {
		isLoading,
		msg,
		sendRequest,
		clearMsg,
		requestSent,
		clearRequestSent,
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
				const responseData = await sendRequest(
					`${process.env.REACT_APP_SERVER_API_URL}/account/activate`,
					'POST',
					JSON.stringify({
						token: props.token,
					}),
					{
						'Content-Type': 'application/json',
					}
				);
				history.push({
					pathname: '/auth',
					search: '?action=login',
					state: {
						activation: true,
						user: { ...responseData.user },
					},
				});
			} catch (err) {
				if (err.status === 401) {
					changeModeHandler();
				} else {
					setFormData({}, false);
					setIsRedirectToSignup(false);
				}
			}
		} else {
			try {
				await sendRequest(
					`${process.env.REACT_APP_SERVER_API_URL}/account/send-activation-email`,
					'POST',
					JSON.stringify({
						email: formState.inputs.email.value,
					}),
					{
						'Content-Type': 'application/json',
					}
				);
			} catch (err) {
				if (err.status === 403) {
					setFormData({ ...formState.inputs }, false);
					setIsRedirectToSignup(false);
				}
			}
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
				{activationFailed && (
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
				<Button
					type="submit"
					disabled={!formState.isValid}
					style={{ padding: '1rem 2.5rem' }}
				>
					{activationFailed
						? 'Send activation email'
						: 'Activate your account'}
				</Button>
			</form>
			<TextBetweenLines>or</TextBetweenLines>
			<Button
				inverse
				to={{
					pathname: '/auth',
					search: `?action=${
						isRedirectToSignup ? 'signup' : 'signin'
					}`,
				}}
			>
				{isRedirectToSignup ? 'signup' : 'signin'}
			</Button>
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
