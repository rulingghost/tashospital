import React from 'react'
import { Outlet } from 'react-router-dom'

const PatientLayout = () => {
  return (
    <div className='w-full h-full flex border border-gray-300'>
        <Outlet />
    </div>    
  )
}

export default PatientLayout