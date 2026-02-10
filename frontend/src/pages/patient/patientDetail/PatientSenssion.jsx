import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetPatientIdQuery } from '../../../store/patient2';
import Loading from '../../../components/tools/Loading';
import { formatDateToShow } from '../../../components/Utils/DateFormat';

const PatientSenssion = () => {

    const {patientId} = useParams()
    const { data: patient, isLoading, error } = useGetPatientIdQuery(patientId, {
        skip: !patientId,
    });

    if(isLoading) return <Loading />
    if(error || !patient) return <p>Hata Oluştu...</p>

    return (
        <div className='bg-gray-200 w-[calc(100%-15%)] h-full flex justify-evenly items-center'>
            <div className='bg-white rounded-xl h-[90%] w-[60%] flex flex-col items-center justify-evenly'>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-lg text-gray-500 font-semibold'>Cihaz Adı</p>
                    <p className='text-lg text-gray-700 font-semibold'>{patient.device_name}</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-lg text-gray-500 font-semibold'>Seans</p>
                    <p className='text-lg text-gray-700 font-semibold'>{patient.seans_number}</p>
                </div>               
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-lg text-gray-500 font-semibold'>Günler</p>
                    <p className='text-lg text-gray-700 font-semibold'>{patient.seans_days}</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-lg text-gray-500 font-semibold'>Tarih</p>
                    <p className='text-lg text-gray-700 font-semibold'>{formatDateToShow(patient.session_date)}</p>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='text-lg text-gray-500 font-semibold'>Saat</p>
                    <p className='text-lg text-gray-700 font-semibold'>{patient.session_time}</p>
                </div>
                
            </div>
        </div>
    );
}

export default PatientSenssion;
