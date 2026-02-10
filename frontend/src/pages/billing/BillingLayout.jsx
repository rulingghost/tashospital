import React from 'react'
import TopMenu from '../../UI/TopMenu';
import { Outlet } from 'react-router-dom';

const BillingLayout = () => {

    const tabs = [
        { label: "HASTA LİSTESİ", active: true, url: 'patient-list' },
        { label: "GİDERLER", active: false, url: 'expenses' },
        { label: "FATURA", active: false, url: 'bill',submenu: [
            { label: "Faturalar", active: true, url: 'bill' },
            { label: "Proforma Faturalar", active: false, url: 'proforma' },
        ] },  
    ];

  return (
    <div className='flex flex-col w-full h-full items-center justify-evenly bg-slate-100'>
        <div className='w-[95%] h-[14%] flex items-center'>
            <TopMenu tabs={tabs} submenu={false} />
        </div>
        <div className='w-[95%] h-[82%]'>
            <Outlet />
        </div>
    </div>
  )
}

export default BillingLayout