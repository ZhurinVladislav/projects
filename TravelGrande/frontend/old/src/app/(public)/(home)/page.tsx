import AboutSection from '@/components/HomePage/AboutSection';
import CTASection from '@/components/HomePage/CTASection';
import DestinationsSection from '@/components/HomePage/DestinationsSection';
import Hero from '@/components/HomePage/Hero';
import HowWeChooseSection from '@/components/HomePage/HowWeChooseSection';
import NewPropertiesSection from '@/components/HomePage/NewPropertiesSection';
import WhySection from '@/components/HomePage/WhySection';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Главная страница',
    description: 'Только избранные дома для вашего идеального путешествия',
  };
}

export default function HomePage() {
  return (
    <div>
      <Hero />
      <WhySection />
      <DestinationsSection />
      <NewPropertiesSection />
      <HowWeChooseSection />
      <AboutSection />
      <CTASection />
    </div>
  );
}
