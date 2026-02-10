import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Check } from "lucide-react";
import { destroyModal } from "../Utils/Modal";
import { useFormik } from 'formik';
import { useCreateStockMutation, useGetWarehouseQuery, useUpdateStockMutation } from "../../store/patient2";
import CustomerCombobox from "../tools/CustomCombobox"

const TransferProductModal = ({data}) => {
    
    const {data: warehouses, isLoading, error } = useGetWarehouseQuery()
    const [ updateStock ] = useUpdateStockMutation()
    const [ createStock ] = useCreateStockMutation()
    // console.log(warehouses);
    // console.log(data);
    
    
  const submit = async (values, actions) => {
    // console.log(JSON.stringify(values, null, 2))      
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key])
    });
    formData.append("stock_haved", values.stock_buyed)
    await createStock(formData)
    const updateFormData = new FormData()
    updateFormData.append("stock_haved", data.stock_haved - values.stock_buyed)
    updateFormData.append("stock_buyed", data.stock_buyed - values.stock_buyed)
    await updateStock({newStock: updateFormData, stockID: data.id})
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    //destroyModal()
  }
  
  const warehousesForInput = warehouses?.results.map(item => ({
    id: item.id,
    name: item.wh_name,
  }))
  const { values, errors, handleChange, handleSubmit, setFieldValue, setValues } = useFormik({
    initialValues: {
      stock_buyed: "",
      stock_haved: "",
      stock_ut: "",
      stock_skt: "",
      stock_warehouse: "",
      stock_pozition: "",
      stcok_group: ""
    },
    onSubmit: submit
  });

  useEffect(() => {
    if (data) {
      setValues({
        stock_name: data.stock_name || '',
        stock_ut: data.stock_ut || '',
        stock_skt: data.stock_skt || '',
        stock_pozition: data.stock_pozition || '',
        stcok_group: data.stcok_group || ''
      });
    }
  }, [data]);

  return (
    <div className="add-modal z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
    <form onSubmit={handleSubmit} className="bg-lightGray rounded-lg shadow-lg w-full max-w-4xl p-8">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-cyan-500">Ürün Taşıma</h2>
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

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-6">
        <div>
          <label className="block text-sm font-medium text-gray-500">Depo Adı</label>
          <CustomerCombobox 
              value={values.stock_warehouse} 
              onChange={(id) => setFieldValue('stock_warehouse', id)} 
              customers={warehousesForInput} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">Adet</label>
          <input
            type="text"
            name="stock_buyed"
            value={values.stock_buyed || ''} 
            onChange={handleChange} 
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
          {t("save")}
        </button>
      </div>
    </form>
  </div>
  )
}

export default TransferProductModal