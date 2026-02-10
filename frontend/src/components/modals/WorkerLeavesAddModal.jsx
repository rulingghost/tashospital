import React, { useEffect, useState } from 'react'
import { destroyModal } from '../Utils/Modal'
import { useFormik } from 'formik'
import { Check } from 'lucide-react'
import { useCreateWorkerLeavesMutation, useGetAllWorkerQuery } from '../../store/patient2'
import CustomerCombobox from '../tools/CustomCombobox'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'

const WorkerLeavesAddModal = () => {
 
    const [ activePage, setActivePage] = useState(1)
    const [ createWorkerLeaves ] = useCreateWorkerLeavesMutation()
    const { data, isLoading, error } = useGetAllWorkerQuery({page: activePage})
    //console.log(data);

    const leaves = data?.results.map(worker => ({
        id: worker.id,
        name: `${worker.first_name} ${worker.last_name}`,
        image: worker.worker_image
    }))
    const submit = async (values, actions) => {
          console.log("Form verileri gönderiliyor:", JSON.stringify(values, null, 2))
          console.log(calculateLeaveDays(state[0].startDate, state[0].endDate));
          
        
        try {
          const formData = new FormData();
          Object.keys(values).forEach((key) => {
            formData.append(key, values[key])
          })
          await createWorkerLeaves(formData).unwrap()
          actions.resetForm()
          destroyModal()
        } catch (error) {
          console.log(error)      
        }
    }

    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ])

    const calculateLeaveDays = (startDate, endDate) => {
      const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    const {values, errors, handleChange, handleSubmit, setFieldValue, setValues } = useFormik({
      initialValues: {
        "start_date": format(new Date(state[0].startDate), "yyyy-MM-dd"),
        "end_date": format(new Date(state[0].endDate), "yyyy-MM-dd"),
        "leave_days": calculateLeaveDays(state[0].startDate, state[0].endDate),
        "person": "",
      },
      onSubmit: submit,
    })
    useEffect(() => {
      setFieldValue("start_date", format(new Date(state[0].startDate), "yyyy-MM-dd"));
      setFieldValue("end_date", format(new Date(state[0].endDate), "yyyy-MM-dd"));
      setFieldValue("leave_days", calculateLeaveDays(state[0].startDate, state[0].endDate));

    }, [state])    

    if(isLoading){
      return <div>Yükleniyor...</div>
    }

    return (
      <div className="add-modal z-50 absolute top-0 right-0 min-w-[350px] h-screen">
        <form onSubmit={handleSubmit} className="bg-white rounded-l-3xl p-6 w-full h-full ">
          <div className="flex justify-between items-center pb-3 border-b mb-5 border-gray-200">
            <h2 className="text-lg font-semibold text-cyan-500">İZİN OLUŞTUR</h2>
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
          
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 py-6">
            <div>
            <label className="block text-sm font-medium text-gray-500">Çalışan</label>
                <CustomerCombobox 
                    value={values.person} 
                    onChange={(id) => setFieldValue('person', id)} 
                    customers={leaves} 
                />
            </div>
            <div className='mt-14'>
              <DateRange
                editableDateInputs={true}
                onChange={item => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />
            </div>                        
          </div>
          <button
            type="submit"
            className="w-full mt-32 bg-cyan-500 flex items-center justify-center text-white rounded-md px-10 py-2 shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <Check className="mr-1" size={20} />
            Kaydet
          </button>
        </form>
      </div>
    )
}

export default WorkerLeavesAddModal