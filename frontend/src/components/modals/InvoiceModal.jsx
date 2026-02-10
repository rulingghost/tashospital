import React from 'react';
import { t } from "i18next";
import { Check } from "lucide-react";
import { destroyModal } from "../Utils/Modal";

const InvoiceModal = () => {
  return (
    <div className="add-modal z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <div className="bg-lightGray rounded-lg shadow-lg w-full max-w-4xl p-8">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-cyan-500">E-FATURA EKLE</h2>
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

        <div className="grid grid-cols-3 gap-x-6 gap-y-4 py-6">
          {/* Fatura No */}
          <div>
            <label className="block text-sm font-medium text-gray-500">Fatura No</label>
            <input
              type="text"
              name="invoice_no"
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          {/* Firma */}
          <div>
            <label className="block text-sm font-medium text-gray-500">Firma</label>
            <input
              type="text"
              name="company"
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          {/* Fatura Tarihi */}
          <div>
            <label className="block text-sm font-medium text-gray-500">Fatura Tarihi</label>
            <input
              type="date"
              name="invoice_date"
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          {/* Son Ödeme Tarihi */}
          <div>
            <label className="block text-sm font-medium text-gray-500">Son Ödeme Tarihi</label>
            <input
              type="date"
              name="due_date"
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          {/* VKN / TCKN */}
          <div>
            <label className="block text-sm font-medium text-gray-500">VKN / TCKN</label>
            <input
              type="text"
              name="tax_id"
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          {/* Fatura Türü */}
          <div>
            <label className="block text-sm font-medium text-gray-500">Fatura Türü</label>
            <select
              name="invoice_type"
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            >
              <option>Satış</option>
              <option>İade</option>
              <option>Proforma</option>
            </select>
          </div>

          {/* Tutar */}
          <div>
            <label className="block text-sm font-medium text-gray-500">Tutar</label>
            <input
              type="number"
              step="0.01"
              name="total_amount"
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          {/* Para Birimi */}
          <div>
            <label className="block text-sm font-medium text-gray-500">Para Birimi</label>
            <input
              type="text"
              name="currency"
              defaultValue="TRY"
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            />
          </div>

          {/* Ödeme Yöntemi */}
          <div>
            <label className="block text-sm font-medium text-gray-500">Ödeme Yöntemi</label>
            <select
              name="payment_method"
              className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
            >
              <option>Nakit</option>
              <option>Kredi Kartı</option>
              <option>Banka Transferi</option>
            </select>
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
  );
};

export default InvoiceModal;
