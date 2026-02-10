import React from 'react'

const PatientBill = () => {
  return (
    <div className='bg-gray-200 w-[calc(100%-15%)] h-full flex justify-evenly items-center'>
        <div className='bg-white rounded-xl h-[90%] w-[90%] flex flex-col items-center p-3 gap-1'>
            <div className='w-full h-[60px] bg-blue-100 flex items-center justify-between px-5 rounded-lg hover:bg-blue-50'>
                <p className='font-semibold w-[14%]'>Fatura 1</p>
                <p className='font-semibold text-gray-700 text-center'>11.09.2023</p>
            </div>

            <div className='w-full h-[60px] bg-blue-100 flex items-center justify-between px-5 rounded-lg hover:bg-blue-50'>
                <p className='font-semibold w-[14%]'>Fatura 2</p>
                <p className='font-semibold text-gray-700 text-center'>03.011.2023</p>
            </div>

            <div className='w-full h-[60px] bg-blue-100 flex items-center justify-between px-5 rounded-lg hover:bg-blue-50'>
                <p className='font-semibold w-[14%]'>Fatura 3</p>
                <p className='font-semibold text-gray-700 text-center'>26.05.2024</p>
            </div>
        </div>
    </div>
  )
}

export default PatientBill