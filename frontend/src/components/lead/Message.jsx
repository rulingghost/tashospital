import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { IoLogoWhatsapp } from "react-icons/io";
import { UnipileClient } from "unipile-node-sdk"
import { ALL_KEYS, ALL_URL } from '../../constants';
import { parseMessage } from './parseMessage';
import { useGetAttachmentQuery } from '../../store/chatAPI';

const Message = ({message}) => {
  const [imageUrl, setImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
 
  //console.log(message);
  

  const BASE_URL = ALL_URL.UNIPILE_URL
  const ACCESS_TOKEN = ALL_KEYS.UNIPILE_API_KEY
  
  const attachment_id = message?.attachments?.[0]?.id
  const message_id = message.id

  


  useEffect(() => {
    setImageUrl(null)
    setIsLoading(true)
    const fetchData = async () => {
      //console.log(attachment_id);
      
      if(attachment_id){
        try {
          const client = new UnipileClient(BASE_URL, ACCESS_TOKEN)  
          const response = await client.messaging.getMessageAttachment({
            attachment_id,
            message_id,
          })          
          const blob = response
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
        }
      }
    }  
    fetchData()
  }, [attachment_id])


 const x = parseMessage(message, true, isLoading, imageUrl)

  return (
    <div className={classNames({
        'flex gap-x-2 max-w-[45%]': true,
        'self-end': message.is_sender == 1
    })}>
        {/* {!message.is_sender == -1 && <IoLogoWhatsapp color='green' size={40} />} */}
        {/* <img src={message.avatar} className='w-6 h-6 rounded-full self-end object-cover' /> */}        
         {x}
    </div>
  )  
}

export default Message