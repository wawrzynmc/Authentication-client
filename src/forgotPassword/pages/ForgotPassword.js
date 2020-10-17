// * -- libraries imports
import React from 'react';

// * -- my own imports
// ---- components
import Card from '../../shared/components/UIElements/Card/Card';
import ForgotPasswordForm from '../components/ForgotPasswordForm/ForgotPasswordForm';

// ---- styles
import classes from './ForgotPassword.module.scss';

const ForgotPassword = (props) => {
	return (
		<Card>
			<h1 className={classes.Header}>Reset your password</h1>
			<p className={classes.Information}>
				Enter your user account's verified email address <br />
				and we will send you a password reset link.
			</p>
			<span className={classes.HorizontalLine}></span>
			<ForgotPasswordForm />
		</Card>
	);
};

export default ForgotPassword;
