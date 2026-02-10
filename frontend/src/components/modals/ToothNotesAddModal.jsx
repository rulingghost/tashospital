import React, { useState } from "react";
import { t } from "i18next";
import { Check } from "lucide-react";
import { destroyModal } from "../Utils/Modal";
import { useDispatch } from "react-redux";
import { useFormik } from 'formik';
import { addMedicine } from "../../store/medicine";
import { stockFormSchemas } from "../../schemas/stockFormSchemas";
import ToothSchema from "../../assets/icons/ToothSchema";
import FaceSchema from "../../assets/icons/FaceSchema";
import BodySchema from "../../assets/icons/BodySchema";
import { capitalizeWords } from "../Utils/capitalizeWords";
import { calculateAge } from "../Utils/calculateAge";
import { formatISODate } from "../Utils/DateFormat";
import { useCreateDoctorNoteMutation, useUpdatePatientMutation } from "../../store/patient2";



const TethForm = ({ setAnket, data }) => {
    // const [createDoctorNote, { isLoading, isError, isSuccess, data }] = useCreateDoctorNoteMutation()
    const [createDoctorNote] = useCreateDoctorNoteMutation()
    const [updatePatient] = useUpdatePatientMutation()
    const [ checkDoktror, setCheckDoktor ] = useState("")

    const submit = async (values, actions) => {
        //console.log(JSON.stringify(values, null, 2))   
        const formData = new FormData()

        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        })
        await createDoctorNote(formData)

        const patientFormData = new FormData()
        patientFormData.append("check_worker", checkDoktror)
        await updatePatient({ newPatient: patientFormData, patientID: data.id }).unwrap()

        destroyModal()
      }
      const { values, errors, handleChange, handleSubmit, setFieldValue} = useFormik({
        initialValues: {
            patient: data.id,
            date: "",
            note_type: "tooth",
            upcoming_surgeries: "",
            past_surgeries: "",
            doctor_notes: "",
            number_11: false,
            number_12: false,
            number_13: false,
            number_14: false,
            number_15: false,
            number_16: false,
            number_17: false,
            number_18: false,
            number_21: false,
            number_22: false,
            number_23: false,
            number_24: false,
            number_25: false,
            number_26: false,
            number_27: false,
            number_28: false,
            number_31: false,
            number_32: false,
            number_33: false,
            number_34: false,
            number_35: false,
            number_36: false,
            number_37: false,
            number_38: false,
            number_41: false,
            number_42: false,
            number_43: false,
            number_44: false,
            number_45: false,
            number_46: false,
            number_47: false,
            number_48: false,
        },
        onSubmit: submit
      })     
      
    return(
        <form onSubmit={handleSubmit} className="bg-lightGray rounded-lg shadow-lg w-[1200px] p-8 relative">           
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-cyan-500">Doktor Notu</h2>
                <div className="flex gap-x-4">
                    <button
                        onClick={()=> setAnket("dis")}
                        type="button" 
                        className="px-4 py-1 boorder border-gray-400 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                        Diş
                    </button>
                    <button 
                        onClick={()=> setAnket("body")}
                        type="button"
                        className="px-4 py-1 boorder border-gray-400 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                        Plastik
                    </button>
                    <button 
                        onClick={()=> setAnket("head")}
                        type="button" 
                        className="px-4 py-1 boorder border-gray-400 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                        Saç
                    </button>                    
                </div>
                <div className="flex flex-col items-center gap-x-4 ">
                    <label className="block text-sm font-medium text-nowrap text-gray-500">Onaylayan Doktor</label>
                    <input
                        type="text"
                        name="check_worker"
                        value={checkDoktror}
                        onChange={(e)=> setCheckDoktor(e.target.value)}
                        className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                    />
                </div>   
                <button
                onClick={() => destroyModal()}
                className="text-gray-400 hover:text-gray-600"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                </button>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-6 h-[692px] ">
                <div className="overflow-y-scroll">
                    <div className="ml-3">
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Hasta Adı :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(data.first_name + " " + data.last_name)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">TC/Pasaport No :</label>
                            <p className="text-gray-600 ml-2">{data.national_id}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Ülke :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(data.country)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Sigorta :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(data.insurance_info)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Yaşı :</label>
                            <p className="text-gray-600 ml-2">{calculateAge(data.date_of_birth)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Paylaşım İzni :</label>
                            <p className="text-gray-600 ml-2">{data.sharing_permission ? "Evet" : "Hayır"}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Sigara :</label>
                            <p className="text-gray-600 ml-2">{data.smoker ? "Evet" : "Hayır"}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Alerji :</label>
                            <p className="text-gray-600 ml-2">{data.allergies}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Kayıt Tarihi :</label>
                            <p className="text-gray-600 ml-2">{formatISODate(data.created_at)}</p>
                        </div>
                    </div>
                    <div>                        
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 ml-3">Yapılacak Ameliyatlar</label>
                            <textarea
                                className='bg-slate-100 mt-1 p-3 rounded-2xl drop-shadow-md w-full h-[150px] outline-none' 
                                onChange={handleChange}
                                placeholder='Yapılacak Ameliyatlar' 
                                name="upcoming_surgeries">
                            </textarea>
                        </div>  
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 ml-3">Geçirdiği Ameliyatlar</label>
                            <textarea
                                className='bg-slate-100 mt-1 p-3 rounded-2xl drop-shadow-md w-full h-[150px] outline-none' 
                                onChange={handleChange}
                                placeholder='Geçirdiği Ameliyatlar' 
                                name="past_surgeries">
                            </textarea>
                        </div>    
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 ml-3">Doktor Notu</label>
                            <textarea
                                className='bg-slate-100 mt-1 p-3 rounded-2xl drop-shadow-md w-full h-[150px] outline-none' 
                                onChange={handleChange}
                                placeholder='Doktor Notu' 
                                name="doctor_notes">
                            </textarea>
                        </div>              
                    </div>
                </div>
                <div className="flex flex-col items-end pr-5">
                   
                    <div className="w-auto h-auto">
                        <ToothSchema values={values} setFieldValue={setFieldValue} />
                    </div>
                </div>
            </div>
            <div className="flex justify-between pt-2">
                <button
                    type="submit"
                    className="ml-auto bg-cyan-500 flex items-center justify-around text-white rounded-md pr-6 pl-5 py-2 shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                    <Check className="mr-1" size={20} />
                    {t("save")}
                </button>
            </div>
        </form>
    )    
}
const BodyForm = ({ setAnket, data }) => {

    const [faceImgLoad, setFaceImgLoad] = useState(false)
    const [bodyImgLoad, setBodyImgLoad] = useState(false)
    const [createDoctorNote] = useCreateDoctorNoteMutation()
    const [updatePatient] = useUpdatePatientMutation()
    const [ checkDoktror, setCheckDoktor ] = useState("")

    const submit = async (values, actions) => {
        console.log(JSON.stringify(values, null, 2))     
        const formData = new FormData()

        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        }) 
        await createDoctorNote(formData)

        const patientFormData = new FormData()
        patientFormData.append("check_worker", checkDoktror)
        await updatePatient({ newPatient: patientFormData, patientID: data.id }).unwrap()

        destroyModal()
    }
    const { values, errors, handleChange, handleSubmit, setFieldValue} = useFormik({
        initialValues: {
            patient: data.id,
            date: "",
            note_type: "body",
            upcoming_surgeries: "",
            past_surgeries: "",
            doctor_notes: "",
            forehead: false,
            right_temple: false,
            left_temple: false,
            nose: false,
            right_ear: false,
            left_ear: false,
            upper_lip: false,
            lower_lip: false,
            right_cheek: false,
            left_cheek: false,
            chin: false,
            neck: false,
            right_under_eye: false,
            left_under_eye: false,
            right_eyebrow: false,
            left_eyebrow: false,
            right_leg: false,
            left_leg: false,
            right_arm: false,
            left_arm: false,
            right_breast: false,
            left_breast: false,
            right_hip: false,
            left_hip: false,
            abdomen: false,
            back: false,
        },
        onSubmit: submit
      })  
      
    
    return(
        <form onSubmit={handleSubmit} className="bg-lightGray rounded-lg shadow-lg w-[1200px] p-8">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-cyan-500">Doktor Notu</h2>
                <div className="flex gap-x-4">
                    <button
                        onClick={()=> setAnket("dis")}
                        type="button" 
                        className="px-4 py-1 boorder border-gray-400 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                        Diş
                    </button>
                    <button 
                        onClick={()=> setAnket("body")}
                        type="button"
                        className="px-4 py-1 boorder border-gray-400 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                        Plastik
                    </button>
                    <button 
                        onClick={()=> setAnket("head")}
                        type="button" 
                        className="px-4 py-1 boorder border-gray-400 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                        Saç
                    </button>                    
                </div>
                <div className="flex flex-col items-center gap-x-4 ">
                        <label className="block text-sm font-medium text-nowrap text-gray-500">Onaylayan Doktor</label>
                        <input
                            type="text"
                            name="check_worker"
                            value={checkDoktror}
                            onChange={(e)=> setCheckDoktor(e.target.value)}
                            className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                        />
                </div>   
                <button
                onClick={() => destroyModal()}
                className="text-gray-400 hover:text-gray-600"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                </button>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-6 h-[700px] ">
                <div className="overflow-y-scroll">
                    <div className="ml-3">
                       <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Hasta Adı :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(data.first_name + " " + data.last_name)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">TC/Pasaport No :</label>
                            <p className="text-gray-600 ml-2">{data.national_id}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Ülke :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(data.country)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Sigorta :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(data.insurance_info)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Yaşı :</label>
                            <p className="text-gray-600 ml-2">{calculateAge(data.date_of_birth)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Paylaşım İzni :</label>
                            <p className="text-gray-600 ml-2">{data.sharing_permission ? "Evet" : "Hayır"}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Sigara :</label>
                            <p className="text-gray-600 ml-2">{data.smoker ? "Evet" : "Hayır"}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Alerji :</label>
                            <p className="text-gray-600 ml-2">{data.allergies}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Kayıt Tarihi :</label>
                            <p className="text-gray-600 ml-2">{formatISODate(data.created_at)}</p>
                        </div>
                    </div>
                    <div>                        
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 ml-3">Yapılacak Ameliyatlar</label>
                            <textarea
                                className='bg-slate-100 mt-1 p-3 rounded-2xl drop-shadow-md w-full h-[150px] outline-none' 
                                onChange={handleChange}
                                placeholder='Yapılacak Ameliyatlar' 
                                name="upcoming_surgeries">
                            </textarea>
                        </div>  
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 ml-3">Geçirdiği Ameliyatlar</label>
                            <textarea
                                className='bg-slate-100 mt-1 p-3 rounded-2xl drop-shadow-md w-full h-[150px] outline-none' 
                                onChange={handleChange}
                                placeholder='Geçirdiği Ameliyatlar' 
                                name="past_surgeries">
                            </textarea>
                        </div>    
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 ml-3">Doktor Notu</label>
                            <textarea
                                className='bg-slate-100 mt-1 p-3 rounded-2xl drop-shadow-md w-full h-[150px] outline-none' 
                                onChange={handleChange}
                                placeholder='Doktor Notu' 
                                name="doctor_notes">
                            </textarea>
                        </div>             
                    </div>
                </div>
                <div className="flex flex-col items-end pr-5">                    
                    <div className="w-auto h-[650px] overflow-y-scroll mx-auto">
                        <div className="relative select-none">
                            {faceImgLoad && <div className="absolute left-0 top-0 w-full h-full">
                                <FaceSchema values={values} setFieldValue={setFieldValue} />
                            </div>}
                            <img className="w-[450px]" src="/img/face.png" alt="" onLoad={() => setFaceImgLoad(true)} />
                        </div>   
                        <div className="relative select-none">
                            {bodyImgLoad && <div className="absolute left-0 top-0 w-full h-full">
                                <BodySchema values={values} setFieldValue={setFieldValue} />
                            </div>}
                            <img className="w-[450px] mt-3" src="/img/anatomi.png" alt="" onLoad={() => setBodyImgLoad(true)} />
                        </div>                     
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <button
                type="submit"
                className="ml-auto bg-cyan-500 flex items-center justify-around text-white rounded-md pr-6 pl-5 py-2 shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                <Check className="mr-1" size={20} />
                {t("save")}
                </button>
            </div>
    </form>
    )    
}
const HeadForm = ({setAnket, data}) => {
    const [createDoctorNote] = useCreateDoctorNoteMutation()
    const [updatePatient] = useUpdatePatientMutation()
    const [ checkDoktror, setCheckDoktor ] = useState("")

    const submit = async (values, actions) => {
        //console.log(JSON.stringify(values, null, 2))   
        const formData = new FormData()

        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        })
        await createDoctorNote(formData)

        const patientFormData = new FormData()
        patientFormData.append("check_worker", checkDoktror)
        await updatePatient({ newPatient: patientFormData, patientID: data.id }).unwrap()
        
        destroyModal()
      }
    const { values, errors, handleChange, handleSubmit, setFieldValue} = useFormik({
        initialValues: {
            patient: data.id,
            note_type: "hair",
            first_application_date: "",
            planned_procedure_date: "",
            diagnosis: "",
            previous_transplant: false,
            session_number: "",
            method: "",
            graft_count: "",
            protocol_number: "",
            bold_type: ""
        },
        onSubmit: submit
    })
    return(
        <form onSubmit={handleSubmit} className="bg-lightGray rounded-lg shadow-lg w-[1200px] p-8">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-cyan-500">Doktor Notu</h2>
                <div className="flex gap-x-4">
                    <button
                        onClick={()=> setAnket("dis")}
                        type="button" 
                        className="px-4 py-1 boorder border-gray-400 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                        Diş
                    </button>
                    <button 
                        onClick={()=> setAnket("body")}
                        type="button"
                        className="px-4 py-1 boorder border-gray-400 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                        Plastik
                    </button>
                    <button 
                        onClick={()=> setAnket("head")}
                        type="button" 
                        className="px-4 py-1 boorder border-gray-400 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white"
                    >
                        Saç
                    </button>                    
                </div>
                <div className="flex flex-col items-center gap-x-4 ">
                    <label className="block text-sm font-medium text-nowrap text-gray-500">Onaylayan Doktor</label>
                    <input
                        type="text"
                        name="check_worker"
                        value={checkDoktror}
                        onChange={(e)=> setCheckDoktor(e.target.value)}
                        className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                    />
                </div>   
                <button
                onClick={() => destroyModal()}
                className="text-gray-400 hover:text-gray-600"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                </button>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-6 h-[692px] ">
                <div className="overflow-y-scroll">
                    <div className="ml-3">
                                              
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Hasta Adı :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(data.first_name + " " + data.last_name)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">TC/Pasaport No :</label>
                            <p className="text-gray-600 ml-2">{data.national_id}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Ülke :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(data.country)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Sigorta :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(data.insurance_info)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Yaşı :</label>
                            <p className="text-gray-600 ml-2">{calculateAge(data.date_of_birth)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Paylaşım İzni :</label>
                            <p className="text-gray-600 ml-2">{data.sharing_permission ? "Evet" : "Hayır"}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Sigara :</label>
                            <p className="text-gray-600 ml-2">{data.smoker ? "Evet" : "Hayır"}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Alerji :</label>
                            <p className="text-gray-600 ml-2">{data.allergies}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Kayıt Tarihi :</label>
                            <p className="text-gray-600 ml-2">{formatISODate(data.created_at)}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">   
                        <div className="mt-7">
                            <label className="block font-medium text-sm text-gray-700 ml-3">İlk Mürcaat Tarihi</label>
                            <input
                                type="date"
                                onChange={handleChange}
                                name="first_application_date"
                                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                            />
                        </div>                      
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 text-sm ml-3">Hastanın Tanısı</label>
                            <select 
                                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                                onChange={handleChange}
                                name="diagnosis"
                            >
                                <option value="Androjenik_Alopesi">Androjenik Alopesi</option>
                                <option value="Skatrisyel_Alopesi">Skatrisyel Alopesi</option>
                                <option value="Diger">Diğer</option>
                            </select>
                        </div>  
                        <div className="mt-7">
                            <label className="block font-medium text-sm text-gray-700 ml-3">Daha Önce Saç Ekimi Yapılmış mı?</label>
                            <select 
                                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                                onChange={handleChange}
                                name="previous_transplant"
                            >
                                <option value="true">Evet</option>
                                <option value="false">Hayır</option>
                            </select>
                        </div>    
                        <div className="mt-7">
                            <label className="block font-medium text-sm text-gray-700 ml-3">Kaçıncı Seans</label>
                            <input
                                type="number"
                                name="session_number"
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                            />
                        </div>    
                        <div className="mt-7">
                            <label className="block font-medium text-sm text-gray-700 ml-3">Saç Ekim İşlemi Uygulanacak Tarih</label>
                            <input
                                type="date"
                                onChange={handleChange}
                                name="planned_procedure_date"
                                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                            />
                        </div>      
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 text-sm ml-3">Saç Ekiminde Uygulacak Metod</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                name="method"
                                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                            />
                        </div> 
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 text-sm ml-3">Ekimi Planlanan Kök Sayısı</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                name="graft_count"
                                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                            />
                        </div>  
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 text-sm ml-3">Saç Ekim Birimi Protokol No</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                name="protocol_number"
                                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                            />
                        </div>   
                    </div>
                </div>
                <div className="flex flex-col items-end pr-5">                
                    <div className="w-auto mt-5 h-[650px] overflow-y-scroll mx-auto flex flex-wrap">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <label
                                key={index}
                                htmlFor={`hair-${index + 1}`}
                                className={`flex flex-col items-center gap-y-2 ${index + 1 == 5 ? "w-[calc(43.33%-10px)]" :"w-[calc(33.33%-10px)]"}`}
                            >
                                <img className="w-24" src={`/img/hair/${index + 1}.png`} alt="" />
                                <input
                                   className="scale-150"
                                   id={`hair-${index + 1}`}
                                   name="hair"
                                   type="radio"
                                   value={`hair-${index + 1}`}
                                   onChange={() => setFieldValue("bold_type", `hair-${index + 1}`)}
                                />
                            </label>
                        ))}
                        {Array.from({ length: 3 }).map((_, index) => (
                            <label
                                key={index}
                                htmlFor={`hair-${index + 6}`}
                                className={`flex flex-col items-center gap-y-2 w-[calc(33.33%-10px)]`}
                            >
                                <img className="w-24" src={`/img/hair/${index + 6}.png`} alt="" />
                                <input 
                                    className="scale-150"
                                    id={`hair-${index + 6}`}
                                    name="hair"
                                    type="radio"
                                    value={`hair-${index + 6}`}
                                    onChange={() => setFieldValue("bold_type", `hair-${index + 6}`)}
                                />
                            </label>
                        ))}
                    </div>                  
                </div>
            </div>

            <div className="flex justify-between pt-2">
                <button
                type="submit"
                className="ml-auto bg-cyan-500 flex items-center justify-around text-white rounded-md pr-6 pl-5 py-2 shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                <Check className="mr-1" size={20} />
                {t("save")}
                </button>
            </div>
    </form>
    )  
}

const ToothNotesAddModal = ({data}) => {
console.log(data);

  const [anket, setAnket] = useState("dis") 

  return (
    <div className="add-modal z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        {anket === "dis" && <TethForm setAnket={setAnket} data={data} /> }
        {anket === "body" && <BodyForm setAnket={setAnket} data={data} />}
        {anket === "head" && <HeadForm setAnket={setAnket} data={data} />}
    </div>
  )
}

export default ToothNotesAddModal