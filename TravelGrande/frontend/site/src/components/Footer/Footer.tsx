import Link from 'next/link';
import { PAGES } from '@/config/pages.config';
import { SITE } from '@/config/site.config';

const Footer = () => {
	return (
		<footer className="w-full overflow-hidden border-t border-[#C7C7C7] bg-white py-10">
			<div className="container">
				<div className="flex items-start justify-between gap-[223px] max-lg:flex-wrap max-lg:gap-12 max-md:gap-8">
					{/* Logo Section */}
					<div className="flex items-center gap-4 max-md:w-full max-md:justify-center">
						<svg
							className="h-[66px] w-[67px] flex-shrink-0 fill-[#C8AC71]"
							viewBox="0 0 67 66"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M8.6095 26.794C6.89722 27.0688 5.57899 27.4375 4.62613 28.081C3.75925 28.6594 3.15028 29.5269 2.76341 30.8283C2.33355 32.2599 2.54131 33.7348 3.22192 34.9711C3.9097 36.2146 5.08465 37.2123 6.57483 37.6678C11.6973 39.2295 15.8168 37.2196 19.8074 35.2747C23.2319 33.6046 26.5705 31.9779 30.5252 32.3105L31.1485 32.3611C27.1651 30.315 25.1018 26.8953 23.0241 23.4538C20.7602 19.7087 18.482 15.9275 13.5242 14.4164C12.0341 13.961 10.508 14.1345 9.24713 14.7924C8.00053 15.4359 7.01902 16.5565 6.58916 17.9808C6.20228 19.2822 6.23095 20.3377 6.63215 21.3065C7.07634 22.3693 7.96471 23.4104 9.24713 24.6034L11.1672 26.3892L8.58801 26.8013L8.6095 26.794ZM3.22909 25.9554C3.99567 25.4421 4.87688 25.0661 5.90138 24.7697C5.21361 23.9599 4.68345 23.1502 4.32523 22.2898C3.68044 20.7498 3.60879 19.1448 4.18194 17.2361C4.8124 15.1177 6.26676 13.4693 8.10083 12.5222C9.92058 11.5751 12.12 11.3148 14.2622 11.9727C17.1422 12.8475 19.2127 14.3008 20.8748 16.0432C19.6784 13.9465 18.8688 11.5317 18.8258 8.50237L18.8187 8.48791H18.8258C18.7972 6.23218 19.6497 4.17889 21.054 2.6823C22.4653 1.17125 24.4355 0.216897 26.635 0.187978L26.6493 0.180748V0.187978C28.6195 0.166288 30.124 0.672381 31.4064 1.71349C32.1229 2.29911 32.7533 3.03656 33.3336 3.93307C33.8924 3.0221 34.5014 2.26296 35.2035 1.66288C36.4573 0.585622 37.9546 0.0361495 39.932 0.00722991L39.9463 0V0.00722991C42.1314 -0.0144598 44.1231 0.882049 45.5703 2.34972C47.0103 3.81739 47.9202 5.85623 47.9489 8.11196L47.956 8.12642H47.9489C47.9632 9.52902 47.8343 10.722 47.5907 11.7631C48.522 11.0618 49.5609 10.4472 50.7358 9.94835C52.7991 9.08077 55.0129 9.10968 56.9186 9.8616C58.8387 10.6207 60.4506 12.1101 61.296 14.1562C62.0555 15.9926 62.1486 17.5976 61.6614 19.1954C61.3892 20.0847 60.945 20.945 60.336 21.8271C61.382 22.0151 62.3062 22.297 63.1158 22.7308C64.5773 23.5044 65.6448 24.7046 66.4042 26.5482C67.2496 28.5871 67.1636 30.7922 66.3469 32.7009C65.5373 34.5951 63.997 36.2074 61.9337 37.075C59.1754 38.239 56.6679 38.4487 54.2965 38.1739C56.5174 39.027 58.6381 40.3646 60.5581 42.6565C62.0053 44.3844 62.6429 46.5245 62.5068 48.585C62.3707 50.66 61.4465 52.6627 59.77 54.0869C58.2584 55.3739 56.7682 55.945 55.1132 55.9595C54.189 55.9667 53.2433 55.8004 52.2331 55.4823C52.3764 56.5451 52.3836 57.5139 52.2188 58.4321C51.9251 60.0733 51.1227 61.4615 49.611 62.7484C47.9345 64.1727 45.8282 64.7583 43.7792 64.5486C41.7374 64.339 39.7529 63.3485 38.3128 61.6277C36.4573 59.4154 35.4901 57.1524 35.0029 54.875C34.788 57.1235 34.136 59.4443 32.6888 61.8808C31.5139 63.8546 29.6798 65.1776 27.6738 65.7199C25.6463 66.2693 23.4397 66.0235 21.5268 64.8667C19.8002 63.8184 18.7614 62.5604 18.2025 60.9626C17.8873 60.0589 17.7369 59.0684 17.7082 57.9622C16.7267 58.461 15.7882 58.7936 14.8496 58.9382C13.1947 59.1913 11.6114 58.8587 9.87759 57.8176C7.96471 56.6608 6.71095 54.8027 6.23811 52.735C5.76526 50.6889 6.06616 48.4404 7.23395 46.4666C9.17548 43.1987 11.7475 41.384 14.5416 40.1766C11.9338 40.8996 9.10384 41.0876 5.83691 40.0898C3.69477 39.4392 2.01115 37.9932 1.00814 36.1857C0.00513254 34.3638 -0.302932 32.1803 0.32753 30.0692C0.900677 28.1605 1.8392 26.8591 3.21476 25.9409L3.22909 25.9554Z" />
						</svg>
						<div className="flex flex-col gap-[5px]">
							<h2 className="font-['Times_New_Roman'] text-[38px] font-normal text-[#2B2A29]">
								TRAVEL GRANDE
							</h2>
							<p className="font-['Times_New_Roman'] text-[15px] font-normal text-[#2B2A29]">
								Unique Houses & Apartments
							</p>
						</div>
					</div>

					{/* Navigation Links */}
					<div className="flex gap-[200px] max-lg:w-full max-lg:justify-between max-lg:gap-12 max-md:flex-col max-md:gap-8">
						{/* Column 1 */}
						<div className="flex flex-col gap-[19px]">
							<Link
								href={PAGES.PROPERTIES}
								className="font-['Open_Sans'] text-base font-normal capitalize text-[#2B2A29] transition-colors hover:text-[#C8AC71]"
							>
								Объекты
							</Link>
							<Link
								href={PAGES.CITIES}
								className="font-['Open_Sans'] text-base font-normal capitalize text-[#2B2A29] transition-colors hover:text-[#C8AC71]"
							>
								Города
							</Link>
							<Link
								href={PAGES.ABOUT_US}
								className="font-['Open_Sans'] text-base font-normal capitalize text-[#2B2A29] transition-colors hover:text-[#C8AC71]"
							>
								О нас
							</Link>
							<Link
								href={PAGES.FAQ}
								className="font-['Open_Sans'] text-base font-normal capitalize text-[#2B2A29] transition-colors hover:text-[#C8AC71]"
							>
								FAQ
							</Link>
							<Link
								href={PAGES.CONTACTS}
								className="font-['Open_Sans'] text-base font-normal capitalize text-[#2B2A29] transition-colors hover:text-[#C8AC71]"
							>
								Контакты
							</Link>
						</div>

						{/* Column 2 */}
						<div className="flex flex-col gap-[19px]">
							<Link
								href={PAGES.FOR_OWNERS}
								className="font-['Open_Sans'] text-base font-normal capitalize text-[#2B2A29] transition-colors hover:text-[#C8AC71]"
							>
								Для собственников
							</Link>
							<Link
								href={PAGES.HOW_TO_BOOK}
								className="font-['Open_Sans'] text-base font-normal capitalize text-[#2B2A29] transition-colors hover:text-[#C8AC71]"
							>
								Как забронировать
							</Link>
							<Link
								href={PAGES.PRIVACY}
								className="font-['Open_Sans'] text-base font-normal capitalize text-[#2B2A29] transition-colors hover:text-[#C8AC71]"
							>
								Политика конфиденциальности
							</Link>
							<Link
								href={PAGES.TERMS}
								className="font-['Open_Sans'] text-base font-normal capitalize text-[#2B2A29] transition-colors hover:text-[#C8AC71]"
							>
								Пользовательское соглашение
							</Link>
							<Link
								href={PAGES.CONTACTS}
								className="font-['Open_Sans'] text-base font-normal capitalize text-[#2B2A29] transition-colors hover:text-[#C8AC71]"
							>
								Контакты
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
