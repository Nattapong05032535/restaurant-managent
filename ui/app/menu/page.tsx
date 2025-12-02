'use client';

import { useState, useEffect } from 'react';
import { menuApi, MenuItem } from '@/lib/api';
import { stockApi, StockItem } from '@/lib/api';

export default function MenuPage() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    foodName: '',
    sellingPrice: '',
    ingredients: [{ productName: '', quantity: '' }] as Array<{ productName: string; quantity: string }>,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [menusResponse, stocksResponse] = await Promise.all([
        menuApi.getAll(),
        stockApi.getAll(),
      ]);
      setMenus(menusResponse.data);
      setStocks(stocksResponse.data);
    } catch (error) {
      console.error('Failed to load data:', error);
      alert('ไม่สามารถโหลดข้อมูลได้');
    } finally {
      setLoading(false);
    }
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { productName: '', quantity: '' }],
    });
  };

  const handleRemoveIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  const handleIngredientChange = (index: number, field: 'productName' | 'quantity', value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.foodName || !formData.sellingPrice) {
      alert('กรุณากรอกชื่ออาหารและราคาขาย');
      return;
    }

    if (formData.ingredients.some(ing => !ing.productName || !ing.quantity)) {
      alert('กรุณากรอกข้อมูลวัตถุดิบให้ครบถ้วน');
      return;
    }

    try {
      const menuData = {
        foodName: formData.foodName,
        sellingPrice: parseFloat(formData.sellingPrice),
        ingredients: formData.ingredients.map(ing => ({
          productName: ing.productName,
          quantity: parseFloat(ing.quantity),
        })),
      };

      if (editingId) {
        await menuApi.update(editingId, menuData);
      } else {
        await menuApi.create(menuData);
      }
      
      setFormData({ foodName: '', sellingPrice: '', ingredients: [{ productName: '', quantity: '' }] });
      setShowForm(false);
      setEditingId(null);
      loadData();
    } catch (error) {
      console.error('Failed to save menu:', error);
      alert('ไม่สามารถบันทึกข้อมูลได้');
    }
  };

  const handleEdit = (menu: MenuItem) => {
    setFormData({
      foodName: menu.foodName,
      sellingPrice: menu.sellingPrice.toString(),
      ingredients: menu.ingredients.map(ing => ({
        productName: ing.productName,
        quantity: ing.quantity.toString(),
      })),
    });
    setEditingId(menu.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) return;
    
    try {
      await menuApi.delete(id);
      loadData();
    } catch (error) {
      console.error('Failed to delete menu:', error);
      alert('ไม่สามารถลบข้อมูลได้');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">กำลังโหลด...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">จัดการเมนู</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ foodName: '', sellingPrice: '', ingredients: [{ productName: '', quantity: '' }] });
          }}
          className="px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] font-medium transition-colors"
        >
          {showForm ? 'ยกเลิก' : '+ เพิ่มเมนู'}
        </button>
      </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'แก้ไขเมนู' : 'เพิ่มเมนูใหม่'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่ออาหาร *
                </label>
                <input
                  type="text"
                  value={formData.foodName}
                  onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ราคาขายต่อจาน *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.sellingPrice}
                  onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  วัตถุดิบที่ใช้ *
                </label>
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-4 mb-3">
                    <select
                      value={ingredient.productName}
                      onChange={(e) => handleIngredientChange(index, 'productName', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">เลือกสินค้า</option>
                      {stocks.map((stock) => (
                        <option key={stock.id} value={stock.productName}>
                          {stock.productName}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="จำนวน (กรัม)"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                      className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    {formData.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(index)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        ลบ
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  + เพิ่มวัตถุดิบ
                </button>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  {editingId ? 'อัปเดต' : 'บันทึก'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ foodName: '', sellingPrice: '', ingredients: [{ productName: '', quantity: '' }] });
                  }}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ชื่ออาหาร
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  วัตถุดิบ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ราคาขาย
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  การจัดการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {menus.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    ยังไม่มีข้อมูลเมนู
                  </td>
                </tr>
              ) : (
                menus.map((menu) => (
                  <tr key={menu.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {menu.foodName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <ul className="list-disc list-inside">
                        {menu.ingredients.map((ing, idx) => (
                          <li key={idx}>
                            {ing.productName}: {ing.quantity} กรัม
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ฿{menu.sellingPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(menu)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleDelete(menu.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
    </div>
  );
}

