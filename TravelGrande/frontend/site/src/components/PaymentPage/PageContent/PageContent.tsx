import CancellationTerms from '@/components/ObjectPage/CancellationTerms';
import AccommodationRules from '@/components/PaymentPage/AccommodationRules';
import BookingDetails from '@/components/PaymentPage/BookingDetails';
import PaymentMethod from '@/components/PaymentPage/PaymentMethod';
import PaymentSummary from '@/components/PaymentPage/PaymentSummary';
import WishesForm from '@/components/PaymentPage/WishesForm';
import Image from 'next/image';
import Location from '../Location';

type TProps = {
  id: string;
};

const PageContent = (props: TProps) => {
  return (
    <section className="section">
      <div className="container">
        <div className="flex gap-5 max-md:flex-col">
          {/* Main Content */}
          <div className="w-full max-w-225">
            {/* Property Image */}
            <div className="relative mb-10 h-103.5 w-full overflow-hidden rounded-2xl max-md:h-80">
              <Image src="/img/object/payment/img-1.jpg" alt="Дом у моря в Сочи" fill className="object-cover" priority />
            </div>

            {/* Title */}
            <h1 className="mb-4 font-[--font-primary] text-4xl max-md:text-3xl">Дом у моря в Сочи</h1>

            {/* Location */}
            <Location />

            {/* Booking Details */}
            <BookingDetails />

            {/* Cancellation Terms */}
            <CancellationTerms />

            {/* Accommodation Rules */}
            <AccommodationRules />

            {/* Wishes Form */}
            <WishesForm />

            {/* Payment Method */}
            <PaymentMethod />
          </div>

          {/* Payment Summary Sidebar */}
          <PaymentSummary objectId={props.id} />
        </div>
      </div>
    </section>
  );
};

export default PageContent;
