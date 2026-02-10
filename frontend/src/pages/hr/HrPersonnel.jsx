import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoMailOutline } from "react-icons/io5";
import TableComp2 from '../../UI/TableComp2';
import { useGetAllWorkerQuery } from '../../store/patient2';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/tools/Loading';
import { capitalizeWords } from '../../components/Utils/capitalizeWords';

const HrPersonnel = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const [searchable, setSearchable] = useState(''); 
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [orderingValue, setOrderingValue] = useState('first_name');  
  const [ activePage, setActivePage] = useState(1)
  const thead = [
    { name: t("Full Name"), sortable: true },
    { name: t("Email"), sortable: true },
    { name: t("Contact") },
    { name: t("Department"), sortable: true },
    { name: '', width: 120 },
  ];

  const { data, isLoading, error } = useGetAllWorkerQuery({page: activePage, filters: debouncedSearchTerm, orderValue: orderingValue})
  //console.log(data?.results);   

  useEffect
  (() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchable);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchable]);
 
  if(isLoading) return <Loading />
  if(error || !data) return <p>Hata Oluştu...</p>
      

  return (
    <motion.div
        initial={{opacity:0}}   
        animate={{opacity:1}}
        className='w-full h-full flex flex-col items-center justify-evenly'
    >
      
        <TableComp2            
            thead={thead}
            tbody={data.results.map(worker => [
            <div className='flex items-center gap-x-1'>
              <img src={worker.worker_image} alt={`${worker.first_name} avatar`} className="w-10 h-10 rounded-full" />
              {capitalizeWords(worker.first_name + " " + worker.last_name)}
            </div>, 
            worker.email, 
            worker.phone_1, 
            capitalizeWords(worker.department), 
            <div className='flex gap-5'>
              <button>
                <IoMailOutline size={30} color='blue' />
              </button>
                <button onClick={()=> navigate(`${worker.id}`)} key="details-1" className="h-8 px-4 flex items-center justify-center rounded bg-cyan-500 text-white">
                &gt;
              </button>
            </div>
            ])}
            modal={"workerAdd"}
            searchable = {searchable}
            setSearchable = {setSearchable}
            tableTitle= {t("EMPLOYEE LIST")}
            activePage = {activePage}
            setActivePage = {setActivePage}
            orderingValue={orderingValue}
            setOrderingValue={setOrderingValue}
        />  
    </motion.div>
  )
}

export default HrPersonnel