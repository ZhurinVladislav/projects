import Sidebar from '@/components/Sidebar';
import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="flex gap-5 p-6">
      <Sidebar />

      <div className="block-height flex w-full flex-col rounded-xl bg-(--bg-op-1-color) p-10 backdrop-blur-3xl">{children}</div>
    </div>
  );
}
