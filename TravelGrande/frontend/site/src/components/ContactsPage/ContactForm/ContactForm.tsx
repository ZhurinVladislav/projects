'use client';

import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="section bg-(--light-bg-color) py-30 max-md:py-20 max-sm:py-12">
      <div className="container">
        <h2 className="title-2">Напишите нам</h2>
        <p className="mb-12 text-center text-lg font-normal max-md:mb-8 max-md:text-base">Заполните форму, и мы свяжемся с вами в ближайшее время.</p>

        <div className="mx-auto max-w-200">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-base font-normal">
                Ваше имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="rounded border border-(--border-color) bg-white px-4 py-3 text-base outline-none transition-colors focus:border-(--primary-color)"
                placeholder="Введите ваше имя"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-base font-normal">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded border border-(--border-color) bg-white px-4 py-3 text-base outline-none transition-colors focus:border-(--primary-color)"
                placeholder="example@mail.com"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-base font-normal">
                Телефон
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="rounded border border-(--border-color) bg-white px-4 py-3 text-base outline-none transition-colors focus:border-(--primary-color)"
                placeholder="+7 (___) ___-__-__"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-base font-normal">
                Сообщение
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="rounded border border-(--border-color) bg-white px-4 py-3 text-base outline-none transition-colors focus:border-(--primary-color)"
                placeholder="Расскажите, чем мы можем помочь"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="flex h-12 items-center justify-center gap-2.5 rounded-full bg-(--text-color) px-20 py-3 text-white transition-colors hover:bg-(--primary-color)">
              Отправить сообщение
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
