interface IPageInfo {
  id: number;
  title: string;
  description: string;
  keywords: string;
  alias: string;
  pageContent: string;
  dateCreated: string;
  dateUpdated: string;
}

interface IService {
  id: number;
  name: string;
}

export interface ICategoryServices extends IPageInfo {
  services: IService[];
}
