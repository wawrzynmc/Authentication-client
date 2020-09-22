import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Form from '../../shared/components/FormElements/Form/Form';

import { AuthContext } from '../../shared/context/auth-context';

const Auth = (props) => {
	const auth = useContext(AuthContext);
	const history = useHistory();

	const togglePanelsHandler = () => {
		// setIsLoginMode((prevState) => {
		// 	return !prevState;
		// });
	};

	const authSubmitHandler = async (event) => {
		event.preventDefault();
		auth.login('userId1', 'token');
		// console.log(history)
		history.push('/');
	};

	return (
		<Form
		// rightPanelActive={!setIsLoginMode}
		// togglePannels={togglePanelsHandler}
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
