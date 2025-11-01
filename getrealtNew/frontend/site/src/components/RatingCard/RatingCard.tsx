import { TCompanyRating } from '@/types';
import RatingList from './RatingList';

interface IProps {
  // idCompany: number;
  rating: number;
  totalReviews: number;
  ratings: TCompanyRating[] | [];
}

const RatingCard: React.FC<IProps> = props => {
  const { rating, totalReviews, ratings } = props;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-6 max-md:flex-col max-md:gap-2">
        <p>Средняя оценка: {rating}</p>
        <p className="font-normal text-(--text-color-second)">Всего оценок: {totalReviews}</p>
      </div>
      <RatingList ratings={ratings} />
    </div>
  );
};

export default RatingCard;
