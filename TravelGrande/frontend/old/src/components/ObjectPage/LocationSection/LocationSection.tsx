import NearbyPlacesSlider from '../NearbyPlacesSlider';

const LocationSection = () => {
  return (
    <section className="mb-10">
      <div className="container">
        <div className="border-b border-(--border-color) pb-10">
          <h2 className="mb-6 text-2xl">Локация</h2>

          <div className="mb-22 w-full max-w-225.25">
            <div className="mb-6">
              <h3 className="mb-4 text-xl text-(--gray-color)">О районе</h3>
              <p className="mb-4">
                Дом расположен в тихом и зелёном районе, где приятно гулять, наслаждаться природой и отдыхать от городского шума. В пешей доступности — уютные кафе, продуктовые магазины и местный
                рынок.
              </p>
              <p className="mb-4">До центра города можно быстро добраться на машине или общественном транспорте. Район идеально подойдёт тем, кто ценит комфорт, безопасность и неспешную атмосферу.</p>
              <p className="mb-4">
                Недалеко находятся парки, прогулочные маршруты и популярные достопримечательности. Здесь легко почувствовать себя местным — без суеты, но с полным доступом ко всем удобствам.
              </p>

              <h3 className="mb-4 text-xl text-(--gray-color)">Куда сходить</h3>

              <p className="mb-4">Местные рестораны, кафе, музеи, достопримечательности и мероприятия, рекомендованные нашим сообществом хозяев и экспертов по путешествиям</p>
            </div>
          </div>

          {/* Nearby places slider */}
          <NearbyPlacesSlider />
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
