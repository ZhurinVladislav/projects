const CompanyServices: React.FC = () => {
  return (
    <section data-testid="company-services" className="section">
      <div className="container">
        <h2 className="title-2 mx-auto text-center">Услуги</h2>
        <ul className="flex flex-col gap-16">
          <li className="flex flex-col gap-8">
            <div className="flex min-h-16 w-full max-w-108 items-center justify-center rounded-(--border-radius) border border-(--link-second-color) p-1.5 text-xl text-(--link-second-color)">
              <p>Операции с недвижимостью</p>
            </div>
            <ul className="flex flex-wrap gap-x-8 gap-y-6 rounded-(--border-radius) bg-(--gray-color) p-8 max-md:gap-5">
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Купля-продажа</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Мена</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Купля-продажа</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Мена</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Дарение</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Аренда</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Дарение</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Аренда</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Ипотека</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Приватизация</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Ипотека</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Приватизация</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Дарение</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Аренда</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Дарение</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Аренда</li>
            </ul>
          </li>
          <li className="flex flex-col gap-8 max-md:gap-5">
            <div className="flex min-h-16 w-full max-w-108 items-center justify-center rounded-(--border-radius) border border-(--link-second-color) p-1.5 text-xl text-(--link-second-color)">
              <p>Сопровождение сделок</p>
            </div>
            <ul className="flex flex-wrap gap-x-8 gap-y-6 rounded-(--border-radius) bg-(--gray-color) p-8">
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Купля-продажа</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Консультации по выбору</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Купля-продажа</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Консультации по выбору</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Оценка</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Юридическое сопровождение</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Оценка</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Юридическое сопровождение</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Консультирование</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Анализ рынка</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Консультирование</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Анализ рынка</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Консультирование</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Анализ рынка</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Консультирование</li>
              <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal">Анализ рынка</li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CompanyServices;
