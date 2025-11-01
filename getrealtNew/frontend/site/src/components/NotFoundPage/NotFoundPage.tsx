import { redirect } from 'next/navigation';

const NotFoundPage = () => {
  redirect('/moscow/services');
};

export default NotFoundPage;
