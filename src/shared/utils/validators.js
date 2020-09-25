// validators names
const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_PASSWORD = 'PASSWORD';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_PASSWORDS_COHERESION = 'PASSWORD_COHERESION';

// regex
const emailRegex = new RegExp(
	"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
);

/* 
	- at least six or more characters 
		- && (and) at least 1. lowercase alphabetical character && at least 1 uppercase alphabetical character
		- || (or) at least 1. lowercase alphabetical character && at least 1 numeric character
		- || (or) at least 1 uppercase alphabetical character  && at least 1 numeric character
*/
const mediumPassword = new RegExp(
	'^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
);
/* 
	-  at least 1. lowercase alphabetical character
	- && (and) at least 1 uppercase alphabetical character
	- && at least 1 numeric character
	- && at least one special character
	- && eight characters or longer
*/
const strongPassword = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
);

// functions
const analyzePassword = (password) => {
	let result = 0;
	if (strongPassword.test(password)) {
		result = 2;
	} else if (mediumPassword.test(password)) {
		result = 1;
	}
	return result;
};

// export validators
export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
	type: VALIDATOR_TYPE_MINLENGTH,
	val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
	type: VALIDATOR_TYPE_MAXLENGTH,
	val: val,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({
	type: VALIDATOR_TYPE_EMAIL,
	regex: emailRegex,
});
export const VALIDATOR_PASSWORD = () => ({ type: VALIDATOR_TYPE_PASSWORD });
export const VALIDATOR_PASSWORDS_COHERESION = (passwordToCompare) => ({
	type: VALIDATOR_TYPE_PASSWORDS_COHERESION,
	passwordToCompare,
});

export const validate = (id, value, validators) => {
	let isValid = true,
		metaData = {
			passwordStrength: 0,
		},
		errorMsg = '',
		caseBoolean;

	for (const validator of validators) {
		console.log(`validators: ${validators}`);
		// * special cases
		if (validator.type === VALIDATOR_TYPE_PASSWORDS_COHERESION) {
			caseBoolean = validator.passwordToCompare === value;
			isValid = isValid && caseBoolean;

			if (!caseBoolean) {
				errorMsg = `Passwords have to match.`;
			}
		}
		if (validator.type === VALIDATOR_TYPE_PASSWORD) {
			metaData.passwordStrength = analyzePassword(value);
		}
		if (validator.type === VALIDATOR_TYPE_EMAIL) {
			caseBoolean = validator.regex.test(value);
			isValid = isValid && caseBoolean;

			if (!caseBoolean) {
				errorMsg = `Must be a valid email.`;
			}
		}
		// * casual cases
		if (validator.type === VALIDATOR_TYPE_REQUIRE) {
			caseBoolean = value.trim().length > 0;
			isValid = isValid && caseBoolean;

			if (!caseBoolean) {
				errorMsg = `${id} is required.`;
			}
		}
		if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
			caseBoolean = value.trim().length >= validator.val;
			isValid = isValid && caseBoolean;

			if (!caseBoolean) {
				errorMsg = `${id} length must be greater than or equal to ${validator.val}.`;
			}
		}
		if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
			caseBoolean = value.trim().length <= validator.val;
			isValid = isValid && caseBoolean;

			if (!caseBoolean) {
				errorMsg = `${id} length must be lower than or equal to ${validator.val}.`;
			}
		}
		if (validator.type === VALIDATOR_TYPE_MIN) {
			caseBoolean = +value >= validator.val;
			isValid = isValid && caseBoolean;

			if (!caseBoolean) {
				errorMsg = `${id} value must be greater than or equal to ${validator.val}.`;
			}
		}
		if (validator.type === VALIDATOR_TYPE_MAX) {
			caseBoolean = +value <= validator.val;
			isValid = isValid && caseBoolean;

			if (!caseBoolean) {
				errorMsg = `${id} value must be lower than or equal to ${validator.val}.`;
			}
		}
	}

	return {
		isValid,
		metaData,
		errorMsg,
	};
};
