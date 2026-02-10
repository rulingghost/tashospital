import React from 'react'
import { GrAttachment } from "react-icons/gr"
import { IoIosSend } from "react-icons/io"
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { useSendMessageMutation } from '../../store/chatAPI'

const Reply = () => {
    const { chatId } = useParams()
    const [sendMessage] = useSendMessageMutation()
    
    const submit = async (values, actions) => {
        try {
            const formData = new FormData()
            formData.append("text", values.message)
            if (values.fileMessage) {
                formData.append("attachments", values.fileMessage)
                formData.append("text", values.message)
            }
            const result = await sendMessage({ formData, chatID: chatId }).unwrap()            
            actions.resetForm();
        } catch (error) {
            console.log(error);
        }
    };
    

    const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
          message: "",
          fileMessage: null, 
        },
        onSubmit: submit
    });

    return (
        <footer className='h-[84px] mt-auto flex flex-col items-center justify-center px-6 relative'>
           { values.fileMessage &&
            <div className='w-[98%] border bg-white border-gray-300 rounded-lg absolute -top-[152px] left-3 p-2 shadow-md'>
                <div className='w-36 h-36 relative'>
                    <img
                            src={
                            values.fileMessage instanceof File
                                ? URL.createObjectURL(values.fileMessage) 
                                : values.fileMessage
                            }
                            alt="Preview"
                            className={`object-cover w-36 h-36 rounded-md`}
                    />
                    <button
                        onClick={()=>{
                            setFieldValue("fileMessage", null)
                        }} 
                        type='button' className='absolute bg-white/80 px-[5px] rounded-lg hover:bg-white cursor-pointer top-1 right-1'>X</button>
                </div>        
            </div>}
            <form onSubmit={handleSubmit}  className='h-[44px] w-full pl-[11px] pr-[8px] border rounded-full flex items-center'>
                <label htmlFor="file_message">
                    <GrAttachment size={24}/>
                    <input 
                        multiple 
                        type='file' 
                        name='file_message' 
                        id='file_message' 
                        className='hidden'
                        onChange={(event) => {
                            const file = event.currentTarget.files[0]
                            setFieldValue("fileMessage", file || null);
                            event.target.value = null;
                        }}
                    />
                </label>
                
                <input 
                    name='message' 
                    value={values.message} 
                    onChange={handleChange} 
                    type="text" 
                    placeholder='Mesaj...' 
                    className='flex-1 h-[40px] px-[9px] placeholder:text-gray-600 focus:placeholder:text-gray-400 text-sm border-none outline-none focus:ring-0' 
                />
                <button type='submit' className='w-[40px] h-[42px] flex items-center justify-center'>
                    <IoIosSend size={24}/>
                </button>
            </form>
        </footer>
    )
}

export default Reply
