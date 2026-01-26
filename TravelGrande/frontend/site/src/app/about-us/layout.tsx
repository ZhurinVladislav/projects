import { Footer } from '@/components';
import HeaderInner from '@/components/HeaderInner';
import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <HeaderInner />

      <main className="overflow-x-hidden">{children}</main>

      <Footer />
    </>
  );
}
