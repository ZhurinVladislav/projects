import Image from 'next/image';
import Link from 'next/link';

const Location = () => {
  return (
    <div className="mb-10 flex flex-wrap items-center gap-2 max-md:mb-8">
      <Image src="/img/icons/mark.svg" width={12} height={16} alt="Маркер" />
      <span className="text-base">Сочи, Адлер, ул. Центральная 14</span>
      <Link href="#" className="text-sm underline hover:text-(--primary-color) md:text-base">
        (показать на карте)
      </Link>
    </div>
  );
};

export default Location;
