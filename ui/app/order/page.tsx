'use client';

import { useState, useEffect } from 'react';
import { menuApi, MenuItem } from '@/lib/api';
import { orderApi } from '@/lib/api';

export default function OrderPage() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderItems, setOrderItems] = useState<Array<{ foodName: string; quantity: number }>>([]);

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    try {
      const response = await menuApi.getAll();
      setMenus(response.data);
    } catch (error) {
      console.error('Failed to load menus:', error);
      alert('ไม่สามารถโหลดข้อมูลเมนูได้');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToOrder = (foodName: string) => {
    const existing = orderItems.find(item => item.foodName === foodName);
    if (existing) {
      setOrderItems(orderItems.map(item =>
        item.foodName === foodName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, { foodName, quantity: 1 }]);
    }
  };

  const handleRemoveFromOrder = (foodName: string) => {
    const existing = orderItems.find(item => item.foodName === foodName);
    if (existing && existing.quantity > 1) {
      setOrderItems(orderItems.map(item =>
        item.foodName === foodName
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ));
    } else {
      setOrderItems(orderItems.filter(item => item.foodName !== foodName));
    }
  };

  const handleSubmitOrder = async () => {
    if (orderItems.length === 0) {
      alert('กรุณาเลือกรายการอาหาร');
      return;
    }

    try {
      await orderApi.create({ menuItems: orderItems });
      alert('รายการอาหารสำเร็จ!');
      setOrderItems([]);
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('ไม่สามารถรายการอาหารได้');
    }
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      const menu = menus.find(m => m.foodName === item.foodName);
      return total + (menu ? menu.sellingPrice * item.quantity : 0);
    }, 0);
  };

  if (loading) {
    return <div className="p-8 text-center">กำลังโหลด...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">รายการอาหาร</h1>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">เลือกรายการอาหาร</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menus.length === 0 ? (
                  <p className="col-span-2 text-center text-gray-500 py-8">
                    ยังไม่มีเมนูอาหาร กรุณาเพิ่มเมนูก่อน
                  </p>
                ) : (
                  menus.map((menu) => (
                    <div
                      key={menu.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-lg mb-2">{menu.foodName}</h3>
                      <p className="text-gray-600 mb-2">฿{menu.sellingPrice.toLocaleString()}</p>
                      <button
                        onClick={() => handleAddToOrder(menu.foodName)}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        เพิ่ม
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">รายการที่เลือก</h2>
              
              {orderItems.length === 0 ? (
                <p className="text-center text-gray-500 py-8">ยังไม่มีรายการ</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {orderItems.map((item) => {
                      const menu = menus.find(m => m.foodName === item.foodName);
                      return (
                        <div key={item.foodName} className="flex justify-between items-center border-b pb-2">
                          <div>
                            <p className="font-medium">{item.foodName}</p>
                            <p className="text-sm text-gray-500">
                              ฿{menu ? (menu.sellingPrice * item.quantity).toLocaleString() : '0'} 
                              ({item.quantity} จาน)
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleRemoveFromOrder(item.foodName)}
                              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleAddToOrder(item.foodName)}
                              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold">รวมทั้งหมด:</span>
                      <span className="text-xl font-bold text-green-600">
                        ฿{calculateTotal().toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSubmitOrder}
                    className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold text-lg"
                  >
                    รายการอาหาร
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}

