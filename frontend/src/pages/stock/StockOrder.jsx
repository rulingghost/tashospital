import React, { useEffect, useState } from 'react';
import TableComp2 from '../../UI/TableComp2';
import { motion } from 'framer-motion';
import { useGetStockOrdersQuery } from '../../store/patient2';
import { formatDateToShow } from '../../components/Utils/DateFormat';
import { ImBoxRemove } from "react-icons/im";
import { createModal } from '../../components/Utils/Modal';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/tools/Loading';
import ProtectedRoute from '../../ProtectedRoute';
import { useNavigate } from 'react-router-dom';

const StockOrder = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [searchable, setSearchable] = useState('') 
    const [skipError, setSkipError] = useState(false)
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const [orderingValue, setOrderingValue] = useState('order_name');   
    const [ activePage, setActivePage] = useState(1)
    const thead = [
        { name: t("PRODUCT"), sortable: true, value: "order_name" },
        { name: t("QUANTITY PURCHASED"), sortable: true, value: "order_number" },
        { name: t("DATE"), sortable: true, value: "order_startdate" },
        { name: t("WAREHOUSE"), sortable: true, value: "order_warehouse" },
        { name: t("POSITION"), sortable: true, value: "order_pozition" },
        { name: t("PRODUCT GROUP"), sortable: true, value: "order_group" },
        { name: t("STATUS"), sortable: true, value: "order_stuation", width: 120 }
    ]
    const warehouseNames = {
        1: "ANA DEPO",
        2: "DEPO-1",
        3: "DEPO-2",
        4: "DEPO-3",
        5: "DEPO-4",
        6: "DEPO-5",
        7: "DEPO-6",
    }
    const {data, isLoading, error} = useGetStockOrdersQuery({page: activePage, filters: debouncedSearchTerm, orderValue: orderingValue})
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

    useEffect(() => {
      if (error && error.status === 401) {
        setSkipError(true);
      }
  }, [error, navigate]);

  if(isLoading) return <Loading />
  if(!skipError && (error || !data)) return <p>Hata Oluştu...</p>

  return (
    <ProtectedRoute>
      <motion.div 
          initial={{opacity:0}}   
          animate={{opacity:1}}
          className="w-full h-[99%]">
          {data && <TableComp2
              thead={thead}
              tbody={data.results.map(order => [
                  // <button ><ImBoxRemove size={20} color='#0093ad' /></button>,
                  order?.order_name || "",
                  order?.order_number || "",
                  order?.order_startdate ? formatDateToShow(order.order_startdate) : "",
                  warehouseNames[order?.order_warehouse] || "",
                  order?.order_pozition || "",
                  order?.order_group || "",
                  <button      
                  disabled={order?.order_stuation === "Tamamlandı"}              
                      onClick={()=>{
                          createModal("stock", order.id)
                      }}
                      className={` text-white px-2 py-1 rounded-lg 
                          ${order?.order_stuation === "Bekliyor" && "bg-yellow-600"}
                          ${order?.order_stuation === "Tamamlandı" && "bg-green-600"}
                      `}
                  >
                      {order?.order_stuation}
                  </button>
              ])}
              searchable = {searchable}
              setSearchable = {setSearchable}
              tableTitle={"SATIN ALMA TALEPLERİ"}   
              modal={"stockOrder"} 
              page={data.count || 0}  
              activePage={activePage} 
              setActivePage={setActivePage}    
              orderingValue={orderingValue}
              setOrderingValue={setOrderingValue} 
          />}
      </motion.div>
    </ProtectedRoute>
  )
}

export default StockOrder