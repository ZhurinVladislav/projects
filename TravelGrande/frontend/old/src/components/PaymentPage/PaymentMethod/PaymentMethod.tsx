'use client';

import Image from 'next/image';
import { useState } from 'react';

const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState<'sbp' | 'card'>('sbp');

  const paymentMethods = [
    {
      id: 'sbp',
      title: 'СБП',
      description: 'Российские банки',
      icon: '/img/icons/sbp.svg',
    },
    {
      id: 'card',
      title: 'Картой онлайн',
      description: 'Российские банки',
      icon: '/img/icons/card.svg',
    },
  ];

  return (
    <>
      <h2 className="mb-8 text-2xl max-md:mb-6 max-md:text-xl">Способ оплаты</h2>

      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 max-md:gap-3">
        {paymentMethods.map(method => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id as 'sbp' | 'card')}
            className={`relative flex items-center gap-4 rounded-4xl border px-8.5 py-5 text-left transition-all max-md:rounded-2xl ${
              selectedMethod === method.id ? 'border-(--border-color)' : 'border-transparent hover:border-(--gray-color)'
            }`}
          >
            {/* Content */}
            <div className="flex items-center justify-between gap-2">
              {/* Icon */}
              <div className="relative h-8.5 w-7.5 shrink-0">
                <Image src={method.icon} alt={method.title} fill className="object-contain" />
              </div>
              <div>
                <p className="text-xl">{method.title}</p>
                <p className="text-(--gray-color)">{method.description}</p>
              </div>
            </div>
            {/* Radio Circle */}
            <div className="relative ml-auto flex h-10 w-10 shrink-0 items-center justify-center">
              <div className={`h-5 w-5 rounded-full border-2 md:h-6 md:w-6 ${selectedMethod === method.id ? 'border-(--primary-color)' : 'border-(--gray-color)'}`}>
                {selectedMethod === method.id && <div className="absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--primary-color) md:h-3 md:w-3" />}
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default PaymentMethod;
