// * -- libraries imports
import React from 'react';

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
import classes from './ForgotPasswordForm.module.scss';

const ForgotPasswordForm = (props) => {
	const {
		isLoading,
		msg,
		sendRequest,
		clearMsg,
		requestSent,
		clearRequestSent,
	} = useHttpClient();

	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	const activationSubmitHandler = async (event) => {
		event.preventDefault();
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
			{/* {isLoading && <LoadingSpinner asOverlay />} */}
			<form className={classes.Form} onSubmit={activationSubmitHandler}>
				<Input
					id="email"
					element="input"
					type="email"
					placeholder="E-mail"
					validators={[VALIDATOR_EMAIL()]}
					initialErrorMsg="Please enter a valid email address."
					onInput={inputHandler}
					withLabel
					label={'Email'}
				/>

				<Button
					type="submit"
					disabled={!formState.isValid}
					style={{ padding: '1rem 2.5rem' }}
				>
					Send password reset email
				</Button>
			</form>
		</React.Fragment>
	);
};

export default ForgotPasswordForm;
