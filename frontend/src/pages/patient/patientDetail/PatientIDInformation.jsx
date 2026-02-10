import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPatientIdQuery } from '../../../store/patient2';


const PatientIDInformation = () => {
   
    const {patientId} = useParams()
    const { data: patient, isLoading } = useGetPatientIdQuery(patientId, {
        skip: !patientId,
    });

    if (!patient) {
        return <div>{"Bir sorun oluştu..."}</div>;
    }else if (isLoading){
        return <div>Veri Yükleniyor</div>
    }

    return (
        <div className='bg-gray-200 w-[calc(100%-15%)] h-full flex justify-evenly items-center'>
            <div className='bg-white rounded-xl h-[90%] w-[45%] flex flex-col items-center justify-evenly'>
                <h3 className='text-xl mt-9 font-bold'>Genel Bilgiler</h3>
                <div className='h-[85%] w-full flex items-center justify-evenly'>
                    <div className='flex flex-col justify-evenly items-center w-2/4 h-full'>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <p className='text-gray-500 font-semibold'>Hasta No</p>
                            <p className='font-semibold text-lg text-gray-700'>{patient.patient_number || 'Bilinmiyor'}</p>
                        </div>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <p className='text-gray-500 font-semibold'>Medeni Hali</p>
                            <p className='font-semibold text-lg text-gray-700'>{patient.marital_status || 'Bilinmiyor'}</p>
                        </div>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <p className='text-gray-500 font-semibold'>Kimlik Türü</p>
                            <p className='font-semibold text-lg text-gray-700'>TC Kimlik</p>
                        </div>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <p className='text-gray-500 font-semibold'>Pasaport No</p>
                            <p className='font-semibold text-lg text-gray-700'>{patient.passport_number || 'Yok'}</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-evenly items-center w-2/4 h-full'>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <p className='text-gray-500 font-semibold'>Anne Adı</p>
                            <p className='font-semibold text-lg text-gray-700'>{patient.mother_name || 'Bilinmiyor'}</p>
                        </div>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <p className='text-gray-500 font-semibold'>Baba Adı</p>
                            <p className='font-semibold text-lg text-gray-700'>{patient.father_name || 'Bilinmiyor'}</p>
                        </div>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <p className='text-gray-500 font-semibold'>Kan Grubu</p>
                            <p className='font-semibold text-lg text-gray-700'>{patient.blood_group || 'Bilinmiyor'}</p>
                        </div>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <p className='text-gray-500 font-semibold'>Uyruk</p>
                            <p className='font-semibold text-lg text-gray-700'>{patient.nationality || 'Bilinmiyor'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white rounded-xl h-[90%] p-6 w-[45%] flex flex-col justify-evenly items-center'>
                <h3 className='text-xl mt-9 mb-3 font-bold'>Adres Bilgileri</h3>
                <div className='flex flex-col justify-evenly items-center w-2/4 h-full'>
                    <div className='flex flex-col gap-2 justify-center items-center'>
                        <p className='text-gray-500 font-semibold'>Ülke</p>
                        <p className='font-semibold text-lg text-gray-700'>{patient.country || 'Bilinmiyor'}</p>
                    </div>
                    <div className='flex flex-col gap-2 justify-center items-center'>
                        <p className='text-gray-500 font-semibold'>Şehir</p>
                        <p className='font-semibold text-lg text-gray-700'>{patient.city || 'Bilinmiyor'}</p>
                    </div>
                    <div className='flex flex-col gap-2 justify-center items-center'>
                        <p className='text-gray-500 font-semibold'>Adres</p>
                        <p className='font-semibold text-lg text-gray-700'>{patient.address || 'Bilinmiyor'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientIDInformation;
