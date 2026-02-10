import { BsFillExclamationCircleFill, BsToggle2Off } from "react-icons/bs"
import { FaCamera, FaFileAlt } from "react-icons/fa"
import { SiAudiomack } from "react-icons/si"
import { PiStickerFill } from "react-icons/pi";
import classNames from "classnames";
import { HiMiniGif } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useGetAttachmentQuery } from "../../store/chatAPI";
import { CiMenuKebab } from "react-icons/ci";
import { createModal, destroyModal } from "../Utils/Modal";


export const parseMessage = (message, showMessage, isLoading, imageUrl) => { 
 // console.log(message);


// const { data, isLoading: isLoad } = useGetAttachmentQuery({
//   messageId: message?.id ,  
//   attachmentId: message?.attachments[0]?.id , // Eğer attachmentId yoksa null kullan
// }, {
//   skip: !message?.id || !message?.attachments?.[0]?.id,  // Eğer id ya da attachmentId yoksa sorguyu atla
// });
// if(!isLoading){
//   //console.log(data);
// }


  
    try {
        if(message?.attachments.length == 0){
          
          
            if(!message.text?.startsWith("-- Unipile cannot display")){
               
                if (showMessage) {
                    return ( 
                      <p 
                          style={{hyphens: 'auto'}}
                          className={classNames({
                              'min-h-[44px] mt-2 inline-flex items-center py-2 px-4 text-sm rounded-3xl': true,
                              'border border-gray-200': !message.is_sender == 1,
                              'bg-[#efefef]': message.is_sender == 1
                      })}>
                          {message.text}
                      </p>)
                }else{
                  return message.text.slice(0, 15) + (message.text.length > 15 ? "..." : "") 
                }            
            }else{
                return <span className="flex items-center gap-x-1"><BsFillExclamationCircleFill color="red" /> HATA!</span>
            }     
         }
         else if(message?.attachments.length > 0){
            const attachment = message.attachments[0]
              //console.log(attachment.type)

            switch (attachment.type) {
               case "video":
                  if(attachment.gif){
                     return <><HiMiniGif /> Gif</> 
                  }else{
                    if (showMessage) {
                      return (isLoading ?
                        <div 
                          style={{
                            width: `208px`,
                            aspectRatio: `${attachment.size.width / attachment.size.height}`,
                            height: "auto",
                          }}
                          className='bg-slate-200 rounded-lg flex items-center justify-center'>
                          <div className="animate-spin border-4 border-t-transparent border-gray-600 rounded-full w-12 h-12"></div> 
                        </div>
                        :<video width="208" controls>
                          <source src={imageUrl} type="video/mp4" />
                          Tarayıcınız video etiketini desteklemiyor.
                        </video>
                      )
                    }else{
                      return <span className="flex items-center gap-x-1"><FaCamera /> Video</span>  
                    }               
                 }                
               case "file":
                 
                  if (showMessage) {
                      return (
                        <a href={imageUrl} download className={classNames({
                          'min-h-[44px] mt-2 inline-flex items-center py-2 px-4 rounded-3xl text-blue-600': true,
                          'border border-gray-200': !message.is_sender == 1,
                          'bg-[#efefef]': message.is_sender == 1
                  })}>Download File</a>
                      )
                  }else{
                    return <span><FaFileAlt /> Dosya</span> 
                 }                     
               case "audio":                    
                  if (showMessage) {
                     return <audio controls src={imageUrl}></audio>                 
                  }else{
                    return <span className="flex items-center gap-x-1"><SiAudiomack /> Ses</span> 
                 }
               case "img":
                  if(attachment.sticker){
                    if (showMessage) {
                      return (                       
                         <img                          
                         src={imageUrl} 
                         alt="Sticker" 
                         className="w-40 h-40 object-contain"
                       />
                      )
                    }else{
                      return <span className="flex items-center gap-x-1"><PiStickerFill size={17} /> Sticker</span>  
                    }
                    
                  }else{
                    if(showMessage){
                      return (isLoading ?  
                        <div
                          style={{
                            width: `208px`,
                            aspectRatio: `${attachment.size.width / attachment.size.height}`,
                            height: "auto",
                          }}
                          className='bg-slate-200 rounded-lg flex items-center justify-center'
                        >
                          <div className="animate-spin border-4 border-t-transparent border-gray-600 rounded-full w-12 h-12"></div> 
                        </div>
                        : <div className="relative">
                            <button 
                              onClick={()=> createModal("photo-add-modal", imageUrl)}
                              className="absolute right-1 top-1 bg-white/70 p-2 rounded-full"><CiMenuKebab size={20} /></button>
                            <img width="208" className='rounded-lg' src={imageUrl} alt="Loading image" />
                          </div>
                      )
                    }else{
                      return <span className="flex items-center gap-x-1"><FaCamera /> Fotoğraf</span> 
                    }                     
                 }             
               default:
                 return <p>{message.text}</p>
            }
         }
    } catch (error) {
       console.log(error);       
    }

}