'use client';

import { useState, useEffect, useRef } from 'react';
import { stockApi, StockItem, uploadApi } from '@/lib/api';

// ใช้ relative path สำหรับ API routes
const getApiUrl = () => typeof window !== 'undefined' ? '' : '';

export default function StockPage() {
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    pricePerUnit: '',
    addedBy: '',
    receiptUrl: '',
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    try {
      const response = await stockApi.getAll();
      setStocks(response.data);
    } catch (error) {
      console.error('Failed to load stocks:', error);
      alert('ไม่สามารถโหลดข้อมูลสต็อกได้');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      
      // แสดง preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // อัพโหลดไฟล์ทันที
      try {
        setUploading(true);
        const response = await uploadApi.uploadReceipt(file);
        // URL ที่ได้มาเป็น relative path
        const receiptUrl = response.data.url.startsWith('http') ? response.data.url : response.data.url;
        setFormData({ ...formData, receiptUrl });
      } catch (error) {
        console.error('Failed to upload receipt:', error);
        alert('ไม่สามารถอัพโหลดรูปใบเสร็จได้');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.productName || !formData.quantity || !formData.pricePerUnit || !formData.addedBy) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    try {
      if (editingId) {
        await stockApi.update(editingId, {
          productName: formData.productName,
          quantity: parseFloat(formData.quantity),
          pricePerUnit: parseFloat(formData.pricePerUnit),
          addedBy: formData.addedBy,
          receiptUrl: formData.receiptUrl || undefined,
        });
      } else {
        await stockApi.create({
          productName: formData.productName,
          quantity: parseFloat(formData.quantity),
          pricePerUnit: parseFloat(formData.pricePerUnit),
          addedBy: formData.addedBy,
          receiptUrl: formData.receiptUrl || undefined,
        });
      }
      
      setFormData({ productName: '', quantity: '', pricePerUnit: '', addedBy: '', receiptUrl: '' });
      setReceiptFile(null);
      setPreviewUrl('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setShowForm(false);
      setEditingId(null);
      loadStocks();
    } catch (error) {
      console.error('Failed to save stock:', error);
      alert('ไม่สามารถบันทึกข้อมูลได้');
    }
  };

  const handleEdit = (stock: StockItem) => {
    setFormData({
      productName: stock.productName,
      quantity: stock.quantity.toString(),
      pricePerUnit: stock.pricePerUnit.toString(),
      addedBy: stock.addedBy,
      receiptUrl: stock.receiptUrl || '',
    });
    setPreviewUrl(stock.receiptUrl || '');
    setEditingId(stock.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) return;
    
    try {
      await stockApi.delete(id);
      loadStocks();
    } catch (error) {
      console.error('Failed to delete stock:', error);
      alert('ไม่สามารถลบข้อมูลได้');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">กำลังโหลด...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">จัดการสต็อก</h1>
        <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ productName: '', quantity: '', pricePerUnit: '', addedBy: '', receiptUrl: '' });
              setReceiptFile(null);
              setPreviewUrl('');
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
          className="px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] font-medium transition-colors"
        >
          {showForm ? 'ยกเลิก' : '+ เพิ่มสต็อก'}
        </button>
      </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {editingId ? 'แก้ไขสต็อก' : 'เพิ่มสต็อกใหม่'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ชื่อสินค้า *
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  จำนวน (กรัม) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ราคาต่อจำนวน *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.pricePerUnit}
                  onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ผู้เพิ่มสต็อก *
                </label>
                <input
                  type="text"
                  value={formData.addedBy}
                  onChange={(e) => setFormData({ ...formData, addedBy: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  อัพโหลดรูปใบเสร็จ (ไม่บังคับ)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent"
                />
                {uploading && (
                  <p className="text-sm text-gray-500 mt-1">กำลังอัพโหลด...</p>
                )}
                {previewUrl && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">รูปภาพที่เลือก:</p>
                    <img 
                      src={previewUrl} 
                      alt="Receipt preview" 
                      className="max-w-xs max-h-40 rounded-lg border border-gray-300"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#42B72A] text-white rounded-lg hover:bg-[#36A420] font-medium transition-colors"
                >
                  {editingId ? 'อัปเดต' : 'บันทึก'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ productName: '', quantity: '', pricePerUnit: '', addedBy: '', receiptUrl: '' });
                    setReceiptFile(null);
                    setPreviewUrl('');
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
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
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ชื่อสินค้า
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  จำนวน (กรัม)
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ราคาต่อจำนวน
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ผู้เพิ่มสต็อก
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  รูปใบเสร็จ
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  การจัดการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stocks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    ยังไม่มีข้อมูลสต็อก
                  </td>
                </tr>
              ) : (
                stocks.map((stock) => (
                  <tr key={stock.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {stock.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {stock.quantity.toLocaleString()} กรัม
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      ฿{stock.pricePerUnit.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {stock.addedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {stock.receiptUrl ? (
                        <a
                          href={stock.receiptUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1877F2] hover:text-[#166FE5] underline"
                        >
                          ดูรูป
                        </a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <button
                        onClick={() => handleEdit(stock)}
                        className="text-[#1877F2] hover:text-[#166FE5] font-medium"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleDelete(stock.id)}
                        className="text-red-600 hover:text-red-700 font-medium"
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

