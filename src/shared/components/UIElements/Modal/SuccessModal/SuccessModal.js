import React from 'react';

import Modal from '../Modal';
import Button from '../../../FormElements/Button/Button';

const Success = (props) => {
	return (
		<Modal
			onCancel={props.onClear}
			header="Operation succeeded"
			iconClass="far fa-check-circle"
			show={props.show}
			footer={<Button onClick={props.onClear}>Confirm</Button>}
			backdropStyle={{ zIndex: 300 }}
		>
			<p>{props.error}</p>
		</Modal>
	);
};

export default Success;
