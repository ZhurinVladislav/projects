import RatingCard from '@/components/RatingCard';
import { TCompanyInfo } from '@/types';
import Image from 'next/image';

interface IProps {
  company: TCompanyInfo;
  content: string | null;
}

const CompanyHeroCard: React.FC<IProps> = props => {
  const { company, content } = props;
  const { id, title, image, imageAlt, siteUrl, experience, address, rating, totalReviews, ratings } = company;

  return (
    <section data-testid="company-hero" className="section">
      <div className="container">
        <div className="card">
          <div className="flex gap-6 max-md:flex-col">
            <div className="relative pt-5 pl-5">
              <div className="num num_first absolute top-0 left-0">{id}</div>
              {image && <Image src={image} alt={imageAlt ? imageAlt : ''} width={232} height={226} className="h-56.5 w-58 rounded-lg object-cover" priority={true} />}
            </div>

            <div>
              <h1 className="title-3">{title}</h1>

              <RatingCard rating={rating} totalReviews={totalReviews} ratings={ratings} />

              <ul className="flex flex-col gap-2.5">
                {siteUrl && (
                  <li className="flex gap-1.5">
                    <p>Сайт:</p>
                    <a className="link-text link-text_base font-normal" href={siteUrl} target="_blank">
                      {siteUrl}
                    </a>
                  </li>
                )}
                {experience && (
                  <li className="flex gap-1.5">
                    <p>Опыт работы:</p>
                    <p className="font-normal">{experience}</p>
                  </li>
                )}
                {address && (
                  <li className="flex gap-1.5">
                    <p>Город:</p>
                    <address className="font-normal">{address}</address>
                  </li>
                )}
              </ul>
            </div>
            <div></div>
          </div>
          {content && <div className="content" dangerouslySetInnerHTML={{ __html: content }} />}
        </div>
      </div>
    </section>
  );
};

export default CompanyHeroCard;
