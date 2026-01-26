import CitiesHero from '@/components/CitiesPage/CitiesHero';
import PopularPlaces from '@/components/CitiesPage/PopularPlaces';
import TravelGuide from '@/components/CitiesPage/TravelGuide';
import VerifiedHomes from '@/components/CitiesPage/VerifiedHomes';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Города',
    description: 'Откройте для себя лучшие направления для незабываемого путешествия',
  };
}

export default function CitiesPage() {
  return (
    <>
      <CitiesHero />
      <PopularPlaces />
      <TravelGuide />
      <VerifiedHomes />
    </>
  );
}
