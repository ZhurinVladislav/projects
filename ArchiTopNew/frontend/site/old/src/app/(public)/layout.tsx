import { type PropsWithChildren } from 'react';
import Api from '../api';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  Api.fetchStoreVisit();
  // useEffect(() => {
  //   Api.fetchStoreVisit().catch(console.error);
  // }, []);

  return <>{children}</>;
}
