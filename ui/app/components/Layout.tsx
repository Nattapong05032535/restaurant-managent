'use client';

import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Header />
      <Sidebar />
      <main className="ml-[280px] pt-[56px] min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

