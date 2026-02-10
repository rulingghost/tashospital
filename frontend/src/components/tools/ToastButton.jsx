import React from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';

const ToastButton = ({name, text, type, position}) => {

    const toastSettings = {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    };

    const showErrorToast = (text, type) => {
        switch (type) {
          case "error":
            toast.error(text, toastSettings);
            break;
          case "success":
            toast.success(text, toastSettings);
            break;
          case "info":
            toast.info(text, toastSettings);
            break;
          default:
            console.warn("Unknown toast type:", type);
        }
      };

  return (
    <>
        <button
            onClick={()=> showErrorToast(text, type)}
                className='text-lg text-white bg-cyan-600 rounded-full font-semibold hover:bg-cyan-700 px-7 py-2' 
                type='button'
            >
                {name}
        </button>
        <div className='absolute'><ToastContainer /></div>
    </>
  )
}

export default ToastButton