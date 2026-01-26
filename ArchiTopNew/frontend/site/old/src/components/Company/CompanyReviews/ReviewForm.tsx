'use client';

import { useState } from 'react';

interface ReviewFormProps {
  onSubmit: (data: { name: string; message: string; rating: number }) => void;
}

const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, message, rating });
    setName('');
    setMessage('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Имя</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Введите ваше имя"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Отзыв</label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
          rows={3}
          className="w-full resize-none rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Поделитесь впечатлениями..."
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Оценка</label>
        <select value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400">
          {[5, 4, 3, 2, 1].map(r => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="w-full rounded-lg bg-indigo-600 py-2 text-white transition hover:bg-indigo-700">
        Отправить отзыв
      </button>
    </form>
  );
};

export default ReviewForm;
