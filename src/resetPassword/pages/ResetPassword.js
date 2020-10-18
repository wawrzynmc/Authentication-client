// * -- libraries imports
import React from 'react';
import { useParams } from 'react-router-dom';

// * -- my own imports
// ---- components
import Card from '../../shared/components/UIElements/Card/Card';
import ResetPasswordForm from '../components/ResetPasswordForm/ResetPasswordForm';

// ---- styles
import classes from './ResetPassword.module.scss';

const ResetPassword = (props) => {
	const incomingToken = useParams().token;

	return (
		<Card>
			<h1 className={classes.Header}>Change your password</h1>
			<p className={classes.Information}>
				Change your password using below form.
			</p>
			<span className={classes.HorizontalLine}></span>
			<ResetPasswordForm token={incomingToken} />
		</Card>
	);
};

export default ResetPassword;
