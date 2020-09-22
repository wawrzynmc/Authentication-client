import React, { useState, useContext } from 'react';

import Button from '../Button/Button';
import Input from '../Input/Input';

import { useForm } from '../../../hooks/form-hook'; // custom hook
import { useHttpClient } from '../../../hooks/http-hook'; // custom hook
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../../utils/validators';

import classes from './Form.module.scss';

const Form = (props) => {
	// -- variables
	const [isLoginMode, setIsLoginMode] = useState(true);

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
					image: undefined,
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
					image: {
						value: null,
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode((prevMode) => !prevMode);
	};
	let attachedClasses = [classes.Container];
	if (!isLoginMode) {
		attachedClasses.push(classes.Container_secondPanelActive);
	}
	return (
		<div className={attachedClasses.join(' ')}>
			<div
				className={`${classes.FormContainer} ${classes.FormContainer_signup}`}
			>
				<form action="#">
					<h1 className={classes.FormContainer__Title}>
						Create Account
					</h1>
					<div className={classes.FormContainer__Socials}>
						<a href="#" className={classes.FormContainer__Social}>
							<i className="fab fa-facebook-f"></i>
						</a>
						<a href="#" className={classes.FormContainer__Social}>
							<i className="fab fa-google-plus-g"></i>
						</a>
						<a href="#" className={classes.FormContainer__Social}>
							<i className="fab fa-linkedin-in"></i>
						</a>
					</div>
					<span className={classes.FormContainer__paragraph}>
						or fill the form
					</span>
					<Input
						element="input"
						id="name"
						type="text"
						label="Your name"
						placeholder="Name"
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter a name"
						onInput={inputHandler}
					/>
					<Input
						id="email"
						element="input"
						type="email"
						label="E-mail"
						placeholder="E-mail"
						validators={[VALIDATOR_EMAIL()]}
						errorText="Please enter a valid email address."
						onInput={inputHandler}
					/>
					<Input
						id="password"
						element="input"
						type="password"
						label="Password"
						placeholder="Password"
						validators={[VALIDATOR_MINLENGTH(6)]}
						errorText="Please enter a valid passsword (at least 6 characters)."
						onInput={inputHandler}
					/>
					<Input
						id="password2"
						element="input"
						type="password"
						label="Password confirmation"
						placeholder="Password confirmation"
						validators={[VALIDATOR_MINLENGTH(6)]}
						errorText="Please enter a valid passsword (at least 6 characters)."
						onInput={inputHandler}
					/>
					<Button type="submit" disabled={!formState.isValid}>
						SINGUP
					</Button>
				</form>
			</div>
			<div
				className={`${classes.FormContainer} ${classes.FormContainer_signin}`}
			>
				<form action="#">
					<h1 className={classes.FormContainer__Title}>Sign in</h1>
					<div className={classes.FormContainer__Socials}>
						<a href="#" className={classes.FormContainer__Social}>
							<i className="fab fa-facebook-f"></i>
						</a>
						<a href="#" className={classes.FormContainer__Social}>
							<i className="fab fa-google-plus-g"></i>
						</a>
						<a href="#" className={classes.FormContainer__Social}>
							<i className="fab fa-linkedin-in"></i>
						</a>
					</div>
					<span className={classes.FormContainer__paragraph}>
						or fill the form
					</span>
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<a href="#">Forgot your password?</a>
					<button>Sign In</button>
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
						<button
							className={classes.Ghost}
							onClick={switchModeHandler}
						>
							Sign Up
						</button>
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
						<button
							className={classes.Ghost}
							onClick={switchModeHandler}
						>
							Sign In
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Form;

/* 

*/
