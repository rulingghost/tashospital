
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { TiArrowBack } from "react-icons/ti";
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateWorkerFileMutation, useGetWorkerByIdQuery, useUpdateWorkerMutation } from '../../store/patient2';
import { fetchFileDetails } from '../../components/Utils/fetchFileDetails';
import { FaDownload } from "react-icons/fa6";

const HrSummaryFile = () => {
  const [isGeneralOpen, setIsGeneralOpen] = useState(true);
  const [isPersonalOpen, setIsPersonalOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const toggleGeneral = () => setIsGeneralOpen(!isGeneralOpen);
  const togglePersonal = () => setIsPersonalOpen(!isPersonalOpen);
  const toggleAddress = () => setIsAddressOpen(!isAddressOpen);
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const [isIdentityOpen, setIsIdentityOpen] = useState(false);
  const [isOzluk, setIsOzluk] = useState(false);
  const toggleRecord = () => setIsRecordOpen(!isRecordOpen);
  const toggleIdentity = () => setIsIdentityOpen(!isIdentityOpen);
  const toggleOzuk = () => setIsOzluk(!isOzluk);

  const navigate = useNavigate();
  const { workerID } = useParams()
  
  const [ updateWorker ] = useUpdateWorkerMutation()
  const [ createWorkerFile ] = useCreateWorkerFileMutation()
  const { data, isLoading, error } = useGetWorkerByIdQuery(workerID)
  const [files, setFiles] = useState([])
  const [currentWorkerFiles, setCurrrentWorkerFiles] = useState([])
 
 console.log(data);
  
  const submit = async (values, actions) => {

    const formData = new FormData()
    // formData.append("worker_image", values.worker_image)
    Object.keys(values).forEach((key) => {
        if (key !== "worker_image") { 
          formData.append(key, values[key]);
        }
    });

    await updateWorker({ newWorker: formData, workerID: data.id }).unwrap();
  }
  useEffect(() => {
    if (data) {
      setValues((prevValues) => ({
        ...prevValues,
        ...Object.fromEntries(
          Object.entries(data).map(([key, value]) => [key, value ?? ""])
        ),
      }));
      fetchWorkerFiles(data);
    }
  }, [data]);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prevFiles) => [...prevFiles, file])
    }
  }
  const fileSubmit = async () => {
    if (!files || files.length === 0) {
      console.error("No files to upload");
      return;
    }
  
    const promises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('person', workerID); // person verisini ekle
      formData.append('file', file); // döngüdeki file verisini ekle
  
      try {
        await createWorkerFile(formData); // POST işlemi
        console.log(`File ${file.name} uploaded successfully`);
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
      }
    });
  
    // Tüm dosya yükleme işlemlerinin tamamlanmasını bekle
    await Promise.all(promises);
    console.log("All files have been uploaded");
  }  
  const { values, errors, handleChange, handleSubmit, setFieldValue, setValues } = useFormik({
    initialValues: {
      "worker_image": "",
      "first_name": "",
      "last_name": "",
      "department": "",
      "personnel_type": "",
      "doctor_type": "",
      "unit": "",
      "daily_work": "",
      "specialty_field": "",
      "specialty_date": "",
      "specialty_no": "",
      "diploma_no": "",
      "diploma_date": "",
      "diploma_registry_no": "",
      "duty": "",
      "duty_place": "",
      "supervisor": "",
      "side_branch": "",
      "doctor_facility_code": "",
      "avg_waiting_time": "",
      "evaluation_group": "",
      "info_note": "",
      "is_authorized_to_open": "",
      "is_external_doctor": "",
      "is_intern": "",
      "is_company_employee": "",
      "is_disabled_personnel": "",
      "is_terror_victim": "",
      "is_contract_personnel": "",
      "is_convict_personnel": "",
      "is_spouse_working": "",
      "is_retired": "",
      "is_temporary_personnel": "",
      "is_candidate_officer": "",
      "is_foreign_language_support": "",
      "series_no": "",
      "national_id": "",
      "birth_date": "",
      "birth_place": "",
      "gender": "",
      "marital_status": "",
      "blood_type": "",
      "nationality": "",
      "e_invoice_account": "",
      "signature": "",
      "country": "",
      "city": "",
      "district": "",
      "phone_1": "",
      "phone_2": "",
      "neighborhood": "",
      "address": "",
      "email": "",
      "work_type": "",
      "start_date": "",
      "end_date": "",
      "previous_workplace": "",
      "next_workplace": "",
      "children_count": "",
      "education_level": "",
      "retired_date": "",
      "registry_no": "",
      "retired_registry_no": "",
      "savings_registry_no": "",
      "tax_office": "",
      "tax_no": "",
      "seniority": "",
      "seniority_start_date": "",
      "permanence_date": "",
      "assignment_date": "",
      "foreign_language": "",
      "military_status": "",
      "military_start_date": "",
      "military_end_date": "",
      "deferment_end_date": "",
      "union": "",
      "union_no": "",
      "card_no": "",
      "mother_name": "",
      "father_name": "",
      "birth_city": "",
      "birth_district": "",
      "neighborhood_village": "",
      "volume_no": "",
      "family_order_no": "",
      "order_no": ""
    },
    onSubmit: submit,
  })

  const downloadFile = async (fileUrl, fileName) => {
    try {
      // URL'yi al ve blob'a dönüştür
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      
      // Blob verisini bir URL'ye çevir
      const url = window.URL.createObjectURL(blob);
      
      // Link elementi oluştur
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName; // İndirilecek dosyanın ismi
      document.body.appendChild(a);
      a.click(); // Tıkla, dosya indirilsin
      window.URL.revokeObjectURL(url); // URL'yi temizle
    } catch (error) {
      console.error('Dosya indirilemedi:', error);
    }
  };

  const fetchWorkerFiles = (data) => {
    console.log(data);
    data.worker_files.map( async (workerFile)=>{
        
      const response = await fetchFileDetails(workerFile.file); 
      console.log(response)
      setCurrrentWorkerFiles((prevFiles) => [
        ...prevFiles,
        response   
      ])
    })
  }


  return (
    <div className="p-5 h-full overflow-scroll">
       <div className='w-full h-[100px] py-3 '>          
          <div className='bg-cyan-600 p-3 rounded-2xl flex items-center'>
          <button onClick={()=> navigate("/human-resources/personnel")}  className='border-2 border-white rounded-full' ><TiArrowBack size={35} color='white' /></button>
            <div className='pl-4'>
              <p className='text-white ml-4 text-lg font-semibold'>{(data?.first_name + " " + data?.last_name).toUpperCase()}</p>
              <p className='text-white ml-6 '>{data?.department.toUpperCase()}</p>
            </div>
          </div>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-lightGray rounded-lg shadow-lg  w-full p-8">
        {/* Genel Bilgiler */}
        <div className="mb-4 border border-gray-200 drop-shadow-md rounded-2xl">
            <button 
            type='button'
            className={`w-full text-left bg-white text-gray-500 font-bold rounded-2xl focus:outline-none 
                ${isGeneralOpen ? 'border-b-0 rounded-b-none' : 'bg-gray-100 text-black'}`}
            onClick={toggleGeneral}
            >
            <p
                className={`bg-white inline-block p-4 text-gray-500 rounded-2xl
                    ${isGeneralOpen ? '!bg-cyan-600 text-white rounded-tl-2xl border-b-0 rounded-b-none' : 'text-gray-500'}`}
            >Genel Bilgiler</p>
            </button>
            {isGeneralOpen && (
            <div className="p-4 w-full bg-white rounded-b-2xl flex gap-x-5">

                <div className='bg-white h-full w-2/5'>
                    <div className='flex gap-x-7 border items-center border-neutral-200 p-5 rounded-2xl drop-shadow-sm'>
                        <div className="block border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm p-1">
                          <div className="relative bg-gray-100 border border-gray-200 rounded-md overflow-hidden">
                            {values.worker_image && (
                              <label htmlFor="worker_image_id w-full h-full">
                                <img                                
                                  src={
                                    values.worker_image instanceof File
                                      ? URL.createObjectURL(values.worker_image) 
                                      : values.worker_image
                                  }
                                  alt="Preview"
                                  className="object-cover max-h-[240px]"
                              />
                              </label>
                            )}
                          </div>
                          <input
                            type="file"
                            name="worker_image"
                            id='worker_image_id'
                            accept="image/*"
                            onChange={(event) => {
                              const file = event.currentTarget.files[0];                      
                              setFieldValue("worker_image", file);
                            }}
                            className="hidden"
                          />
                        </div>
                        <div className='flex flex-col gap-y-3'>
                            <div className=' flex flex-col gap-y-1'>
                                <input value={values.first_name} onChange={handleChange} name='first_name' type="text" placeholder='Adı...' className='text-xl px-1 py-1 font-semibold border-b gorder-gray-400 outline-none' />                       
                                <input value={values.last_name} onChange={handleChange} name='last_name' type="text" className='outline-none p-1 border-b gorder-gray-400' placeholder='Soyadı...' />
                                <input value={values.department} onChange={handleChange} name='department' type="text" className='outline-none p-1 border-b gorder-gray-400 ' placeholder='Bölümü...' />
                            </div>
                            <div className='flex flex-col'>
                                <input value={values.personnel_type} onChange={handleChange} name='personnel_type' type="text" className='outline-none p-1 border-b gorder-gray-400' placeholder='Personel Tipi...' />
                                <input value={values.doctor_type} onChange={handleChange} name='doctor_type' type="text" className='outline-none p-1 border-b gorder-gray-400' placeholder='Doktor Tipi...' />
                                <input value={values.unit} onChange={handleChange} name='unit' type="text" className='outline-none p-1 border-b gorder-gray-400' placeholder='Ünite...' />                                
                            </div>
                        </div>
                    </div>
                    <textarea
                        onChange={handleChange}
                        value={values.info_note}
                        className='mt-4 bg-slate-100 p-3 rounded-2xl drop-shadow-md w-full h-[150px] outline-none' 
                        placeholder='Bilgi Notu' 
                        name="info_note" id="">
                    </textarea>
                </div>
                <div className='bg-white h-full w-3/5 p-4'>
                    <div className="grid grid-cols-3 gap-4">
                        <div className='entryarea'>                            
                            <input 
                                name='specialty_field'
                                id='specialty_field_id'
                                value={values.specialty_field}
                                onChange={handleChange}
                                type="text" 
                                placeholder="" 
                            />
                            <label htmlFor='specialty_field_id' className='labelline tracking-wide'>Uzmanlık Dalı</label>
                        </div>
                        <div className='entryarea'>
                            <input 
                                name='specialty_date'
                                id='specialty_date_id'
                                value={values.specialty_date}
                                onChange={handleChange}
                                type="date" 
                                placeholder="" 
                            />
                            <label htmlFor='specialty_date_id' className='labelline'>Uzmanlık Tarihi</label>
                        </div>
                        <div className='entryarea'>
                            <input 
                                name='specialty_no'
                                id='specialty_no_id'
                                value={values.specialty_no}
                                onChange={handleChange}
                                type="text" 
                                placeholder="" 
                            />
                            <label htmlFor='specialty_no_id' className='labelline'>Uzmanlık No</label>
                        </div>
                        <div className='entryarea'>
                            <input 
                                name='diploma_no'
                                id='diploma_no_id'
                                value={values.diploma_no}
                                onChange={handleChange}
                                type="text" 
                                placeholder="" 
                            />
                            <label htmlFor='diploma_no_id' className='labelline'>Diploma No</label>
                        </div>
                        <div className='entryarea'>
                            <input 
                                name='diploma_date'
                                id='diploma_date'
                                value={values.diploma_date}
                                onChange={handleChange}
                                type="date" 
                                placeholder=""  
                            />
                            <label htmlFor='diploma_date' className='labelline'>Diploma Tarihi</label>
                        </div>
                        <div className='entryarea'>
                            <input 
                                name='diploma_registry_no'
                                id='diploma_registry_no_id'
                                value={values.diploma_registry_no}
                                onChange={handleChange}
                                type="text" 
                                placeholder="" 
                            />
                            <label htmlFor='diploma_registry_no_id' className='labelline'>Diploma Tescil No</label>
                        </div>
                        <div className='entryarea'>
                            <input 
                                name='duty'
                                id='duty_id'
                                value={values.duty}
                                onChange={handleChange}
                                type="text" 
                                placeholder="" 
                            />
                            <label htmlFor='duty_id' className='labelline'>Görevi</label>
                        </div>
                        <div className='entryarea'>
                            <input 
                                name='duty_place'
                                id='duty_place_id'
                                value={values.duty_place}
                                onChange={handleChange}
                                type="text" 
                                placeholder=""                                 
                            />
                            <label htmlFor='duty_place_id' className='labelline'>Görev Yeri</label>
                        </div>
                        <div className='entryarea'>
                            <input 
                                name='supervisor'
                                id='supervisor_id'
                                value={values.supervisor}
                                onChange={handleChange}
                                type="text" 
                                placeholder="" 
                            />
                            <label htmlFor='supervisor_id' className='labelline'>Sorumlu Kişi</label>
                        </div>
                        <div className='entryarea'>
                            <input 
                                name='side_branch'
                                id='side_branch_id'
                                value={values.side_branch}
                                onChange={handleChange}
                                type="text" 
                                placeholder="" 
                            />
                            <label htmlFor='side_branch_id' className='labelline'>Yan Dal</label>
                        </div>
                        <div className='entryarea'>
                            <input 
                                name='doctor_facility_code'
                                id='doctor_facility_code_id'
                                value={values.doctor_facility_code}
                                onChange={handleChange}
                                type="text" 
                                placeholder="" 
                            />
                            <label htmlFor='doctor_facility_code_id' className='labelline'>Doktor Tesis Kodu</label>
                        </div>
                        <div className='entryarea'>
                            <input 
                                name='avg_waiting_time'
                                id='avg_waiting_time_id'
                                value={values.avg_waiting_time}
                                onChange={handleChange}
                                type="text" 
                                placeholder="" 
                            />
                            <label htmlFor='avg_waiting_time_id' title='Ort. Hasta Bekletme Süresi (dk.)' className='labelline text-nowrap'>Ort. Hasta Bek..(dk)</label>
                        </div>
                        <div className='col-span-3 entryarea'>
                            <input 
                                name='evaluation_group'
                                id='evaluation_group_id'
                                value={values.evaluation_group}
                                onChange={handleChange}
                                type="text" 
                                placeholder="" 
                            />
                            <label htmlFor='evaluation_group_id' className='labelline'>Değerlendirme Grubu</label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <input      
                            name='is_authorized_to_open' 
                            checked={values.is_authorized_to_open}
                            onChange={handleChange}                     
                            type="checkbox" 
                            className="h-8 w-8 text-indigo-600 border border-gray-400 rounded-xl" 
                        />
                        <span className="text-sm text-gray-700">Döf Açılabilir</span>
                        </div>

                        <div className="flex items-center space-x-2">
                        <input 
                            name='is_external_doctor'
                            checked={values.is_external_doctor}
                            onChange={handleChange}
                            type="checkbox" 
                            className="h-8 w-8 text-indigo-600 border border-gray-400 rounded-xl" 
                        />
                        <span className="text-sm text-gray-700">Dış Doktor</span>
                        </div>

                        <div className='entryarea'>
                            <input 
                                name='series_no'
                                id='series_no_id'
                                value={values.series_no}
                                onChange={handleChange}
                                type="text" 
                                placeholder="" 
                            />
                            <label htmlFor='series_no_id' className='labelline'>Seri Numarası</label>
                        </div>
                    </div>
                </div>



            
            </div>
            )}
        </div>

        {/* Kişisel Bilgiler */}
        <div className="mb-4 border border-gray-200 drop-shadow-md rounded-2xl">
        <button 
            type='button'
            className={`w-full text-left bg-white text-gray-500 font-bold rounded-2xl focus:outline-none 
                ${isGeneralOpen ? 'border-b-0 rounded-b-none' : 'bg-gray-100 text-black'}`}
            onClick={togglePersonal}
            >
            <span
                className={`bg-white inline-block p-4 text-gray-500 rounded-2xl
                    ${isPersonalOpen ? '!bg-cyan-600 text-white rounded-tl-2xl border-b-0 rounded-b-none' : 'text-gray-500'}`}
            >Kişisel Bilgiler</span>
            </button>
            {isPersonalOpen && (
            <div className="p-4 bg-white border-t border-gray-300">
            <div className="grid grid-cols-5 gap-4">

                <div className='entryarea'>
                    <input 
                        name='national_id'
                        id='national_id_id'
                        value={values.national_id}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='national_id_id' className='labelline'>TC/PASSPORT</label>
                    {/* <span className="absolute inset-y-0 right-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </span> */}
                </div>            
                <div className='entryarea'>
                    <input 
                        name='birth_date'
                        id='birth_date_id'
                        value={values.birth_date}
                        onChange={handleChange}
                        type="date" 
                        placeholder="" 
                    />
                    <label htmlFor='birth_date_id' className='labelline'>Doğum Tarihi</label>
                </div>            
                <div className='entryarea'>
                    <input 
                        name='birth_place'
                        id='birth_place_id'
                        value={values.birth_place}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='birth_place_id' className='labelline'>Doğum Yeri</label>
                </div>            
                <div className='entryarea'>
                    <input 
                        name='gender'
                        id='gender_id'
                        value={values.gender}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='gender_id' className='labelline'>Cinsiyeti</label>
                </div>
                <div className="row-span-2 entryarea">
                    <textarea
                        value={values.signature}
                        onChange={handleChange}
                        placeholder=''
                        className='mt-1 block w-full h-full rounded-xl bg-slate-100 border-none outline-none p-3'
                        name="signature" id="signature_id" 
                    />
                    <label htmlFor='signature_id' className='labelline'>İmza</label>
                </div>
            
                <div className='entryarea'>
                    <select 
                        name='marital_status'
                        value={values.marital_status}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-xl bg-slate-100 border-none outline-none p-3 text-gray-500 "
                    >
                        <option value="">Seçiniz</option>
                        <option value="evli">Evli</option>
                        <option value="bekar">Bekar</option>
                        <option value="dul">Dul</option>
                    </select>
                    <label htmlFor='' className='labelline'>Medeni Hali</label>
                </div>            
                <div className='entryarea'>
                    <select 
                        name='blood_type'
                        value={values.blood_type}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-xl bg-slate-100 border-none outline-none p-3 text-gray-500"
                    >
                        <option value="">Seçiniz</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                    <label htmlFor='' className='labelline'>Kan Grubu</label>
                </div>            
                <div className='entryarea'>
                    <select 
                        name='nationality'
                        value={values.nationality}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-xl bg-slate-100 border-none outline-none p-3 text-gray-500"
                    >
                        <option value="">Seçiniz</option>
                        <option value="turkish">Türk</option>
                        <option value="american">Amerikan</option>
                        <option value="german">Alman</option>
                        <option value="french">Fransız</option>
                        <option value="british">İngiliz</option>
                        <option value="italian">İtalyan</option>
                        <option value="spanish">İspanyol</option>
                        <option value="japanese">Japon</option>
                        <option value="chinese">Çinli</option>
                        <option value="indian">Hint</option>
                    </select>
                    <label htmlFor='' className='labelline'>Uyruğu</label>
                </div>            
                <div className='entryarea'>
                    <select 
                        name='e_invoice_account'
                        value={values.e_invoice_account}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-xl bg-slate-100 border-none outline-none p-3 text-gray-500"
                    >
                        <option value="e-fatura">E-Fatura Hesabı</option>
                    </select>
                    <label htmlFor='' className='labelline'>E-Fatura Hesabı</label>
                </div>
            </div>
            </div>
            
            )}
        </div>

        {/* Adres ve İletişim */}
        <div className="mb-4 border border-gray-200 drop-shadow-md rounded-2xl">
            <button 
                type='button'
            className={`w-full text-left bg-white text-gray-500 font-bold rounded-2xl focus:outline-none 
                ${isAddressOpen ? 'border-b-0 rounded-b-none' : 'bg-gray-100 text-black'}`}
            onClick={toggleAddress}
            >
            <p
                className={`bg-white inline-block p-4 text-gray-500 rounded-2xl
                    ${isAddressOpen ? '!bg-cyan-600 text-white rounded-tl-2xl border-b-0 rounded-b-none' : 'text-gray-500'}`}
            >Adres ve İletişim</p>
            </button>
            {isAddressOpen && (
            <div className="p-4 bg-white border-t border-gray-300">
                <div className="grid grid-cols-4 gap-4">
                <div className='entryarea'>
                    <input 
                        name='country'
                        id='country_id'
                        value={values.country}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='country_id' className='labelline'>Ülke</label>
                </div>                
                <div className='entryarea'>
                    <input 
                        name='city'
                        id='city_id'
                        value={values.city}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='city_id' className='labelline'>Şehir</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='district'
                        id='district_id'
                        value={values.district}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='district_id' className='labelline'>İlçe</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='phone_1'
                        id='phone_1_id'
                        value={values.phone_1}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='phone_1_id' className='labelline'>Cep Telefonu-1</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='neighborhood'
                        id='neighborhood_id'
                        value={values.neighborhood}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='neighborhood_id' className='labelline'>Sempt</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='address'
                        id='address_id'
                        value={values.address}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='address_id' className='labelline'>Adres</label>
                </div>                
                <div className='entryarea'>
                    <input 
                        name='email'
                        id='email_id'
                        value={values.email}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='email_id' className='labelline'>E-Mail</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='phone_2'
                        id='phone_2_id'
                        value={values.phone_2}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='phone_2_id' className='labelline'>Cep Telefonu-2</label>
                </div>
                
                {/* Diğer alanlar */}
                </div>
            </div>
            )}
        </div>

        {/* Özlük Bilgileri */}
        <div className="mb-4 border border-gray-200 drop-shadow-md rounded-2xl">
            <button 
            type='button'
            className={`w-full text-left bg-white text-gray-500 font-bold rounded-2xl focus:outline-none 
                ${isRecordOpen ? 'border-b-0 rounded-b-none' : 'bg-gray-100 text-black'}`}
            onClick={toggleRecord}
            >
            <p
                className={`bg-white inline-block p-4 text-gray-500 rounded-2xl
                    ${isRecordOpen ? '!bg-cyan-600 text-white rounded-tl-2xl border-b-0 rounded-b-none' : 'text-gray-500'}`}
            >Özlük Bilgileri</p>
            </button>
            {isRecordOpen && (
            <div className="p-4 bg-white border-t border-gray-300">
                <div className="grid grid-cols-4 gap-4">

                <div className='entryarea'>
                    <input 
                        name='work_type'
                        id='work_type_id'
                        value={values.work_type}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='work_type_id' className='labelline'>Çalışma Tipi</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='start_date'
                        id='start_date_id'
                        value={values.start_date}
                        onChange={handleChange}
                        type="date" 
                        placeholder="" 
                    />
                    <label htmlFor='start_date_id' className='labelline'>İşe Başlangıç Tarihi</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='end_date'
                        id='end_date_id'
                        value={values.end_date}
                        onChange={handleChange}
                        type="date" 
                        placeholder="" 
                    />
                    <label htmlFor='end_date_id' className='labelline'>İşten Ayrılma Tarihi</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='previous_workplace'
                        id='previous_workplace_id'
                        value={values.previous_workplace}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='previous_workplace_id' className='labelline'>Geldiği Yer</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='next_workplace'
                        id='next_workplace_id'
                        value={values.next_workplace}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='next_workplace_id' className='labelline'>Gittiği Yer</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='children_count'
                        id='children_count_id'
                        value={values.children_count}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='children_count_id' className='labelline'>Çocuk Sayısı</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='education_level'
                        id='education_level_id'
                        value={values.education_level}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='education_level_id' className='labelline'>Eğitim Seviyesi</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='registry_no'
                        id='registry_no_id'
                        value={values.registry_no}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='registry_no_id' className='labelline'>Sicil No</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='retired_registry_no'
                        id='retired_registry_no_id'
                        value={values.retired_registry_no}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='retired_registry_no_id' className='labelline'>Emekli Sicil No</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='savings_registry_no'
                        id='savings_registry_no_id'
                        value={values.savings_registry_no}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='savings_registry_no_id' className='labelline'>Tasarruf Sicil No</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='tax_office'
                        id='tax_office_id'
                        value={values.tax_office}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='tax_office_id' className='labelline'>Vergi Dairesi</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='tax_no'
                        id='tax_no_id'
                        value={values.tax_no}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='tax_no_id' className='labelline'>Vergi No</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='seniority'
                        id='seniority_id'
                        value={values.seniority}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='seniority_id' className='labelline'>Kıdem</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='seniority_start_date'
                        id='seniority_start_date_id'
                        value={values.seniority_start_date}
                        onChange={handleChange}
                        type="date" 
                        placeholder=""  
                    />
                    <label htmlFor='seniority_start_date_id' className='labelline'>Kıdem Başlangıç Tarihi</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='permanence_date'
                        id='permanence_date_id'
                        value={values.permanence_date}
                        onChange={handleChange}
                        type="date" 
                        placeholder="" 
                        className="mt-1 block w-full rounded-xl bg-slate-100 border-none outline-none p-3" 
                    />
                    <label htmlFor='permanence_date_id' className='labelline'>Asalet Tarihi</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='assignment_date'
                        value={values.assignment_date}
                        onChange={handleChange}
                        type="date" 
                        placeholder="" 
                    />
                    <label htmlFor='' className='labelline'>Atama Tarihi</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='foreign_language'
                        id='foreign_language_id'
                        value={values.foreign_language}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='foreign_language_id' className='labelline'>Yabancı Dil</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input 
                        name='is_foreign_language_support'
                        checked={values.is_foreign_language_support}
                        onChange={handleChange}
                        type="checkbox" 
                        className="h-8 w-8 text-indigo-600 border border-gray-400 rounded-xl" 
                    />
                    <span className="text-sm text-gray-700">Yabancı Dil Yardımı</span>
                </div>
                <div className='entryarea'>
                    <input 
                        name='military_status'
                        id='military_status_id'
                        value={values.military_status}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='military_status_id' className='labelline'>Askerlik Durumu</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='military_start_date'
                        value={values.military_start_date}
                        onChange={handleChange}
                        type="date" 
                        placeholder="" 
                    />
                    <label htmlFor='' className='labelline'>Askerlik Başlangıç Tarihi</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='military_end_date'
                        value={values.military_end_date}
                        onChange={handleChange}
                        type="date" 
                        placeholder="" 
                    />
                    <label htmlFor='' className='labelline'>Askerlik Bitiş Tarihi</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='deferment_end_date'
                        value={values.deferment_end_date}
                        onChange={handleChange}
                        type="date" 
                        placeholder="" 
                    />
                    <label htmlFor='' className='labelline'>Tecil Bitiş Tarihi</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='union'
                        id='union_id'
                        value={values.union}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='union_id' className='labelline'>Sendika</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='union_no'
                        id='union_no_id'
                        value={values.union_no}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='union_no_id' className='labelline'>Sendika No</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input 
                        name='is_intern'
                        checked={values.is_intern}
                        onChange={handleChange}
                        type="checkbox" 
                        className="h-8 w-8 text-indigo-600 border border-gray-400 rounded-xl" 
                    />
                    <span className="text-sm text-gray-700">Stajyer</span>
                </div>
                <div className="flex items-center space-x-2">
                    <input 
                        name='is_terror_victim'
                        checked={values.is_terror_victim}
                        onChange={handleChange}
                        type="checkbox" 
                        className="h-8 w-8 text-indigo-600 border border-gray-400 rounded-xl" 
                    />
                    <span className="text-sm text-gray-700">Terör Mağduru</span>
                </div>
                <div className="flex items-center space-x-2">
                    <input 
                        name='is_convict_personnel'
                        checked={values.is_convict_personnel}
                        onChange={handleChange}
                        type="checkbox" 
                        className="h-8 w-8 text-indigo-600 border border-gray-400 rounded-xl" 
                    />
                    <span className="text-sm text-gray-700">Hükümlü Personel</span>
                </div>
                <div className="flex items-center space-x-2">
                    <input 
                        name='is_temporary_personnel'
                        checked={values.is_temporary_personnel}
                        onChange={handleChange}
                        type="checkbox" 
                        className="h-8 w-8 text-indigo-600 border border-gray-400 rounded-xl" 
                    />
                    <span className="text-sm text-gray-700">Geçici Personel</span>
                </div>
                <div className="flex items-center space-x-2">
                    <input 
                        name='is_company_employee'
                        checked={values.is_company_employee}
                        onChange={handleChange}
                        type="checkbox" 
                        className="h-8 w-8 text-indigo-600 border border-gray-400 rounded-xl" 
                    />
                    <span className="text-sm text-gray-700">Firma Elemanı</span>
                </div>
                <div className="flex items-center space-x-2">
                    <input 
                        name='is_contract_personnel'
                        checked={values.is_contract_personnel}
                        onVolumeChange={handleChange}
                        type="checkbox" 
                        className="h-8 w-8 text-indigo-600 border border-gray-400 rounded-xl" 
                    />
                    <span className="text-sm text-gray-700">Sözleşmeli Personel</span>
                </div>
                <div className="flex items-center space-x-2">
                    <input 
                        name='is_spouse_working'
                        checked={values.is_spouse_working}
                        onChange={handleChange}
                        type="checkbox" 
                        className="h-8 w-8 text-indigo-600 border border-gray-400 rounded-xl" 
                    />
                    <span className="text-sm text-gray-700">Eşi Çalışıyor</span>
                </div>
                <div className="flex items-center space-x-2">
                    <input 
                        name='is_candidate_officer'
                        checked={values.is_candidate_officer}
                        onChange={handleChange}
                        type="checkbox" 
                        className="h-8 w-8 text-indigo-600 border border-gray-400 rounded-xl" 
                    />
                    <span className="text-sm text-gray-700">Aday Memur</span>
                </div>
                <div className="flex items-center space-x-2">
                    <input 
                        name='is_disabled_personnel'
                        checked={values.is_disabled_personnel}
                        onChange={handleChange}
                        type="checkbox" 
                        className="h-8 w-8 text-indigo-600 border border-gray-400 rounded-xl" 
                    />
                    <span className="text-sm text-gray-700">Özürlü Personel</span>
                </div>
                <div className='entryarea'>
                    <input 
                        name='disability_rate'
                        value={values.disability_rate}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                        className="mt-1 block w-full rounded-xl bg-slate-100 border-none outline-none p-3" 
                    />
                    <label htmlFor='' className='labelline'>Engellilik Oranı</label>
                </div>
                <div className="flex items-center space-x-2">
                    <input 
                        name='is_retired'
                        checked={values.is_retired}
                        onChange={handleChange}
                        type="checkbox" 
                        className="h-8 w-8 text-indigo-600 border border-gray-400 rounded-xl" 
                    />
                    <span className="text-sm text-gray-700">Emekli</span>
                </div>
                <div className='entryarea'>
                    <input 
                        name='retired_date'
                        value={values.retired_date}
                        onChange={handleChange}
                        type="date" 
                        placeholder="" 
                    />
                    <label htmlFor='' className='labelline'>Emeklilik Tarihi</label>
                </div>
                {/* Diğer alanlar */}
                </div>
            </div>
            )}
        </div>

        {/* Nüfus Bilgileri */}
        <div className="mb-4 border border-gray-200 drop-shadow-md rounded-2xl">
            <button 
            type='button'
            className={`w-full text-left bg-white text-gray-500 font-bold rounded-2xl focus:outline-none 
                ${isIdentityOpen ? 'border-b-0 rounded-b-none' : 'bg-gray-100 text-black'}`}
            onClick={toggleIdentity}
            >
            <p
                className={`bg-white inline-block p-4 text-gray-500 rounded-2xl
                    ${isIdentityOpen ? '!bg-cyan-600 text-white rounded-tl-2xl border-b-0 rounded-b-none' : 'text-gray-500'}`}
            >Nüfus Bilgileri</p>
            </button>
            {isIdentityOpen && (
            <div className="p-4 bg-white border-t border-gray-300">
                <div className="grid grid-cols-3 gap-4">

                <div className='entryarea'>
                    <input 
                        name='card_no'
                        id='card_no_id'
                        value={values.card_no}
                        onChange={handleChange}
                        type="text" 
                        placeholder=""  
                    />
                    <label htmlFor='card_no_id' className='labelline'>Cüzdan No</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='mother_name'
                        id='mother_name_id'
                        value={values.mother_name}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='mother_name_id' className='labelline'>Ana Adı</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='father_name'
                        id='father_name_id'
                        value={values.father_name}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='father_name_id' className='labelline'>Baba Adı</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='birth_city'
                        id='birth_city_id'
                        value={values.birth_city}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='birth_city_id' className='labelline'>Şehir</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='birth_district'
                        id='birth_district_id'  
                        value={values.birth_district}
                        onChange={handleChange}       
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='birth_district_id' className='labelline'>İlçe</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='neighborhood_village'
                        id='neighborhood_village_id'
                        value={values.neighborhood_village}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='neighborhood_village_id' className='labelline'>Mahalle/Köy</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='volume_no'
                        id='volume_no_id'
                        value={values.volume_no}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='volume_no_id' className='labelline'>Cilt No</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='family_order_no'
                        id='family_order_no_id'
                        value={values.family_order_no}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='family_order_no_id' className='labelline'>Aile Sıra No</label>
                </div>
                <div className='entryarea'>
                    <input 
                        name='order_no'
                        id='order_no_id'
                        value={values.order_no}
                        onChange={handleChange}
                        type="text" 
                        placeholder="" 
                    />
                    <label htmlFor='order_no_id' className='labelline'>Sıra No</label>
                </div>
                </div>
            </div>
            )}
        </div>

            {/* Ozluk Dosyaları */}
        <div className="mb-4 border border-gray-200 drop-shadow-md rounded-2xl">
            <button 
            type='button'
            className={`w-full text-left bg-white text-gray-500 font-bold rounded-2xl focus:outline-none 
                ${isOzluk ? 'border-b-0 rounded-b-none' : 'bg-gray-100 text-black'}`}
            onClick={toggleOzuk}
            >
            <p
                className={`bg-white inline-block p-4 text-gray-500 rounded-2xl
                    ${isOzluk ? '!bg-cyan-600 text-white rounded-tl-2xl border-b-0 rounded-b-none' : 'text-gray-500'}`}
            >Özlük Dosyaları</p>
            </button>
            {isOzluk && (
            <div className="p-4 bg-white border-t border-gray-300">
                <div className="">
                    <div className='flex justify-end w-full'>
                        <label htmlFor='file-input' className='text-white text-lg font-semibold bg-sky-600 hover:bg-sky-500 py-3 px-5 rounded-xl'>
                           <input
                                id="file-input"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            Dosya Ekle
                        </label>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-5">
                    
                        {currentWorkerFiles.map((file, index) => (
                            <div key={index} className="border w-full rounded-lg p-4 flex items-center space-x-4 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                            <div className='overflow-hidden pr-1'>
                                <p title={file.fileName} className="text-gray-700 font-semibold truncate">
                                    {file.fileName}
                                </p>
                                <p className="text-sm text-gray-500">{file.size}</p>
                            </div>
                            <button
                                className='bg-cyan-600 p-2 rounded-lg !ml-auto'
                                type='button'
                                onClick={() => downloadFile(file.url, file.fileName)}>
                                <FaDownload color='#fff' size={25} />
                            </button>
                            </div>
                        ))}                       
                        {files.map((file, index) => (
                            <div key={index} className="border rounded-lg p-4 flex items-center space-x-4 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                            <div>
                                <p className="text-gray-700 font-semibold">
                                    {file.name}
                                </p>
                                <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                            </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-end w-full mt-4'>
                        <button
                            className='text-white text-lg font-semibold bg-sky-600 hover:bg-sky-500 py-3 px-5 rounded-xl !ml-auto'
                                type='button'
                                onClick={fileSubmit}
                        >
                            kaydet
                        </button>
                    </div>
                </div>
            </div>
            )}
        </div>
        <div className='w-full pt-2  flex items-center justify-center'>
            <button type='submit' className='w-full py-3 bg-cyan-600 text-white rounded-lg'>KAYDET</button>
        </div>
        
      </form>
    </div>
  );
};

export default HrSummaryFile;
