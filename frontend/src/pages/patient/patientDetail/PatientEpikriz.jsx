import React, { useState } from "react";
import { t } from "i18next";
import { Check } from "lucide-react";
import { useFormik } from 'formik';
import { stockFormSchemas } from "../../../schemas/stockFormSchemas";
import FaceSchema from "../../../assets/icons/FaceSchema";
import BodySchema from "../../../assets/icons/BodySchema";
import ToothSchema from "../../../assets/icons/ToothSchema";
import { useCreateStockUseMutation, useGetAllStocksQuery, useGetPatientIdQuery, useUpdateDoctorNoteMutation, useUpdatePatientMutation } from "../../../store/patient2";
import { useParams } from "react-router-dom";
import { capitalizeWords } from "../../../components/Utils/capitalizeWords";
import { formatDateToShow, formatISODate, formatISODateUTC } from "../../../components/Utils/DateFormat";
import { calculateAge } from "../../../components/Utils/calculateAge";
import Loading from "../../../components/tools/Loading";
import { destroyModal } from "../../../components/Utils/Modal";
import CustomCombobox from "../../../components/tools/CustomCombobox";


const PatientEpikriz = () => {
    const {patientId} = useParams()
    const { data: patient, isLoading, error } = useGetPatientIdQuery(patientId, {
        skip: !patientId,
    });
    //console.log(patient);

    if(isLoading){
        return <Loading />
    }else if(error){
        return <p>Hata Oluştu</p>
    }
    
    return (
        <div  className='bg-gray-200 w-[calc(100%-15%)] h-full flex justify-evenly items-center'>
            {patient.patient_note[0]?.note_type === "tooth" && <TethForm patient={patient} values={patient.patient_note[0]} /> }
            {patient.patient_note[0]?.note_type === "body" && <BodyForm patient={patient} values={patient.patient_note[0]} />}
            {patient.patient_note[0]?.note_type === "hair" && <HeadForm patient={patient} values={patient.patient_note[0]} />}
        </div>
    )
}

export default PatientEpikriz




const TethForm = ({ values, patient }) => {

    const [updatePatient] = useUpdatePatientMutation()
    const [createStockUse] = useCreateStockUseMutation()
    const [updateDoctorNote] = useUpdateDoctorNoteMutation()
    const [ dischardDate, setDischardDate ] = useState("")
    const [stockID, setStockID] = useState("")
    const [stockUnit, setStockUnit] = useState("")
    const [surgeryDate, setSurgeryDate] = useState("")
    const [controlDate1, setControlDate1] = useState("")
    const [controlDate2, setControlDate2] = useState("")

    const { data, error, isLoading } = useGetAllStocksQuery({ page: 1})

    const stocks = data?.results.map(stock => ({
        id: stock.id,
        name: stock.stock_name,
        title: `Stok: ${stock.stock_haved}\nDepo: ${stock.stock_warehouse}\nÜ.T.: ${formatDateToShow(stock.stock_ut)}\nS.K.T.: ${formatDateToShow(stock.stock_skt)}`,
        // image: worker.worker_image
    }))
      
    const submit = async () => {
        //console.log(JSON.stringify(values, null, 2))   
        
        if(dischardDate) {
            const patientForm = new FormData()
            patientForm.append("discharge_date", dischardDate)            
            await updatePatient({ newPatient: patientForm, patientID: patient.id }).unwrap()
        }
        if(stockID && stockUnit){
            const stockUseForm = new FormData()
            stockUseForm.append("patient_used", patient.id)
            stockUseForm.append("stock_used", stockID)
            stockUseForm.append("number_used", stockUnit)    
            await createStockUse({ newStock: stockUseForm }).unwrap()
        }
        if(surgeryDate || controlDate1 || controlDate2){
            const patientNoteForm = new FormData()
            if(surgeryDate) patientNoteForm.append("surgery_date", surgeryDate)
            if(controlDate1) patientNoteForm.append("control_1_date", controlDate1)
            if(controlDate2) patientNoteForm.append("control_2_date", controlDate2) 
            await updateDoctorNote ({newNote: patientNoteForm, noteID: values.id, patientId: values.patientId}).unwrap()
        }
    } 

    if(isLoading) return <Loading />
    if(error || !data) return <p>Hata Oluştu...</p>

    return(
        <form className="bg-lightGray rounded-lg shadow-lg w-[98%] h-[98%] p-8 relative">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-cyan-500">Doktor Notu</h2>      
                <div className="flex flex-col justify-center items-center gap-x-4 mr-3">
                    <label className="block text-sm font-medium text-nowrap text-gray-500">Onaylayan Doktor</label>
                    <p className="mt-1">{patient.check_worker || ""}</p>
                </div>
                <div className=" flex items-center justify-between gap-x-5">
                    <div className="flex flex-col items-center">
                        <label className="block text-sm font-medium text-nowrap text-gray-500">İlaç Adı</label>
                        <CustomCombobox
                            value={stockID} 
                            onChange={(id) => setStockID(id) } 
                            customers={stocks} 
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <label className="block text-sm font-medium text-nowrap text-gray-500">Adet</label>
                        <div className="flex items-center">
                            <input 
                                type="number" 
                                onChange={(e)=> setStockUnit(e.target.value)}
                                value={stockUnit}
                                className="max-w-20 mt-1 rounded-md border border-gray-200 bg-white pr-2 pl-3 sm:text-sm py-2 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" 
                            />                            
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center gap-x-4 mr-3">
                    <label className="block text-sm font-medium text-nowrap text-gray-500">Taburcu Tarihi</label>
                    {!patient.discharge_date ? 
                    <input
                        type="datetime-local"
                        name="stock_ut"
                        value={dischardDate}
                        onChange={ e => setDischardDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                    />:
                    <p className="mt-1">{formatISODateUTC(patient.discharge_date)}</p>}
                </div>   
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-6 h-[720px] ">
                <div className="overflow-y-scroll">
                    <div className="ml-3">
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Hasta Adı :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(patient.first_name + " " + patient.last_name)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">TC/Pasaport No :</label>
                            <p className="text-gray-600 ml-2">{patient.national_id}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Ülke :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(patient.country)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Sigorta :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(patient.insurance_info)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Yaşı :</label>
                            <p className="text-gray-600 ml-2">{calculateAge(patient.date_of_birth)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Paylaşım İzni :</label>
                            <p className="text-gray-600 ml-2">{patient.sharing_permission ? "Evet" : "Hayır"}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Sigara :</label>
                            <p className="text-gray-600 ml-2">{patient.smoker ? "Evet" : "Hayır"}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Alerji :</label>
                            <p className="text-gray-600 ml-2">{patient.allergies}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Kayıt Tarihi :</label>
                            <p className="text-gray-600 ml-2">{formatISODate(patient.created_at)}</p>
                        </div>
                    </div>
                    <div>     
                        <div className="mt-7 flex w-full items-center justify-between">
                            <div className="flex flex-col items-center">
                                <label className="block font-medium text-gray-700 border-b w-full text-center border-gray-300 mb-1">Ameliyat Tarihi</label>
                                {!values.surgery_date ? 
                                    <input 
                                        className="outline-none border border-gray-300 rounded-lg px-2 py-1 mt-1"
                                        type="date" 
                                        value={surgeryDate}
                                        onChange={(e) => setSurgeryDate(e.target.value)}
                                    />:
                                    <p className="p-2 text-lg text-gray-700 w-full">
                                        {values.surgery_date}
                                    </p>
                                }
                            </div>    
                            <div className="flex flex-col items-center">
                                <label className="block font-medium text-gray-700 border-b w-full text-center border-gray-300 mb-1">Kontrol 1</label>
                                {!values.control_1_date ? 
                                    <input 
                                        className="outline-none border border-gray-300 rounded-lg px-2 py-1 mt-1"
                                        type="date" 
                                        value={controlDate1}
                                        onChange={(e) => setControlDate1(e.target.value)}
                                    />:
                                    <p className="p-2 text-lg text-gray-700 w-full">
                                        {values.control_1_date}
                                    </p>
                                }
                            </div>
                            <div className="flex flex-col items-center">
                                <label className="block font-medium text-gray-700 border-b w-full text-center border-gray-300 mb-1">Kontrol 2</label>
                                {!values.control_2_date ? 
                                    <input 
                                        className="outline-none border border-gray-300 rounded-lg px-2 py-1 mt-1"
                                        type="date" 
                                        value={controlDate2}
                                        onChange={(e) => setControlDate2(e.target.value)}
                                    />:
                                    <p className="p-2 text-lg text-gray-700 w-full">
                                        {values.control_2_date}
                                    </p>
                                }
                            </div>                      
                        </div>                    
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 ml-3 mb-1">Yapılacak Ameliyatlar</label>
                            <p className=" p-3 text-sm border-t border-gray-300 text-gray-700 w-full">
                                {values.upcoming_surgeries}
                            </p>                           
                        </div>  
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 ml-3 mb-1">Geçirdiği Ameliyatlar</label>
                            <p className=" p-3 text-sm border-t border-gray-300 text-gray-700 w-full">
                                {values.past_surgeries}
                            </p> 
                        </div>    
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 ml-3 mb-1">Doktor Notu</label>
                            <p className=" p-3 text-sm border-t border-gray-300 text-gray-700 w-full">
                                {values.doctor_notes}
                            </p>
                        </div>              
                    </div>
                </div>
                <div className="flex flex-col items-end pr-5">                    
                    <div className="w-auto h-auto">
                        <ToothSchema values={values} />
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-2">
                <button
                    type="button"
                    onClick={() => submit()}
                    className={`ml-auto bg-cyan-500 flex items-center justify-around text-white rounded-md pr-6 pl-5 py-2 shadow-sm hover:bg-cyan-600 focus:outline-none`}
                >
                    <Check className="mr-1" size={20} />
                    {t("save")}
                </button>
            </div>
        </form>
    )    
}
const BodyForm = ({ values, patient }) => {
    console.log(values)
    //console.log(patient)
    
    const [updatePatient] = useUpdatePatientMutation()
    const [createStockUse] = useCreateStockUseMutation()
    const [updateDoctorNote] = useUpdateDoctorNoteMutation()

    const [ dischardDate, setDischardDate ] = useState("")
    const [faceImgLoad, setFaceImgLoad] = useState(false)
    const [bodyImgLoad, setBodyImgLoad] = useState(false)
    const [stockID, setStockID] = useState("")
    const [stockUnit, setStockUnit] = useState("")
    const [surgeryDate, setSurgeryDate] = useState("")
    const [controlDate1, setControlDate1] = useState("")
    const [controlDate2, setControlDate2] = useState("")

    const { data, error, isLoading } = useGetAllStocksQuery({ page: 1})

    const stocks = data?.results.map(stock => ({
        id: stock.id,
        name: stock.stock_name,
        title: `Stok: ${stock.stock_haved}\nDepo: ${stock.stock_warehouse}\nÜ.T.: ${formatDateToShow(stock.stock_ut)}\nS.K.T.: ${formatDateToShow(stock.stock_skt)}`,
        // image: worker.worker_image
    }))

      
    const submit = async () => {
        //console.log(JSON.stringify(values, null, 2))   
        
        if(dischardDate) {
            const patientForm = new FormData()
            patientForm.append("discharge_date", dischardDate)            
            await updatePatient({ newPatient: patientForm, patientID: patient.id }).unwrap()
        }
        if(stockID && stockUnit){
            const stockUseForm = new FormData()
            stockUseForm.append("patient_used", patient.id)
            stockUseForm.append("stock_used", stockID)
            stockUseForm.append("number_used", stockUnit)    
            await createStockUse({ newStock: stockUseForm }).unwrap()
        }
        if(surgeryDate || controlDate1 || controlDate2){
            const patientNoteForm = new FormData()
            if(surgeryDate) patientNoteForm.append("surgery_date", surgeryDate)
            if(controlDate1) patientNoteForm.append("control_1_date", controlDate1)
            if(controlDate2) patientNoteForm.append("control_2_date", controlDate2) 
            await updateDoctorNote ({newNote: patientNoteForm, noteID: values.id, patientId: values.patientId}).unwrap()
        }
    }   
    
    if(isLoading) return <Loading />
    if(error || !data) return <p>Hata Oluştu...</p>
    
    return(
        <form className="bg-lightGray rounded-lg shadow-lg w-[98%] h-[98%] p-8">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-cyan-500">Doktor Notu</h2>
                <div className="flex flex-col justify-center items-center gap-x-4 mr-3">
                    <label className="block text-sm font-medium text-nowrap text-gray-500">Onaylayan Doktor</label>
                    <p className="mt-1">{patient.check_worker || ""}</p>
                </div>
                <div className=" flex items-center justify-between gap-x-5">
                    <div className="flex flex-col items-center">
                        <label className="block text-sm font-medium text-nowrap text-gray-500">İlaç Adı</label>
                        <CustomCombobox
                            value={stockID} 
                            onChange={(id) => setStockID(id) } 
                            customers={stocks} 
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <label className="block text-sm font-medium text-nowrap text-gray-500">Adet</label>
                        <div className="flex items-center">
                            <input 
                                type="number" 
                                onChange={(e)=> setStockUnit(e.target.value)}
                                value={stockUnit}
                                className="max-w-20 mt-1 rounded-md border border-gray-200 bg-white pr-2 pl-3 sm:text-sm py-2 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" 
                            />                            
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center gap-x-4 mr-3">
                    <label className="block text-sm font-medium text-nowrap text-gray-500">Taburcu Tarihi</label>
                    {!patient.discharge_date ? 
                    <input
                        type="datetime-local"
                        name="stock_ut"
                        value={dischardDate}
                        onChange={ e => setDischardDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                    />:
                    <p className="mt-1">{formatISODateUTC(patient.discharge_date)}</p>}
                </div>   
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-6 h-[720px] ">
                <div className="overflow-y-scroll">
                    <div className="ml-3">
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Hasta Adı :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(patient.first_name + " " + patient.last_name)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">TC/Pasaport No :</label>
                            <p className="text-gray-600 ml-2">{patient.national_id}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Ülke :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(patient.country)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Sigorta :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(patient.insurance_info)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Yaşı :</label>
                            <p className="text-gray-600 ml-2">{calculateAge(patient.date_of_birth)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Paylaşım İzni :</label>
                            <p className="text-gray-600 ml-2">{patient.sharing_permission ? "Evet" : "Hayır"}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Sigara :</label>
                            <p className="text-gray-600 ml-2">{patient.smoker ? "Evet" : "Hayır"}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Alerji :</label>
                            <p className="text-gray-600 ml-2">{patient.allergies}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Kayıt Tarihi :</label>
                            <p className="text-gray-600 ml-2">{formatISODate(patient.created_at)}</p>
                        </div>
                    </div>
                    <div>  
                        <div className="mt-7 flex w-full items-center justify-between">
                            <div className="flex flex-col items-center">
                                <label className="block font-medium text-gray-700 border-b w-full text-center border-gray-300 mb-1">Ameliyat Tarihi</label>
                                {!values.surgery_date ? 
                                    <input 
                                        className="outline-none border border-gray-300 rounded-lg px-2 py-1 mt-1"
                                        type="date" 
                                        value={surgeryDate}
                                        onChange={(e) => setSurgeryDate(e.target.value)}
                                    />:
                                    <p className="p-2 text-lg text-gray-700 w-full">
                                        {values.surgery_date}
                                    </p>
                                }
                            </div>    
                            <div className="flex flex-col items-center">
                                <label className="block font-medium text-gray-700 border-b w-full text-center border-gray-300 mb-1">Kontrol 1</label>
                                {!values.control_1_date ? 
                                    <input 
                                        className="outline-none border border-gray-300 rounded-lg px-2 py-1 mt-1"
                                        type="date" 
                                        value={controlDate1}
                                        onChange={(e) => setControlDate1(e.target.value)}
                                    />:
                                    <p className="p-2 text-lg text-gray-700 w-full">
                                        {values.control_1_date}
                                    </p>
                                }
                            </div>
                            <div className="flex flex-col items-center">
                                <label className="block font-medium text-gray-700 border-b w-full text-center border-gray-300 mb-1">Kontrol 2</label>
                                {!values.control_2_date ? 
                                    <input 
                                        className="outline-none border border-gray-300 rounded-lg px-2 py-1 mt-1"
                                        type="date" 
                                        value={controlDate2}
                                        onChange={(e) => setControlDate2(e.target.value)}
                                    />:
                                    <p className="p-2 text-lg text-gray-700 w-full">
                                        {values.control_2_date}
                                    </p>
                                }
                            </div>                      
                        </div>                       
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 ml-3 mb-1">Yapılacak Ameliyatlar</label>
                            <p className=" p-3 text-sm border-t border-gray-300 text-gray-700 w-full">
                                {values.upcoming_surgeries}
                            </p>                           
                        </div>  
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 ml-3 mb-1">Geçirdiği Ameliyatlar</label>
                            <p className=" p-3 text-sm border-t border-gray-300 text-gray-700 w-full">
                                {values.past_surgeries}
                            </p> 
                        </div>    
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 ml-3 mb-1">Doktor Notu</label>
                            <p className=" p-3 text-sm border-t border-gray-300 text-gray-700 w-full">
                                {values.doctor_notes}
                            </p>
                        </div>                 
                    </div>
                    <div className="mt-10">
                        <h2 className="block font-medium text-gray-700 pl-3 mb-1 pb-1 border-b border-gray-300">Kullanılan İlaçlar</h2>
                        <ul className="mt-4">
                            {values.used_stocks?.map((item, index)=>(
                                <li key={index} className="flex items-center justify-between border-b border-gray-300 mb-2">
                                    <span className="text-gray-600 text-lg ml-3">{} ürün</span>
                                    <span className="text-gray-600 text-lg mr-3">{} 3 adet</span>
                                </li>
                            ))}      
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-end pr-5">                   
                    <div className="w-auto h-[650px] overflow-y-scroll mx-auto">
                        <div className="relative select-none">
                            {faceImgLoad && <div className="absolute left-0 top-0 w-full h-full">
                                <FaceSchema values={values} />
                            </div>}
                            <img className="w-[450px]" src="/img/face.png" alt="" onLoad={() => setFaceImgLoad(true)} />
                        </div>   
                        <div className="relative select-none">
                            {bodyImgLoad && <div className="absolute left-0 top-0 w-full h-full">
                                <BodySchema values={values} />
                            </div>}
                            <img className="w-[450px] mt-3" src="/img/anatomi.png" alt="" onLoad={() => setBodyImgLoad(true)} />
                        </div>                     
                    </div>
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={() => submit()}
                    className={`ml-auto bg-cyan-500 flex items-center justify-around text-white rounded-md pr-6 pl-5 py-2 shadow-sm hover:bg-cyan-600 focus:outline-none`}
                >
                    <Check className="mr-1" size={20} />
                    {t("save")}
                </button>
            </div>
    </form>
    )    
}
const HeadForm = ({values, patient}) => {

    const options = {
        Androjenik_Alopesi: "Androjenik Alopesi",
        Skatrisyel_Alopesi: "Skatrisyel Alopesi",
        Diger: "Diğer",
    }
    const [updatePatient] = useUpdatePatientMutation()
    const [createStockUse] = useCreateStockUseMutation()
    const [updateDoctorNote] = useUpdateDoctorNoteMutation()

    const [ dischardDate, setDischardDate ] = useState("")
    const [stockID, setStockID] = useState("")
    const [stockUnit, setStockUnit] = useState("")
    const [surgeryDate, setSurgeryDate] = useState("")
    const [controlDate1, setControlDate1] = useState("")
    const [controlDate2, setControlDate2] = useState("")

    const { data, error, isLoading } = useGetAllStocksQuery({ page: 1})

    const stocks = data?.results.map(stock => ({
        id: stock.id,
        name: stock.stock_name,
        title: `Stok: ${stock.stock_haved}\nDepo: ${stock.stock_warehouse}\nÜ.T.: ${formatDateToShow(stock.stock_ut)}\nS.K.T.: ${formatDateToShow(stock.stock_skt)}`,
        // image: worker.worker_image
    }))

    const submit = async () => {
        //console.log(JSON.stringify(values, null, 2))   
        
        if(dischardDate) {
            const patientForm = new FormData()
            patientForm.append("discharge_date", dischardDate)            
            await updatePatient({ newPatient: patientForm, patientID: patient.id }).unwrap()
        }
        if(stockID && stockUnit){
            const stockUseForm = new FormData()
            stockUseForm.append("patient_used", patient.id)
            stockUseForm.append("stock_used", stockID)
            stockUseForm.append("number_used", stockUnit)    
            await createStockUse({ newStock: stockUseForm }).unwrap()
        }
        if(surgeryDate || controlDate1 || controlDate2){
            const patientNoteForm = new FormData()
            if(surgeryDate) patientNoteForm.append("surgery_date", surgeryDate)
            if(controlDate1) patientNoteForm.append("control_1_date", controlDate1)
            if(controlDate2) patientNoteForm.append("control_2_date", controlDate2) 
            await updateDoctorNote ({newNote: patientNoteForm, noteID: values.id, patientId: values.patientId}).unwrap()
        }
    } 

    if(isLoading) return <Loading />
    if(error || !data) return <p>Hata Oluştu...</p>
    
    return(
        <form className="bg-lightGray rounded-lg shadow-lg w-[98%] h-[98%] p-8">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-cyan-500">Doktor Notu</h2>
                <div className="flex flex-col justify-center items-center gap-x-4 mr-3">
                    <label className="block text-sm font-medium text-nowrap text-gray-500">Onaylayan Doktor</label>
                    <p className="mt-1">{patient.check_worker || ""}</p>
                </div>
                <div className=" flex items-center justify-between gap-x-5">
                    <div className="flex flex-col items-center">
                        <label className="block text-sm font-medium text-nowrap text-gray-500">İlaç Adı</label>
                        <CustomCombobox
                            value={stockID} 
                            onChange={(id) => setStockID(id) } 
                            customers={stocks} 
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <label className="block text-sm font-medium text-nowrap text-gray-500">Adet</label>
                        <div className="flex items-center">
                            <input 
                                type="number" 
                                onChange={(e)=> setStockUnit(e.target.value)}
                                value={stockUnit}
                                className="max-w-20 mt-1 rounded-md border border-gray-200 bg-white pr-2 pl-3 sm:text-sm py-2 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" 
                            />                            
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center gap-x-4 mr-3">
                    <label className="block text-sm font-medium text-nowrap text-gray-500">Taburcu Tarihi</label>
                    {!patient.discharge_date ? 
                    <input
                        type="datetime-local"
                        name="stock_ut"
                        value={dischardDate}
                        onChange={ e => setDischardDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                    />:
                    <p className="mt-1">{formatISODateUTC(patient.discharge_date)}</p>}
                </div>               
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-6 h-[720px] ">
                <div className="overflow-y-scroll">
                    <div className="ml-3">
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Hasta Adı :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(patient.first_name + " " + patient.last_name)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">TC/Pasaport No :</label>
                            <p className="text-gray-600 ml-2">{patient.national_id}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Ülke :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(patient.country)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Sigorta :</label>
                            <p className="text-gray-600 ml-2">{capitalizeWords(patient.insurance_info)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Yaşı :</label>
                            <p className="text-gray-600 ml-2">{calculateAge(patient.date_of_birth)}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Paylaşım İzni :</label>
                            <p className="text-gray-600 ml-2">{patient.sharing_permission ? "Evet" : "Hayır"}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Sigara :</label>
                            <p className="text-gray-600 ml-2">{patient.smoker ? "Evet" : "Hayır"}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Alerji :</label>
                            <p className="text-gray-600 ml-2">{patient.allergies}</p>
                        </div>
                        <div className="flex items-center">
                            <label className="block font-nunito font-semibold">Kayıt Tarihi :</label>
                            <p className="text-gray-600 ml-2">{formatISODate(patient.created_at)}</p>
                        </div>
                    </div>
                    <div className="mt-7 flex w-full items-center justify-between">
                        <div className="flex flex-col items-center">
                            <label className="block font-medium text-gray-700 border-b w-full text-center border-gray-300 mb-1">Ameliyat Tarihi</label>
                            {!values.surgery_date ? 
                                <input 
                                    className="outline-none border border-gray-300 rounded-lg px-2 py-1 mt-1"
                                    type="date" 
                                    value={surgeryDate}
                                    onChange={(e) => setSurgeryDate(e.target.value)}
                                />:
                                <p className="p-2 text-lg text-gray-700 w-full">
                                    {values.surgery_date}
                                </p>
                            }
                        </div>    
                        <div className="flex flex-col items-center">
                            <label className="block font-medium text-gray-700 border-b w-full text-center border-gray-300 mb-1">Kontrol 1</label>
                            {!values.control_1_date ? 
                                <input 
                                    className="outline-none border border-gray-300 rounded-lg px-2 py-1 mt-1"
                                    type="date" 
                                    value={controlDate1}
                                    onChange={(e) => setControlDate1(e.target.value)}
                                />:
                                <p className="p-2 text-lg text-gray-700 w-full">
                                    {values.control_1_date}
                                </p>
                            }
                        </div>
                        <div className="flex flex-col items-center">
                            <label className="block font-medium text-gray-700 border-b w-full text-center border-gray-300 mb-1">Kontrol 2</label>
                            {!values.control_2_date ? 
                                <input 
                                    className="outline-none border border-gray-300 rounded-lg px-2 py-1 mt-1"
                                    type="date" 
                                    value={controlDate2}
                                    onChange={(e) => setControlDate2(e.target.value)}
                                />:
                                <p className="p-2 text-lg text-gray-700 w-full">
                                    {values.control_2_date}
                                </p>
                            }
                        </div>                      
                    </div> 
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 my-10">   
                        <div className="mt-7">
                            <label className="block font-medium text-sm text-gray-700 w-full text-center">İlk Mürcaat Tarihi</label>
                            <p className="w-full text-center mt-1">{formatDateToShow(values.first_application_date)}</p>
                        </div>                      
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 text-sm w-full text-center">Hastanın Tanısı</label>
                            <p className="w-full text-center mt-1">{options[values.diagnosis] || ""}</p>                            
                        </div>  
                        <div className="mt-7">
                            <label className="block font-medium text-sm text-gray-700 w-full text-center">Daha Önce Saç Ekimi Yapılmış mı?</label>
                            <p className="w-full text-center mt-1">{values.previous_transplant ? "Evet" : "Hayır"}</p> 
                        </div>    
                        <div className="mt-7">
                            <label className="block font-medium text-sm text-gray-700 w-full text-center">Kaçıncı Seans</label>
                            <p className="w-full text-center mt-1">{values.session_number}</p> 
                        </div>    
                        <div className="mt-7">
                            <label className="block font-medium text-sm text-gray-700 w-full text-center">Saç Ekim İşlemi Uygulanacak Tarih</label>
                            <p className="w-full text-center mt-1">{formatDateToShow(values.planned_procedure_date)}</p> 
                        </div>      
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 text-sm w-full text-center">Saç Ekiminde Uygulacak Metod</label>
                            <p className="w-full text-center mt-1">{values.method}</p> 
                        </div> 
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 text-sm w-full text-center">Ekimi Planlanan Kök Sayısı</label>
                            <p className="w-full text-center mt-1">{values.graft_count}</p> 
                        </div>  
                        <div className="mt-7">
                            <label className="block font-medium text-gray-700 text-sm w-full text-center">Saç Ekim Birimi Protokol No</label>
                            <p className="w-full text-center mt-1">{values.protocol_number}</p> 
                        </div>   
                    </div>
                </div>
                <div className="flex flex-col items-end pr-5">
                   
                    <div className="w-auto mt-5 h-[650px] overflow-y-scroll mx-auto flex flex-wrap">
                    {Array.from({ length: 5 }).map((_, index) => (
                            <label
                                key={index}
                                htmlFor={`hair-${index + 1}`}
                                className={`flex flex-col items-center justify-center gap-y-2 
                                    ${index + 1 == 5 ? "w-[calc(43.33%-10px)]" :"w-[calc(33.33%-10px)]"}`}
                            >
                                <img className="w-24" src={`/img/hair/${index + 1}.png`} alt="" />
                                <input
                                    className="appearance-none w-6 h-6 border-2 border-blue-500 rounded-full checked:bg-blue-500 checked:ring-2 checked:ring-blue-300 pointer-events-none"
                                    id={`hair-${index + 1}`}
                                    name="hair"
                                    type="radio"
                                    disabled
                                    checked={values.bold_type === `hair-${index + 1}`}
                                />
                            </label>
                        ))}
                        {Array.from({ length: 3 }).map((_, index) => (
                            <label
                                key={index}
                                htmlFor={`hair-${index + 6}`}
                                className={`flex flex-col items-center justify-center gap-y-2 ${
                                    index + 1 === 8 ? "w-[calc(43.33%-10px)]" : "w-[calc(33.33%-10px)]"}`}
                            >
                                <img className="w-24" src={`/img/hair/${index + 6}.png`} alt="" />
                                <input 
                                    className="appearance-none w-6 h-6 border-2 border-blue-500 rounded-full checked:bg-blue-500 checked:ring-2 checked:ring-blue-300 pointer-events-none"
                                    id={`hair-${index + 6}`}
                                    name="hair"
                                    type="radio"
                                    disabled
                                    checked={values.bold_type === `hair-${index + 6}`}
                                />
                            </label>
                        ))}
                    </div>                  
                </div>
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={() => submit()}
                    className={`ml-auto bg-cyan-500 flex items-center justify-around text-white rounded-md pr-6 pl-5 py-2 shadow-sm hover:bg-cyan-600 focus:outline-none`}
                >
                    <Check className="mr-1" size={20} />
                    {t("save")}
                </button>
            </div>
    </form>
    )  
}