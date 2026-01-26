import PageContent from '@/components/PaymentPage/PageContent';

export default function PaymentPage({ params }: { params: { id: string } }) {
  return (
    <>
      {/* Main Content */}
      <PageContent id={params.id} />
    </>
  );
}
