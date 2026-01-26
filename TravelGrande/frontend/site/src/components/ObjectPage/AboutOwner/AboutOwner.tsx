import Image from 'next/image';

const AboutOwner = () => {
  return (
    <section className="mb-35">
      <div className="container">
        <div className="max-w-201.25">
          <h2 className="mb-6 text-2xl">О владельце</h2>

          <div className="flex items-start gap-6">
            <Image className="h-16 w-16 shrink-0 rounded-sm" src="/img/common/avatar.jpg" width={64} height={64} alt="Аватар" />
            <div>
              <h3 className="mb-4 text-base font-semibold">Этим домом управляет Алексей.</h3>
              <p className="text-base leading-relaxed">
                Он — не просто хозяин, а человек, который лично заботится о вашем комфорте до, во время и после заселения. Алексей хорошо знает район и с удовольствием подскажет, где вкусно поесть,
                куда сходить и как провести время. Он рядом, но не навязчив — если вам что-то понадобится, он всегда на связи и готов помочь.
              </p>
            </div>
          </div>

          <div className="mt-8 max-w-185.25 rounded bg-(--text-color) p-10">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(200,172,113,0.2)]">
                <span className="text-base text-(--primary-color)">!</span>
              </div>
              <div>
                <h4 className="mb-3 text-base text-(--primary-color)">Отличные хозяева — не менее важны, чем дома.</h4>
                <p className="text-base text-white">
                  Мы сотрудничаем только с теми, кто разделяет наш подход к качеству и гостеприимству. Если хозяин не соответствует высоким стандартам сервиса — его объект не попадёт в наш каталог.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOwner;
