const WhySection = () => {
	return (
		<section className="container mb-20 max-md:mb-16 max-sm:mb-12">
			<h2 className="mb-[68px] text-center font-['Times_New_Roman'] text-[40px] font-normal uppercase leading-normal text-[#2B2A29] max-lg:mb-12 max-md:mb-8 max-md:text-3xl max-sm:text-2xl">
				Почему <span className="text-[#C8AC71]">TravelGrande</span>
			</h2>

			<div className="flex flex-wrap items-center justify-center gap-5 max-sm:flex-col">
				{/* Feature 1 */}
				<div className="flex h-[65px] flex-1 items-center gap-3 overflow-hidden rounded border border-[#E5E5E5] bg-white px-8 py-3 max-lg:min-w-[280px] max-sm:w-full max-sm:min-w-0">
					<img
						src="https://api.builder.io/api/v1/image/assets/TEMP/2d70add9fe8aa42ffdceaf59cd301a5585caf331?width=44"
						alt=""
						className="h-[25px] w-[22px]"
					/>
					<p className="font-['Open_Sans'] text-center text-lg font-normal text-[#2B2A29] max-md:text-base">
						Только проверенные объекты
					</p>
				</div>

				{/* Feature 2 */}
				<div className="flex h-[65px] flex-1 items-center gap-3 overflow-hidden rounded border border-[#E5E5E5] bg-white px-8 py-3 max-lg:min-w-[280px] max-sm:w-full max-sm:min-w-0">
					<img
						src="https://api.builder.io/api/v1/image/assets/TEMP/ae0637a2e0f7ddabfb4f76500e8ea8b0d0ad8a67?width=56"
						alt=""
						className="h-[24.889px] w-[28px]"
					/>
					<p className="font-['Open_Sans'] text-center text-lg font-normal text-[#2B2A29] max-md:text-base">
						Без посредников
					</p>
				</div>

				{/* Feature 3 */}
				<div className="flex h-[65px] flex-1 items-center gap-3 overflow-hidden rounded border border-[#E5E5E5] bg-white px-8 py-3 max-lg:min-w-[280px] max-sm:w-full max-sm:min-w-0">
					<img
						src="https://api.builder.io/api/v1/image/assets/TEMP/e6db59ce58437c8662e81c8540e31ad7a2104695?width=58"
						alt=""
						className="h-[26px] w-[29px]"
					/>
					<p className="font-['Open_Sans'] text-center text-lg font-normal text-[#2B2A29] max-md:text-base">
						Эксклюзивные объекты
					</p>
				</div>

				{/* Feature 4 */}
				<div className="flex h-[65px] flex-1 items-center gap-3 overflow-hidden rounded border border-[#E5E5E5] bg-white px-8 py-3 max-lg:min-w-[280px] max-sm:w-full max-sm:min-w-0">
					<img
						src="https://api.builder.io/api/v1/image/assets/TEMP/464f40e1bf39d86bba664f6acf4ffe55e2d6845b?width=58"
						alt=""
						className="h-[26px] w-[29px]"
					/>
					<p className="font-['Open_Sans'] text-center text-lg font-normal text-[#2B2A29] max-md:text-base">
						Красивее, чем в Instagram
					</p>
				</div>
			</div>
		</section>
	);
};

export default WhySection;
