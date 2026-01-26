'use client';

import Link from 'next/link';

interface PaymentSummaryProps {
  objectId: string;
  nights?: number;
  pricePerNight?: number;
  prepayment?: number;
  insurance?: number;
  deposit?: number;
}

const PaymentSummary = ({ objectId, nights = 4, pricePerNight = 9200, prepayment = 6800, insurance = 30900, deposit = 10000 }: PaymentSummaryProps) => {
  const nightsTotal = nights * pricePerNight;
  const total = prepayment + insurance + deposit;

  return (
    <div className="h-min w-full max-w-110 rounded-4xl border border-(--border-color) p-5 max-md:max-w-full max-md:rounded-3xl max-md:p-6">
      <h3 className="mb-6 text-2xl">К оплате</h3>

      <div className="mb-6 flex flex-col gap-3 border-t border-b border-(--border-color) pt-6 pb-6 text-base max-md:pt-4">
        {/* Nights */}
        <div className="flex items-start justify-between">
          <span className="text-(--gray-color)">{nights} ночи</span>
          <span className="text-right">{nightsTotal.toLocaleString()} ₽</span>
        </div>

        {/* Prepayment */}
        <div className="flex items-start justify-between">
          <span className="text-(--gray-color)">Предоплата</span>
          <span className="text-right">{prepayment.toLocaleString()} ₽</span>
        </div>

        {/* Insurance */}
        <div className="flex items-start justify-between">
          <span className="text-(--gray-color)">Оплата при заезде</span>
          <span className="text-right">{insurance.toLocaleString()} ₽</span>
        </div>

        {/* Deposit */}
        <div className="flex items-start justify-between">
          <span className="text-(--gray-color)">Залог*</span>
          <span className="text-right">{deposit.toLocaleString()} ₽</span>
        </div>
      </div>

      {/* Total */}
      <p className="mb-8 text-xl font-semibold text-(--secondary-color) max-md:mb-6">Итого: {total.toLocaleString()} ₽</p>

      {/* Button */}
      <Link
        href={`/objects/${objectId}/payment`}
        className="block w-full rounded-full bg-(--text-color) px-6 py-3 text-center text-sm text-white transition-colors hover:bg-[#3B3A39] max-md:px-8 max-md:py-4"
      >
        Перейти к оплате
      </Link>
    </div>
  );
};

export default PaymentSummary;
