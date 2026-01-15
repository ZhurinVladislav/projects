'use client';

import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { TCompanyInfo } from '@/types';
import { Search } from 'lucide-react';
import { useState } from 'react';
import ReviewForm from './ReviewForm';

interface Review {
  id: number;
  name: string;
  date: string;
  text: string;
  rating: number;
}

const reviewsData: Review[] = [
  {
    id: 1,
    name: 'Вадим',
    date: '5 июня 2024',
    text: 'Хочу выразить благодарность компании за профессионализм и качественную работу! Сделка прошла быстро и без лишних хлопот.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Илья',
    date: '5 июня 2024',
    text: 'Понравилось, что представители знали все этапы сделки и помогали на каждом шаге. Отличный сервис!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Марина',
    date: '5 июня 2024',
    text: 'Заключали сделку дистанционно, всё прошло идеально. Большое спасибо сотрудникам за поддержку и профессионализм.',
    rating: 5,
  },
];

interface IProps {
  company: TCompanyInfo | null;
}

const CompanyReviews: React.FC<IProps> = props => {
  const [reviews, setReviews] = useState(reviewsData);
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const { company } = props;

  if (!company) {
    return <></>;
  }

  const { title } = company;

  const handleSubmit = (data: { name: string; message: string; rating: number }) => {
    setOpen(false);
  };

  const handleSelect = (value: string) => {
    console.log('Выбрано:', value);
  };

  return (
    <section data-testid="company-reviews" className="section">
      <div className="container">
        <h2 className="title-2 text-center">Отзывы о: {title}</h2>
        <div className="flex justify-between gap-6 max-lg:flex-col-reverse">
          <div className="flex w-full max-w-5xl flex-col gap-16">
            <div className="flex items-center gap-x-13 gap-y-3 max-lg:gap-x-3 max-md:flex-col max-md:items-start">
              <Input
                className={'w-full max-w-162'}
                placeholder="Поиск"
                value={value}
                onChange={e => setValue(e.target.value)}
                icon={<Search className="h-4 w-4" />}
                iconPosition="left"
                variant="filled"
              />

              <Dropdown label="В начале самые новые" items={[{ label: 'В начале старые' }, { label: 'В начале самые новые' }]} onSelect={handleSelect} variant="filled" className="w-75" />
            </div>

            {/* <ul className="flex flex-col gap-10">
              {reviews.map(review => (
                <li key={review.id} className="flex flex-col gap-2 not-last:border-b not-last:border-[rgba(162,162,162,0.4)] not-last:pb-10">
                  <div className="flex items-center gap-4">
                    <div className="flex h-19.5 w-19.5 items-center justify-center rounded-full bg-[#1b76ae] text-3xl text-white max-md:h-16 max-md:w-16">{review.name.slice(0, 2)}</div>
                    <div className="flex flex-col gap-1.5">
                      <p className="text-2xl">{review.name}</p>
                      <div className="flex items-center gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={32} fill="#FFE477" stroke="none" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-base font-normal">
                    <p>{review.text}</p>
                  </div>
                  <time className="text-normal font-base text-(--text-color-second)">{review.date}</time>
                </li>
              ))}
            </ul> */}
            <p>У данной компании пока нет отзыв</p>
          </div>

          <div>
            <Button className="bg-(-link-second-color) rounded-full px-5 py-3 text-white shadow-lg hover:bg-indigo-700" onClick={() => setOpen(true)}>
              Оставить отзыв
            </Button>
            <Modal open={open} onClose={() => setOpen(false)} title="Оставьте отзыв">
              <ReviewForm onSubmit={handleSubmit} />
            </Modal>
          </div>
        </div>

        {/* <div className="mt-16 flex justify-center">
          <Button variant={'primary'}>Загрузить все отзывы (16)</Button>
        </div> */}

        {/* <div className="mt-10 flex flex-col items-center gap-6">
          <Dropdown
            label="Тип документа"
            items={documentTypes}
            onSelect={handleSelect}
            variant="filled"
            maxHeight={180} // ограничиваем высоту, появится прокрутка
          />

          <Dropdown label="Категория" items={[{ label: 'Новости' }, { label: 'Статьи' }, { label: 'Обновления' }, { label: 'Релизы' }]} onSelect={handleSelect} variant="default" />
        </div> */}
      </div>
    </section>
  );
};

export default CompanyReviews;
