import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import SubSideBar from '../../../navigation/SubSideBar'
import { useGetPatientIdQuery } from '../../../store/patient2'


const PatientDetail = () => {

  const {patientId} = useParams()
 
  const { data: patient, isLoading } = useGetPatientIdQuery(patientId, {
    skip: !patientId,
  });

  //console.log(patient);
  

  return (
    <>
      {!isLoading && <SubSideBar patient={patient}/>}
      <Outlet />
    </>
  )
}

export default PatientDetail

