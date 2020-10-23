import React from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '../Modal';
import Button from '../../../FormElements/Button/Button';

const ErrorModal = (props) => {
	console.log(props.error);
	const { t } = useTranslation(['translation', 'errors']);
	return (
		<Modal
			onCancel={props.onClear}
			header="An Error Occurred"
			iconClass="fas fa-exclamation-triangle"
			type="error"
			show={props.show}
			footer={<Button onClick={props.onClear}>Confirm</Button>}
			backdropStyle={{ zIndex: 300 }}
		>
			<p>{`${t(`errors:SIGNUP.${props.error}`)}`}</p>
		</Modal>
	);
};

export default ErrorModal;
