import Image from 'next/image';

interface WarmWelcomeProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

const WarmWelcome = ({ title, subtitle, description, imageUrl }: WarmWelcomeProps) => {
  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-[40px] px-5 py-16 max-md:py-10">
          <div className="absolute top-0 left-0 h-full w-full">
            <Image className="h-full w-full object-cover" src={imageUrl} alt={title} width={1360} height={307} />
            <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent" />
          </div>

          <div className="relative inset-0 z-100 m-auto flex max-w-270.5 flex-col items-center text-center text-white">
            <h2 className="mb-6 font-[--font-primary] text-[40px] uppercase max-md:mb-4 max-md:text-3xl max-sm:text-2xl">{title}</h2>

            <p className="mb-10">{subtitle}</p>

            <p>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarmWelcome;
