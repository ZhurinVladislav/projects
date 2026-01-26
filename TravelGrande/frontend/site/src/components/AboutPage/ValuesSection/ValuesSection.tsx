const ValuesSection = () => {
  const values = [
    {
      id: 1,
      title: 'Качество превыше всего',
      description: 'Каждый дом проходит многоступенчатую проверку. Мы оцениваем стиль, чистоту, удобства и соответствие описанию, чтобы вы получили именно то, что ожидаете.',
    },
    {
      id: 2,
      title: 'Честность и прозрачность',
      description: 'Никаких скрытых платежей, неожиданных условий или приукрашенных фотографий. Мы работаем честно, потому что дорожим доверием наших гостей.',
    },
    {
      id: 3,
      title: 'Забота о каждом госте',
      description: 'Мы не просто предоставляем жильё — мы создаём опыт. Наша команда всегда на связи, чтобы помочь с любым вопросом и сделать ваше путешествие безупречным.',
    },
    {
      id: 4,
      title: 'Вдохновение и стиль',
      description: 'Мы выбираем дома с душой — те, куда хочется вернуться. Уютные интерьеры, продуманные детали и атмосфера, которая запоминается надолго.',
    },
  ];

  return (
    <section className="section py-30 max-md:py-20 max-sm:py-12">
      <div className="container">
        <h2 className="title-2">
          Наши <span className="color">ценности</span>
        </h2>

        <div className="grid grid-cols-2 gap-7.25 max-lg:grid-cols-1">
          {values.map(value => (
            <div key={value.id} className="flex flex-col gap-2.5 overflow-hidden rounded border border-(--border-color) bg-white p-8 max-md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-3 w-3 rounded-full bg-(--primary-color)"></div>
                <h3 className="font-[--font-primary] text-2xl font-normal max-md:text-xl">{value.title}</h3>
              </div>
              <p className="text-base font-normal text-(--gray-color)">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
