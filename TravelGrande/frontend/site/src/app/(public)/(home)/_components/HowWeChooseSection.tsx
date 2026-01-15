const HowWeChooseSection = () => {
	const steps = [
		{
			id: 1,
			number: '01',
			title: 'Проверено экспертами',
			description:
				'Наши кураторы вручную отобрали лучшие варианты и отсеяли тысячи неподходящих. Мы сделали это за вас — чтобы избежать случайностей и разочарований.',
		},
		{
			id: 2,
			number: '02',
			title: 'Забота в каждой детали',
			description:
				'Опытные специалисты по дому отвечают за чистоту, порядок и комфорт, чтобы ваше пребывание было действительно особенным.',
		},
		{
			id: 3,
			number: '03',
			title: 'Полная уверенность',
			description:
				'В редких случаях, если что-то идёт не по плану, мы оперативно решим ситуацию и подберём достойную замену — с выгодными условиями и вниманием к деталям.',
		},
	];

	return (
		<section className="container mb-20 max-md:mb-16 max-sm:mb-12">
			<h2 className="mb-6 text-center font-['Times_New_Roman'] text-[40px] font-normal uppercase leading-normal text-[#2B2A29] max-md:text-3xl max-sm:text-2xl">
				Как мы выбираем <span className="text-[#C8AC71]">жильё</span>
			</h2>
			<p className="mb-12 text-center font-['Open_Sans'] text-lg font-normal text-[#2B2A29] max-md:mb-8 max-md:text-base">
				TravelGrande — здесь только лучшее.
			</p>

			<div className="flex items-stretch gap-[29px] max-lg:flex-col">
				{steps.map((step) => (
					<div
						key={step.id}
						className="flex flex-1 flex-col justify-center gap-2.5 overflow-hidden rounded border border-[#E5E5E5] bg-white p-8 max-md:p-6"
					>
						<div className="mb-3 flex flex-col gap-3">
							<div className="flex items-center gap-3">
								<span className="font-['Times_New_Roman'] text-[40px] font-normal text-[#C8AC71] max-md:text-3xl">
									{step.number}
								</span>
								<h3 className="font-['Times_New_Roman'] text-2xl font-normal text-[#2B2A29] max-md:text-xl">
									{step.title}
								</h3>
							</div>
							<div className="h-px w-full bg-[#E5E5E5]"></div>
						</div>
						<p className="font-['Open_Sans'] text-base font-normal text-[#2B2A29]">
							{step.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default HowWeChooseSection;
