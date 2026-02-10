import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const fetcher = (url) => fetch(url).then((res) => res.json());

const SideBar = ({ patient }) => {
    const { t } = useTranslation();
    

    return (
        <div className='h-full w-[15%] border-r shadow-md'>
            <div className='flex flex-col items-center py-8'>
                <img src={patient.patient_image} className='w-[100px] h-[100px] rounded-full object-cover' alt={`${patient.first_name} ${patient.last_name}`} />
                <span className='pt-3 pb-1 text-gray-700 text-lg font-semibold'>{patient.first_name} {patient.last_name}</span>
                <span className='text-gray-600'>ID: {patient.national_id}</span>
            </div>
            <ul className='patient-detail-list w-full'>
                <li>
                    <Link to="overview">{t("overview")}</Link>
                </li>
                <li>
                    <Link to="IDinformation">{t("id_passport")}</Link>
                </li>
                <li>
                    <Link to="sessionInformation">{t("session_info")}</Link>
                </li>
                <li>
                    <Link to="files">{t("files")}</Link>
                </li>
                <li>
                    <Link to="bill">{t("bills")}</Link>
                </li>
                <li>
                    <Link to="">{t("test_results")}</Link>
                </li>
                <li>
                    <Link to="poll">Anket</Link>
                </li>
                <li>
                    <Link to="photos">{t("photos")}</Link>
                </li>
                <li>
                    <Link to="epikriz">{t("create_epicrisis")}</Link>
                </li>
            </ul>
        </div>
    )
}

export default SideBar;
