export type TRating = 'yandex' | 'google' | '2-gis' | 'avito' | 'dom-click' | 'cian' | 'otzovik';

export interface IRatingCompany {
  id: number;
  idCompany: number;
  type: TRating;
  rating: number;
}

export const RATING_COMPANY: IRatingCompany[] = [
  {
    id: 0,
    idCompany: 0,
    type: 'yandex',
    rating: 4.9,
  },
  {
    id: 1,
    idCompany: 0,
    type: 'google',
    rating: 4.2,
  },
  {
    id: 2,
    idCompany: 0,
    type: '2-gis',
    rating: 4.2,
  },
  {
    id: 3,
    idCompany: 0,
    type: 'avito',
    rating: 4.1,
  },
  {
    id: 4,
    idCompany: 0,
    type: 'dom-click',
    rating: 4.1,
  },
  {
    id: 5,
    idCompany: 0,
    type: 'cian',
    rating: 4.0,
  },
  {
    id: 6,
    idCompany: 0,
    type: 'otzovik',
    rating: 4.0,
  },
];
