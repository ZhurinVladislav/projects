import { PAGES } from '@/config/pages.config';
import { IMenuItem } from '@/types/IMenuItem';

export const MENU: IMenuItem[] = [
	{
		id: 0,
		href: PAGES.HOME,
		name: 'Главная',
	},
	{
		id: 1,
		href: PAGES.OBJECTS,
		name: 'Объекты',
	},
	{
		id: 2,
		href: PAGES.CITIES,
		name: 'Города',
	},
];
