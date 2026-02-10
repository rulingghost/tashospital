import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import TableComp2 from '../../UI/TableComp2';
import { useGetAllWorkerQuery } from '../../store/patient2';
import { capitalizeWords } from '../../components/Utils/capitalizeWords';
import { formatDateToShow } from '../../components/Utils/DateFormat';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/tools/Loading';

const HrLeaveManagement = () => {
  const { t } = useTranslation()

  const [ activePage, setActivePage] = useState(1)
  const [searchable, setSearchable] = useState(''); 
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [orderingValue, setOrderingValue] = useState('first_name');  
  const thead = [
    { name: t("Full Name"), sortable: true, value: "first_name" },
    { name: t("Start Date"), sortable: true },
    { name: t("End Date"), sortable: true },
    { name: t("Leave Duration"), sortable: true },
  ] 

  const { data, isLoading, error } = useGetAllWorkerQuery({page: activePage, filters: debouncedSearchTerm, orderValue: orderingValue})
  //console.log(data);

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
  if(error || !data.results) return <p>Hata Oluştu...</p>
  
  
      
  return (
    <motion.div
        initial={{opacity:0}}   
        animate={{opacity:1}} 
        className='w-full h-full flex items-center justify-center'
    >
        <TableComp2
            thead={thead}
            tbody={data?.results
              .filter((x) => x.leaves.length > 0)
              .flatMap((worker) => 
                worker.leaves.map((leave) => ([
                  <div className='flex items-center gap-x-2'>
                    <img src={worker.worker_image} alt={`${worker.first_name} avatar`} className="w-10 h-10 rounded-full" />
                    {capitalizeWords(worker.first_name + " " + worker.last_name)}
                  </div>,
                  formatDateToShow(leave.start_date),
                  formatDateToShow(leave.end_date),
                  leave.leave_days,
                ]))
            )}
            searchable = {searchable}
            setSearchable = {setSearchable}
            tableTitle={t("LEAVE MANAGEMENT")}
            modal={"leaves-modal"}
            activePage = {activePage}
            setActivePage = {setActivePage}
            orderingValue={orderingValue}
            setOrderingValue={setOrderingValue}
        />
    </motion.div>
  )
}

export default HrLeaveManagement