'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const DestinationsSection = () => {
	const swiperRef = useRef<SwiperType | null>(null);

	const destinations = [
		{
			id: 1,
			image:
				'https://api.builder.io/api/v1/image/assets/TEMP/b0a0066006c3ba6a49cce8d04fe6e12b2ebd7294?width=650',
			title: 'Горный воздух республики Алтай',
		},
		{
			id: 2,
			image:
				'https://api.builder.io/api/v1/image/assets/TEMP/80e54d9c11be4b2c3837061293396e8c76447973?width=650',
			title: 'Уникальное жильё в Санкт-Петербурге',
		},
		{
			id: 3,
			image:
				'https://api.builder.io/api/v1/image/assets/TEMP/9cf4cf4d382ddc563f600a5f57bd416afd06f870?width=650',
			title: 'Найдите вдохновение на Байкале',
		},
		{
			id: 4,
			image:
				'https://api.builder.io/api/v1/image/assets/TEMP/15975635b1135515fccad37f0468929ec088fcf9?width=650',
			title: 'Дома на побережье Калининграда',
		},
	];

	return (
		<section className="container mb-20 max-md:mb-16 max-sm:mb-12">
			<h2 className="mb-6 text-center font-['Times_New_Roman'] text-[40px] font-normal uppercase leading-normal text-[#2B2A29] max-md:text-3xl max-sm:text-2xl">
				выберите направление
			</h2>

			{/* Navigation Arrows */}
			<div className="mb-10 flex items-center justify-end gap-6 max-md:mb-6 max-sm:justify-center">
				<button
					onClick={() => swiperRef.current?.slidePrev()}
					className="flex h-10 w-[42px] items-center justify-center gap-2.5 overflow-hidden rounded-full border border-[#C8AC71] transition-colors hover:bg-[#C8AC71] hover:stroke-white"
				>
					<svg
						width="8"
						height="11"
						viewBox="0 0 8 11"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-[#C8AC71] group-hover:stroke-white"
					>
						<path
							d="M7.03333 10.28L3.68667 6.93333C3.17333 6.42 3.17333 5.58 3.68667 5.06667L7.03333 1.72"
							strokeWidth="1.5"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
				<button
					onClick={() => swiperRef.current?.slideNext()}
					className="flex h-10 w-[42px] items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#C8AC71] transition-opacity hover:opacity-90"
				>
					<svg
						width="8"
						height="11"
						viewBox="0 0 8 11"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0.966667 1.72L4.31333 5.06667C4.82667 5.58 4.82667 6.42 4.31333 6.93333L0.966667 10.28"
							stroke="white"
							strokeWidth="1.5"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</div>

			{/* Destinations Slider */}
			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={20}
				slidesPerView={1}
				onSwiper={(swiper) => (swiperRef.current = swiper)}
				breakpoints={{
					640: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 4,
					},
				}}
				className="destinations-swiper"
			>
				{destinations.map((destination) => (
					<SwiperSlide key={destination.id}>
						<div className="flex flex-col">
							<img
								src={destination.image}
								alt={destination.title}
								className="mb-3 h-[359px] w-full rounded object-cover"
							/>
							<p className="font-['Open_Sans'] text-base font-normal text-[#2B2A29]">
								{destination.title}
							</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default DestinationsSection;
