import React, { useEffect, useState } from 'react'
import ChatRetrive from './ChatRetrive'
import { useGetAllChatsQuery } from '../../store/unipileClient'

const ChatList = ({ accountType }) => {

const [requestCount, setRequestCount] = useState(0)
//const { data: allChats, error, isLoading } = useGetAllChatsQuery({ account_type: accountType });
//console.log(allChats);

//if (isLoading) return <p>Loading chats...</p>;
//if (error) return <p>Error: {error}</p>;

  return (
    <section className='h-[calc(100%-100px)] overflow-auto py-3'>
          <header className='flex items-center justify-between px-5 mb-1'>
            <h6 className='text-base font-semibold'>Messages</h6>
            {/* <button className='text-blue-600 text-sm font-semibold'>{requestCount} request</button> */}
          </header>
          
         {/* allChats
         .filter(chat => chat.provider_id !== "status@broadcast")
         .map((chat)=>{
            return <ChatRetrive key={chat.id} chat={chat} />
         })} */}
      </section>
  )
}

export default ChatList