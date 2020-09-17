import React, { useContext, useState } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { useHistory } from 'react-router-dom';

import Lock from '../../shared/components/UIElements/Lock/Lock';
import Form from '../../shared/components/FormElements/Form/Form';

const Auth = (props) => {
	const auth = useContext(AuthContext);
	const history = useHistory();

	const [lockIsClosed, setLockIsClose] = useState(false);
	const [signupActive, setSignupActive] = useState(false);

	const toggleLockStateHandler = () => {
		setLockIsClose((prevState) => {
			return !prevState;
		});
	};

	const togglePanelsHandler = () => {
		setSignupActive((prevState) => {
			return !prevState;
		});
	};

	const authSubmitHandler = async (event) => {
		event.preventDefault();
		auth.login('userId1', 'token');
		// console.log(history)
		history.push('/');
	};

	return (
		<Form
			rightPanelActive={signupActive}
			togglePannels={togglePanelsHandler}
		/>
		// <Lock lockClick={toggleLockStateHandler} closed={lockIsClosed} />
		// <div>
		//     {/* <h1>LOGIN PAGE</h1>
		//     <hr/>
		//     <form onSubmit={authSubmitHandler}>
		//         <button>LOGIN</button>
		//     </form> */}
		// </div>
	);
};

export default Auth;
