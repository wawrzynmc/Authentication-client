import React from 'react';

import QuestionModal from '../QuestionModal';

import classes from './SendEmail.module.scss';

const SendEmail = (props) => {
	return (
		<QuestionModal
			header={'Send activation email'}
			button1InlineText={'send'}
			{...props}
		>
			<p>
				Your accont is{' '}
				<span className={`${classes.text} ${classes.text_warning}`}>
					inactive
				</span>{' '}
				<br />
				Do you want to send you an activation email to your address (
				{props.email})
			</p>
		</QuestionModal>
	);
};

export default SendEmail;
