import { SITE } from '@/config/site.config';
import Link from 'next/link';
import HeaderMenu from './HeaderMenu';
import { PAGES } from '@/config/pages.config';

const Header = () => {
	return (
		<header
			data-testid="header"
			className="absolute left-0 top-0 z-50 w-full"
		></header>
	);
};

export default Header;
