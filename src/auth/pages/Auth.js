import React, { useContext, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button/Button';
import Input from '../../shared/components/FormElements/Input/Input';
import {
	Facebook as FacebookLogin,
	Google as GoogleLogin,
} from '../../shared/components/FormElements/Socials/Socials';

import { useForm } from '../../shared/hooks/form-hook'; // custom hook
import { useHttpClient } from '../../shared/hooks/http-hook'; // custom hook
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
	VALIDATOR_PASSWORD,
	VALIDATOR_PASSWORDS_COHERESION,
} from '../../shared/utils/validators';

import { AuthContext } from '../../shared/context/auth-context';

import classes from './Auth.module.scss';

const Auth = (props) => {
	// -- variables
	const [isLoginMode, setIsLoginMode] = useState(false);
	const auth = useContext(AuthContext);

	// call for my won hook for managing http request
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	// call for my own hook
	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: '',
				isValid: false,
			},
			password: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	// -- functions
	const switchModeHandler = () => {
		if (!isLoginMode) {
			// switch from SINGUP to LOGIN
			setFormData(
				{
					...formState.inputs,
					name: undefined,
					password2: undefined,
				},
				formState.inputs.email.isValid &&
					formState.inputs.password.isValid
			);
		} else {
			// switch from LOGIN to SINGUP
			setFormData(
				{
					...formState.inputs,
					name: {
						value: '',
						isValid: false,
					},
					email: {
						value: '',
						isValid: false,
					},
					password: {
						value: '',
						isValid: false,
					},
					password2: {
						value: '',
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode((prevMode) => !prevMode);
	};

	// console.log('form', formState.inputs.password2);

	return (
		<div
			className={`
				${classes.Container} 
				${!isLoginMode && classes.Container_secondPanelActive}
			`}
		>
			<div
				className={`
					${classes.FormContainer} 
					${classes.FormContainer_signup}
				`}
			>
				<h1 className={classes.FormContainer__Title}>Create Account</h1>
				<div className={classes.FormContainer__Socials}>
					<FacebookLogin />
					<GoogleLogin />
				</div>
				<span className={classes.FormContainer__paragraph}>
					or fill the form
				</span>
				<form className={classes.Form} action="#">
					<Input
						element="input"
						id="name"
						type="text"
						placeholder="Name"
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter a name"
						onInput={inputHandler}
					/>
					<Input
						id="email"
						element="input"
						type="email"
						placeholder="E-mail"
						validators={[VALIDATOR_EMAIL()]}
						errorText="Please enter a valid email address."
						onInput={inputHandler}
					/>
					<Input
						id="password"
						element="input"
						type="password"
						placeholder="Password"
						validators={
							isLoginMode
								? [VALIDATOR_MINLENGTH(6)]
								: [
										VALIDATOR_MINLENGTH(6),
										VALIDATOR_PASSWORD(),
										VALIDATOR_PASSWORDS_COHERESION(
											formState.inputs.password2
												? formState.inputs.password2
														.value
												: ''
										),
								  ]
						}
						errorText="Please enter a valid passsword (at least 6 characters)."
						onInput={inputHandler}
						validatePassword={isLoginMode ? false : true}
						changeFormData={setFormData}
						isPassword
					/>
					<Input
						id="password2"
						element="input"
						type="password"
						placeholder="Password confirmation"
						validators={[
							VALIDATOR_MINLENGTH(6),
							VALIDATOR_PASSWORDS_COHERESION(
								formState.inputs.password.value
							),
						]}
						errorText="Passwords don't match."
						onInput={inputHandler}
						isPassword
					/>
					<Button type="submit" disabled={!formState.isValid}>
						SINGUPaaa
					</Button>
				</form>
			</div>
			<div
				className={`${classes.FormContainer} ${classes.FormContainer_signin}`}
			>
				<form action="#">
					<h1 className={classes.FormContainer__Title}>Sign in</h1>
					<div className={classes.FormContainer__Socials}>
						<FacebookLogin />
						<GoogleLogin />
					</div>
					<span className={classes.FormContainer__paragraph}>
						or fill the form
					</span>
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<a href="#">Forgot your password?</a>
					<Button type="submit" disabled={!formState.isValid}>
						SINGUP
					</Button>
				</form>
			</div>
			<div className={classes.OverlayContainer}>
				<div className={classes.OverlayContainer__Overlay}>
					<div
						className={`${classes.OverlayContainer__Panel} ${classes.OverlayContainer__Panel_first}`}
					>
						<h1 className={classes.OverlayContainer__Title}>
							Welcome Back
						</h1>
						<span className={classes.OverlayContainer__Information}>
							<p>
								Enter your personal details, <br />
								log in and have fun!
							</p>
							<h1>
								<span>or</span>
							</h1>
						</span>
						<Button ghost onClick={switchModeHandler}>
							SIGNIN
						</Button>
					</div>
					<div
						className={`${classes.OverlayContainer__Panel} ${classes.OverlayContainer__Panel_second}`}
					>
						<h1 className={classes.OverlayContainer__Title}>
							First Time Here?
						</h1>
						<span className={classes.OverlayContainer__Information}>
							<p>
								Enter your personal details, <br />
								create an account and start the journey!
							</p>
							<h1>
								<span>or</span>
							</h1>
						</span>
						{/* GHOST className */}
						<Button ghost onClick={switchModeHandler}>
							SIGNUP
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

// return (
// <Form
// rightPanelActive={!setIsLoginMode}
// togglePannels={togglePanelsHandler}
// />
// <Lock lockClick={toggleLockStateHandler} closed={lockIsClosed} />
// <div>
//     {/* <h1>LOGIN PAGE</h1>
//     <hr/>
//     <form onSubmit={authSubmitHandler}>
//         <button>LOGIN</button>
//     </form> */}
// </div>
// );

export default Auth;
