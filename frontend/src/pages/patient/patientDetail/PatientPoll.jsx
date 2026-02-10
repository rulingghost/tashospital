import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCreatePatientPollMutation, useGetPatientIdQuery } from '../../../store/patient2';
import Loading from '../../../components/tools/Loading';
import { useFormik } from 'formik';

const PatientPoll = () => {

    const { patientId } = useParams()
    const [ createPatienPoll ] = useCreatePatientPollMutation()
    const { data, isLoading, error } = useGetPatientIdQuery(patientId, { skip: !patientId });
    console.log(data);

    const submit = async (values, actions) => {      
      //  console.log("Form verileri gönderiliyor:", JSON.stringify(values, null, 2))
      
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key])
        })
        await createPatienPoll({newPoll: formData, patientID: data.id}).unwrap()

      } catch (error) {
        console.log(error)      
      }
    }
    
    const {values, errors, handleChange, handleSubmit, setFieldValue, setValues } = useFormik({
      initialValues: {
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        person: '',
      },
      onSubmit: submit,
    })
    useEffect(() => {
      if (data) {
        setValues({
            question1: data.patient_poll[data.patient_poll.length - 1]?.question1 || '',
            question2: data.patient_poll[data.patient_poll.length - 1]?.question2 || '',
            question3: data.patient_poll[data.patient_poll.length - 1]?.question3 || '',
            question4: data.patient_poll[data.patient_poll.length - 1]?.question4 || '',
            person: data.id || '',
        });
      }
    }, [data]);
    
    if(isLoading) return <Loading />
    if(error || !data) return <p>Hata Oluştu...</p>

  return (
    <form onSubmit={handleSubmit} className='py-5 px-8 w-[calc(100%-18%)] mx-auto my-auto h-[97%] bg-white border border-gray-100 rounded-3xl shadow-md overflow-auto'>        
        <p className='text-2xl mb-10 ml-10 mt-5 font-semibold text-cyan-600'>HASTA ANKETİ</p>        
        <div className='mt-3'>
            <p className=' '><span className='font-semibold'>1.</span> Yolda bir arkadaşımız ile birlikte yürüyorken bir araba gelip arkadaşımıza çarpıp kaçsa; arkadaşımızın yanımda kalıp onunla mı ilgilenirdiniz yoksa, kaçan arabayı yakalamak için peşinden mi koşardımız?</p>
            <textarea
                className='w-full border mt-4 border-gray-300 rounded-xl outline-none px-4 shadow-md' 
                type="text" 
                rows="3" 
                name='question1'
                value={values.question1}
                onChange={handleChange}
            />
        </div>
        <div className='mt-8'>
            <p className=' '><span className='font-semibold'>2.</span> Kendinizi ne sıklıkla yalnız hissediyorsunuz?</p>
            <textarea 
                className='w-full border mt-4 border-gray-300 rounded-xl outline-none px-4 shadow-md' 
                type="text" 
                rows="3" 
                name='question2'
                value={values.question2}
                onChange={handleChange}
            />
        </div>
        <div className='mt-8'>
            <p className=' '><span className='font-semibold'>3.</span> Yaşamdaki kişisel hedeflerinizin durumunu ne sıklıkla erteliyorsunuz?</p>
            <textarea 
                className='w-full border mt-4 border-gray-300 rounded-xl outline-none px-4 shadow-md' 
                type="text" 
                rows="3" 
                name='question3'
                value={values.question3}
                onChange={handleChange}
            />
        </div>
        <div className='mt-8'>
            <p className=' '><span className='font-semibold'>4.</span>Şu fotoğraf seni rahatsız ediyor mu?</p>
            <img src="/img/anket.png" className='mt-3 ml-4' />
            <textarea 
                className='w-full border mt-4 border-gray-300 rounded-xl outline-none px-4 shadow-md' 
                type="text" 
                rows="3" 
                name='question4'
                value={values.question4}
                onChange={handleChange}
            />
        </div>
        <div className='flex mt-5'>
            <button
                type='submit'
                className='border border-gray-200 text-xl rounded-xl bg-sky-600 shadow-md hover:bg-sky-500 w-full p-5 text-white font-semibold ml-auto'
            >
                KAYDET
            </button>
        </div>
    </form>
  )
}

export default PatientPoll