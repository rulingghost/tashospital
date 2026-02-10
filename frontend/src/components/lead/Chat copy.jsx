import React, { useEffect, useRef, useState } from 'react'
import ChatHeader from './ChatHeader'
import Reply from './Reply'
import Messages from './Messages'
import ChatUserDetail from './ChatUserDetail';
import { UnipileClient } from "unipile-node-sdk"
import { ALL_KEYS, ALL_URL } from '../../constants';
import { NavLink, useParams } from 'react-router-dom'
import { useGetAllMessagesFromChatQuery } from '../../store/unipileClient';

const Chat = (  ) => {

  const {chatId} = useParams()
  
 
  const chat_id = chatId

  //const { data: allMessages, error, isLoading } = useGetAllMessagesFromChatQuery({ chat_id: chatId });
  //console.log(allMessages);
  //if(allMessages){
  //  console.log();
  //}

  const [detailIsShow, setDetailIsShow] = useState(false)

  return (
    <div className='flex w-[76%] h-[calc(100%-32px)] my-4 ml-4 bg-white rounded-xl border border-gray-300'>
        {chatId && allMessages && <div className='h-full w-full flex flex-col '>
          {/* <ChatHeader user={{name: allMessages[0].chat_provider_id.split('@')[0]}} /> */}
          <ChatHeader user={{name: "test"}} />
          //<Messages messages={allMessages} /> 
          <Reply />
          { detailIsShow && <ChatUserDetail setDetailIsShow={setDetailIsShow} detailIsShow={detailIsShow} />}
        </div>}
        
    </div>
  )
}

export default Chat