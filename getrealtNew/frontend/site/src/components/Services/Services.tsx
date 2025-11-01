import Api from '@/app/api';
import { TPage } from '@/types';
import Link from 'next/link';

interface IProps {
  inner?: boolean;
  dataPage?: TPage;
}

const Services: React.FC<IProps> = async props => {
  const { inner, dataPage } = props;

  try {
    const categories = await Api.fetchGetCategoriesServices();

    return (
      <section data-testid="services" className="section">
        <div className="container">
          <div className="mb-18 flex flex-col items-center text-center">
            {inner && <h1 className="visually-hidden">{dataPage?.pageTitle}</h1>}
            {inner && <h2 className="title-2">{dataPage?.longTitle}</h2>}
            {!inner && <h2 className="title-2">Услуги агентств недвижимости в Москве</h2>}
            <p>Более 258 услуг с недвижимостью в Москве</p>
          </div>

          <ul className="grid grid-cols-3 gap-8 max-md:grid-cols-2 max-sm:grid-cols-1">
            {Array.isArray(categories.data) && categories.data.length > 0 ? (
              categories.data.map(category => (
                <li key={category.id}>
                  <Link className="card card_link" href={category.fullAlias} aria-label={`Перейти на страницу ${category.title}`}>
                    <p>
                      {category.title}
                      {/* <span> ({category.services.length})</span> */}
                    </p>
                    <span className="card__btn btn btn_blue btn_no-hover">Открыть</span>
                  </Link>
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
        </div>
      </section>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return <p>Ошибка загрузки: {message}</p>;
  }
};

export default Services;
