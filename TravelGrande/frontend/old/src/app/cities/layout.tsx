import { Footer, HeaderInner } from '@/components';
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
