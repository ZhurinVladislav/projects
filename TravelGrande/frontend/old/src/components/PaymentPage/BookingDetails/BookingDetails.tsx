'use client';

import Image from 'next/image';

interface BookingDetailsProps {
  checkInDate?: string;
  checkInTime?: string;
  checkOutDate?: string;
  checkOutTime?: string;
  guests?: number;
}

const BookingDetails = ({ checkInDate = '11 авг.', checkInTime = 'после 14:00', checkOutDate = '13 авг. 2025 г.', checkOutTime = 'до 12:00', guests = 2 }: BookingDetailsProps) => {
  return (
    <div className="mb-10 border-b border-(--border-color) pb-10">
      <div className="flex w-full max-w-117 flex-col gap-5 rounded-sm bg-(--light-bg-color) p-6 max-md:p-4">
        {/* Dates */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
              <Image className="md:h-3.5 md:w-3.5" src="/img/icons/calendar-color.svg" width={18} height={18} alt="Календарь" />
            </div>
            <div>
              <p>
                {checkInDate} ⟶ {checkOutDate}
              </p>
              <p className="text-(--primary-color)">2 Ночи</p>
            </div>
          </div>
        </div>

        {/* Check-in/out times */}
        <div className="flex flex-col gap-4 border-t border-b border-(--border-color) pt-6 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
              <Image className="h-4 w-4" src="/img/icons/clock-color.svg" width={16} height={16} alt="Часы" />
            </div>
            <div>
              <p>Заезд</p>
              <p className="text-(--primary-color)">{checkInTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
              <Image className="h-4 w-4" src="/img/icons/clock-color.svg" width={16} height={16} alt="Часы" />
            </div>
            <div>
              <p>Выезд</p>
              <p className="text-(--primary-color)">{checkOutTime}</p>
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
            <Image className="md:h-3.5 md:w-3.5" src="/img/icons/user.svg" width={14} height={14} alt="Человек" />
          </div>
          <p>
            {guests} {guests === 1 ? 'гость' : 'гостя'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
