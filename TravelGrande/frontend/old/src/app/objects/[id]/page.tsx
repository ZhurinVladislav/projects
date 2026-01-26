import AboutOwner from '@/components/ObjectPage/AboutOwner';
import BookingRules from '@/components/ObjectPage/BookingRules';
import FullLocationSection from '@/components/ObjectPage/FullLocationSection';
import LocationSection from '@/components/ObjectPage/LocationSection';
import MainContent from '@/components/ObjectPage/MainContent/MainContent';
import TopSlider from '@/components/ObjectPage/TopSlider';

export default async function CompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      {/* Image Gallery */}
      <TopSlider />
      {/* Main page content */}
      <MainContent id={id} />
      {/* Location Section */}
      <LocationSection />
      {/* Full Location Section */}
      <FullLocationSection />
      {/* Booking Rules */}
      <BookingRules />
      {/* About Owner */}
      <AboutOwner />
    </>
  );
}
