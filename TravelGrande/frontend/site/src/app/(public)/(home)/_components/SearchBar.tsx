'use client';

import { useState, useRef, useEffect } from 'react';

const SearchBar = () => {
	const [city, setCity] = useState('');
	const [date, setDate] = useState('');
	const [guests, setGuests] = useState('');
	const [showCityDropdown, setShowCityDropdown] = useState(false);
	const [showDateDropdown, setShowDateDropdown] = useState(false);
	const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

	const cityRef = useRef<HTMLDivElement>(null);
	const dateRef = useRef<HTMLDivElement>(null);
	const guestsRef = useRef<HTMLDivElement>(null);

	const cities = [
		'Сочи',
		'Москва',
		'Санкт-Петербург',
		'Казань',
		'Калининград',
		'Алтай',
		'Байкал',
	];

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
				setShowCityDropdown(false);
			}
			if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
				setShowDateDropdown(false);
			}
			if (
				guestsRef.current &&
				!guestsRef.current.contains(event.target as Node)
			) {
				setShowGuestsDropdown(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleSearch = () => {
		console.log({ city, date, guests });
	};

	return (
		<section className="container relative z-30 -mt-12 mb-16 max-md:-mt-8 max-md:mb-12 max-sm:-mt-6 max-sm:mb-8">
			<div className="mx-auto flex max-w-[1254px] items-center justify-center gap-5 rounded bg-white/16 p-6 backdrop-blur-sm max-lg:flex-wrap max-md:gap-4 max-sm:flex-col max-sm:p-4">
				{/* City Select */}
				<div ref={cityRef} className="relative w-full max-w-[320px] max-sm:max-w-full">
					<div
						className="flex h-[54px] w-full cursor-pointer flex-col items-start justify-center gap-2.5 rounded bg-white px-6 py-4"
						onClick={() => {
							setShowCityDropdown(!showCityDropdown);
							setShowDateDropdown(false);
							setShowGuestsDropdown(false);
						}}
					>
						<div className="flex w-full items-center justify-between">
							<span
								className={`font-['Open_Sans'] text-base font-normal ${city ? 'text-[#2B2A29]' : 'text-[#2B2A29]/60'}`}
							>
								{city || 'Город'}
							</span>
							<svg
								width="8"
								height="5"
								viewBox="0 0 8 5"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className={`transition-transform ${showCityDropdown ? 'rotate-180' : ''}`}
							>
								<path
									d="M7.28 0.966667L4.93333 3.31333C4.42 3.82667 3.58 3.82667 3.06667 3.31333L0.72 0.966667"
									stroke="#2B2A29"
									strokeWidth="1.5"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>

					{/* City Dropdown */}
					{showCityDropdown && (
						<div className="absolute top-[58px] z-50 w-full rounded border border-[#E5E5E5] bg-white shadow-lg">
							<div className="max-h-[240px] overflow-y-auto">
								{cities.map((cityOption) => (
									<div
										key={cityOption}
										className="font-['Open_Sans'] cursor-pointer px-6 py-3 text-base font-normal text-[#2B2A29] transition-colors hover:bg-[#FBF7F0]"
										onClick={() => {
											setCity(cityOption);
											setShowCityDropdown(false);
										}}
									>
										{cityOption}
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Date Select */}
				<div ref={dateRef} className="relative w-full max-w-[320px] max-sm:max-w-full">
					<div
						className="flex h-[54px] w-full cursor-pointer flex-col items-start justify-center gap-2.5 rounded bg-white px-6 py-4"
						onClick={() => {
							setShowDateDropdown(!showDateDropdown);
							setShowCityDropdown(false);
							setShowGuestsDropdown(false);
						}}
					>
						<div className="flex w-full items-center justify-between">
							<input
								type="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								placeholder="Дата"
								className="font-['Open_Sans'] w-full border-none text-base font-normal text-[#2B2A29] outline-none"
								onClick={(e) => e.stopPropagation()}
							/>
							<svg
								width="8"
								height="5"
								viewBox="0 0 8 5"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className={`transition-transform ${showDateDropdown ? 'rotate-180' : ''}`}
							>
								<path
									d="M7.28 0.966667L4.93333 3.31333C4.42 3.82667 3.58 3.82667 3.06667 3.31333L0.72 0.966667"
									stroke="#2B2A29"
									strokeWidth="1.5"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>
				</div>

				{/* Guests Select */}
				<div
					ref={guestsRef}
					className="relative w-full max-w-[320px] max-sm:max-w-full"
				>
					<div
						className="flex h-[54px] w-full cursor-pointer flex-col items-start justify-center gap-2.5 rounded bg-white px-6 py-4"
						onClick={() => {
							setShowGuestsDropdown(!showGuestsDropdown);
							setShowCityDropdown(false);
							setShowDateDropdown(false);
						}}
					>
						<div className="flex w-full items-center justify-between">
							<span
								className={`font-['Open_Sans'] text-base font-normal ${guests ? 'text-[#2B2A29]' : 'text-[#2B2A29]/60'}`}
							>
								{guests || 'Гости'}
							</span>
							<svg
								width="8"
								height="5"
								viewBox="0 0 8 5"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className={`transition-transform ${showGuestsDropdown ? 'rotate-180' : ''}`}
							>
								<path
									d="M7.28 0.966667L4.93333 3.31333C4.42 3.82667 3.58 3.82667 3.06667 3.31333L0.72 0.966667"
									stroke="#2B2A29"
									strokeWidth="1.5"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>

					{/* Guests Dropdown */}
					{showGuestsDropdown && (
						<div className="absolute top-[58px] z-50 w-full rounded border border-[#E5E5E5] bg-white shadow-lg">
							<div className="max-h-[240px] overflow-y-auto">
								{[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map((guestOption) => (
									<div
										key={guestOption}
										className="font-['Open_Sans'] cursor-pointer px-6 py-3 text-base font-normal text-[#2B2A29] transition-colors hover:bg-[#FBF7F0]"
										onClick={() => {
											setGuests(`${guestOption} ${typeof guestOption === 'number' && guestOption === 1 ? 'гость' : 'гостей'}`);
											setShowGuestsDropdown(false);
										}}
									>
										{guestOption}{' '}
										{typeof guestOption === 'number' && guestOption === 1
											? 'гость'
											: 'гостей'}
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Search Button */}
				<button
					onClick={handleSearch}
					className="flex h-[54px] w-full max-w-[154px] items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#2B2A29] px-[51px] py-4 transition-opacity hover:opacity-90 max-sm:max-w-full"
				>
					<span className="font-['Open_Sans'] text-center text-base font-semibold capitalize text-white">
						Найти
					</span>
				</button>
			</div>
		</section>
	);
};

export default SearchBar;
