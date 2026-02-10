import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { IoLogoInstagram, IoLogoWhatsapp } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import { MdOutlinePhotoCamera } from "react-icons/md";
import  { ALL_URL, ALL_KEYS} from "../../constants"
import { UnipileClient } from "unipile-node-sdk"
import { parseMessage } from './parseMessage';
import { useGetChatQuery } from '../../store/unipileClient';
import { RiInstagramFill } from "react-icons/ri";

const ChatRetrive = ({chat}) => {  
    //console.log(chat);
    
  const { data: chatDetails, error, isLoading } = useGetChatQuery({ chat_id: chat.id });
  //console.log(chatDetails);    
    
  const x = parseMessage(chatDetails?.lastMessage, false)
  return (
    <NavLink 
        className={classNames({
          "h-[72px] flex items-center gap-x-4 hover:bg-zinc-50 px-5" : true,
          "font-semibold" : chat.unread_count !== 0,
        //   "!bg-[#885151]" : +chatId === chat.id
        })}
        key={chat.id} 
        to={`/lead/${chat.id}`}
    >
        {chat.account_type === "WHATSAPP" && <IoLogoWhatsapp size={35} color='#25d366' />}
        {chat.account_type === "INSTAGRAM" && <IoLogoInstagram  size={35} color='#F56040'/>}
        <div>
          <h6 className='text-sm'>
            { 
                (chat.name || chat.attendee_provider_id.replace("@s.whatsapp.net", "")).slice(0, 16) + 
                ((chat.name || chat.attendee_provider_id.replace("@s.whatsapp.net", "")).length > 16 ? "..." : "")
            }
          </h6>
          <p className={`text-sm ${chat.unread_count === 0 && "text-[#8e8e8e]"}`}>
            {isLoading ? (
              <span className="loading-placeholder"></span>
            ) : (
              x
            )}
          </p>
        </div>
        {chat.unread_count > 0 && <div className='ml-auto px-3 py-1 bg-blue-500 rounded-full'>
          <p className='text-white'>{chat.unread_count}</p>
        </div>}
    </NavLink>
  )
}

export default ChatRetrive