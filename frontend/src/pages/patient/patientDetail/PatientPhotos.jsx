import React from 'react'
import { createModal } from '../../../components/Utils/Modal'
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'
import { BiDownload } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { useGetPatientIdQuery } from '../../../store/patient2'

const PatientPhotos = () => {

  const {patientId} = useParams()
    // const { data: patient, isLoading, refetch } = useGetPatientIdQuery(patientId, {
    //     skip: !patientId,
    // });

    // if (!patient) {
    //   return <div>{"Bir sorun oluştu..."}</div>;
    // }else if (isLoading){
    //     return <div>Veri Yükleniyor</div>
    // }

    const patient_photos = [
      {
        "id": 9,
        "file_name": null,
        "file": "http://127.0.0.1:8000/media/images/patient_photos/Ads%C4%B1z.png",
        "person": 10
    },
    {
        "id": 10,
        "file_name": null,
        "file": "http://127.0.0.1:8000/media/images/patient_photos/Linkedinyenibir_yommz2p.jpg",
        "person": 10
    },
    {
        "id": 11,
        "file_name": null,
        "file": "http://127.0.0.1:8000/media/images/patient_photos/images.jpg",
        "person": 10
    }
    ]

  return (
    <div className='bg-gray-200 w-[calc(100%-15%)] h-full flex justify-evenly items-center'>
      <div className='bg-white w-[98%] h-[98%] rounded-lg flex flex-col items-center justify-between'>
          <div style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }} className='w-full h-20 rounded-b-md border-gray-100 flex items-center justify-between px-6'>
              <p className='text-lg font-semibold tracking-wider text-cyan-600'>FOTOĞRAFLAR</p>
              <button
                onClick={()=> createModal("photo-add-modal", patientId)}
                className='bg-cyan-600 px-5 text-white text-lg font-semibold py-2 rounded-full tracking-wider'>
                  Ekle
              </button>
          </div>
          <div className='p-3 w-full h-[calc(100%-5.3rem)] overflow-auto'>
            <div className="grid grid-cols-3 gap-4">
              {patient_photos?.map((photo, index)=> (
                <div key={index} className="relative group shadow-md flex items-center justify-center rounded-lg p-2">
                  <img
                    src={photo.file}
                    alt="Hasta 1"
                    className="w-full h-[400px] rounded-lg object-cover "
                  />
                  <div                   
                      className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-lg flex items-center justify-center gap-6">
                    <button
                      onClick={()=> createModal("photo-modal", { url: photo.file })}
                      className=' text-white opacity-0 bg-cyan-600 rounded-lg group-hover:opacity-100 border border-slate-400 transition-opacity duration-300'
                    >
                      <MdOutlinePhotoSizeSelectActual className="text-[52px] p-3 hover:text-[62px] transition-all duration-100" />
                    </button>
                    <button
                      className=' text-white opacity-0 group-hover:opacity-100 bg-cyan-600 rounded-lg border border-slate-400 transition-opacity duration-300'
                    >
                      <BiDownload className="text-[52px] p-3 hover:text-[62px] transition-all duration-100" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export default PatientPhotos