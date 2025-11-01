import Api from '@/app/api';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import PageDeleteButton from '../PageDeleteButton';
import ButtonLink from '../ui/ButtonLink';

const Resources = async () => {
  try {
    const pages = await Api.fetchGetPages();

    if (Array.isArray(pages.data) && pages.data.length > 0) {
      return (
        <>
          <h1 className="title-1">Ресурсы сайта</h1>

          <div className="flex flex-col gap-3">
            <div className="flex">
              {/* <label htmlFor="table-search" className="sr-only">
            Search
          </label>

          <div className="relative mt-1">
            <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>

            <input
              type="text"
              id="table-search"
              value={value}
              onChange={e => setValue(e.target.value)}
              className="block w-80 rounded-lg border border-gray-300 bg-gray-50 ps-10 pt-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search for items"
            />
          </div> */}
              <ButtonLink className="ml-auto" href="/dashboard/resources/new" variant="success">
                Создать новый ресурс
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
                        ID-родителя
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
                  {pages.data.map(item => (
                    <tr key={item.id} className="border-b border-gray-700 bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                        {item.id}
                      </th>
                      <td className="px-6 py-4">{item.parentId}</td>
                      <td className="px-6 py-4">{item.pageTitle}</td>
                      {item.isPublished ? (
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div> Опубликовано
                          </div>
                        </td>
                      ) : (
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="me-2 h-2.5 w-2.5 rounded-full bg-red-500"></div> Не опубликовано
                          </div>
                        </td>
                      )}

                      <td className="px-6 py-4">{item.created}</td>
                      <td className="px-6 py-4">{item.updated}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center gap-2">
                          <Link className="font-medium text-blue-600 hover:underline dark:text-blue-500" href={`/dashboard/resources/${item.id}`}>
                            Редактировать
                          </Link>
                          <PageDeleteButton id={item.id} title="Удалить страницу?" description="Вы действительно хотите удалить эту страницу? Это действие необратимо." triggerLabel="Удалить" />
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
          <h1 className="title-1">Ресурсы сайта</h1>
          <div className="flex flex-col gap-3">
            <div className="flex">
              <ButtonLink className="ml-auto" href="/dashboard/resources/new" variant="success">
                Создать новый ресурс
              </ButtonLink>
            </div>
          </div>
          <p>Нет страниц</p>
        </>
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    return <p>Ошибка загрузки: {message}</p>;
  }
};

export default Resources;
