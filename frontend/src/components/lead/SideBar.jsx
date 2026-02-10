import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames';
import ChatList from './ChatList';
import { FaInstagram, FaWhatsapp, FaFacebookMessenger, FaTelegramPlane, FaTwitter } from 'react-icons/fa';


const SideBar = () => {  

  const [ accountType, setAccountType ] = useState("WHATSAPP")
  return (
    <aside className='h-[calc(100%-32px)] ml-4 w-[20%] rounded-xl border-r my-4 border-gray-300 bg-white'>
      <header className='h-[100px] border-b boder-gray-300 flex flex-col items-center justify-center'>
        <select className='border w-full h-2/4   py-1 px-4 bg-white text-gray-600 focus:outline-none '>
          <option value="msg" className="flex items-center">
             Messaj
          </option>  
          <option value="yrm" className="flex items-center">
             Yorum
          </option>  
        </select>
        <select 
          value={accountType}
          onChange={()=> setAccountType(event.target.value)} 
          className='border w-full h-2/4   py-1 px-4 bg-white text-gray-600 focus:outline-none '>
        <option value="WHATSAPP" className="flex items-center">
             WhatsApp
          </option>
          <option value="INSTAGRAM" className="flex items-center">
             Instagram
          </option>          
          <option value="messenger" className="flex items-center">
             Messenger
          </option>
          <option value="telegram" className="flex items-center">
             Telegram
          </option>
          <option value="facebook" className="flex items-center">
             Facebook
          </option>
          <option value="twitter" className="flex items-center">
             Twitter
          </option>
          <option value="mail" className="flex items-center">
             Mail
          </option>
          <option value="keep" className="flex items-center">
             KEP
          </option>
          <option value="linkedin" className="flex items-center">
             Linkedin
          </option>
          <option value="Youtube" className="flex items-center">
             Youtube
          </option>
        </select>
        <input type="search" placeholder='Ara...' className='w-full h-2/4 outline-none px-4 border border-gray-200 ' />
      </header>
      <ChatList accountType={accountType} />
    </aside>
  )
}

export default SideBar