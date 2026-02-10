import React from 'react'
import { destroyModal } from '../Utils/Modal'
import { Check } from 'lucide-react';
import { t } from 'i18next';
import { useFormik } from 'formik';
import { useCreatePatientFileMutation } from '../../store/patient2';

const PatientFileAddModal = ({data}) => {

    const [ createPatientFile ] = useCreatePatientFileMutation()

    const submit = (values, actions) => {
        const formData = new FormData()
        formData.append("person", values.person)
        formData.append("file", values.file)
        formData.append("file_name", values.file_name)
        createPatientFile(formData)
        destroyModal()
    }
    const { values, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
      initialValues: {
        person: data,
        file: null,
        file_name: "",
      },
      onSubmit: submit
    });
      
    
  return (
    <div className="add-modal z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button
                onClick={() => destroyModal()}
                className="absolute z-30 top-2 right-2 bg-white/35 rounded-full w-8 h-8 flex items-center justify-center"
            >
                ✕
            </button>
            
            <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow-lg w-[400px] overflow-auto p-4">
            <h2 className="text-lg font-semibold text-cyan-500 flex flex-col items-center justify-center">Dosya Ekle</h2>
                <div className="flex gap-x-5 py-6 w-full">
                    <div className='h-13'>
                        <label className="block text-sm font-medium text-gray-500">Dosya Adı</label>
                        <input
                            type="text"
                            name="file_name"
                            value={values.file_name}
                            onChange={handleChange}
                            className="mt-1 block border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                        />
                    </div>
                    <div className='h-13 flex items-center justify-center mt-auto'>    
                        <label htmlFor='file-input' className='text-white text-lg font-semibold bg-sky-600 hover:bg-sky-500 py-2 px-5 rounded-xl'>
                        <input
                                id="file-input"
                                type="file"
                                className="hidden"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];                      
                                    setFieldValue("file", file);
                                }}
                            />
                            Dosya Ekle
                        </label>
                    </div>                    
                </div>
                <div className="flex items-center justify-center pt-2">
                    <button
                    type="submit"
                    className="bg-cyan-500 flex items-center justify-around text-white rounded-md pr-6 pl-5 py-2 shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                    <Check className="mr-1" size={20} />
                    {t("save")}
                    </button>
                </div>
            </form>
            
            
        </div>
  )
}

export default PatientFileAddModal