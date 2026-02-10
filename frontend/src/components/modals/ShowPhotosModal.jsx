import React from 'react'
import { destroyModal } from '../Utils/Modal';

const ShowPhotosModal = ({data}) => {
    console.log(data);
    
  return (
    <div className="add-modal z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button
            onClick={() => destroyModal()}
            className="absolute z-30 top-2 right-2 bg-white/35 rounded-full w-8 h-8 flex items-center justify-center"
        >
            ✕
        </button>
        <div className="relative bg-white rounded-lg shadow-lg max-w-[98vw] max-h-[98vh] overflow-auto p-3">    
            <img
            src={data.url}
            alt="Büyük Fotoğraf"
            className="w-full h-full object-contain rounded-lg"
            />
        </div>
    </div>
  )
}

export default ShowPhotosModal