import { SITE } from '@/config/site.config';
import Image from 'next/image';
import Link from 'next/link';
import FooterMenu from './FooterMenu';

const Footer = () => {
  return (
    <footer className="w-full overflow-hidden border-t border-(--border-color) bg-white py-10">
      <div className="container">
        <div className="flex items-start justify-between gap-55.75 max-lg:flex-wrap max-lg:gap-12 max-md:gap-8">
          {/* Logo Section */}
          <Link className="flex items-center gap-4 max-md:w-full max-md:justify-center" href="/">
            <Image className="shrink-0" src="/img/logo-big.svg" width={384} height={66} alt={`Логотип ${SITE.APP_NAME}`} priority />
          </Link>

          {/* Navigation Links */}
          <FooterMenu />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
