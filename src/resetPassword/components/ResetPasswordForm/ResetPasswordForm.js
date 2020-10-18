// * -- libraries imports
import React from 'react';
import { useHistory } from 'react-router-dom';

// * -- my own imports
// ---- components
import Passwords from '../../../shared/components/FormElements/Input/Passwords/Passwords';
import Button from '../../../shared/components/FormElements/Button/Button';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal/ErrorModal';

// ---- functions / hooks
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { VALIDATOR_MINLENGTH } from '../../../shared/utils/validators';

// ---- styles
import classes from './ResetPasswordForm.module.scss';

const ForgotPasswordForm = (props) => {
	const {
		isLoading,
		msg,
		sendRequest,
		clearMsg,
		requestSent,
		clearRequestSent,
	} = useHttpClient();
	const history = useHistory();

	const [formState, inputHandler, clearFormData] = useForm(
		{
			password1: {
				value: '',
				isValid: false,
			},
			password2: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	const resetPasswordSubmitHandler = async (event) => {
		event.preventDefault();

		try {
			await sendRequest(
				`${process.env.REACT_APP_SERVER_API_URL}/account/reset-password`,
				'PUT',
				JSON.stringify({
					password: formState.inputs.password1.value,
					token: props.token,
				}),
				{
					'Content-Type': 'application/json',
				}
			);
			history.push({
				pathname: '/auth',
				search: '?action=signin',
				state: {
					success: true,
					message: 'Password has been sucessfully changed.',
				},
			});
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<ErrorModal
				error={msg}
				onClear={clearMsg}
				show={!requestSent && !!msg}
			/>
			{isLoading && <LoadingSpinner asOverlay />}
			<form
				className={classes.Form}
				onSubmit={resetPasswordSubmitHandler}
			>
				<Passwords
					password1Validate
					validators={[VALIDATOR_MINLENGTH(6)]}
					onInput={inputHandler}
					reset={requestSent}
				/>
				<Button type="submit" disabled={!formState.isValid}>
					reset password
				</Button>
			</form>
		</React.Fragment>
	);
};

export default ForgotPasswordForm;
