'use client';

import Link from 'next/link';

const AccommodationRules = () => {
  return (
    <div className="mb-10 border-b border-(--border-color) pb-10 max-md:mb-8 max-md:pb-8">
      <h2 className="mb-8 text-2xl max-md:mb-6 max-md:text-xl">Правила проживания</h2>
      <p>
        Бронируя этот дом, вы соглашаетесь соблюдать{' '}
        <Link className="font-semibold text-(--secondary-color) underline hover:text-(--primary-color)" href="#">
          правила проживания
        </Link>
        .
      </p>
    </div>
  );
};

export default AccommodationRules;
