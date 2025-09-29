import RatingList from './RatingList';

interface IProps {
  idCompany: number;
}

const RatingCard: React.FC<IProps> = props => {
  const { idCompany } = props;

  return (
    <div>
      <div>
        <p>Средняя оценка: 4.95</p>
        <p>Всего оценок: 652</p>
      </div>
      <RatingList idCompany={idCompany} />
    </div>
  );
};

export default RatingCard;
