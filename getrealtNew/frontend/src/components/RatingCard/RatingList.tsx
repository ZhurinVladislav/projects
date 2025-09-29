import TwoGisIcon from '@/assets/icons/2-gis.svg';
import AvitoIcon from '@/assets/icons/avito.svg';
import CianIcon from '@/assets/icons/cian.svg';
import DomClickIcon from '@/assets/icons/dom-click.svg';
import GoogleIcon from '@/assets/icons/google.svg';
import OtzovikIcon from '@/assets/icons/otzovik.svg';
import StarIcon from '@/assets/icons/star.svg';
import YandexIcon from '@/assets/icons/yandex.svg';
import { IRatingCompany, RATING_COMPANY, TRating } from './rating.data';

interface IProps {
  idCompany: number;
}

// Мапа для иконок по типу рейтинга
const ratingIcons: Record<TRating, React.FC<React.SVGProps<SVGSVGElement>>> = {
  yandex: YandexIcon,
  google: GoogleIcon,
  '2-gis': TwoGisIcon,
  avito: AvitoIcon,
  'dom-click': DomClickIcon,
  cian: CianIcon,
  otzovik: OtzovikIcon,
};

const RatingList: React.FC<IProps> = ({ idCompany }) => {
  const ratings: IRatingCompany[] = RATING_COMPANY.filter(r => r.idCompany === idCompany);

  return (
    <ul>
      {ratings.map(rating => {
        const Icon = ratingIcons[rating.type]; // достаём иконку по типу
        return (
          <li key={rating.id} className="flex items-center gap-2">
            <Icon />
            <span>{rating.rating}</span>
            <StarIcon />
          </li>
        );
      })}
    </ul>
  );
};

export default RatingList;
