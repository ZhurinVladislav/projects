import { Metadata } from 'next';
import Hero from './_components/Hero';
import SearchBar from './_components/SearchBar';
import WhySection from './_components/WhySection';
import DestinationsSection from './_components/DestinationsSection';
import NewPropertiesSection from './_components/NewPropertiesSection';
import HowWeChooseSection from './_components/HowWeChooseSection';
import AboutSection from './_components/AboutSection';
import CTASection from './_components/CTASection';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Главная страница',
		description: 'Только избранные дома для вашего идеального путешествия',
	};
}

export default function HomePage() {
	return (
		<>
			<Hero />
			<SearchBar />
			<WhySection />
			<DestinationsSection />
			<NewPropertiesSection />
			<HowWeChooseSection />
			<AboutSection />
			<CTASection />
		</>
	);
}
