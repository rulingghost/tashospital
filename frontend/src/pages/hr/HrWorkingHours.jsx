import React, { useEffect, useState } from 'react'
import TableComp2 from '../../UI/TableComp2';
import { Clock4 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetAllWorkerQuery } from '../../store/patient2';
import { processDays } from '../../components/Utils/processDays';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/tools/Loading';
import { capitalizeWords } from '../../components/Utils/capitalizeWords';

const HrWorkingHours = () => {

  const { t } = useTranslation()

  const [searchable, setSearchable] = useState(''); 
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [orderingValue, setOrderingValue] = useState('first_name');         
  const [ activePage, setActivePage] = useState(1)
  const thead = [
    { name: t("Full Name"), sortable: true, value: "first_name" },
    { name: t("Start Work"), sortable: true },
    { name: t("Break"), sortable: true },
    { name: t("Working Days"), sortable: true },
    { name: t("Weekly Working"), sortable: true },
    { name: '', width: 80 },
  ]
  const { data, isLoading, error } = useGetAllWorkerQuery({page: activePage, filters: debouncedSearchTerm, orderValue: orderingValue})
  // console.log(data);

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
        className="w-full">
        <TableComp2
            thead={thead}
            tbody={data.results.filter((x) => x.working_hours.length > 0).map(worker => [
              <div className='flex items-center gap-x-1'>
                <img src={worker.worker_image} alt={`${worker.first_name} avatar`} className="w-10 h-10 rounded-full" />
                {capitalizeWords(worker.first_name + " " + worker.last_name)}
              </div>, 
              worker.working_hours[0].start_time.substring(0, 5),
              worker.working_hours[0].end_time.substring(0, 5),              
              (() => {
                const processResult = processDays(worker.working_hours[0].working_days)
                const [dayCount, ...rest] = processResult.split(", ")
                const dayDetails = rest.join(", ")
                return (
                    <span>
                        <span className="text-cyan-500 font-semibold mr-1">{dayCount},</span>
                        <span>{dayDetails}</span>
                    </span>
                )
            })(),
              parseInt(worker.working_hours[0].weekly_hours, 10),
              worker.actions
            ])}
            searchable = {searchable}
            setSearchable = {setSearchable}
            tableTitle={t("WORKING HOURS")}
            activePage = {activePage}
            modal={"workerhours-modal"}
            setActivePage = {setActivePage}
            orderingValue={orderingValue}
            setOrderingValue={setOrderingValue}
        />
    </motion.div>
  )
}

export default HrWorkingHours