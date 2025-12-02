'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/', label: 'หน้าหลัก', icon: '🏠' },
  { href: '/stock', label: 'จัดการสต็อก', icon: '📦' },
  { href: '/menu', label: 'จัดการเมนู', icon: '📋' },
  { href: '/order', label: 'รายการอาหาร', icon: '🛒' },
  { href: '/dashboard', label: 'แดชบอร์ด', icon: '📊' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-[56px] bottom-0 w-[280px] bg-white border-r border-gray-200 overflow-y-auto z-40">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname?.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#E7F3FF] text-[#1877F2] font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[15px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="border-t border-gray-200 p-4 mt-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-700 mb-1">💡 คำแนะนำ</p>
          <p className="text-xs text-gray-600">
            เริ่มต้นด้วยการเพิ่มสต็อกและเมนูอาหาร
          </p>
        </div>
      </div>
    </aside>
  );
}

