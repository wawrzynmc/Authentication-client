import React from 'react';
import { addDecorator} from '@storybook/react';
import { withConsole } from '@storybook/addon-console'; // add console addon
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'; // add viewport addon
import { withA11y } from '@storybook/addon-a11y'; // add accessibility addon

import Center from '../src/shared/components/UIElements/Center/Center';
import '../src/index.css';

// * -- decorators
addDecorator((story) => <Center>{story()}</Center>);
addDecorator((story, context) => withConsole()(story)(context));
addDecorator(withA11y);

// * -- parameters
// addParameters({});

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	options: {
		storySort: (a, b) =>
			a[1].kind === b[1].kind
				? 0
				: a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
	},
	viewport: {
		viewports: INITIAL_VIEWPORTS,
	},
};
