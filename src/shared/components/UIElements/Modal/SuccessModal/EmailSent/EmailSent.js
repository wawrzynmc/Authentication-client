import React from 'react';
import SuccessModal from '../SuccessModal';

import classes from './EmailSent.module.scss';

const EmailSent = (props) => {
	return (
		<SuccessModal show={props.show}>
			<p>Activation email has been sent!</p>
			<div className={classes.Content}>
				<i
					className={`${classes.Content__envelope} ${classes.Content__envelopeOpened} far fa-envelope-open`}
				></i>
				<i
					className={`${classes.Content__envelope} ${classes.Content__envelopeClosed} far fa-envelope`}
				></i>
			</div>
		</SuccessModal>
	);
};

export default EmailSent;
