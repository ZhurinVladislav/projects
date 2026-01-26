// 'use client';

const NotFound = () => {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title-1">Страница не найдена</h1>
        <p>Данная страница не существует, она была удалена или перемещена</p>
        {/* <Link href="/" className="text-blue-600 underline">
          Вернуться на главную
        </Link> */}
        <a href="/" className="text-blue-600 underline">
          Вернуться на главную
        </a>
      </div>
    </section>
  );
};

export default NotFound;
