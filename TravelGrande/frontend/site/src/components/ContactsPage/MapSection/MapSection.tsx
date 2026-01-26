const MapSection = () => {
  return (
    <section className="section py-30 max-md:py-20 max-sm:py-12">
      <div className="container">
        <h2 className="title-2">Мы на карте</h2>

        {/* Map Placeholder */}
        <div className="relative h-120 w-full overflow-hidden rounded bg-(--light-bg-color)">
          {/* You can integrate Google Maps, Yandex Maps, or other map service here */}
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <svg className="mx-auto mb-4" width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                  stroke="#C8AC71"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#C8AC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-lg text-(--gray-color)">г. Москва, ул. Тверская, д. 15</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
