'use client';

import { MENU } from '@/shared/data/menu.data';
import Link from 'next/link';

const HeaderMenu = () => {
	// const pathname = usePathname();

	return (
		<nav data-testid='header-menu'>
			<ul className='flex gap-2'>
				{MENU.map(menuItem => (
					<li key={menuItem.id}>
						{/* <CustomLink
							type='text'
							href={menuItem.href}
							isActive={!!match(menuItem.href)(pathname)}
							isOuter={false}
							text={menuItem.name}
						/> */}
						<Link href={menuItem.href}>{menuItem.name}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default HeaderMenu;
