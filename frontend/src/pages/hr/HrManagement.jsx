import React, { useState } from 'react'
import TableComp2 from '../../UI/TableComp2';
import { useNavigate } from 'react-router-dom';
import { createModal } from '../../components/Utils/Modal';
import { useGetAllWorkerQuery } from '../../store/patient2';
import { processDays } from '../../components/Utils/processDays';
import { capitalizeWords } from '../../components/Utils/capitalizeWords';
import { useTranslation } from 'react-i18next';

const HrManagement = () => {
  const { t } = useTranslation()

  const [ activePage, setActivePage] = useState(1)
  const { data, isLoading, error } = useGetAllWorkerQuery({page: activePage})
  console.log(data);
  
    const thead = [
      { name: t("STAFF"), sortable: true },
      { name: t("Workplace"), sortable: true },
      { name: t("Work Week"), sortable: true },
      { name: t("Final Check"), sortable: true },
    ]

    const findLatestDate = (task_assignments) => {
      // task_assignments boş veya geçersizse boş string döndür
      if (!Array.isArray(task_assignments) || task_assignments.length === 0) {
        return "Kontrol Edilmedi";
      }
    
      // Tüm task_checks'leri düz bir diziye dönüştür, eksik olanları filtrele
      const allTaskChecks = task_assignments.flatMap(
        (assignment) => assignment.task_checks || []
      );
    
      // Eğer task_checks boşsa boş string döndür
      if (allTaskChecks.length === 0) {
        return "Kontrol Edilmedi";
      }
    
      // Tarihleri karşılaştırarak en güncel olanı bul
      const latestTaskCheck = allTaskChecks.reduce((latest, current) => {
        return new Date(current.date) > new Date(latest.date) ? current : latest;
      });
    
      // En güncel tarih nesnesinin tarihini döndür
      return latestTaskCheck.date || "Kontrol Edilmedi";
    };
  
  if(isLoading){
    return <div>Yükleniyor...</div>
  }else if(!data){
    return <div>Hata...</div>
  }

  return (
    <div>
      <TableComp2
        thead={thead}
        tbody={data.results.map((worker) => [
          <div className='flex items-center gap-x-2'>
            <img src={worker.worker_image} alt={`${worker.first_name} avatar`} className="w-10 h-10 rounded-full" />
            {capitalizeWords(worker.first_name + " " + worker.last_name)}
          </div>,
          <button              
            onClick={() => createModal("worker-check", worker.id)}
          >
            {worker.duty_place}
          </button>,          
          (() => {
            if(worker.working_hours[0]){
              const processResult = processDays(worker.working_hours[0].working_days)
              const [dayCount, ...rest] = processResult.split(", ")
              const dayDetails = rest.join(", ")
              return (
                  <span>
                      <span className="text-cyan-500 font-semibold mr-1">{dayCount},</span>
                      <span>{dayDetails}</span>
                  </span>
              )
            }            
        })(),
         <p>{findLatestDate(worker.task_assignments) || ""}</p>,
        ])}
        searchable={true}
        tableTitle={t("Duty Check")}
        modal={"worker-quest"}
      />
    </div>
  )
}

export default HrManagement
