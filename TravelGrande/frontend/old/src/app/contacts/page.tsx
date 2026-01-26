import ContactForm from '@/components/ContactsPage/ContactForm';
import ContactInfo from '@/components/ContactsPage/ContactInfo';
import ContactsHero from '@/components/ContactsPage/ContactsHero';
import MapSection from '@/components/ContactsPage/MapSection';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Контакты',
    description: 'Свяжитесь с нами — мы всегда рады помочь',
  };
}

export default function ContactsPage() {
  return (
    <>
      <ContactsHero />
      <ContactInfo />
      <ContactForm />
      <MapSection />
    </>
  );
}
