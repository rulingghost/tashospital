import React from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { BiTask } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { CiCalendar } from 'react-icons/ci'
import { FaFacebook, FaInstagram, FaRegStar, FaStar, FaWhatsapp } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowDroprightCircle } from 'react-icons/io'
import { IoArrowBackCircleOutline, IoCallOutline, IoSettingsOutline } from 'react-icons/io5'
import { MdApartment } from "react-icons/md";

const ChatUserDetail = ( {setDetailIsShow, detailIsShow }) => {
  return (
    <div className='absolute w-full h-full bg-slate-100 top-0 left-0 flex items-center justify-between flex-col'>
        <nav className='w-full h-[65px] border-b border-gray-400 shadow-lg bg-zinc-300-200 flex px-10'>
            <button  onClick={() => setDetailIsShow(prevState => !prevState)} ><IoArrowBackCircleOutline size={40} color='gray' /></button>
            <div className='flex ml-auto gap-2 items-center'>
                <button className='flex py-1 pl-3 pr-2 items-center border justify-evenly bg-neutral-50 shadow-md rounded-lg  border-gray-300'>
                    <IoCallOutline size={20} className='mr-2' />
                    <span className='text-lg h-full flex items-center pr-2 mr-1.5 border-r border-black '>Arama</span>
                    <IoIosArrowDown size={23} className='' />
                </button>
                <button className='flex py-1 pl-3 pr-2 items-center border justify-evenly bg-neutral-50 shadow-md rounded-lg  border-gray-300'>
                    <BiTask size={20}/>
                    <span className='text-lg h-full flex items-center px-2  '>Görev</span>                    
                </button>
                <button className='flex py-1 pl-3 pr-2 items-center border justify-evenly bg-neutral-50 shadow-md rounded-lg  border-gray-300'>
                    <CiCalendar size={25} />
                    <span className='text-lg h-full flex items-center px-2  '>Toplantı</span>  
                </button>
                <button className='flex py-1 pl-3 pr-2 items-center border justify-evenly bg-neutral-50 shadow-md rounded-lg  border-gray-300'>
                    <MdApartment size={20} className='mr-2' />
                    <span className='text-lg h-full flex items-center pr-2 mr-1.5 border-r border-black '>Hesap Ekle</span>
                    <IoIosArrowDown size={23} className='' />
                </button>
                <button className='flex py-[5.5px] pl-2 pr-2 items-center border justify-evenly bg-neutral-50 shadow-md rounded-lg  border-gray-300'>
                    <BsThreeDotsVertical  size={24}/>                  
                </button>
            </div>
        </nav>
        <section className='w-full flex my-auto h-[calc(100%-65px)]'>
            <nav className='h-full w-[15%] border-r border-gray-300'>
                <div className='w-full flex mt-8 ml-4'>
                    <img src="/images/profile1.jpg" className='w-[60px] h-[60px] rounded-full' />
                    <div className='flex flex-col ml-3'>
                        <p className='text-xl font-bold text-zinc-600'>Mehmet Enes</p>
                        <p className='text-gray-500 text-sm'>Meslek ünvanı ekle</p>
                        <div className='flex w-full items-center mt-1'>
                            <FaFacebook className=' hover:-black' size={20} color='gray' />
                            <FaInstagram className='ml-2 hover:-black' size={20} color='gray' />
                            <FaWhatsapp className='ml-2 hover:-black' size={20} color='gray' />
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between pt-2 pb-3 px-4 mt-6 border border-gray-500 rounded-xl mx-3'>
                    <div className='flex flex-col items-center justify-center'>
                        <p className='font-semibold text-gray-400'>GOL</p>
                        <p className='text-xl font-semibold'>99</p>
                    </div>
                    <div className='flex flex-col justify-between'>
                        <p className='flex items-center text-gray-500 text-sm'>Müşteri Uyumu <AiOutlineExclamationCircle color='black' className='ml-2' /></p>
                        <p className='flex mt-3 gap-1'>
                            <FaStar color='#fbbf24' />
                            <FaStar color='#fbbf24' />
                            <FaStar color='#fbbf24' />
                            <FaRegStar color='gray' />
                            <FaRegStar color='gray' />
                        </p>
                    </div>
                    <div>
                        <IoIosArrowDroprightCircle size={20} color="blue"/>
                    </div>
                </div>
                
                <button className='text-lg font-semibold flex justify-between items-center py-2 px-4 my-4 w-full'>İletişim Bilgileri <span className='border rounded-lg p-[4px] border-gray-400 shadow-sm'><IoSettingsOutline size={18} /></span></button>
                
                <ul className='w-full px-6 flex flex-col gap-1'>
                    <li className='px-5 py-3 text-lg font-semibold text-zinc-600 rounded-md border border-l-4 border-zinc-100 transition-all duration-300 shadow-md bg-white border-l-blue-600 w-full'>
                        Genel Bakış
                    </li>
                    
                    <li className='px-5 py-3 text-lg font-semibold text-zinc-600 rounded-md border border-l-4 border-zinc-100 transition-all duration-300 hover:shadow-md hover:bg-white hover:border-l-blue-600 w-full'>
                        İletişim Detayları
                    </li>
                </ul>

            </nav>
            <div className='w-[83%] my-auto mx-auto h-[97%] bg-white border border-gray-300 rounded-xl'>
                <header className='w-full h-[90px] border-b border-gray-300 flex items-center px-8'>
                    <p className='text-2xl font-semibold'>Genel Bakış</p>
                </header>
                <div className='border-b border-gray-300 py-10 flex flex-wrap'>
                    <div className='flex flex-col items-center w-[33%] gap-1'>
                        <p className='text-gray-400 font-semibold'>Konum</p>
                        <p className='text-blue-600 font-semibold'>Pursaklar, Ankara</p>
                    </div>
                    <div className='flex flex-col items-center w-[33%] gap-1'>
                        <p className='text-gray-400 font-semibold'>E-Posta</p>
                        <p className=' font-semibold'>MehmetEnes@gmail.com</p>
                    </div>
                    <div className='flex flex-col items-center w-[33%] gap-1'>
                        <p className='text-gray-400 font-semibold'>Telefon</p>
                        <p className='text-blue-600 font-semibold'>0507 345 83 24</p>
                    </div>
                    <div className='flex flex-col items-center w-[33%] mt-8 gap-1'>
                        <p className='text-gray-400 font-semibold'>Adres</p>
                        <p className=' font-semibold'>Lorem ipsum dolor sit amet</p>
                    </div>
                                        
                </div>
            </div>
        </section>
    </div>
  )
}

export default ChatUserDetail