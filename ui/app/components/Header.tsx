'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-[#1877F2] text-white shadow-md fixed top-0 left-0 right-0 z-50 h-[56px]">
      <div className="flex items-center justify-between h-full px-4 max-w-screen-xl mx-auto">
        <Link href="/" className="flex items-center space-x-3">
          <div className="text-2xl font-bold">🍽️</div>
          <div className="text-xl font-bold">Restaurant Management</div>
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-1 bg-[#166FE5] rounded-lg px-3 py-1.5 cursor-pointer hover:bg-[#1457B3] transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
          
          <div className="flex items-center space-x-2 bg-[#166FE5] rounded-full px-3 py-1.5 cursor-pointer hover:bg-[#1457B3] transition-colors">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">RM</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

