import React, { useState } from 'react';
import { destroyModal } from '../Utils/Modal';
import { Check } from 'lucide-react';

const ExpenseModal = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    unit: 'Adet',
    price: '',
    totalPrice: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Toplam tutarı otomatik hesapla
      if (name === 'quantity' || name === 'price') {
        const quantity = name === 'quantity' ? value : prev.quantity;
        const price = name === 'price' ? value : prev.price;
        newData.totalPrice = (quantity * price).toFixed(2);
      }
      
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Yeni gider nesnesini oluştur
    const newExpense = {
      itemName: formData.itemName,
      quantity: `${formData.quantity} ${formData.unit}`,
      price: `${formData.totalPrice} TL`
    };

    // Mevcut giderleri localStorage'dan al
    const currentExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    
    // Yeni gideri ekle
    currentExpenses.push(newExpense);
    
    // Güncellenmiş listeyi localStorage'a kaydet
    localStorage.setItem('expenses', JSON.stringify(currentExpenses));
    
    // Modal'ı kapat ve sayfayı yenile
    destroyModal();
    window.location.reload();
  };

  return (
    <div className="add-modal z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-lightGray rounded-lg shadow-lg w-full max-w-4xl p-8">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-cyan-500">GİDER EKLE</h2>
          <button
            onClick={() => destroyModal()}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-6">
            <div>
              <label className="block text-sm font-medium text-gray-500">Ürün/Malzeme Adı</label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Miktar</label>
              <div className="flex gap-x-2">
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-2/3 border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="mt-1 block w-1/3 border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                >
                  <option value="Adet">Adet</option>
                  <option value="Kutu">Kutu</option>
                  <option value="Paket">Paket</option>
                  <option value="Bidon">Bidon</option>
                  <option value="Çift">Çift</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Birim Fiyat</label>
              <div className="relative mt-1">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2 pr-12"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500 border-l">
                  TL
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Toplam Tutar</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  name="totalPrice"
                  value={formData.totalPrice}
                  disabled
                  className="block w-full border border-gray-200 rounded-md shadow-sm bg-gray-50 sm:text-sm px-3 py-2 pr-12"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500 border-l">
                  TL
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-500">Açıklama</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
              />
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="submit"
              className="ml-auto bg-cyan-500 flex items-center justify-around text-white rounded-md pr-6 pl-5 py-2 shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <Check className="mr-1" size={20} />
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal; 