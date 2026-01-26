interface Audience {
  id: number;
  title: string;
  description: string;
}

interface ForWhomCityProps {
  subtitle: string;
  audiences: Audience[];
}

const ForWhomCity = ({ subtitle, audiences }: ForWhomCityProps) => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="mb-6 text-center font-[--font-primary] text-[40px] uppercase max-md:mb-4 max-md:text-3xl max-sm:text-2xl">
          Для <span className="color">кого</span> этот город
        </h2>
        <p className="mb-16 text-center text-lg max-md:mb-8 max-md:text-base">{subtitle}</p>

        <ul className="m-auto grid max-w-221 grid-cols-2 gap-4 max-md:grid-cols-1">
          {audiences.map(audience => (
            <li key={audience.id} className="flex flex-col gap-3 rounded border border-(--border-color) px-8 py-6.5 max-md:px-4 max-md:py-5">
              <p className="font-[--font-primary] text-[32px] leading-none text-(--primary-color) italic max-md:text-2xl">{audience.title}</p>
              <p>{audience.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ForWhomCity;
