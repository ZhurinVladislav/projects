import CompanyHero from '@/components/CompanyHero';
import { COMPANIES } from '@/shared/data/companies/companies.data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: { company: string };
}

export const revalidate = 43200; // ISR каждые 12 часов

// Генерация SEO мета
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const company = COMPANIES.find(c => c.alias === params.company);
  if (!company) return {};

  return {
    title: `${company.name} – отзывы, рейтинг, контакты`,
    description: `Информация о компании ${company.name}: отзывы клиентов, контакты, адрес.`,
    // description: `Информация о компании ${company.name}: рейтинг ${company.rating}, отзывы клиентов, контакты, адрес.`,
    openGraph: {
      title: `${company.name} – недвижимость в Москве`,
      description: company.description,
      type: 'website',
    },
  };
}

// Генерация путей
export async function generateStaticParams() {
  return COMPANIES.map(company => ({
    alias: company.alias,
  }));
}

export default function CompanyPage({ params }: Props) {
  const company = COMPANIES.find(c => c.alias === params.company);
  if (!company) return notFound();

  // Schema.org JSON-LD
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    description: company.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address,
      addressLocality: 'Москва',
      addressCountry: 'Россия',
    },
    // aggregateRating: {
    //   '@type': 'AggregateRating',
    //   ratingValue: company.rating,
    //   reviewCount: 120, // можно подтягивать реально из БД
    // },
  };

  return (
    <>
      <CompanyHero company={company} />
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
    // <div className="mx-auto max-w-3xl py-8">
    //   <h1 className="mb-4 text-2xl font-bold">{company.name}</h1>
    //   <p className="mb-2">{company.description}</p>
    //   <p className="mb-2">
    //     <strong>Рейтинг:</strong> {company.rating}
    //   </p>
    //   {/* <div className="rounded-lg p-4 shadow">
    //     <Image
    //       src={imgSrc}
    //       alt={imgAlt}
    //       width={400} // ставишь базовый размер
    //       height={250} // лучше в пропорции 16:9
    //       className="h-auto w-full rounded-lg object-cover"
    //       priority={false} // priority={true} для первой картинки на странице
    //     />
    //   </div> */}
    //   <p>
    //     <strong>Адрес:</strong> {company.address}
    //   </p>

    //
    // </div>
  );
}
