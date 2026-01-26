import BestAvailable from '@/components/CityPage/BestAvailable/BestAvailable';
import CityFeatures from '@/components/CityPage/CityFeatures/CityFeatures';
import CityGuideSlider from '@/components/CityPage/CityGuideSlider/CityGuideSlider';
import CityHero from '@/components/CityPage/CityHero';
import CollectedBest from '@/components/CityPage/CollectedBest/CollectedBest';
import ForWhomCity from '@/components/CityPage/ForWhomCity/ForWhomCity';
import WarmWelcome from '@/components/CityPage/WarmWelcome/WarmWelcome';
import WhereToEatSlider from '@/components/CityPage/WhereToEatSlider/WhereToEatSlider';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Город Сочи',
    description: 'Откройте для себя лучшие направления для незабываемого путешествия',
  };
}

export default function CityPage() {
  // Sample data - in production, this would come from API/database based on slug
  const cityData = {
    name: 'Сочи',
    subtitle: 'Жемчужина Черноморского Побережья',
    description:
      'Сочи — город, где встречаются море и горы, солнце и свежий воздух, активный отдых и расслабление. Здесь каждый найдёт что-то своё: от пляжных развлечений и прогулок по набережной до походов в горы и экскурсий по уникальным природным и культурным достопримечательностям.',
    heroImage: '/img/city/hero/img-1.jpg',
  };

  const reasons = [
    { number: 1, text: 'Уникальный климат и природное разнообразие' },
    { number: 2, text: 'Круглогодичные возможности для отдыха и спорта' },
    { number: 3, text: 'Богатая инфраструктура с ресторанами, кафе и развлечениями' },
    { number: 4, text: 'Проверенное жильё с комфортом и вниманием к деталям' },
  ];

  const guideItems = [
    {
      id: 1,
      image: '/img/city/guide/img-1.jpg',
      title: 'Морской вокзал',
      description: 'Знаковое здание в стиле сталинского ампира, символ курорта и отправная точка прогулок на яхтах. Здесь можно прогуляться по набережной, насладиться видом на море и посетить кафе.',
    },
    {
      id: 2,
      image: '/img/city/guide/img-2.jpg',
      title: 'Парк «Ривьера»',
      description: 'Один из старейших парков города, с тенистыми аллеями, детскими аттракционами, уютными кафе и фонтанами. Идеальное место для семейного отдыха и прогулок на свежем воздухе.',
    },
  ];

  const restaurants = [
    {
      id: 1,
      image: '/img/city/restaurants/img-1.jpg',
      title: 'Red Fox',
      description: 'Ресторан с авторской кухней, где используются свежие локальные продукты. Отличное место для романтического ужина или деловой встречи.',
    },
    {
      id: 2,
      image: '/img/city/restaurants/img-2.jpg',
      title: 'Гастрономика',
      description: 'Расположенный на высоте ресторан с видом на море и горы, предлагает сочетание классических и современных блюд.',
    },
  ];

  const audiences = [
    {
      id: 1,
      title: 'Пары',
      description: 'ищущие романтический отдых с морскими закатами',
    },
    {
      id: 2,
      title: 'Семьи',
      description: 'с детьми благодаря удобной инфраструктуре и развлечениям',
    },
    {
      id: 3,
      title: 'Группы друзей',
      description: 'желающие сочетать пляж и активные развлечения',
    },
    {
      id: 4,
      title: 'Фрилансеры',
      description: 'и digital nomads, которым важен комфорт и интернет',
    },
  ];

  const properties = [
    {
      id: 1,
      image: '/img/city/properties/img-1.jpg',
      title: 'Дом у моря в Сочи',
      price: 7200,
      period: 'ночь',
    },
    {
      id: 2,
      image: '/img/city/properties/img-1.jpg',
      title: 'Вилла на 4 чел в Сочи',
      price: 7500,
      period: 'ночь',
    },
    {
      id: 3,
      image: '/img/city/properties/img-1.jpg',
      title: 'Дом у моря в Сочи',
      price: 9200,
      period: 'ночь',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <CityHero cityName={cityData.name} subtitle={cityData.subtitle} description={cityData.description} imageUrl={cityData.heroImage} reasons={reasons} />

      {/* City Guide Slider */}
      <CityGuideSlider cityName={cityData.name} subtitle="Что посмотреть в Сочи?" items={guideItems} />

      {/* Where to Eat Slider */}
      <WhereToEatSlider cityName={cityData.name} subtitle="Лучшие рестораны и кафе в Сочи" restaurants={restaurants} />

      {/* City Features */}
      <CityFeatures
        cityName={cityData.name}
        subtitle="Почему именно Сочи?"
        description="Сочи — это уникальное место, где сочетаются горы, море, субтропический климат и развитая инфраструктура. Здесь можно отдыхать круглый год: летом — купаться и загорать, а зимой — кататься на лыжах в Красной Поляне. Город предлагает множество возможностей для активного и семейного отдыха, а также комфортные условия для тех, кто работает удалённо."
      />

      {/* For Whom City */}
      <ForWhomCity subtitle="Лучшие рестораны и кафе в Сочи" audiences={audiences} />

      {/* Warm Welcome */}
      <WarmWelcome
        title="Тёплый приём — от местных"
        subtitle="Почему именно Сочи?"
        description="Мы сотрудничаем только с проверенными хозяевами, которые лично заинтересованы в вашем хорошем отдыхе. Они готовы помочь с советами по городу, встретить вас и оперативно решить любые вопросы во время проживания."
        imageUrl="/img/city/warm-welcome/bg-img.jpg"
      />

      {/* Best Available */}
      <BestAvailable cityName={cityData.name} subtitle="Мы отобрали топ-жильё по качеству, комфорту и локации — вам остаётся только выбрать" properties={properties} />

      {/* Collected Best */}
      <CollectedBest />
    </>
  );
}
