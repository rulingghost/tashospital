import React, { useEffect, useState } from 'react'
import { destroyModal } from '../Utils/Modal'
import { useFormik } from 'formik'
import { Check } from 'lucide-react'
import { useCreateWorkerHoursMutation, useGetAllWorkerQuery } from '../../store/patient2'
import CustomerCombobox from '../tools/CustomCombobox'
import DaySelector from '../tools/DaySelector'

const WorkerHoursAddModal = () => {
 
    const [ activePage, setActivePage] = useState(1)
    const [ createWorkerHours ] = useCreateWorkerHoursMutation()
    const { data, isLoading, error } = useGetAllWorkerQuery({page: activePage})
    //console.log(data);

    const workers = data?.results.map(worker => ({
        id: worker.id,
        name: `${worker.first_name} ${worker.last_name}`,
        image: worker.worker_image
    }))

    const calculateWeeklyHours = (startTime, endTime, workingDays) => {
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);
      const startMinutes = startHour * 60 + startMinute;

      const endMinutes = endHour * 60 + endMinute;
      const dailyMinutes = endMinutes - startMinutes;
      const daysCount = workingDays.split(", ").length;

      const weeklyMinutes = dailyMinutes * daysCount;
      const weeklyHours = weeklyMinutes / 60;
    
      return weeklyHours;
    };
    
    const submit = async (values, actions) => {
      
        console.log("Form verileri gönderiliyor:", JSON.stringify(values, null, 2))
        
        try {
          const formData = new FormData();
          Object.keys(values).forEach((key) => {
            formData.append(key, values[key])
          })
          formData.append("weekly_hours", calculateWeeklyHours(values.start_time, values.end_time, values.working_days))
          await createWorkerHours(formData).unwrap()
          actions.resetForm()
          destroyModal()
        } catch (error) {
          console.log(error)      
        }
    }
    const {values, errors, handleChange, handleSubmit, setFieldValue, setValues } = useFormik({
      initialValues: {
        "start_time": "",
        "end_time": "",
        "working_days": "",
        "date": "",
        "person": ""
      },
      onSubmit: submit,
    })
    if(isLoading){
      return <div></div>
    }
      
    return (
      <div className="add-modal z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[650px]">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-full ">
          <div className="flex justify-between items-center pb-3 border-b mb-5 border-gray-200">
            <h2 className="text-lg font-semibold text-cyan-500">ÇALIŞMA SAATİ</h2>
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
            <label className="block text-sm font-medium text-gray-500">Çalışan</label>
                <CustomerCombobox 
                    value={values.person} 
                    onChange={(id) => setFieldValue('person', id)} 
                    customers={workers} 
                />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">İş Başı</label>
              <input
                type="time"
                name="start_time"
                value={values.start_time}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Paydos</label>
              <input
                type="time"
                name="end_time"
                value={values.end_time}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Çalışma Günleri</label>
                <DaySelector value={values.working_days} setFieldValue={setFieldValue} name={"working_days"} />
            </div>                       
          </div>
          <button
            type="submit"
            className="mx-auto bg-cyan-500 flex items-center justify-around text-white rounded-md px-10 py-2 shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <Check className="mr-1" size={20} />
            Kaydet
          </button>
        </form>
      </div>
    )
}

export default WorkerHoursAddModal