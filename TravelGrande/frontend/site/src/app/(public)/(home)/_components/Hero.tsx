'use client';

import Link from 'next/link';
import { PAGES } from '@/config/pages.config';
import MobileMenu from '@/components/Header/MobileMenu';

const Hero = () => {
	return (
		<section className="relative h-[942px] w-full overflow-hidden max-lg:h-[700px] max-md:h-[600px] max-sm:h-[500px]">
			<img
				src="https://api.builder.io/api/v1/image/assets/TEMP/1111384dd34c5a57d28a525904e797d1c617afd8?width=3840"
				alt="Hero background"
				className="absolute inset-0 h-full w-full object-cover"
			/>

			<div className="container relative z-10 flex h-full flex-col items-center">
				{/* Top Navigation Bar */}
				<div className="flex w-full items-center justify-between pt-[30px] max-md:pt-5">
					{/* List Property Button */}
					<Link
						href={PAGES.FOR_OWNERS}
						className="flex h-10 items-center justify-center gap-2.5 rounded-full border border-white px-9 py-2.5 text-white transition-colors hover:bg-white hover:text-[#2B2A29] max-md:hidden"
					>
						<span className="font-['Open_Sans'] text-base font-normal">
							Разместить объект
						</span>
					</Link>

					{/* Mobile Menu Spacer */}
					<div className="h-10 w-10 md:hidden"></div>

					{/* Logo */}
					<div className="flex h-[125px] w-[237px] flex-col items-center justify-center max-md:h-[80px] max-md:w-[150px]">
						<svg
							className="mb-3 h-[74px] w-[78px] fill-white max-md:h-12 max-md:w-16"
							viewBox="0 0 78 74"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M9.98117 29.7757C7.99609 30.081 6.46783 30.4907 5.36317 31.2058C4.35817 31.8486 3.65218 32.8127 3.20367 34.2589C2.70533 35.8497 2.94619 37.4888 3.73524 38.8626C4.53259 40.2446 5.89474 41.3533 7.62234 41.8595C13.561 43.5949 18.3368 41.3614 22.9631 39.2001C26.9332 37.3441 30.8037 35.5364 35.3885 35.906L36.1111 35.9622C31.4931 33.6885 29.101 29.8882 26.6924 26.0638C24.0677 21.9019 21.4265 17.6999 15.6789 16.0207C13.9513 15.5145 12.1822 15.7074 10.7204 16.4385C9.27518 17.1536 8.13729 18.3989 7.63894 19.9817C7.19043 21.4279 7.22366 22.6009 7.68878 23.6775C8.20374 24.8586 9.23365 26.0156 10.7204 27.3412L12.9463 29.3257L9.95625 29.7837L9.98117 29.7757ZM3.74355 28.8437C4.63226 28.2732 5.65387 27.8554 6.84159 27.526C6.04424 26.6262 5.42962 25.7263 5.01433 24.7702C4.26681 23.0589 4.18375 21.2752 4.84821 19.1541C5.57912 16.8 7.26519 14.9682 9.39146 13.9157C11.5011 12.8632 14.051 12.5739 16.5344 13.3051C19.8733 14.2772 22.2737 15.8921 24.2006 17.8284C22.8136 15.4985 21.875 12.815 21.8252 9.44851L21.8169 9.43245H21.8252C21.792 6.9257 22.7803 4.64391 24.4083 2.98078C26.0445 1.30158 28.3286 0.241034 30.8785 0.208896L30.8951 0.200861V0.208896C33.1792 0.184792 34.9234 0.747204 36.4101 1.90416C37.2407 2.55496 37.9716 3.37447 38.6443 4.37074C39.2922 3.3584 39.9982 2.51478 40.8121 1.84792C42.2657 0.65079 44.0016 0.0401723 46.294 0.00803445L46.3106 0V0.00803445C48.8438 -0.0160689 51.1528 0.980203 52.8306 2.6112C54.5 4.24219 55.5549 6.50791 55.5881 9.01466L55.5964 9.03072H55.5881C55.6047 10.5894 55.4552 11.9151 55.1728 13.0721C56.2526 12.2927 57.4569 11.6098 58.819 11.0554C61.2111 10.0913 63.7776 10.1234 65.9869 10.959C68.2129 11.8026 70.0817 13.4577 71.0617 15.7315C71.9421 17.7722 72.0501 19.5559 71.4853 21.3315C71.1697 22.3197 70.6547 23.2758 69.9488 24.256C71.1614 24.4649 72.2328 24.7782 73.1714 25.2603C74.8658 26.12 76.1033 27.4537 76.9837 29.5025C77.9638 31.7682 77.8641 34.2187 76.9173 36.3398C75.9787 38.4449 74.193 40.2365 71.8009 41.2007C68.6032 42.4942 65.6962 42.7272 62.947 42.4219C65.5218 43.37 67.9803 44.8563 70.2062 47.4033C71.884 49.3235 72.6232 51.7017 72.4654 53.9915C72.3076 56.2974 71.2362 58.5229 69.2926 60.1057C67.5401 61.5359 65.8125 62.1706 63.8939 62.1867C62.8224 62.1947 61.7261 62.0099 60.5549 61.6564C60.7211 62.8374 60.7294 63.9141 60.5383 64.9344C60.1978 66.7583 59.2675 68.3009 57.515 69.731C55.5715 71.3138 53.1296 71.9646 50.7541 71.7316C48.387 71.4986 46.0863 70.3979 44.4169 68.4857C42.2657 66.0271 41.1444 63.5123 40.5796 60.9815C40.3304 63.4802 39.5746 66.0593 37.8968 68.7669C36.5347 70.9603 34.4084 72.4306 32.0828 73.0332C29.7323 73.6438 27.1741 73.3706 24.9565 72.0851C22.9548 70.9201 21.7504 69.5221 21.1026 67.7465C20.7371 66.7422 20.5627 65.6415 20.5295 64.4122C19.3916 64.9666 18.3035 65.3362 17.2155 65.4968C15.2969 65.7781 13.4613 65.4085 11.4513 64.2515C9.23365 62.966 7.78014 60.9011 7.23196 58.6033C6.68378 56.3295 7.03263 53.8308 8.38646 51.6374C10.6373 48.0058 13.6191 45.9892 16.8583 44.6474C13.835 45.4509 10.5543 45.6598 6.76684 44.551C4.28342 43.8279 2.33156 42.221 1.16876 40.2124C0.00595025 38.1877 -0.351195 35.7613 0.379712 33.4153C1.04417 31.2942 2.13223 29.848 3.72693 28.8276L3.74355 28.8437Z" />
						</svg>
						<h1 className="font-['Times_New_Roman'] text-[29px] font-normal text-white max-md:text-xl">
							TRAVEL GRANDE
						</h1>
						<p className="font-['Times_New_Roman'] text-[12px] font-normal text-white max-md:text-[10px]">
							Unique Houses & Apartments
						</p>
					</div>

					{/* User Menu Button - Desktop */}
					<button className="flex h-10 w-[72px] items-center justify-center gap-2.5 rounded-full border border-white p-3 transition-colors hover:bg-white hover:text-[#2B2A29] max-md:hidden">
						<svg
							width="48"
							height="22"
							viewBox="0 0 48 22"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-white hover:stroke-[#2B2A29]"
						>
							<path
								d="M24 12.5H33"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M24 17.5H33"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M15 22.5H33"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M15 27.5H33"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<circle
								cx="48"
								cy="15"
								r="5"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M56.59 30C56.59 26.13 52.74 23 48 23C43.26 23 39.41 26.13 39.41 30"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>

					{/* Mobile Menu */}
					<MobileMenu />
				</div>

				{/* Navigation Menu */}
				<nav className="mt-[48px] flex flex-col items-center gap-1.5 max-md:mt-8">
					<div className="flex items-center gap-16 max-md:gap-8 max-sm:gap-4">
						<Link
							href={PAGES.HOME}
							className="font-['Open_Sans'] text-base font-normal text-white transition-opacity hover:opacity-80 max-sm:text-sm"
						>
							Главная
						</Link>
						<Link
							href={PAGES.PROPERTIES}
							className="font-['Open_Sans'] text-base font-normal text-white transition-opacity hover:opacity-80 max-sm:text-sm"
						>
							Объекты
						</Link>
						<Link
							href={PAGES.CITIES}
							className="font-['Open_Sans'] text-base font-normal text-white transition-opacity hover:opacity-80 max-sm:text-sm"
						>
							Города
						</Link>
					</div>
					<div className="flex w-full flex-col items-start">
						<div className="h-px w-full bg-white/20"></div>
						<div className="h-px w-[84px] bg-white"></div>
					</div>
				</nav>

				{/* Hero Content */}
				<div className="mt-[125px] w-full max-w-[1086px] rounded-lg bg-black/58 p-8 backdrop-blur-[107px] max-lg:mt-20 max-md:mt-16 max-sm:mt-12 max-sm:p-6">
					<h2 className="mb-6 text-center font-['Times_New_Roman'] text-5xl font-normal uppercase leading-normal max-lg:text-4xl max-md:text-3xl max-sm:text-2xl">
						<span className="text-white">
							Только избранные дома для вашего{' '}
						</span>
						<span className="text-[#C8AC71]">идеального </span>
						<span className="text-white">путешествия</span>
					</h2>
					<p className="text-center font-['Open_Sans'] text-2xl font-normal text-white max-lg:text-xl max-md:text-lg max-sm:text-base">
						Каждый дом отобран вручную. Мы оставили только лучшее — для вас.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Hero;
