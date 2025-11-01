import ButtonLink from '@/components/ui/ButtonLink';
import { TServices } from '@/types/Service/type';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import ServiceDeleteButton from '../ServiceDeleteButton';

interface IProps {
  data: TServices;
}

const ServiceListTable: React.FC<IProps> = ({ data }) => {
  if (Array.isArray(data) && data.length > 0) {
    return (
      <>
        <div className="flex flex-col gap-3">
          <div className="flex">
            <ButtonLink className="ml-auto" href="/dashboard/services/new" variant="success">
              Создать новую услугу
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
                      Категории
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
                    <td className="px-6 py-4">
                      {Array.isArray(item.categories) && item.categories.length > 0 ? (
                        <ul className="flex max-w-60 flex-wrap gap-1">
                          {item.categories.map((itemCategory, index) => (
                            <li key={itemCategory.id} className="inline">
                              {itemCategory.title}
                              {index < item.categories.length - 1 && <span className="text-(--secondary-color)"> | </span>}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </td>

                    <td className="px-6 py-4">{item.created}</td>
                    <td className="px-6 py-4">{item.updated}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center gap-2">
                        <Link className="font-medium text-blue-600 hover:underline dark:text-blue-500" href={`/dashboard/services/${item.id}`}>
                          Редактировать
                        </Link>
                        <ServiceDeleteButton id={item.id} title="Удалить услугу?" description="Вы действительно хотите удалить эту услугу? Это действие необратимо." triggerLabel="Удалить" />
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
        <div className="flex">
          <ButtonLink className="ml-auto" href="/dashboard/services/new" variant="success">
            Создать новую услугу
          </ButtonLink>
        </div>
        <p>Список услуг пуст</p>
      </>
    );
  }
};

export default ServiceListTable;
