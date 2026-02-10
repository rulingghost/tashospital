import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { createModal, destroyModal } from "../Utils/Modal";
import { useFormik } from 'formik';
import { useCreatePatientMutation, useGetPatientsQuery, useUpdatePatientMutation } from "../../store/patient2";
import fetchImageAsFile from "../Utils/fetchImageAsFile.js"
import { patientFormSchemas } from "../../schemas/patientFormSchemas.jsx";
import { IoMdResize } from "react-icons/io";
import { Bounce, ToastContainer, toast } from 'react-toastify';

import { t } from "i18next";

const PatientAddModal = ({ data: selectedPatient, isEdit, patientID }) => {

  const { t } = useTranslation()
  const [createPatient, { isLoading, isError, error}] = useCreatePatientMutation()
  const [updatePatient, {}] = useUpdatePatientMutation()
  
  const nextStep = async () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)
  const [step, setStep] = useState(1)
  const [isCitizen, setIsCitizen] = useState(true);
  const [openModal, setOpenModal] = useState(false) 


  const handleCheckboxChange = () => {
    setIsCitizen(!isCitizen)
    setFieldValue("national_id", "")
    setFieldValue("flight_date", "")
    setFieldValue("stayed_hotel", "")
    setFieldValue("tour_operator", "")
    if(isCitizen){
      setOpenModal(true)     
    }
  }

  const toggleDaySelection = (day) => {
    setValues((prevValues) => {
      const newDays = prevValues.seans_days.includes(day)
        ? prevValues.seans_days.filter((selectedDay) => selectedDay !== day)
        : [...prevValues.seans_days, day];
      return { ...prevValues, seans_days: newDays };
    });
  }

  const submit = async (values, actions) => {        
    try {
      
      console.log("Form verileri gönderiliyor:", JSON.stringify(values, null, 2))
      const formData = new FormData()
      
      
      if(selectedPatient.patient_image === values.patient_image){
        fetchImageAsFile(selectedPatient.patient_image).then(file => {
          if (file) {
            formData.append("patient_image", file)            
          }
        })             
      }else{
        formData.append("patient_image", values.patient_image)
      }
      
      Object.keys(values).forEach((key) => {
        if (key !== "patient_image") { 
          formData.append(key, values[key]);
        }
      });
      if(isEdit){  
        await updatePatient({ newPatient: formData, patientID }).unwrap()
      }else{
        await createPatient({newPatient: formData}).unwrap()
      }    
      actions.resetForm()
      destroyModal()

    } catch (error) {
      console.error('Form gönderilirken hata oluştu:', error)
    }
  }

  const {values, errors, handleChange, handleSubmit, setFieldValue, handleBlur, setValues, touched, validateForm} = useFormik({
    initialValues: {
      patient_number: "",
      national_id: "",
      first_name: "",
      last_name: "",
      patient_image: "",
      place_of_birth: "",
      date_of_birth: "",
      gender: "",
      nationality: "",
      mother_name: "",
      father_name: "",
      patient_type: "",
      insurance_info: "",
      instagram_username: "",
      mobile_phone1: "",
      mobile_phone2: "",
      email: "",
      country: "",
      city: "",
      address: "",
      seans_number: "",
      device_name: "",
      seans_days: "",
      education_status: "",
      occupation: "",
      current_employer: "",
      marital_status: "",
      children_count: "",
      referee: "",
      institution_type: "",
      applied_department: "",
      applied_operation: "",
      complaints: "",
      medications: "",
      existing_conditions: "",
      smoker: false,
      past_surgeries: "",
      allergies: "",
      post_surgery_address: "",
      patient_part: "",
      relevant_worker: "",
      start_worker: "",
      sharing_permission: false,
      flight_date: "",
      stayed_hotel: "",
      tour_operator: "",
      session_time: "",
      session_date: ""
    }, 
    // validationSchema: patientFormSchemas,
    validateOnMount:false, 
    validateOnBlur:true,
    validateOnChange:true, 
    onSubmit: submit,
  })
  useEffect(() => {
    if (selectedPatient) {    
      setValues({
        patient_number: selectedPatient.patient_number || "",
        national_id: selectedPatient.national_id || "",
        first_name: selectedPatient.first_name || "",
        last_name: selectedPatient.last_name || "",
        patient_image: selectedPatient.patient_image || null,
        place_of_birth: selectedPatient.place_of_birth || "",
        date_of_birth: selectedPatient.date_of_birth || "",
        gender: selectedPatient.gender || "",
        nationality: selectedPatient.nationality || "",
        mother_name: selectedPatient.mother_name || "",
        father_name: selectedPatient.father_name || "",
        patient_type: selectedPatient.patient_type || "",
        insurance_info: selectedPatient.insurance_info || "",
        instagram_username: selectedPatient.instagram_username || "",
        mobile_phone1: selectedPatient.mobile_phone1 || "",
        mobile_phone2: selectedPatient.mobile_phone2 || "",
        email: selectedPatient.email || "",
        country: selectedPatient.country || "",
        city: selectedPatient.city || "",
        address: selectedPatient.address || "",
        seans_number: selectedPatient.seans_number || "",
        device_name: selectedPatient.device_name || "",
        seans_days: selectedPatient.seans_days || "",
        education_status: selectedPatient.education_status || "",
        occupation: selectedPatient.occupation || "",
        current_employer: selectedPatient.current_employer || "",
        marital_status: selectedPatient.marital_status || "",
        children_count: selectedPatient.children_count || "",
        referee: selectedPatient.referee || "",
        institution_type: selectedPatient.institution_type || "",
        applied_department: selectedPatient.applied_department || "",
        applied_operation: selectedPatient.applied_operation || "",
        complaints: selectedPatient.complaints || "",
        medications: selectedPatient.medications || "",
        existing_conditions: selectedPatient.existing_conditions || "",
        smoker: selectedPatient.smoker ?? false,
        past_surgeries: selectedPatient.past_surgeries || "",
        allergies: selectedPatient.allergies || "",
        post_surgery_address: selectedPatient.post_surgery_address || "",
        patient_part: selectedPatient.patient_part || "",
        relevant_worker: selectedPatient.relevant_worker || "",
        start_worker: selectedPatient.start_worker || "",
        sharing_permission: selectedPatient.sharing_permission || false,
        flight_date: selectedPatient.flight_date || "",
        stayed_hotel: selectedPatient.stayed_hotel || "",
        tour_operator: selectedPatient.tour_operator || "",
        session_time: selectedPatient.session_time || "",
        session_date: selectedPatient.session_date || ""
      });
    } else {
      setValues({
        patient_number: "",
        national_id: "",
        first_name: "",
        last_name: "",
        patient_image: null,
        place_of_birth: "",
        date_of_birth: "",
        gender: "",
        nationality: "",
        mother_name: "",
        father_name: "",
        patient_type: "",
        insurance_info: "",
        instagram_username: "",
        mobile_phone1: "",
        mobile_phone2: "",
        email: "",
        country: "",
        city: "",
        address: "",
        seans_number: "",
        device_name: "",
        seans_days: "",
        education_status: "",
        occupation: "",
        current_employer: "",
        marital_status: "",
        children_count: "",
        referee: "",
        institution_type: "",
        applied_department: "",
        applied_operation: "",
        complaints: "",
        medications: "",
        existing_conditions: "",
        smoker: false,
        past_surgeries: "",
        allergies: "",
        post_surgery_address: "",
        patient_part: "",
        relevant_worker: "",
        start_worker: "",
        sharing_permission: false,
        flight_date: "",
        stayed_hotel: "",
        tour_operator: "",
        session_time: "",
        session_date: ""
      });
    }
  }, [selectedPatient, setValues]);

  return (
    <div className="add-modal z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-lightGray rounded-lg shadow-lg  w-[1000px] p-8">
        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-cyan-500">{t("patientAdd")}</h2>
          <button
          type="button"
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
      {!isCitizen && openModal && <YabancıModal setIsCitizen={setIsCitizen} setOpenModal={setOpenModal} handleChange={handleChange} values={values} setFieldValue={setFieldValue} />}
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 py-6">
          {step === 1 && (
            <>
              <div className="row-span-3">
                <label className={`block text-sm font-medium ${errors.patient_image && touched.patient_image ? "text-red-500" : "text-gray-500"}`}>{t("Image")}</label>
                <div className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2">
                  <div className={`w-32 h-32 bg-gray-100 border border-gray-200 rounded-md overflow-hidden`}>
                    {values.patient_image && (
                      <img
                        src={
                          values.patient_image instanceof File
                            ? URL.createObjectURL(values.patient_image) 
                            : values.patient_image
                        }
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    name="patient_image"
                    accept="image/*"
                    onBlur={handleBlur}
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];  
                      console.log(file);
                                          
                      setFieldValue("patient_image", file);
                    }}
                    className="mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${errors.first_name && touched.first_name ? "text-red-500" : "text-gray-500"}`}>{t("name")}</label>
                <input
                  type="text"
                  name="first_name"
                  value={values.first_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${errors.last_name && touched.last_name ? "text-red-500" : "text-gray-500"}`}>
                  {t("surname")}
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={values.last_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>
              <div>
                  <label className={`flex items-center text-sm font-medium ${errors.national_id && touched.national_id ? "text-red-500" : "text-gray-500"}`}>
                    {t("tcPassport")} 
                    <input 
                      className="ml-8 mr-2" 
                      type="checkbox" 
                      checked={!isCitizen}
                      onChange={handleCheckboxChange} 
                    /> 
                    <span className="text-xs text-gray-500">{t("I am not a Turkish citizen")}</span>
                  </label>
                  
                  <div className="flex gap-x-2 items-end">
                    <input
                      type="text"
                      name="national_id"
                      value={values.national_id}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={!isCitizen}
                      className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                    />
                    {!isCitizen && <button 
                      type="button" 
                      onClick={()=> setOpenModal(true)}
                      className="border border-gray-300 rounded-lg px-2 py-2 hover:bg-white"
                    >
                      <IoMdResize size={20} />
                    </button>}
                  </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.place_of_birth && touched.place_of_birth ? "text-red-500" : "text-gray-500"}`}>
                  {t("birth_place")}
                </label>
                <input
                  type="text"
                  name="place_of_birth"
                  value={values.place_of_birth}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.date_of_birth && touched.date_of_birth ? "text-red-500" : "text-gray-500"}`}>
                  {t("birth_date")}
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={values.date_of_birth}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.gender && touched.gender ? "text-red-500" : "text-gray-500"}`}>
                  {t("Gender")}
                </label>
                <input
                  type="text"
                  name="gender"
                  value={values.gender}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.nationality && touched.nationality ? "text-red-500" : "text-gray-500"}`}>
                  {t("Nationality")}
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={values.nationality}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.mother_name && touched.mother_name ? "text-red-500" : "text-gray-500"}`}>
                  {t("Mother's Name")}
                </label>
                <input
                  type="text"
                  name="mother_name"
                  value={values.mother_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.father_name && touched.father_name ? "text-red-500" : "text-gray-500"}`}>
                  {t("Father's Name")}
                </label>
                <input
                  type="text"
                  name="father_name"
                  value={values.father_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.mobile_phone1 && touched.mobile_phone1 ? "text-red-500" : "text-gray-500"}`}>
                  {t("Mobile Phone")} 1
                </label>
                <input
                  type="text"
                  name="mobile_phone1"
                  value={values.mobile_phone1}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.mobile_phone2 && touched.mobile_phone2 ? "text-red-500" : "text-gray-500"}`}>
                  {t("Mobile Phone")} 2
                </label>
                <input
                  type="text"
                  name="mobile_phone2"
                  value={values.mobile_phone2}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.email && touched.email ? "text-red-500" : "text-gray-500"}`}>
                  E-Mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.instagram_username && touched.instagram_username ? "text-red-500" : "text-gray-500"}`}>
                  {t("Instagram Username")}
                </label>
                <input
                  type="text"
                  name="instagram_username"
                  value={values.instagram_username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.patient_type && touched.patient_type ? "text-red-500" : "text-gray-500"}`}>
                  {t("patient_type")}
                </label>
                <input
                  type="text"
                  name="patient_type"
                  value={values.patient_type}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.country && touched.country ? "text-red-500" : "text-gray-500"}`}>
                  {t("country")}
                </label>
                <input
                  type="text"
                  name="country"
                  value={values.country}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.city && touched.city ? "text-red-500" : "text-gray-500"}`}>
                  {t("city")}
                </label>
                <input
                  type="text"
                  name="city"
                  value={values.city}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${errors.patient_part && touched.patient_part ? "text-red-500" : "text-gray-500"}`}>
                  {t("Patient's Department")}
                </label>
                <input
                  type="text"
                  name="patient_part"
                  value={values.patient_part}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${errors.relevant_worker && touched.relevant_worker ? "text-red-500" : "text-gray-500"}`}>
                  {t("Doctor's Name")}
                </label>
                <input
                  type="text"
                  name="relevant_worker"
                  value={values.relevant_worker}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div className="col-span-3">
                <label className={`block text-sm font-medium ${errors.address && touched.address ? "text-red-500" : "text-gray-500"}`}>
                  {t("address")}
                </label>
                <input
                  type="text"
                  name="address"
                  value={values.address}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div>
                <label className={`block text-sm font-medium ${errors.seans_number && touched.seans_number ? "text-red-500" : "text-gray-500"}`}>
                  {t("Session")}
                </label>
                <input
                  type="text"
                  name="seans_number"
                  value={values.seans_number}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.device_name && touched.device_name ? "text-red-500" : "text-gray-500"}`}>
                  {t("Device Name")}
                </label>
                <input
                  type="text"
                  name="device_name"
                  value={values.device_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">{t("Session Date")}</label>
                <input
                  type="date"
                  name="session_date"
                  value={values.session_date}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">{t("Session Time")}</label>
                <input
                  type="time"
                  name="session_time"
                  value={values.session_time}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div className="col-span-3 flex flex-wrap gap-2">
                {[t("Monday"), t("Tuesday"), t("Wednesday"), t("Thursday"), t("Friday"), t("Saturday"), t("Sunday")].map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDaySelection(day)}
                    className={`px-4 py-2 rounded-md shadow-sm border ${
                      values.seans_days.includes(day)
                        ? "bg-cyan-500 text-white"
                        : "bg-white text-gray-700"
                    } focus:outline-none`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div>
                <label className={`block text-sm font-medium ${errors.education_status && touched.education_status ? "text-red-500" : "text-gray-500"}`}>
                  Öğrenim Durumu
                </label>
                <input
                  type="text"
                  name="education_status"
                  value={values.education_status}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${errors.occupation && touched.occupation ? "text-red-500" : "text-gray-500"}`}>
                  Meslek
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={values.occupation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.current_employer && touched.current_employer ? "text-red-500" : "text-gray-500"}`}>
                  Çalışılan Kurum
                </label>
                <input
                  type="text"
                  name="current_employer"
                  value={values.current_employer}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.marital_status && touched.marital_status ? "text-red-500" : "text-gray-500"}`}>
                  Medeni Durum
                </label>
                <input
                  type="text"
                  name="marital_status"
                  value={values.marital_status}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.children_count && touched.children_count ? "text-red-500" : "text-gray-500"}`}>
                  Çocuk Sayısı
                </label>
                <input
                  type="number"
                  name="children_count"
                  value={values.children_count}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.referee && touched.referee ? "text-red-500" : "text-gray-500"}`}>
                  Refere Eden
                </label>
                <input
                  type="text"
                  name="referee"
                  value={values.referee}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.institution_type && touched.institution_type ? "text-red-500" : "text-gray-500"}`}>
                  Kurum Tipi
                </label>
                <input
                  type="text"
                  name="institution_type"
                  value={values.institution_type}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.applied_department && touched.applied_department ? "text-red-500" : "text-gray-500"}`}>
                  Başvurduğu Birim
                </label>
                <input
                  type="text"
                  name="applied_department"
                  value={values.applied_department}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.applied_operation && touched.applied_operation ? "text-red-500" : "text-gray-500"}`}>
                  Başvurduğu İşlem
                </label>
                <input
                  type="text"
                  name="applied_operation"
                  value={values.applied_operation}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium ${errors.insurance_info && touched.insurance_info ? "text-red-500" : "text-gray-500"}`}>
                  Sigorta Bilgisi
                </label>
                <input
                  type="text"
                  name="insurance_info"
                  value={values.insurance_info}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div className="col-span-2">
                <label className={`block text-sm font-medium ${errors.complaints && touched.complaints ? "text-red-500" : "text-gray-500"}`}>
                  Şikayetler
                </label>
                <input
                  type="text"
                  name="complaints"
                  value={values.complaints}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <div>
                <label className={`block text-sm font-medium ${errors.medications && touched.medications ? "text-red-500" : "text-gray-500"}`}>
                  Sürekli kullandığınız ilaç var mı?
                </label>
                <input
                  type="text"
                  name="medications"
                  value={values.medications}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.existing_conditions && touched.existing_conditions ? "text-red-500" : "text-gray-500"}`}>
                  Mevcut bir hastalığınız var mı?
                </label>
                <input
                  type="text"
                  name="existing_conditions"
                  value={values.existing_conditions}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Sigara kullanıyor musunuz?</label>
                <select
                  type="text"
                  name="smoker"
                  value={values.smoker}
                  onChange={(e) => handleChange({
                    target: {
                      name: 'smoker',
                      value: e.target.value === "true" ? true : false,
                    }
                  })}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                >
                   <option value="">Seçiniz</option>
                   <option value="true">Evet</option>
                   <option value="false">Hayır</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.past_surgeries && touched.past_surgeries ? "text-red-500" : "text-gray-500"}`}>
                  Daha önce geçirdiğiniz operasyonlar
                </label>
                <input
                  type="text"
                  name="past_surgeries"
                  value={values.past_surgeries}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.allergies && touched.allergies ? "text-red-500" : "text-gray-500"}`}>
                  Alerjiniz var mı?
                </label>
                <input
                  type="text"
                  name="allergies"
                  value={values.allergies}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${errors.post_surgery_address && touched.post_surgery_address ? "text-red-500" : "text-gray-500"}`}>
                  Ameliyat sonrası kalacağınız adres
                </label>
                <input
                  type="text"
                  name="post_surgery_address"
                  value={values.post_surgery_address}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between pt-2">
          {step > 1 && (
            <button
            type="button"
              onClick={prevStep}
              className="bg-gray-300 flex items-center justify-around text-black rounded-md pr-6 pl-5 py-2 shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <ArrowLeft className="mr-1" size={20} />
              {t("back")}
            </button>
          )}
          {step < 4 && (
            <button
            type="button"
              onClick={nextStep}
              className="ml-auto bg-cyan-500 flex items-center justify-around text-white rounded-md pr-6 pl-5 py-2 shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              {t("next")}
              <ArrowRight className="ml-1" size={20} />
            </button>
          )}
          {step === 4 && (
            <button
              type="submit"
              onClick={ async () =>{
                const errors = await validateForm(values);
                    console.log(errors);
                    
                    if (Object.keys(errors).length > 0) {
                      Object.values(errors).forEach(error => {
                        toast.error(error);
                      });
                      return;
                    }
              }}  
              className="ml-auto bg-cyan-500 flex items-center justify-around text-white rounded-md pr-6 pl-5 py-2 shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <Check className="mr-1" size={20} />
              {t("save")}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};


const YabancıModal = ({ setIsCitizen, setOpenModal, handleChange, values, setFieldValue }) => {

  const handleClose = () => {
    setIsCitizen(true)    
    setFieldValue("national_id", "")
    setFieldValue("flight_date", "")
    setFieldValue("stayed_hotel", "")
    setFieldValue("tour_operator", "")    
  }
  
  return (    
    <div onClick={()=> handleClose()} className="w-screen h-screen bg-cyan-600/40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div onClick={(e) => e.stopPropagation()} className="add-modal z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="bg-lightGray rounded-lg shadow-lg w-full max-w-4xl p-8">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-cyan-500">YABANCI HASTA</h2>
            <button
              onClick={()=> handleClose()}
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

          <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-6">
            <div>
              <label className="block text-sm font-medium text-gray-500">Pasaport No</label>
              <input
                type="text"
                name="national_id"
                value={values.national_id}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Kaldığı Otel</label>
              <input
                type="text"
                name="stayed_hotel"
                value={values.stayed_hotel}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Uçuş Tarihleri</label>
              <input
                type="datetime-local"
                name="flight_date"
                value={values.flight_date}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Tur Operatörü</label>
              <input
                type="text"
                name="tour_operator"
                value={values.tour_operator}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-200 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm px-3 py-2"
              />
            </div>


          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={()=> setOpenModal(false)}
              className="ml-auto bg-cyan-500 flex items-center justify-around text-white rounded-md pr-6 pl-5 py-2 shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <Check className="mr-1" size={20} />
              {t("save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientAddModal;
