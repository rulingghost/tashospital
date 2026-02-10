import React from 'react'
import { createModal } from '../../../components/Utils/Modal'
import { useParams } from 'react-router-dom'
import { useGetPatientFileQuery } from '../../../store/patient2'
import ToastButton from '../../../components/tools/ToastButton'

const PatientFiles = () => {

    const {patientId} = useParams()

    const {data, isLoad, error} = useGetPatientFileQuery({page: 1})
    console.log(data);
    

  return (
    <div className='bg-gray-200 w-[calc(100%-15%)] h-full flex flex-col justify-evenly items-center'>  
      
        <div className='bg-white rounded-xl h-[98%] w-[98%] flex flex-col items-center p-3 gap-1'>
            <div className='w-full h-14 border-b border-gray-300 flex items-center justify-between px-3 pb-2'>
                <p className='text-cyan-600 font-semibold text-lg'>DOSYALAR</p>
                <button
                onClick={()=>createModal("patient-file-modal", patientId)}
                    className='text-lg text-white bg-cyan-600 rounded-full font-semibold hover:bg-cyan-700 px-7 py-2' 
                    type='button'
                >
                    EKLE
                </button>                     
            </div>
            <div className='flex flex-col w-full h-[calc(100%-3.5rem)] pt-3 gap-2'>
                {data && data.results.map((item, index)=>(
                     <a
                     key={index}
                     download={item.file_name} 
                     href={item.file}
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="w-full h-[60px] bg-blue-100 flex items-center justify-between px-5 rounded-lg hover:bg-blue-50"
                 >
                     <p className="font-semibold w-[14%]">{item.file_name}</p>
                     <p className="font-semibold text-gray-700 text-center">11.09.2023</p>
                 </a>
                    ))
                }                
            </div>        
        </div>
    </div>
  )
}

export default PatientFiles