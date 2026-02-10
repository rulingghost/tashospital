import React, { useEffect } from 'react'
import { IoLogoWhatsapp } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom'
import { FaPhoneAlt } from "react-icons/fa";
import { Video, MoreVertical } from 'lucide-react';

const ChatHeader = ({user }) => {

  const { chatId } = useParams();
  useEffect(() => {
    // console.log('Username:', chatId);
  }, [chatId]);


  return (
    <header className='h-[60px] border-b boder-gray-300 flex items-center px-6'>
        <span className='flex items-center gap-x-4'>
            {/* <img src={user.avatar} className='w-12 h-12 rounded-full object-cover' /> */}
            <IoLogoWhatsapp size={35} color='blue' />
            <p className='text-base font-semibold'>{user.name}</p >
        </span>
        <div className='flex items-center gap-x-4 ml-auto'>
            <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
              <FaPhoneAlt size={20} color='blue' />
            </button>
            
            <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
              <Video size={22} className="text-blue-500" />
            </button>
            <button className='p-2  rounded-lg transition-colors text-blue-500 font-medium border border-blue-500 hover:bg-blue-500 hover:text-white'>
              Doktora İlet
            </button>
            <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
              <MoreVertical size={22} className="text-blue-500" />
            </button>
        </div>
    </header>
  )
}

export default ChatHeader