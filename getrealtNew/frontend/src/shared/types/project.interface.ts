import { IInfo } from "./info.interface";

export interface IProject {
  id: number;
  title: string;
  text: string;
  info?: IInfo[];
  link: string;
  linkGH?: string;
  tags?: string[];
  img?: string;
}
