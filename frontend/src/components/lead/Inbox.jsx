import React from 'react'
import { GrAttachment } from "react-icons/gr";
import { BsSend } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const Inbox = () => {

  return (           
    <div className='h-full w-80p flex flex-col'>
        <nav className='w-full h-[60px] border-b border-gray-300'>

        </nav>
        <section className='h-full-110 '>

        </section>
        <footer className='w-full h-[50px] px-[20px] flex gap-3 justify-start items-center border-t border-gray-300'>
            <div><GrAttachment className='w-[25px] h-[25px]'/></div>
            <input
                className='h-[35px] w-full-50 rounded-lg !focus:outline-none'
                type="text" />
            <div><BsSend className='w-[25px] h-[25px]'/></div>
        </footer>
    </div>   
  )
}

export default Inbox