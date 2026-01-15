'use client';

import { PAGES } from '@/config/pages.config';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const MobileMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	return (
		<>
			{/* Mobile Menu Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
				aria-label="Toggle menu"
			>
				<span
					className={`h-0.5 w-6 bg-white transition-all ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
				></span>
				<span
					className={`h-0.5 w-6 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}
				></span>
				<span
					className={`h-0.5 w-6 bg-white transition-all ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}
				></span>
			</button>

			{/* Mobile Menu Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 z-[100] bg-black/50 md:hidden"
					onClick={() => setIsOpen(false)}
				></div>
			)}

			{/* Mobile Menu Panel */}
			<div
				className={`fixed right-0 top-0 z-[110] h-full w-[280px] bg-white shadow-xl transition-transform duration-300 md:hidden ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div className="flex h-full flex-col">
					{/* Close Button */}
					<div className="flex items-center justify-between border-b border-[#E5E5E5] p-6">
						<span className="font-['Times_New_Roman'] text-xl font-normal text-[#2B2A29]">
							Меню
						</span>
						<button
							onClick={() => setIsOpen(false)}
							className="flex h-8 w-8 items-center justify-center"
							aria-label="Close menu"
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M18 6L6 18"
									stroke="#2B2A29"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M6 6L18 18"
									stroke="#2B2A29"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>

					{/* Menu Links */}
					<nav className="flex flex-col gap-1 p-6">
						<Link
							href={PAGES.HOME}
							onClick={() => setIsOpen(false)}
							className="font-['Open_Sans'] rounded px-4 py-3 text-base font-normal text-[#2B2A29] transition-colors hover:bg-[#FBF7F0]"
						>
							Главная
						</Link>
						<Link
							href={PAGES.PROPERTIES}
							onClick={() => setIsOpen(false)}
							className="font-['Open_Sans'] rounded px-4 py-3 text-base font-normal text-[#2B2A29] transition-colors hover:bg-[#FBF7F0]"
						>
							Объекты
						</Link>
						<Link
							href={PAGES.CITIES}
							onClick={() => setIsOpen(false)}
							className="font-['Open_Sans'] rounded px-4 py-3 text-base font-normal text-[#2B2A29] transition-colors hover:bg-[#FBF7F0]"
						>
							Города
						</Link>
						<Link
							href={PAGES.ABOUT_US}
							onClick={() => setIsOpen(false)}
							className="font-['Open_Sans'] rounded px-4 py-3 text-base font-normal text-[#2B2A29] transition-colors hover:bg-[#FBF7F0]"
						>
							О нас
						</Link>
						<Link
							href={PAGES.FAQ}
							onClick={() => setIsOpen(false)}
							className="font-['Open_Sans'] rounded px-4 py-3 text-base font-normal text-[#2B2A29] transition-colors hover:bg-[#FBF7F0]"
						>
							FAQ
						</Link>
						<Link
							href={PAGES.CONTACTS}
							onClick={() => setIsOpen(false)}
							className="font-['Open_Sans'] rounded px-4 py-3 text-base font-normal text-[#2B2A29] transition-colors hover:bg-[#FBF7F0]"
						>
							Контакты
						</Link>
					</nav>

					{/* Bottom Button */}
					<div className="mt-auto border-t border-[#E5E5E5] p-6">
						<Link
							href={PAGES.FOR_OWNERS}
							onClick={() => setIsOpen(false)}
							className="font-['Open_Sans'] flex w-full items-center justify-center rounded-full bg-[#2B2A29] px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
						>
							Разместить объект
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default MobileMenu;
