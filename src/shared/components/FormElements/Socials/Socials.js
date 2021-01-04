// * -- libraries imports
import React, { useContext } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';

// * -- my own imports
// ---- components
import LoadingSpinner from '../../UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../UIElements/Modal/ErrorModal/ErrorModal';

// ---- functions / hooks
import { AuthContext } from '../../../context/auth-context';
import { useHttpClient } from '../../../hooks/http-hook';

// ---- styles
import classes from './Socials.module.scss';

export const Facebook = (props) => {
	const auth = useContext(AuthContext);
	const {
		isLoading,
		setIsLoading,
		msg,
		sendRequest,
		clearMsg,
		requestSent,
	} = useHttpClient();

	const sendFacebookToken = async (userID, accessToken) => {
		const responseData = await sendRequest(
			`${process.env.REACT_APP_SERVER_API_URL}/account/signin/facebook`,
			'POST',
			JSON.stringify({
				userID,
				accessToken,
			}),
			{ 'Content-Type': 'application/json' }
		);
		const {
			user: { id, role },
			token,
		} = responseData;
		auth.login(id, role, token);
	};

	const responseFacebook = (response) => {
		if (response.status === 'unknown') {
			setIsLoading(false);
		} else {
			const { userID, accessToken } = response;
			sendFacebookToken(userID, accessToken);
		}
	};

	return (
		<React.Fragment>
			<ErrorModal
				show={!requestSent && !!msg}
				error={msg}
				onClear={clearMsg}
			/>
			{isLoading && <LoadingSpinner asOverlay />}
			<FacebookLogin
				appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
				fields="name, email"
				callback={responseFacebook}
				render={(renderProps) => (
					<button
						onClick={renderProps.onClick}
						className={`${classes.Button} ${classes.Button_facebook}`}
					>
						<i className="fab fa-facebook" />
					</button>
				)}
			/>
		</React.Fragment>
	);
};

export const Google = (props) => {
	const auth = useContext(AuthContext);
	const {
		isLoading,
		setIsLoading,
		msg,
		sendRequest,
		clearMsg,
		requestSent,
	} = useHttpClient();

	const sendGoogleToken = async (tokenId) => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_SERVER_API_URL}/account/signin/google`,
				'POST',
				JSON.stringify({
					idToken: tokenId,
				}),
				{ 'Content-Type': 'application/json' }
			);

			const {
				user: { id, role },
				token,
			} = responseData;
			auth.login(id, role, token);
		} catch (err) {}
	};

	const responseGoogle = (response) => {
		if (response.error) {
			setIsLoading(false);
		} else {
			const { tokenId } = response;
			sendGoogleToken(tokenId);
		}
	};

	return (
		<React.Fragment>
			<ErrorModal
				show={!requestSent && !!msg}
				error={msg}
				onClear={clearMsg}
			/>
			{isLoading && <LoadingSpinner asOverlay />}
			<GoogleLogin
				clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
				render={(renderProps) => (
					<button
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
						className={`${classes.Button} ${classes.Button_google}`}
					>
						<i className="fab fa-google " />
					</button>
				)}
			></GoogleLogin>
		</React.Fragment>
	);
};
