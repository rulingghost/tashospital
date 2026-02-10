import React, { useEffect, useState } from 'react';
import TableComp2 from '../../UI/TableComp2';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGetAllStocksQuery, useGetWarehouseQuery } from '../../store/patient2';
import { createModal } from '../../components/Utils/Modal';
import { formatDateToShow } from '../../components/Utils/DateFormat';
import Loading from '../../components/tools/Loading';
import { capitalizeWords } from '../../components/Utils/capitalizeWords';

const StockWarehouse = () => {
    const { t } = useTranslation()
    const [ activeWarehouse, setActiveWarehouse ] = useState(1)
    const [searchable, setSearchable] = useState(''); 
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [orderingValue, setOrderingValue] = useState('stock_name');  
    const thead = [
        { name: "none"},
        { name: t("PRODUCT"), sortable: true, value: "stock_name" },
        { name: t("QUANTITY PURCHASED"), sortable: true, value: "stock_buyed" },
        { name: t("AVAILABLE"), sortable: true, value: "stock_haved" },
        { name: t("MANUFACTURING DATE"), sortable: true, value: "stock_ut" },
        { name: t("EXPIRY DATE"), sortable: true, value: "stock_skt" },
        { name: t("POSITION"), sortable: true },
        { name: t("PRODUCT GROUP"), sortable: true },
    ]

    const { data, error, isLoading } = useGetAllStocksQuery({ page: 1, stock_warehouse: activeWarehouse, filters: debouncedSearchTerm, orderValue: orderingValue })
    const { data: warehouses, error: wareError, isloading: wareLoading} = useGetWarehouseQuery() 
    //console.log(data);
    //console.log(warehouses);

    useEffect
      (() => {
        const handler = setTimeout(() => {
          setDebouncedSearchTerm(searchable);
        }, 500);
    
        return () => {
          clearTimeout(handler);
        };
    }, [searchable])    
    
    if(isLoading || wareLoading) return <Loading />
    if(error || !data || !warehouses || wareError) return <p>Hata Oluştu...</p>

    return (
        <div className="flex h-full items-center pb-4">
            {/* Sol Menü */}
            <div className="w-1/6 max-w-[200px] bg-cyan-600 h-full flex flex-col p-4 rounded-3xl mr-3 ">
                <h2 className="text-white w-full text-center text-lg pt-2 mb-4">
                    DEPOLAR 
                    {/* <button onClick={()=> createModal("warehouse-modal")} type='button' className='border-2 text-xl border-white rounded-full w-8 h-8 ml-4'>+</button> */}
                </h2>
                <ul className="stock-list relative text-white space-y-2 border-t border-slate-300 pt-5 overflow-y-auto">
                    {warehouses.results && warehouses.results.map((item) => (
                        <li 
                            key={item.id} 
                            className={`${activeWarehouse === item.id ? "bg-cyan-500 hover:!bg-cyan-500" : ""}`} 
                            onClick={()=>setActiveWarehouse(item.id)}
                        >
                            {item.wh_name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Sağdaki Tablo */}
            <motion.div 
                initial={{opacity:0}}   
                animate={{opacity:1}}
                className="w-5/6 min-w-[calc(100%-200px)] h-full ">
                <TableComp2
                    thead={thead}
                    tbody={data.results && data.results.map(row => [
                        <button type='button' onClick={()=> createModal("tranfer-product", row)}>{capitalizeWords(row.stock_name)}</button>,
                        row.stock_buyed,
                        row.stock_haved,
                        formatDateToShow(row.stock_ut),
                        formatDateToShow(row.stock_skt),
                        capitalizeWords(row.stock_pozition),
                        capitalizeWords(row.stcok_group)
                    ])}
                    searchable = {searchable}
                    setSearchable = {setSearchable}
                    tableTitle={"SİPARİŞLER"}  
                    modal={'stock'}  
                    orderingValue={orderingValue}
                    setOrderingValue={setOrderingValue}        
                />
            </motion.div>
        </div>
    );
}

export default StockWarehouse;
