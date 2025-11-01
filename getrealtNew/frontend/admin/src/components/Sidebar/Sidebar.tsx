import img from '@/assets/img/avatar.png';
import { SITE } from '@/config/site.config';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from '../LogoutButton';
import ButtonLink from '../ui/ButtonLink';
import SidebarMenu from './SidebarMenu';

const Sidebar = () => {
  return (
    <aside className="block-height flex w-full max-w-60 flex-col justify-center gap-5 rounded-xl bg-(--bg-op-1-color) px-3 py-12 backdrop-blur-3xl">
      <Link className="flex items-center gap-2.5" href="/dashboard/profile">
        <Image className="h-12 w-12 shrink-0 rounded-full" src={img} alt="Аватар пользователя" />
        <p>Hi, Admin</p>
      </Link>

      <SidebarMenu />

      <div className="mt-auto flex flex-col gap-2.5">
        {/* <ButtonLink href="/dashboard/config">Конфигурации</ButtonLink> */}

        <ButtonLink href="/dashboard/settings">Настройки</ButtonLink>

        <LogoutButton />

        <div className="flex items-center justify-between gap-3">
          <Image src="/img/logo-mini.svg" width={34} height={15} alt="Логотип V|Site" priority />

          <small className="text-sm">{SITE.APP_VERSION}</small>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
