'use client';

import { useState, useEffect } from 'react';
import { orderApi, Order } from '@/lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalCost: 0,
    totalProfit: 0,
    orderCount: 0,
    reports: [] as Order[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await orderApi.getDashboard();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      alert('ไม่สามารถโหลดข้อมูลแดชบอร์ดได้');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">กำลังโหลด...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">แดชบอร์ด</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-600 mb-2">ยอดขายรวมทั้งหมด</h2>
          <p className="text-3xl font-bold text-green-600">
            ฿{stats.totalSales.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-600 mb-2">ต้นทุนรวมทั้งหมด</h2>
          <p className="text-3xl font-bold text-red-600">
            ฿{stats.totalCost.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-sm font-medium text-gray-600 mb-2">กำไรสุทธิ</h2>
          <p className={`text-3xl font-bold ${stats.totalProfit >= 0 ? 'text-[#1877F2]' : 'text-red-600'}`}>
            ฿{stats.totalProfit.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">รายงานการขาย</h2>
          <p className="text-gray-600 mb-4">จำนวนคำสั่งซื้อทั้งหมด: {stats.orderCount} รายการ</p>
          
          {stats.reports.length === 0 ? (
            <p className="text-center text-gray-500 py-8">ยังไม่มีรายงานการขาย</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      วันที่
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      รายการอาหาร
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ยอดขาย
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ต้นทุน
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      กำไร
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.reports.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleString('th-TH')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <ul className="list-disc list-inside">
                          {order.menuItems.map((item, idx) => (
                            <li key={idx}>
                              {item.foodName} x{item.quantity}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                        ฿{order.totalSales.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                        ฿{order.totalCost.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        order.profit >= 0 ? 'text-blue-600' : 'text-red-600'
                      }`}>
                        ฿{order.profit.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
    </div>
  );
}

