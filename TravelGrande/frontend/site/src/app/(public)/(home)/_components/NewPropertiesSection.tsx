import PropertyCard from './PropertyCard';

const NewPropertiesSection = () => {
	const properties = [
		{
			id: 1,
			images: [
				'https://api.builder.io/api/v1/image/assets/TEMP/834383aa22ba469db34201ba3cc0f3b708659262?width=650',
				'https://api.builder.io/api/v1/image/assets/TEMP/b0a0066006c3ba6a49cce8d04fe6e12b2ebd7294?width=650',
				'https://api.builder.io/api/v1/image/assets/TEMP/80e54d9c11be4b2c3837061293396e8c76447973?width=650',
			],
			isNew: true,
			title: 'Дом у моря в Сочи',
			location: 'Сочи, Адлер',
			description:
				'Современная вилла с бассейном, террасой и панорамным видом на Черное море. 3 спальни, до 6 гостей.',
			price: 40500,
		},
		{
			id: 2,
			images: [
				'https://api.builder.io/api/v1/image/assets/TEMP/834383aa22ba469db34201ba3cc0f3b708659262?width=650',
				'https://api.builder.io/api/v1/image/assets/TEMP/b0a0066006c3ba6a49cce8d04fe6e12b2ebd7294?width=650',
				'https://api.builder.io/api/v1/image/assets/TEMP/80e54d9c11be4b2c3837061293396e8c76447973?width=650',
			],
			isNew: true,
			title: 'Дом у моря в Сочи',
			location: 'Сочи, Адлер',
			description:
				'Современная вилла с бассейном, террасой и панорамным видом на Черное море. 3 спальни, до 6 гостей.',
			price: 40500,
		},
		{
			id: 3,
			images: [
				'https://api.builder.io/api/v1/image/assets/TEMP/834383aa22ba469db34201ba3cc0f3b708659262?width=650',
				'https://api.builder.io/api/v1/image/assets/TEMP/b0a0066006c3ba6a49cce8d04fe6e12b2ebd7294?width=650',
				'https://api.builder.io/api/v1/image/assets/TEMP/80e54d9c11be4b2c3837061293396e8c76447973?width=650',
			],
			isNew: true,
			title: 'Дом у моря в Сочи',
			location: 'Сочи, Адлер',
			description:
				'Современная вилла с бассейном, террасой и панорамным видом на Черное море. 3 спальни, до 6 гостей.',
			price: 40500,
		},
		{
			id: 4,
			images: [
				'https://api.builder.io/api/v1/image/assets/TEMP/834383aa22ba469db34201ba3cc0f3b708659262?width=650',
				'https://api.builder.io/api/v1/image/assets/TEMP/b0a0066006c3ba6a49cce8d04fe6e12b2ebd7294?width=650',
				'https://api.builder.io/api/v1/image/assets/TEMP/80e54d9c11be4b2c3837061293396e8c76447973?width=650',
			],
			isNew: true,
			title: 'Дом у моря в Сочи',
			location: 'Сочи, Адлер',
			description:
				'Современная вилла с бассейном, террасой и панорамным видом на Черное море. 3 спальни, до 6 гостей.',
			price: 40500,
		},
	];

	return (
		<section className="container mb-20 max-md:mb-16 max-sm:mb-12">
			<h2 className="mb-6 text-center font-['Times_New_Roman'] text-[40px] font-normal uppercase leading-normal text-[#2B2A29] max-md:text-3xl max-sm:text-2xl">
				<span className="text-[#C8AC71]">Новые дома</span> в TravelGrande
			</h2>
			<p className="mb-12 text-center font-['Open_Sans'] text-lg font-normal text-[#2B2A29] max-md:mb-8 max-md:text-base">
				Подборка свежих объектов, которые уже прошли нашу проверку и готовы
				принять гостей
			</p>

			{/* Properties Grid */}
			<div className="mb-10 grid grid-cols-2 gap-5 max-lg:grid-cols-1">
				{properties.map((property) => (
					<PropertyCard key={property.id} property={property} />
				))}
			</div>

			{/* View More Button */}
			<div className="flex justify-center">
				<button className="inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#2B2A29] px-[51px] py-4 transition-opacity hover:opacity-90">
					<span className="font-['Open_Sans'] text-base font-semibold text-white">
						Смотреть больше
					</span>
				</button>
			</div>
		</section>
	);
};

export default NewPropertiesSection;
