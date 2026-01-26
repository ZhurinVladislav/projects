import { SITE } from '@/config/site.config';
import Image from 'next/image';

const JoinUs = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-[40px] px-5 py-16 max-md:rounded-3xl max-md:py-10">
          {/* Background Image */}
          <div className="absolute top-0 left-0 h-full w-full">
            <Image className="h-full w-full object-cover" src="/img/about/join/bg-img.jpg" alt="" width={1920} height={500} />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent"></div>
          </div>

          <div className="relative inset-0 z-100 m-auto flex max-w-270.5 flex-col items-center text-center text-white">
            <h2 className="mb-6 font-[--font-primary] text-[40px] uppercase max-md:mb-4 max-md:text-3xl max-sm:text-2xl">Присоединяйтесь</h2>

            <p className="mb-10 max-md:mb-5">
              {SITE.APP_NAME} — это не просто сервис. Это гид по лучшему жилью России. Мы уже начали собирать для вас коллекцию выдающихся объектов. И с каждым днём она становится всё больше.
            </p>

            <p className="font-semibold">Выбирайте по-настоящему хорошее. Живите красиво — в любом городе.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
