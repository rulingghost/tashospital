import React from 'react'
import { destroyModal } from '../Utils/Modal'
import { useFormik } from 'formik';
import { useCreateStockOrderMutation, useGetStockOrdersQuery, useGetWarehouseQuery } from '../../store/patient2';
import { Check } from 'lucide-react';

const StockOrderModal = () => {

  const [createStockOrder] = useCreateStockOrderMutation()
  const {data, isLoading, error} = useGetWarehouseQuery()
console.log(data);


  const submit = async (values, actions) => {
    try {
      // console.log("Form verileri gönderiliyor:", JSON.stringify(values, null, 2));
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key])
      })
      await createStockOrder(formData).unwrap()
      actions.resetForm()
      destroyModal()
    } catch (error) {
      console.log(error)      
    }
  }

  const {values, errors, handleChange, handleSubmit, setFieldValue, setValues } = useFormik({
    initialValues: {
      order_name: '',
      order_number: '',
      order_warehouse: '',
      order_pozition: '',
      order_group: '',
      order_stuation: 'Bekliyor',
      order_startdate: new Date().toLocaleDateString('en-CA'),
    },
    onSubmit: submit,
  })

  return (
    <div className="add-modal z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <form onSubmit={handleSubmit} className="bg-lightGray rounded-lg shadow-lg w-full max-w-4xl p-8">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-cyan-500">Sipariş Ver</h2>
            <button
            type="button"
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
            <div>
                <label className="block text-sm font-medium text-gray-500">Ürün Adı</label>
                <input
                  type="text"
                  name="order_name"
                  value={values.order_name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Miktar</label>
                <input
                  type="text"
                  name="order_number"
                  value={values.order_number}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Depo</label>
                <select 
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                  name="order_warehouse"
                  value={values.order_warehouse}
                  onChange={handleChange}
                >
                  <option value="" disabled selected>Depo Seç</option>
                {
                data && 
                  data.results.map((item, index) => (
                    <option key={index} value={item.id}>{item.wh_name}</option>
                  ))
                }
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Pozisyon</label>
                <input
                  type="text"
                  name="order_pozition"
                  value={values.order_pozition}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Ürün Grubu</label>
                <input
                  type="text"
                  name="order_group"
                  value={values.order_group}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>             
          </div>
          <button
              type="submit"
              className="ml-auto bg-cyan-500 flex items-center justify-around text-white rounded-md pr-6 pl-5 py-2 shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <Check className="mr-1" size={20} />
              Kaydet
            </button>
      </form>
    </div>
  )
}

export default StockOrderModal