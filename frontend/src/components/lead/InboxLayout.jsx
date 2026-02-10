import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import SideBar from './SideBar'
import { IoLocationSharp } from 'react-icons/io5'
import { IoIosArrowDown } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'

const InboxLayout = () => {

  
 

  return (
    <div className='w-full h-full flex border border-gray-300 bg-slate-100 '>
        <SideBar />
        <Outlet />
        {/* <div className='border-l h-full w-[25%] flex flex-col items-center bg-slate-100'>
              <div className='mt-[15px] w-[90%] flex flex-col gap-2 pb-7 border rounded-lg shadow-md bg-white'>
                  <div className='w-full px-4 py-2 bg-blue-100 flex gap-5 items-center'>
                      <CgProfile size={20} color='#2563eb' />
                      <p className='text-lg font-semibold'>İletişim Bilgileri</p>
                      <IoIosArrowDown className='ml-auto'/>
                  </div>
                  <section className='w-full'>
                      <div className='flex items-center px-4 py-2'>
                        <img src="/img/profile2.jpg" className='w-12 h-12 rounded-full' />
                        <div className='flex gap-1 flex-col ml-4'>
                            <p className='text-blue-600 text-lg font-semibold'>Mehmet Enes</p>
                            <div className='flex items-center gap-2'>
                              <IoLocationSharp color='gray' />
                              <p className='text-gray-500'>Pursaklar, Ankara</p>
                            </div>                            
                        </div>
                        <p className='text-blue-600 text-lg font-semibold cursor-pointer ml-auto'>Düzenle</p>
                      </div>
                  </section>
                  <div className='w-full pl-7 mt-2'>
                      <p className='text-gray-400 font-semibold'>E-Posta</p>
                      <p className='font-semibold'>Mehmetenes@gmail.com</p>
                  </div>
                  <div className='w-full pl-7 mt-2'>
                      <p className='text-gray-400 font-semibold'>Telefon Numarası</p>
                      <p className='font-semibold'>0507 143 53 23</p>
                  </div>
                  <div className='w-full pl-7 mt-2 pr-3'>
                      <p className='text-gray-400 font-semibold'>İkametgah Adresi</p>
                      <p className='font-semibold text-sm'>Ahmet Yılmaz Atatürk Mahallesi, Cumhuriyet Caddesi, No: 45, Daire: 7 34752 Kadıköy</p>
                  </div>
              </div>
              
        </div> */}
    </div>    
  )
}

export default InboxLayout