import AboutHero from '@/components/AboutPage/AboutHero/AboutHero';
import ForWhom from '@/components/AboutPage/ForWhom/ForWhom';
import JoinUs from '@/components/AboutPage/JoinUs/JoinUs';
import WhatWeDo from '@/components/AboutPage/WhatWeDo/WhatWeDo';
import WhyTravelGrande from '@/components/AboutPage/WhyTravelGrande/WhyTravelGrande';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'О нас',
    description: 'TravelGrande — это больше, чем сайт аренды. Только лучшие дома и квартиры в России',
  };
}

export default function AboutUsPage() {
  return (
    <>
      <AboutHero />
      <WhyTravelGrande />
      <WhatWeDo />
      <ForWhom />
      <JoinUs />
    </>
  );
}
