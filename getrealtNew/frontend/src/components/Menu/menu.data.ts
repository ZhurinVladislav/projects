import { PAGES } from "@/config/pages.config";
import { IMenuItem } from "@/types/IMenuItem";

export const MENU: IMenuItem[] = [
  {
    id: 0,
    href: PAGES.HOME,
    name: "Главная",
  },
  {
    id: 1,
    href: PAGES.ABOUT,
    name: "О проекте",
  },
  {
    id: 2,
    href: PAGES.AGENCIES,
    name: "Агенства недвижимости",
  },
  {
    id: 3,
    href: PAGES.BLOG,
    name: "Блог",
  },
  {
    id: 4,
    href: PAGES.METHODOLOGY,
    name: "Методика",
  },
];
