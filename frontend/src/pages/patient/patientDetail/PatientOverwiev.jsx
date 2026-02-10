import React from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetPatientIdQuery } from '../../../store/patient2';
import { createModal } from '../../../components/Utils/Modal';
import { formatDateToShow, formatISODateUTC } from '../../../components/Utils/DateFormat';
import { calculateAge } from '../../../components/Utils/calculateAge';

const PatientOverwiev = () => {
    const { t } = useTranslation();
    const {patientId} = useParams()
    const { data: patient, isLoading } = useGetPatientIdQuery(patientId, {
        skip: !patientId,
    });
console.log(patient);

    
    if (!patient) {
        return <div>{"Bir sorun oluştu..."}</div>;
    }else if (isLoading){
        return <div>Veri Yükleniyor</div>
    }

    return (
        <div className='bg-gray-200 w-[calc(100%-15%)] h-full flex flex-col justify-evenly'>
            <div className='w-full h-[49%] flex justify-evenly items-center'>
                <div className='w-[42%] h-[96%] p-3 pl-0 bg-white rounded-xl shadow-md flex'>
                    <div className='border-r w-[45%] h-full flex flex-col items-center'>
                        <img src={patient.patient_image} className='w-[90%] h-[70%] rounded-lg object-cover' alt={`${patient.first_name} ${patient.last_name}`} />
                        <p className='py-3 text-xl font-semibold text-gray-700'>{patient.first_name} {patient.last_name}</p>
                        <div className='flex w-full justify-evenly mt-1'>
                            <div className='flex flex-col items-center gap-1'>
                                <span className='text-gray-500'>{t("birth_date")}</span>
                                <span className='font-semibold text-gray-700'>{formatDateToShow(patient.date_of_birth)}</span>
                            </div>
                            <div className='flex flex-col items-center gap-1'>
                                <span className='text-gray-500'>{t("age")}</span>
                                <span className='font-semibold text-gray-700'>{calculateAge(patient.date_of_birth)}</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-[55%] h-full flex flex-col gap-5 justify-evenly items-center'>
                        <div className='flex flex-col gap-1 items-center'>
                            <p className='text-lg text-gray-500'>{t("patient_code")}</p>
                            <p className='font-semibold text-lg text-gray-700'>{patient.patient_number || '-'}</p>
                        </div>
                        <div className='flex flex-col gap-1 items-center'>
                            <p className='text-lg text-gray-500'>{t("tc_passport_number")}</p>
                            <p className='font-semibold text-lg text-gray-700'>{patient.national_id}</p>
                        </div>
                        <div className='flex flex-col gap-1 items-center'>
                            <p className='text-lg text-gray-500'>{t("birth_place")}</p>
                            <p className='font-semibold text-lg text-gray-700'>{patient.place_of_birth}</p>
                        </div>
                        <div className='flex flex-col gap-1 items-center'>
                            <p className='text-lg text-gray-500'>{t("gender_nationality")}</p>
                            <p className='font-semibold text-lg text-gray-700'>{patient.gender} / {patient.nationality}</p>
                        </div>
                        <div className='flex flex-col gap-1 items-center'>
                            <p className='text-lg text-gray-500'>{t("mother_father_name")}</p>
                            <p className='font-semibold text-lg text-gray-700'>{patient.mother_name} / {patient.father_name}</p>
                        </div>
                    </div>
                </div>
                <div className='w-[42%] h-[96%] flex flex-col items-center justify-between'>
                    <div className='h-[48%] w-full py-8 px-20 bg-white rounded-xl shadow-md flex flex-col justify-between'>
                        <div className='flex gap-2'>
                            <div className='flex flex-col items-center justify-center w-[50%]'>
                                <p className='text-gray-500 font-semibold'>{t("phone_1")}</p>
                                <p className='text-gray-700 font-semibold text-lg'>{patient.mobile_phone1}</p>
                            </div>
                            <div className='flex flex-col items-center justify-center w-[50%]'>
                                <p className='text-gray-500 font-semibold'>{t("instagram")}</p>
                                <p className='text-gray-700 font-semibold text-lg'>{patient.instagram_username}</p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex flex-col items-center justify-center w-[50%]'>
                                <p className='text-gray-500 font-semibold'>{t("phone_2")}</p>
                                <p className='text-gray-700 font-semibold text-lg'>{patient.mobile_phone2}</p>
                            </div>
                            <div className='flex flex-col items-center justify-center w-[50%]'>
                                <p className='text-gray-500 font-semibold'>{t("email")}</p>
                                <p className='text-gray-700 font-semibold text-lg'>{patient.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className='h-[48%] w-full bg-white rounded-xl shadow-md flex flex-col px-3 py-7 '>
                        <div className='flex justify-between items-center mb-auto'>
                            <div className='flex flex-col justify-center items-center w-[50%] gap-1'>
                                <p className='text-gray-500 font-semibold'>{t("country")}</p>
                                <p className='text-gray-700 text-sm font-semibold'>{patient.country}</p>
                            </div>
                            <div className='flex flex-col justify-center items-center w-[50%] gap-1'>
                                <p className='text-gray-500 font-semibold'>{t("city")}</p>
                                <p className='text-gray-700 text-sm font-semibold'>{patient.city}</p>
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='flex flex-col justify-center items-center w-[100%] gap-1'>
                                <p className='text-gray-500 font-semibold'>{t("address")}</p>
                                <p className='text-gray-700 text-sm font-semibold'>{patient.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-[49%] flex justify-evenly items-center'>
                <div className='w-[42%] h-[96%] flex flex-col justify-between'>
                    <div className='h-[56%] bg-white rounded-xl shadow-md overflow-auto'>
                        <div className='border-b p-4 flex justify-between items-center bg-white sticky top-0 left-0'>
                            <span className='text-lg font-semibold text-gray-600'>{t("notes")}</span>
                            <button
                                onClick={() => createModal("tooth-modal", patient)}
                                className='text-blue-500'
                            >
                                <CiCirclePlus size={30} strokeWidth={0.5} />
                            </button>
                        </div>
                        <div className='p-4'>
                            {/* <p className='text-gray-500 font-semibold mb-2'>02.06.2023</p> */}
                            {Array.isArray(patient.patient_note) && patient.patient_note[0]?.doctor_notes && (
                                <p className='text-gray-600 text-lg'>{patient.patient_note[0]?.doctor_notes}</p>
                            )}
                        </div>
                    </div>
                    <div className='h-[40%] bg-white rounded-xl shadow-md flex justify-evenly items-center'>
                        <div>
                            <div className='flex flex-col items-center'>
                                <p className='text-gray-500 font-semibold mb-1'>{t("surgery_date")}</p>
                                <p className='text-gray-700 font-semibold text-lg text-center'>12.12.2022</p>
                            </div>
                            <div className='flex flex-col items-center mt-4'>
                                <p className='text-gray-500 font-semibold mb-1'>{t("control_date")}</p>
                                <p className='text-gray-700 font-semibold text-lg text-center'>12.12.2022</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex flex-col items-center'>
                                <p className='text-gray-500 font-semibold mb-1'>{t("discharge_date")}</p>
                                <p className='text-gray-700 font-semibold text-lg text-center'>{formatISODateUTC(patient.discharge_date)}</p>
                            </div>
                            <div className='flex flex-col items-center mt-4'>
                                <p className='text-gray-500 font-semibold mb-1'>{t("flight_date")}</p>
                                <p className='text-gray-700 font-semibold text-lg text-center'>{formatISODateUTC(patient.flight_date)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[42%] h-[96%] p-5 bg-white rounded-xl shadow-md flex flex-col overflow-auto'>
                    <div className='flex'>
                        <div className='w-[45%] flex flex-col items-center border-r pr-5 gap-5'>
                            <div className='flex flex-col items-center'>
                                <p className='text-gray-500 font-semibold mb-1'>{t("patient_type")}</p>
                                <p className='text-gray-700 font-semibold text-lg text-center'>{patient.patient_type}</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='text-gray-500 font-semibold mb-1'>{t("marital_status")}</p>
                                <p className='text-gray-700 font-semibold w-full text-center'>{patient.marital_status}</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='text-gray-500 font-semibold mb-1'>{t("has_given_birth")}</p>
                                <p className='text-gray-700 font-semibold w-full text-center'>{patient.children_count > 0 ? t("yes") : t("no")}</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='text-gray-500 font-semibold mb-1'>{t("current_diseases")}</p>
                                <p className='text-gray-700 font-semibold w-full text-center'>{patient.existing_conditions || t("none")}</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='text-gray-500 font-semibold mb-1'>{t("medications")}</p>
                                <p className='text-gray-700 font-semibold w-full text-center'>{patient.medications || t("none")}</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='text-gray-500 font-semibold mb-1'>{t("allergies")}</p>
                                <p className='text-gray-700 font-semibold w-full text-center'>{patient.allergies || t("none")}</p>
                            </div>
                        </div>
                        <div className='w-[45%] pl-5 flex flex-col items-center gap-5'>
                            <div className='flex flex-col items-center'>
                                <p className='text-gray-500 font-semibold mb-1'>{t("referral")}</p>
                                <p className='text-gray-700 font-semibold w-full text-center'>{patient.referee || '-'}</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='text-gray-500 font-semibold mb-1'>{t("profession")}</p>
                                <p className='text-gray-700 font-semibold w-full text-center'>{patient.occupation || '-'}</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='text-gray-500 font-semibold mb-1'>{t("workplace")}</p>
                                <p className='text-gray-700 font-semibold w-full text-center'>{patient.current_employer || '-'}</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='text-gray-500 font-semibold mb-1'>{t("procedure")}</p>
                                <p className='text-gray-700 font-semibold w-full text-center'>{patient.applied_operation || '-'}</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='text-gray-500 font-semibold mb-1'>{t("smokes")}</p>
                                <p className='text-gray-700 font-semibold w-full text-center'>{patient.smoker ? t("yes") : t("no")}</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='text-gray-500 font-semibold mb-1'>{t("operations")}</p>
                                <p className='text-gray-700 font-semibold w-full text-center'>{patient.past_surgeries || '-'}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-[90%] mt-6 flex flex-col items-center justify-center'>
                        <p className='text-gray-500 font-semibold mb-1'>{t("complaints")}</p>
                        <p className='text-gray-700 font-semibold w-full text-center'>{patient.complaint || t("no_complaints")}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientOverwiev;
