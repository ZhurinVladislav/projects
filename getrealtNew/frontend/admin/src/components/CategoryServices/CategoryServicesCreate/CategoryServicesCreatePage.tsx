import Api from '@/app/api';
import Link from 'next/link';
import CategoryServicesForm from '../CategoryServicesForm';

const CategoryServicesCreate = async () => {
  try {
    const response = await Api.fetchGetPagesSimple();

    const data = response.data;

    return (
      <>
        <h1 className="title-1">Создание новой категории услуг</h1>
        <div className="mb-4 flex max-w-max flex-col gap-1.5 rounded-sm border border-(--info-color) bg-(--info-op-color) p-2">
          <strong className="uppercase">Важно!</strong>
          <p>Для того, чтобы категория отобразилась на сайте, необходимо создать ресурс.</p>
          <Link className="underline hover:no-underline" href="/dashboard/resources/new">
            Создать ресурс
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <CategoryServicesForm pages={data} />
        </div>
      </>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return <p>Ошибка загрузки: {message}</p>;
  }
};

export default CategoryServicesCreate;
