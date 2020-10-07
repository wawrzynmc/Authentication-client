import React from 'react';

import Modal from '../Modal';
import Button from '../../../FormElements/Button/Button';

const ErrorModal = (props) => {
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
			<p>{props.error}</p>
		</Modal>
	);
};

export default ErrorModal;
