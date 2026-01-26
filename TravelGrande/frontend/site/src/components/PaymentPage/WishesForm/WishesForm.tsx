'use client';

import { useState } from 'react';

const WishesForm = () => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="mb-10 border-b border-(--border-color) pb-10 max-md:mb-8 max-md:pb-8">
      <h2 className="mb-8 text-2xl max-md:mb-6 max-md:text-xl">Оставить пожелания</h2>
      <p className="mb-15 max-md:mb-10">Уточните детали поездки — повод, состав гостей и другие важные моменты. Это поможет хозяину лучше подготовить жилье к вашему приезду.</p>

      <div className="flex flex-col gap-5">
        {/* Phone Input */}
        <input
          type="tel"
          placeholder="Ваш телефон"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-78.5 rounded-lg border border-(--border-color) bg-white px-6 py-4 transition-colors focus:border-(--primary-color) focus:outline-none max-md:px-4 max-md:py-3"
        />

        {/* Message Textarea */}
        <textarea
          placeholder="Ваше сообщение"
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={5}
          className="w-137.75 resize-none rounded-lg border border-(--border-color) bg-white px-6 py-4 transition-colors focus:border-(--primary-color) focus:outline-none max-md:px-4 max-md:py-3"
        />
      </div>
    </div>
  );
};

export default WishesForm;
