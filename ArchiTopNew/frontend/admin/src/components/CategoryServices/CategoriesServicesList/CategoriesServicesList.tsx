import Api from '@/app/api';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import ButtonLink from '../../ui/ButtonLink';
import CategoryServicesDeleteButton from '../CategoryServicesDeleteButton';

const CategoriesServicesList = async () => {
  try {
    const response = await Api.FetchCategoriesServicesList();

    const data = response.data;

    if (Array.isArray(data) && data.length > 0) {
      return (
        <>
          <h1 className="title-1">Категории услуг</h1>

          <div className="flex flex-col gap-3">
            <div className="flex">
              <ButtonLink className="ml-auto" href="/dashboard/categories/new" variant="success">
                Создать новую категорию
              </ButtonLink>
            </div>

            <div className="relative overflow-x-auto rounded-sm shadow-md">
              <table className="w-full text-left text-sm rtl:text-right">
                <thead className="bg-(--bg-op-1-color) text-xs uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      <button className="flex items-center gap-1 uppercase">
                        ID
                        <ArrowUpDown width={14} height={14} />
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <button className="flex items-center gap-1 uppercase">
                        ID-страницы
                        <ArrowUpDown width={14} height={14} />
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <button className="flex items-center gap-1 uppercase">
                        Название
                        <ArrowUpDown width={14} height={14} />
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <button className="flex items-center gap-1 uppercase">
                        Публикация
                        <ArrowUpDown width={14} height={14} />
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <button className="flex items-center gap-1 uppercase">
                        Дата создания
                        <ArrowUpDown width={14} height={14} />
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <button className="flex items-center gap-1 uppercase">
                        Дата обновления
                        <ArrowUpDown width={14} height={14} />
                      </button>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Действия</span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.map(item => (
                    <tr key={item.id} className="border-b border-gray-700 bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                        {item.id}
                      </th>
                      <td className="px-6 py-4">{item.pageId}</td>
                      <td className="px-6 py-4">{item.title}</td>
                      {item.isActive ? (
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div> Активна
                          </div>
                        </td>
                      ) : (
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="me-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Не активна
                          </div>
                        </td>
                      )}

                      <td className="px-6 py-4">{item.created}</td>
                      <td className="px-6 py-4">{item.updated}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center gap-2">
                          <Link className="font-medium text-blue-600 hover:underline dark:text-blue-500" href={`/dashboard/categories/${item.id}`}>
                            Редактировать
                          </Link>
                          <CategoryServicesDeleteButton
                            id={item.id}
                            title="Удалить категорию?"
                            description="Вы действительно хотите удалить эту категорию услуги? Это действие необратимо."
                            triggerLabel="Удалить"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <h1 className="title-1">Категории услуг</h1>
          <div className="flex flex-col gap-3">
            <div className="flex">
              <ButtonLink className="ml-auto" href="/dashboard/categories/new" variant="success">
                Создать новую категорию
              </ButtonLink>
            </div>
            <p>Нет категорий услуг</p>
          </div>
        </>
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return <p>Ошибка загрузки: {message}</p>;
  }
};

export default CategoriesServicesList;
