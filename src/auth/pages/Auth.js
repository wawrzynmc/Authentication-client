// * -- libraries imports
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// * -- my own imports
// ---- components
import Button from '../../shared/components/FormElements/Button/Button';
import SuccessModal from '../../shared/components/UIElements/Modal/SuccessModal/SuccessModal';
import {
	Facebook as FacebookLogin,
	Google as GoogleLogin,
} from '../../shared/components/FormElements/Socials/Socials';
import SignupForm from '../components/SignupForm/SignupForm';
import SigninForm from '../components/SigninForm/SigninForm';
import TextBetweenLines from '../../shared/components/UIElements/Text/TextBetweenLines/TextBetweenLines';

// ---- functions
import { AuthContext } from '../../shared/context/auth-context';

// ---- styles
import classes from './Auth.module.scss';

// * -- component
const Auth = (props) => {
	// -- variables
	const { t } = useTranslation();
	const [isLoginMode, setIsLoginMode] = useState(null);
	const auth = useContext(AuthContext);
	const location = useLocation();
	const searchParams = location.search;
	const history = useHistory();

	// -- functions
	// ---- change to specific form due to searchParams
	useEffect(() => {
		const query = new URLSearchParams(searchParams);
		query.get('action') === 'signup'
			? setIsLoginMode(false)
			: setIsLoginMode(true);
	}, [searchParams]);

	const switchModeHandler = () => {
		const query = new URLSearchParams(searchParams);
		history.push({
			pathname: '/auth',
			search:
				query.get('action') === 'signup'
					? '?action=signin'
					: '?action=signup',
		});
	};

	const confirmSuccessHandler = () => {
		const locationState = { ...location.state };

		delete locationState.success;
		delete locationState.message;
		history.replace({ state: locationState });
	};

	return (
		<React.Fragment>
			<SuccessModal
				show={location.state && location.state.success}
				onClear={confirmSuccessHandler}
			>
				{location.state
					? location.state.message
					: 'Operation succedded'}
			</SuccessModal>
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
					<h1 className={classes.FormContainer__Title}>
						{t('Authentication.SignUpForm.activePanel.title')}
					</h1>
					<div className={classes.FormContainer__Socials}>
						<FacebookLogin />
						<GoogleLogin />
					</div>
					<span className={classes.FormContainer__paragraph}>
						{t('Authentication.SignUpForm.activePanel.or')}
					</span>
					<SignupForm />
				</div>
				<div
					className={`
					${classes.FormContainer} 
					${classes.FormContainer_signin}
				`}
				>
					<h1 className={classes.FormContainer__Title}>
						{t('Authentication.SignInForm.activePanel.title')}
					</h1>
					<div className={classes.FormContainer__Socials}>
						<FacebookLogin />
						<GoogleLogin />
					</div>
					<span className={classes.FormContainer__paragraph}>
						{t('Authentication.SignInForm.activePanel.or')}
					</span>
					<SigninForm />
				</div>
				<div className={classes.OverlayContainer}>
					<div className={classes.OverlayContainer__Overlay}>
						<div
							className={`${classes.OverlayContainer__Panel} ${classes.OverlayContainer__Panel_first}`}
						>
							<h1 className={classes.OverlayContainer__Title}>
								{t(
									'Authentication.SignInForm.inactivePanel.title'
								)}
							</h1>
							<span
								className={
									classes.OverlayContainer__Information
								}
							>
								{t(
									'Authentication.SignInForm.inactivePanel.info'
								)}
								<TextBetweenLines>
									{t(
										'Authentication.SignInForm.inactivePanel.or'
									)}
								</TextBetweenLines>
							</span>
							<Button ghost onClick={switchModeHandler}>
								{t(
									'Authentication.SignInForm.inactivePanel.button'
								)}
							</Button>
						</div>
						<div
							className={`${classes.OverlayContainer__Panel} ${classes.OverlayContainer__Panel_second}`}
						>
							<h1 className={classes.OverlayContainer__Title}>
								{t(
									'Authentication.SignUpForm.inactivePanel.title'
								)}
							</h1>
							<span
								className={
									classes.OverlayContainer__Information
								}
							>
								{t(
									'Authentication.SignUpForm.inactivePanel.info'
								)}
								<TextBetweenLines>
									{t(
										'Authentication.SignUpForm.inactivePanel.or'
									)}
								</TextBetweenLines>
							</span>
							<Button ghost onClick={switchModeHandler}>
								{t(
									'Authentication.SignUpForm.inactivePanel.button'
								)}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Auth;
