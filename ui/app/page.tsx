import Link from 'next/link'

export default function Home() {
  const cards = [
    {
      href: '/stock',
      icon: '📦',
      title: 'จัดการสต็อก',
      description: 'เพิ่ม/แก้ไข วัตถุดิบและสินค้า',
      color: 'from-blue-500 to-blue-600',
    },
    {
      href: '/menu',
      icon: '📋',
      title: 'จัดการเมนู',
      description: 'เพิ่ม/แก้ไข รายการอาหาร',
      color: 'from-green-500 to-green-600',
    },
    {
      href: '/order',
      icon: '🛒',
      title: 'รายการอาหาร',
      description: 'เลือกรายการอาหารที่ขาย',
      color: 'from-purple-500 to-purple-600',
    },
    {
      href: '/dashboard',
      icon: '📊',
      title: 'แดชบอร์ด',
      description: 'ดูยอดขายและรายงาน',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          ยินดีต้อนรับ
        </h1>
        <p className="text-gray-600">
          ระบบจัดการร้านอาหารของคุณ
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all hover:scale-[1.02] border border-gray-200"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} text-white text-2xl mb-4`}>
              {card.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {card.title}
            </h2>
            <p className="text-gray-600 text-sm">
              {card.description}
            </p>
            <div className="mt-4 text-[#1877F2] text-sm font-medium">
              ไปที่หน้า →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

