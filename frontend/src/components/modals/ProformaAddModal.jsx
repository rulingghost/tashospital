import React, { useState, useEffect } from 'react'
import { destroyModal } from '../Utils/Modal'
import { Check } from 'lucide-react'
import { t } from 'i18next'

const ProformaAddModal = () => {
  const [formData, setFormData] = useState({
    invoiceType: "",
    customizationNo: "",
    scenario: "",
    billNo: "",
    company: "",
    address: "",
    taxOffice: "",
    taxNumber: "",
    phone: "",
    email: "",
    billDate: "",
    total: "",
    issuerName: "",
    issuerAddress: "",
    issuerPhone: "",
    issuerEmail: "",
    issuerTaxOffice: "",
    issuerTaxNumber: "",
    description: "",
    quantity: "",
    unit: "",
    unitPrice: "",
    discountRate: "0",
    discountAmount: "0",
    discountReason: "",
    vatRate: "20",
    vatAmount: "0",
    totalAmount: "0"
  });

  const calculateTotals = () => {
    const quantity = parseFloat(formData.quantity.replace(',', '.')) || 0;
    const unitPrice = parseFloat(formData.unitPrice.replace(',', '.')) || 0;
    const discountRate = parseFloat(formData.discountRate.replace(',', '.')) || 0;
    const vatRate = parseFloat(formData.vatRate.replace(',', '.')) || 0;

    const subtotal = quantity * unitPrice;
    const discountAmount = (subtotal * discountRate) / 100;
    const afterDiscount = subtotal - discountAmount;
    const vatAmount = (afterDiscount * vatRate) / 100;
    const total = afterDiscount + vatAmount;

    setFormData(prev => ({
      ...prev,
      discountAmount: discountAmount.toFixed(2).replace('.', ','),
      vatAmount: vatAmount.toFixed(2).replace('.', ','),
      totalAmount: total.toFixed(2).replace('.', ',')
    }));
  };

  useEffect(() => {
    calculateTotals();
  }, [formData.quantity, formData.unitPrice, formData.discountRate, formData.vatRate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="add-modal z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-lightGray rounded-lg shadow-lg w-full max-w-7xl p-8">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-cyan-500">PROFORMA FATURA EKLE</h2>
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

        <div className="grid grid-cols-4 gap-x-4 gap-y-4 py-6">
          {/* Fatura Bilgileri */}
          <div>
            <label className="block text-sm font-medium text-gray-500">Fatura Tipi</label>
            <input
              type="text"
              name="invoiceType"
              value={formData.invoiceType}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Özelleştirme No</label>
            <input
              type="text"
              name="customizationNo"
              value={formData.customizationNo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Senaryo</label>
            <input
              type="text"
              name="scenario"
              value={formData.scenario}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Fatura No</label>
            <input
              type="text"
              name="billNo"
              value={formData.billNo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          {/* Müşteri Bilgileri */}
          <div>
            <label className="block text-sm font-medium text-gray-500">Firma</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Vergi Dairesi</label>
            <input
              type="text"
              name="taxOffice"
              value={formData.taxOffice}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Vergi No</label>
            <input
              type="text"
              name="taxNumber"
              value={formData.taxNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Telefon</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">E-posta</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Fatura Tarihi</label>
            <input
              type="text"
              name="billDate"
              value={formData.billDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-500">Adres</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          

          {/* Hizmet Detayları */}
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-500">Hizmet Açıklaması</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Miktar</label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Birim</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Birim Fiyat</label>
            <input
              type="text"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">İskonto Oranı (%)</label>
            <input
              type="text"
              name="discountRate"
              value={formData.discountRate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">İskonto Tutarı</label>
            <input
              type="text"
              name="discountAmount"
              value={formData.discountAmount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">İskonto Nedeni</label>
            <input
              type="text"
              name="discountReason"
              value={formData.discountReason}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">KDV Oranı (%)</label>
            <input
              type="text"
              name="vatRate"
              value={formData.vatRate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">KDV Tutarı</label>
            <input
              type="text"
              name="vatAmount"
              value={formData.vatAmount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Toplam Tutar</label>
            <input
              type="text"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
              disabled
            />
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <button
            onClick={destroyModal}
            className="ml-auto bg-cyan-500 flex items-center justify-around text-white rounded-md pr-6 pl-5 py-2 shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <Check className="mr-1" size={20} />
            {t("save")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProformaAddModal