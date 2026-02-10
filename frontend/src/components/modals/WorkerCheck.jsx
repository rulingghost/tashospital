import React from 'react'
import { t } from "i18next";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { destroyModal } from "../Utils/Modal";
import WorkerTask from '../tools/WorkerTask';
import { useCreateWorkerTaskMutation, useGetWorkerByIdQuery } from '../../store/patient2';
import { useFormik } from 'formik';

const WorkerCheck = ({data: workerID}) => {

  const { data: worker, isLoading } = useGetWorkerByIdQuery(workerID);
  const [ createWorkerTask ] = useCreateWorkerTaskMutation()
 
  const submit = async (values, actions) => {
    
    //console.log("Form verileri gönderiliyor:", JSON.stringify(values, null, 2))
    
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key])
      })
      await createWorkerTask(formData, workerID).unwrap()
      actions.resetForm()
    } catch (error) {
      console.log(error)      
    }
  }
    
  const {values, errors, handleChange, handleSubmit, setFieldValue, setValues } = useFormik({
    initialValues: {
      task_name: '',
      start_time: '',
      end_time: '',
      person: workerID
    },
    onSubmit: submit,
  })
 


if(!worker){
  return <p>sorun oluştu</p>
}

  return (
    <div className="add-modal z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
    <div className="bg-lightGray rounded-lg shadow-lg min-w-[1100px] max-h-[787px] overflow-auto p-8">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-cyan-500">GÖREV KONTROL</h2>
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

      <div className="grid grid-cols-5 gap-x-6 gap-y-4 pt-3">
        <label className="block text-sm font-medium text-gray-500">Görev Yeri</label>
        <label className="block text-sm font-medium text-gray-500">Saati</label>
        <label className="block text-sm font-medium text-gray-500">Kontrol</label> 
        <label className="block text-sm font-medium text-gray-500">Yorum</label>          
      </div>
        {worker.task_assignments && worker.task_assignments.map((task) => (
          <WorkerTask key={task.id} workerID={workerID} task={task} />
        ))}
      
      <form onSubmit={handleSubmit} className="grid grid-cols-4 items-center gap-x-6 gap-y-4 py-3 border-t mt-10 border-b border-gray-300">
        <input 
          className='text-lg border-b col-span-2 px-2 border-gray-600 bg-transparent font-semibold text-gray-600' 
          type="text" 
          name='task_name'
          value={values.task_name}
          onChange={handleChange}
          placeholder='Görev' 
        />     
        <div>
          <input 
            className='text-lg border-b px-1 border-gray-600 bg-transparent font-semibold text-gray-600' 
            type="time" 
            name='start_time'
            value={values.start_time}
            onChange={handleChange}
            placeholder='Başlangıç' 
          />   
          <input 
            className='text-lg border-b px-1 border-gray-600 bg-transparent font-semibold text-gray-600' 
            type="time" 
            name='end_time'
            value={values.end_time}
            onChange={handleChange}
            placeholder='Bitiş' 
          /> 
        </div>             
        <button type='submit' className='bg-cyan-600 m-auto px-10 py-2 text-white rounded-full'>EKLE</button>
      </form>

      {/* <div className="flex justify-between pt-2">
        <button
        onClick={destroyModal}
          className="ml-auto bg-cyan-500 flex items-center justify-around text-white rounded-md pr-6 pl-5 py-2 shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          <Check className="mr-1" size={20} />
          {t("save")}
        </button>
      </div> */}
    </div>
  </div>
  )
}

export default WorkerCheck