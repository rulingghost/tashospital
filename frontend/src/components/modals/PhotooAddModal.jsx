import React from 'react'
import { destroyModal } from '../Utils/Modal'
import { useFormik } from 'formik'
import { t } from 'i18next'
import { useCreatePtientPhotoMutation } from '../../store/patient2'
import CustomerCombobox from '../tools/CustomCombobox'

const PhotooAddModal = ({data}) => {
//console.log(data);

    const [ createPatientPhoto ] = useCreatePtientPhotoMutation()

    const submit = (values, actions) => {
        //console.log(JSON.stringify(values, null, 2))   
        const formData = new FormData()
        formData.append("file", values.file)
        formData.append("person", values.person)
        createPatientPhoto(formData)
        destroyModal()
      }
      const { values, handleSubmit, setFieldValue} = useFormik({
        initialValues: {
            person: data,
            file: "",
        },
        onSubmit: submit
      })     
  return (
    <div className="add-modal z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form onSubmit={handleSubmit} className='bg-lightGray rounded-lg shadow-lg w-96 p-8'>
            <div>
                <label className={`block text-sm font-medium text-gray-500`}>{t("Image")}</label>
                <div className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2">
                    <div className={`relative min-w-20 max-w-96 min-h-52 bg-gray-100 border border-gray-200 rounded-md overflow-hidden`}>
                        {values.file && (
                        <img
                            src={
                            values.file instanceof File
                                ? URL.createObjectURL(values.file) 
                                : values.file
                            }
                            alt="Preview"
                            className="object-cover w-full h-full"
                        />
                        )}
                    </div>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(event) => {
                        const file = event.currentTarget.files[0];                      
                        setFieldValue("file", file);
                        }}
                        className="mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
                    />
                </div>
            </div>
            {/* <div>
            <label className="block text-sm font-medium text-gray-500">Çalışan</label>
                <CustomerCombobox 
                    value={values.person} 
                    onChange={(id) => setFieldValue('person', id)} 
                    customers={leaves} 
                />
            </div> */}
            <div className='w-full flex items-center justify-center mt-5'>
                <button type='submit' className='bg-cyan-600 text-white rounded-lg px-8 py-2'>Kaydet</button>
            </div>
        </form>
        
    </div>
  )
}

export default PhotooAddModal