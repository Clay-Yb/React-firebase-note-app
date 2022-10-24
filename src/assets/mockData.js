import { BiArchiveIn, BiTrash } from 'react-icons/bi';
import { GoLightBulb } from 'react-icons/go';
export let date = [];
for (let i = 1; i <= 31; i++) {
	date.push(i);
}

export const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

export let years = [];
for (let i = 1950; i <= new Date().getFullYear(); i++) {
	years.push(i);
}

export const sidebarData = [
	{
		id: 1,
		title: 'Notes',
		icon: <GoLightBulb />,
	},
	{
		id: 2,
		title: 'Archive',
		icon: <BiArchiveIn />,
	},
	{
		id: 3,
		title: 'Trash',
		icon: <BiTrash />,
	},
];
