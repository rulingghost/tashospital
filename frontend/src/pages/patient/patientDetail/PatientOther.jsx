import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PatientOther = () => {


    const  { patients } = useSelector( state => state.patient)
    const {patientId} = useParams()
    console.log(patients);
     

    var patien ;

    patients.forEach(element => {
        if (element.tc == patientId) {
            patien = element
        }
    });


  return (
    <div className='bg-gray-200 w-[calc(100%-15%)] h-full flex justify-evenly items-center'>
        <div className='bg-white rounded-xl h-[90%] w-[45%] flex items-center justify-evenly'>
            <div className='flex flex-col justify-evenly items-center w-2/4 h-full'>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>Vergi Dairesi / No</p>
                    <p className='font-semibold text-lg text-gray-700'>{patien.vergiDairesi}</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>Mesleği</p>
                    <p className='font-semibold text-lg text-gray-700'>{patien.meslegi}</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>Meslek (Resmi)</p>
                    <p className='font-semibold text-lg text-gray-700'>{patien.resmiMeslek}</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>Eğitim Durumu</p>
                    <p className='font-semibold text-lg text-gray-700'>{patien.egitimDurumu}</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>Entegrasyon Kodu</p>
                    <p className='font-semibold text-lg text-gray-700'>{patien.entegrasyonKodu}</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>E-Fatura Türü</p>
                    <p className='font-semibold text-lg text-gray-700'>{ patien.efaturaTuru}l</p>
                </div>
            </div>
            <div className='flex flex-col justify-evenly items-center w-2/4 h-full'>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>Arşiv No</p>
                    <p className='font-semibold text-lg text-gray-700'>{patien.arsivNo}</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>Oda No</p>
                    <p className='font-semibold text-lg text-gray-700'>{patien.odaNo}</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>Bölüm No</p>
                    <p className='font-semibold text-lg text-gray-700'>{patien.bolumNo}</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>Kısım No</p>
                    <p className='font-semibold text-lg text-gray-700'>{patien.kisimNo}</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>Raf No</p>
                    <p className='font-semibold text-lg text-gray-700'>{patien.rafNo}</p>
                </div>
                
            </div>
        </div>
        <div className='bg-white rounded-xl h-[90%] w-[45%] flex flex-col justify-evenly items-center'>
            <div className='flex flex-col justify-evenly items-center w-2/4 h-full'>
            <h3 className='text-xl mt-2 mb-3 font-bold'>Ehliyet Bilgileri</h3>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>Sınıfı</p>
                    <p className='font-semibold text-lg text-gray-700'>{patien.sinifi}</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>Belge No</p>
                    <p className='font-semibold text-lg text-gray-700'>{patien.belgeNo}</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>Belge Tarihi</p>
                    <p className='font-semibold text-lg text-gray-700'>{patien.belgeTarihi}</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>Verildiği Yer</p>
                    <p className='font-semibold text-lg text-gray-700'>{patien.verildigiYer}</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>Verildiği Tarih</p>
                    <p className='font-semibold text-lg text-gray-700'>{patien.verildigiTarih}</p>
                </div>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <p className='text-gray-500 font-semibold'>Cihaz - Protez</p>
                    <p className='font-semibold text-lg text-gray-700'>{patien.cihazProtez}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PatientOther