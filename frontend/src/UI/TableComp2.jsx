import classNames from 'classnames';
import { ChevronsUpDown, Search, Plus, Printer, FolderGit2, ExternalLink } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createModal } from '../components/Utils/Modal';
import { t } from 'i18next';
import { TiArrowBack } from "react-icons/ti";
import { FaSortAmountDown } from "react-icons/fa";
import PaginationBar from './pagination/PaginationBar';

const TableComp2 = ({ thead, tbody, searchable, tableTitle, modal, page, backButton, billing, scroll, printDiv,
  setActivePage, activePage, setSearchable, orderingValue, setOrderingValue

 }) => {
  const navigate = useNavigate();
   const [sorting, setSorting] = useState({});
  //  const [search, setSearch] = useState('');  
  
  return (
    <div className='w-full h-full flex flex-col bg-gray-200 rounded-xl'>
      <div className='w-full h-full p-6 bg-white shadow-lg rounded-xl flex flex-col relative'>
        <div className='flex  items-center mb-4'>
          {backButton && <button onClick={()=> navigate("/human-resources/KPI-management")}  className='border-2 border-cyan-600 rounded-full'><TiArrowBack size={35} color='#0891b2' /></button>}
          <h2 className='text-xl ml-4 font-semibold text-cyan-600'>{tableTitle}</h2>
          <div className='flex space-x-3 ml-auto'>
            {billing && <div className='flex gap-x-5 mr-20'>
                <button className='flex items-center justify-center border-2 gap-x-2 border-gray-300 rounded-xl py-2 px-4 shadow-md hover:bg-slate-50'><FaSortAmountDown />{t("By Amount")}</button>
                <button className='flex items-center justify-center border-2 gap-x-2 border-gray-300 rounded-xl py-2 px-4 shadow-md hover:bg-slate-50'><FaSortAmountDown />{t("By Department")}</button>
                <button className='flex items-center justify-center border-2 gap-x-2 border-gray-300 rounded-xl py-2 px-4 shadow-md hover:bg-slate-50'><FaSortAmountDown />{t("By Date")}</button>
              </div>}
            {printDiv && <>
              <button 
                className="p-2 rounded-full bg-transparent text-gray-400 hover:text-gray-500">
                <FolderGit2 className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-transparent text-gray-400 hover:text-gray-500">
                <ExternalLink className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-transparent text-gray-400 hover:text-gray-500">
                <Printer className="w-4 h-4" />
              </button>
            </>}
            {modal && <button 
              onClick={() => {
                {modal && createModal(modal)}                          
              }}
              className=" p-3 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg">
              <Plus className="w-4 h-4" />
            </button>}
          </div>
        </div> 

        {searchable != null && (
          <div className='my-4 px-3 w-full shadow-md bg-gray-100 flex items-center border border-gray-300 rounded-lg'>
            <Search className="w-4 h-4 text-gray-500" />
            <input
              value={searchable}
              onChange={(e) => setSearchable(e.target.value)}
              type='text'
              placeholder={t("search")}
              className='h-10 outline-none bg-gray-100 text-sm px-4 w-full border-gray-300 rounded-lg'
            />
          </div>
        )}

        <div className='w-full flex-1 overflow-hidden'>
          <div className={`overflow-auto h-full w-full scrollbar-custom`}>
            <table className={`border-collapse table-auto max-h-full w-full`}>
              <thead className='sticky top-0 bg-white'>
                <tr>
                  {thead.map((h, key) => (
                    <th
                      
                      className={`text-left text-sm font-semibold text-gray-700 border-b border-gray-300 text-nowrap`}
                      key={key}
                      style={{
                        padding: '8px',
                        fontSize: '0.875rem',
                        lineHeight: '1.2rem',  
                        display: h.name === "none" ? 'none' : 'table-cell',  
                        width: h.width || 'auto',         
                        maxWidth: h.maxWidth || 'none',   
                        minWidth: h.minWidth || 'auto',      
                      }}
                    >
                      <div className={`flex items-center 
                                      ${h.action ? "justify-center" : ""}`}>
                        <span>{h.name}</span>
                        {h.sortable && (
                          <button
                            className='ml-2 flex items-center'
                            onClick={() => {
                              if(orderingValue === h.value){
                                setOrderingValue("-" + h.value)
                              }else{
                                setOrderingValue(h.value)
                              }                              
                            }}
                          >
                            <ChevronsUpDown className='w-4 h-4 text-gray-500' />
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {tbody.map((items, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={classNames('group hover:bg-slate-200 min-h-14', {
                      'bg-white': rowIndex % 2 === 0,
                      'bg-slate-100': rowIndex % 2 !== 0,
                    })}
                  >
                    {items.map((item, colIndex) => (
                      <td 
                        title={item}   
                        key={colIndex}                    
                        className={classNames(
                          'text-left text-sm border-b border-slate-300/50 p-2 whitespace-nowrap overflow-hidden text-ellipsis',                          
                        )}                                                
                      >                        
                        {item}                     
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {page > 10 && 
          <div className="w-full flex justify-end items-center ">          
            <div className="flex space-x-2">
              <PaginationBar setActivePage={setActivePage} activePage={activePage} page={page} />
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default TableComp2;
