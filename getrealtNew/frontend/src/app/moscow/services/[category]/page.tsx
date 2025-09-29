import Breadcrumbs from '@/components/Breadcrumbs';
import PageContent from '@/components/PageContent';
import Services from '@/components/Services';
import { Categories } from '@/shared/data/pages/categories.data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = Categories.find(c => c.alias === params.category);

  if (!category) {
    return {};
  }

  return {
    title: category.title,
    description: category.description,
    // можно добавить другие метатеги:
    keywords: category.keywords,
    icons: {
      icon: './favicon.svg',
    },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = Categories.find(c => c.alias === params.category);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs />
      <Services />
      <PageContent content={category.pageContent} />
    </>
    // <div>
    //   <h1>{category.title}</h1>
    //   <p>{category.description}</p>

    //   <h2>Услуги:</h2>
    //   <ul>
    //     {category.services.map(service => (
    //       <li key={service.id}>{service.name}</li>
    //     ))}
    //   </ul>

    // </div>
  );
}
