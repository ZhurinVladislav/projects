import { Company } from '@/shared/types/company.interface';
import Image from 'next/image';
import RatingCard from '../RatingCard';

interface IProps {
  company: Company;
}

const CompanyHero: React.FC<IProps> = ({ company }) => {
  const { id, ratingPosition, name, imgSrc, imgAlt, siteUrl, experience, address, text } = company;

  return (
    <section data-testid="company-hero" className="section">
      <div className="container">
        <div className="card">
          <div>
            <div>
              <div className="num">{ratingPosition}</div>
              <Image
                src={imgSrc}
                alt={imgAlt}
                width={232}
                height={226}
                className="h-auto w-full rounded-lg object-cover"
                priority={true} // priority={true} для первой картинки на странице
              />
            </div>
            <div>
              <h1>{name}</h1>

              <RatingCard idCompany={id} />

              <ul>
                <li>
                  <p>Сайт:</p>
                  <a href={siteUrl} target="_blank">
                    {siteUrl}
                  </a>
                </li>
                <li>
                  <p>Опыт работы:</p>
                  <p>{experience}</p>
                </li>
                <li>
                  <p>Город:</p>
                  <p>{address}</p>
                </li>
              </ul>
            </div>
            <div></div>
          </div>
          <div className="content" dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>
    </section>
  );
};

export default CompanyHero;
