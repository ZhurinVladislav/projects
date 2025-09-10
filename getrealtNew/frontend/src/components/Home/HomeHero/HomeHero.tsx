const HomeHero = () => {
  return (
    <section data-testid="home-hero">
      <div className="container">
        <div className="flex">
          <h1 className="text bg-center">Всем привет!</h1>
        </div>
      </div>
    </section>
    // <section data-testid="home-hero" className="mb-54 max-lg:mb-20">
    //   <div className="container flex items-center justify-between gap-6 max-lg:flex-col-reverse">
    //     <div className="w-full max-w-3xl">
    //       <h1 className="font-radiotechnika max-sm:text- mb-5 text-xl uppercase max-lg:mb-4">
    //         <span className="text-(--primary-color)">Создание сайтов</span> и WEB-приложений
    //       </h1>
    //       <p className="font-radiotechnika text-6xl uppercase max-lg:text-4xl max-sm:text-2xl">
    //         WEB-<span className="text-(--primary-color)">разработка</span>
    //       </p>
    //     </div>
    //     <div className="flex h-175 w-full max-w-150 items-center justify-center overflow-hidden rounded-xl bg-[url(../../public/img/home/hero/bg-img.png)] bg-cover bg-center bg-no-repeat p-17 max-lg:h-96 max-lg:p-10">
    //       <Image src={img} className="h-full w-full object-contain" alt="Робот говорит привет" />
    //     </div>
    //   </div>
    // </section>
  );
};

export default HomeHero;
