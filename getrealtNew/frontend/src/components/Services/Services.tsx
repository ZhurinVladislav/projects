import { Categories } from '@/shared/data/pages/categories.data';
import Link from 'next/link';

const Services = () => {
  // const pathname = usePathname();

  // const isHome = pathname === '/';
  // {isHome ? <h2 className="title-2">Услуги агентств недвижимости в Сочи</h2> : <h1>Мы на другой странице</h1>}

  if (Categories.length === 0) return <></>;

  return (
    <section data-testid="services" className="section">
      <div className="container">
        <div className="mb-18 flex flex-col items-center text-center">
          <h2 className="title-2">Услуги агентств недвижимости в Сочи</h2>
          <p>Более 258 услуг с недвижимостью в Сочи</p>
        </div>

        <ul className="grid grid-cols-3 gap-8 max-md:grid-cols-2 max-sm:grid-cols-1">
          {Categories.map(category => (
            <li key={category.id}>
              <Link className="card card_link" href={`agencies/${category.alias}`} aria-label={`Перейти на страницу ${category.title}`}>
                <p>
                  {category.title}
                  <span> ({category.services.length})</span>
                </p>
                <span className="card__btn btn btn_blue btn_no-hover">Открыть</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services;
