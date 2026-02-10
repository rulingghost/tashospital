import React, { useEffect, useState } from 'react'
import TableComp2 from '../../UI/TableComp2'
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion'
import { useGetAllStocksQuery } from '../../store/patient2'
import { formatDateToShow } from '../../components/Utils/DateFormat';
import Loading from '../../components/tools/Loading';

const StockProducts = () => {

  const { t } = useTranslation()

  const [ activePage, setActivePage] = useState(1)
  const [searchable, setSearchable] = useState(''); 
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [orderingValue, setOrderingValue] = useState('stock_name');  
  const thead = [
    { name: t("Product Name"), sortable: true, value: "stock_name" },
    { name: t("Stock"), sortable: true, value: "total_haved" },
    { name: t("Expiry Date"), sortable: true, value: "stock_skt" },
    { name: t("Product Group"), sortable: true, value: "stcok_group" },
  ]

  const { data, isLoading, error } = useGetAllStocksQuery({page:activePage, type:"skt", filters: debouncedSearchTerm, orderValue: orderingValue}) 
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
  if(error || !data) return <p>Hata Oluştu...</p>

  return (
    <motion.div 
        initial={{opacity:0}}   
        animate={{opacity:1}}
        className="w-[98%] h-[99%] flex items-center justify-center">
        {!isLoading && data.results && <TableComp2
            thead={thead}
            tbody={data.results.map(row => [
            row.stock_name,
            row.total_haved, 
            formatDateToShow(row.stock_skt),
            row.stcok_group,
            ])}
            searchable = {searchable}
            setSearchable = {setSearchable}
            tableTitle= {t("PRODUCTS")} 
            page={data.count}  
            activePage={activePage} 
            setActivePage={setActivePage}   
            orderingValue={orderingValue}
            setOrderingValue={setOrderingValue}  
        />}
    </motion.div>
  )
}

export default StockProducts