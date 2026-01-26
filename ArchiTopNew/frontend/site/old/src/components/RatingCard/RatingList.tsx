import twoGisIcon from '@/assets/icons/2-gis.svg';
import avitoIcon from '@/assets/icons/avito.svg';
import cianIcon from '@/assets/icons/cian.svg';
import domClickIcon from '@/assets/icons/dom-click.svg';
import googleIcon from '@/assets/icons/google.svg';
import otzovikIcon from '@/assets/icons/otzovik.svg';
import yandexIcon from '@/assets/icons/yandex.svg';
import { TCompanyRating } from '@/types';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface IProps {
  ratings: TCompanyRating[] | [];
}

// Мапа для иконок по типу рейтинга
const ratingIcons: Record<string, string> = {
  yandex: yandexIcon,
  google: googleIcon,
  '2-gis': twoGisIcon,
  avito: avitoIcon,
  'dom-click': domClickIcon,
  cian: cianIcon,
  otzovik: otzovikIcon,
};

const RatingList: React.FC<IProps> = props => {
  const { ratings } = props;

  return (
    <ul className="mb-5 flex flex-wrap gap-1.5">
      {ratings.map(rating => {
        const icon = ratingIcons[rating.type];
        if (!icon) return null;

        return (
          <li key={rating.id}>
            <a className="flex items-center gap-2 rounded-[20px] bg-(--bg-item-color) p-1.5 transition-opacity duration-300 ease-linear hover:opacity-60" href="#">
              <Image className="shrink-0" src={icon} alt={`${rating.type} rating`} width={32} height={32} />
              <span>{rating.rating}</span>
              <Star className="h-5 w-5 shrink-0" fill="#FFE477" stroke="none" />
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default RatingList;
