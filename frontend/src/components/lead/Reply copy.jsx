import React, { useState } from 'react'
import { GrAttachment } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";

const Reply = ({setMessages}) => {

    const [message, setMessage] = useState('')

    const sendMessage = e =>{
        e.preventDefault()
        setMessages(messages =>[
            ...messages,
            {
                fromMe: true,
                name: "ahmet",
                userName: "yusuf",
                avatar: '/images/profile1.jpg',
                message
            }
        ])
        setMessage('')
    }

  return (
    <footer className='h-[84px] flex items-center justify-center px-6'>
        <form onSubmit={sendMessage} className='h-[44px] w-full pl-[11px] pr-[8px] border rounded-full flex items-center'>
            <button type='button' className='w-[40px] h-[42px] flex items-center justify-center'>
                <GrAttachment size={24}/>
            </button>
            <input value={message} onChange={e => setMessage(e.target.value)} type="text" placeholder='Mesaj...' className='flex-1 h-[40px] px-[9px] placeholder:text-gray-600 focus:placeholder:text-gray-400 text-sm border-none outline-none focus:ring-0' />
            <button type='submit' className='w-[40px] h-[42px] flex items-center justify-center'>
                <IoIosSend size={24}/>
            </button>
        </form>
    </footer>
  )
}

export default Reply