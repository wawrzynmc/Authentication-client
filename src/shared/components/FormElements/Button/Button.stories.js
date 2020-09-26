import React from 'react';
import Button from './Button';
import Center from '../../UIElements/Center/Center';
import { action, actions } from '@storybook/addon-actions';

export default {
	title: 'Components/FormElements/Button',
	component: Button,
	args: {
		children: 'Button',
	},
	argTypes: {
		children: { control: 'text' },
		// onClick: { action: 'clicked' },
	},
	decorators: [(story) => <Center>{story()}</Center>], // decorator per story
};

export const Inverse = () => (
	<Button onClick={action('Click handle')} inverse>
		Inverse
	</Button>
);
export const Danger = () => (
	<Button {...actions('onClick', 'onMouseOver')} danger>
		Danger
	</Button>
);

Inverse.storyName = 'Inverse Button';
Danger.storyName = 'Danger Button';

const Template = (args) => <Button {...args} />;

export const InverseA = Template.bind({});
InverseA.args = {
	inverse: true,
	// children: 'Primary Args',
};
