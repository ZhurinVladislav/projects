import Image from 'next/image';

const ContactsHero = () => {
  return (
    <section className="section min-h-screen w-full overflow-hidden pt-87 max-lg:min-h-175 max-md:min-h-150 max-sm:min-h-125">
      <Image className="absolute inset-0 h-full w-full object-cover" src="/img/contacts/hero/bg-img.jpg" alt="Контакты" width={1920} height={942} />

      <div className="container flex h-full flex-col items-center justify-center">
        <div className="text-white">
          <h1 className="title-1 mb-6 text-center">
            Свяжитесь <span className="color">с нами</span>
          </h1>
          <p className="text-center text-2xl font-normal max-lg:text-xl max-md:text-lg max-sm:text-base">
            Мы всегда рады помочь с выбором жилья, ответить на ваши вопросы и сделать ваше путешествие незабываемым. Напишите нам — мы на связи 24/7.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactsHero;
