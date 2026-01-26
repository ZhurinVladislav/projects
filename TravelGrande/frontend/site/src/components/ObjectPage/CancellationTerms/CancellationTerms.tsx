'use client';

import Image from 'next/image';
import Link from 'next/link';

interface CancellationTermsProps {
  cancellationPolicy?: string;
}

const CancellationTerms = ({ cancellationPolicy = 'Возврат 50% при отмене бронирования до 5 августа 2025 г.' }: CancellationTermsProps) => {
  return (
    <div className="mb-10 border-b border-(--border-color) pb-10 max-md:mb-8 max-md:pb-8">
      <h2 className="mb-8 text-2xl max-md:mb-6 max-md:text-xl">Условия отмены</h2>
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--light-bg-color)">
          <Image src="/img/icons/repeat.svg" width={14} height={14} alt="Повтор" />
        </div>
        <p>{cancellationPolicy}</p>
      </div>
      <Link href="#" className="font-semibold text-(--secondary-color) underline hover:text-(--primary-color)">
        Полные условия отмены бронирования
      </Link>
    </div>
  );
};

export default CancellationTerms;
