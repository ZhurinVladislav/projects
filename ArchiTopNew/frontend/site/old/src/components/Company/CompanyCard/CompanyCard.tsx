'use client';

import RatingCard from '@/components/RatingCard';
import ButtonLink from '@/components/ui/ButtonLink';
import { TCompanyNotAlias } from '@/types';
import Image from 'next/image';

interface IProps {
  idx: number;
  company: TCompanyNotAlias;
}

const CompanyCard: React.FC<IProps> = ({ idx, company }) => {
  const numColor = idx === 1 ? 'num_first' : idx === 2 ? 'num_second' : 'num_third';

  return (
    <div className="flex gap-4.5 rounded-[var(--border-radius)] bg-white p-6 shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] max-lg:flex-col">
      <div className="flex w-full max-w-[238px] flex-col gap-6 max-lg:max-w-full">
        <div className="relative pt-5 pl-5">
          <div className={`num absolute top-0 left-0 ${numColor}`}>{idx}</div>

          {company.image && (
            <Image className="h-56.5 w-58 rounded-lg object-cover" src={company.image} alt={String(company.title || '')} width={232} height={226} sizes="(max-width: 768px) 100vw, 232px" />
          )}
        </div>

        <ul className="flex flex-col gap-2.5">
          {company.siteUrl && (
            <li className="flex gap-1.5">
              <p>Сайт:</p>
              <a className="link-text link-text_base font-normal" href={company.siteUrl} target="_blank" rel="noopener noreferrer">
                {company.siteUrl}
              </a>
            </li>
          )}

          {company.experience && (
            <li className="flex gap-1.5">
              <p>Опыт работы:</p>
              <p className="font-normal">{company.experience}</p>
            </li>
          )}

          {company.address && (
            <li className="flex gap-1.5">
              <p className="font-normal">
                <strong>Город: </strong>
                {company.address}
              </p>
            </li>
          )}
        </ul>
      </div>

      <div className="flex-1">
        <h3 className="title-3">{String(company.title || '')}</h3>

        <RatingCard rating={company.rating} totalReviews={company.totalReviews} ratings={company.ratings} />

        <div className="mb-6 flex flex-wrap gap-3">
          {company.phone && (
            <ButtonLink href={`tel:${company.phone}`} target="_blank" rel="noopener noreferrer">
              {company.phone}
            </ButtonLink>
          )}

          {company.url && (
            <ButtonLink href={company.url} variant="secondary" target="_blank" rel="noopener noreferrer">
              Подробнее
            </ButtonLink>
          )}
        </div>

        {company.introText && (
          <div className="mt-4">
            <p className="leading-relaxed text-gray-700">{String(company.introText)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;
