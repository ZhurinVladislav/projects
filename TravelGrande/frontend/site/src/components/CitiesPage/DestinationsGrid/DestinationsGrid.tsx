import Image from 'next/image';
import Link from 'next/link';

const DestinationsGrid = () => {
  const destinations = [
    {
      id: 1,
      image: '/img/cities/destinations/sochi.jpg',
      title: 'Сочи',
      description: 'От моря до гор — идеальный круглый год',
    },
    {
      id: 2,
      image: '/img/cities/destinations/gelendzhik.jpg',
      title: 'Геленджик',
      description: 'Солнечный отдых, живописные бухты и набережные',
    },
    {
      id: 3,
      image: '/img/cities/destinations/anapa.jpg',
      title: 'Анапа',
      description: 'Песчаные пляжи и превосходная атмосфера',
    },
    {
      id: 4,
      image: '/img/cities/destinations/krasnaya-polyana.jpg',
      title: 'Красная поляна',
      description: 'Горы, термы и шале круглый год',
    },
    {
      id: 5,
      image: '/img/cities/destinations/sochi.jpg',
      title: 'Сочи',
      description: 'От моря до гор — идеальный круглый год',
    },
    {
      id: 6,
      image: '/img/cities/destinations/gelendzhik.jpg',
      title: 'Геленджик',
      description: 'Солнечный отдых, живописные бухты и набережные',
    },
    {
      id: 7,
      image: '/img/cities/destinations/anapa.jpg',
      title: 'Анапа',
      description: 'Песчаные пляжи и превосходная атмосфера',
    },
    {
      id: 8,
      image: '/img/cities/destinations/krasnaya-polyana.jpg',
      title: 'Красная поляна',
      description: 'Горы, термы и шале круглый год',
    },
  ];

  return (
    <>
      {/* Grid */}
      <div className="mb-12 grid grid-cols-4 gap-5 max-md:grid-cols-2 max-md:gap-4 max-sm:grid-cols-1">
        {destinations.map(destination => (
          <Link className="group flex flex-col overflow-hidden rounded-xs border border-(--border-color) transition-transform hover:scale-105" key={destination.id} href="cities/sochi">
            <div className="flex h-43.75 w-full overflow-hidden">
              <Image src={destination.image} alt={destination.title} className="h-full w-full object-cover transition-transform group-hover:scale-110" width={325} height={175} />
            </div>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex items-center gap-2">
                <Image src="/img/icons/mark.svg" width={12} height={16} alt="Маркер" />
                <p>{destination.title}</p>
              </div>

              <p>{destination.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center">
        <button className="flex h-12 items-center justify-center gap-2.5 rounded-full bg-(--text-color) px-20 py-3 text-white transition-colors hover:bg-(--primary-color)">Смотреть больше</button>
      </div>
    </>
  );
};

export default DestinationsGrid;
