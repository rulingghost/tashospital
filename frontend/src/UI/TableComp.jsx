import classNames from 'classnames';
import { ChevronsUpDown, Search, Plus, Printer, FolderGit2, ExternalLink } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createModal } from '../components/Utils/Modal';
import { t } from 'i18next';
import { TiArrowBack } from "react-icons/ti";
import { FaSortAmountDown } from "react-icons/fa";
import PaginationBar from './pagination/PaginationBar';

const TableComp = ({ thead, tbody, searchable, tableTitle, modal, detail, page, backButton, billing, scroll }) => {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState({});
  const [search, setSearch] = useState('');

  const filteredData = tbody
    .filter((items) =>
      items.some((item) =>
        item.toString().toLocaleLowerCase('TR').includes(search.toLocaleLowerCase())
      )
    )
    .sort((a, b) => {
      if (sorting?.orderBy === 'asc') {
        return a[sorting.key].toString().localeCompare(b[sorting.key]);
      }
      if (sorting?.orderBy === 'dsc') {
        return b[sorting.key].toString().localeCompare(a[sorting.key]);
      }
      return 0;
    });

  return (
    <div className='w-full h-full flex flex-col bg-gray-200 rounded-xl'>
      <div className='w-full h-full p-6 bg-white shadow-lg rounded-xl flex flex-col relative'>
        <div className='flex  items-center mb-4'>
          {backButton && <button onClick={()=> navigate("/human-resources/KPI-management")}  className='border-2 border-cyan-600 rounded-full'><TiArrowBack size={35} color='#0891b2' /></button>}
          <h2 className='text-xl ml-4 font-semibold text-cyan-600'>{tableTitle}</h2>
          <div className='flex space-x-3 ml-auto'>
            {billing && <div className='flex gap-x-5 mr-20'>
                <button className='flex items-center justify-center border-2 gap-x-2 border-gray-300 rounded-xl py-2 px-4 shadow-md hover:bg-slate-50'><FaSortAmountDown />Tutara Göre</button>
                <button className='flex items-center justify-center border-2 gap-x-2 border-gray-300 rounded-xl py-2 px-4 shadow-md hover:bg-slate-50'><FaSortAmountDown />Depertmana Göre</button>
                <button className='flex items-center justify-center border-2 gap-x-2 border-gray-300 rounded-xl py-2 px-4 shadow-md hover:bg-slate-50'><FaSortAmountDown />Tarihe Göre</button>
              </div>}
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
            <button 
              onClick={() => {
                {modal && createModal(modal)}                          
              }}
              className=" p-3 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div> 

        {searchable && (
          <div className='my-4 px-3 w-full shadow-md bg-gray-100 flex items-center border border-gray-300 rounded-lg'>
            <Search className="w-4 h-4 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type='text'
              placeholder={t("search")}
              className='h-10 outline-none bg-gray-100 text-sm px-4 w-full border-gray-300 rounded-lg'
            />
          </div>
        )}

        <div className='w-full flex-1 overflow-hidden'>
          {/* Masaüstü (Desktop) Görünüm */}
          <div className={`overflow-auto h-full  ${scroll ? 'w-[1620px] pr-[63px] scrollbar-custom' : 'w-full '}`}>
            <table className={`border-collapse table-fixed max-h-full ${scroll ? 'w-[2500px]' : 'w-full '}`}>
              <thead className='sticky top-0 bg-white'>
                <tr>
                  {thead.map((h, key) => (
                    <th
                      
                      className={`text-left text-sm font-semibold text-gray-700 border-b border-gray-300`}
                      key={key}
                      style={{
                        width: h?.width || "auto",
                        padding: '8px',
                        fontSize: '0.875rem',
                        lineHeight: '1.2rem',
                        display: h.name === "none" ? 'none' : 'table-cell',  
                        overflow: "hidden"     
                      }}
                    >
                      <div
                      className={`flex items-center 
                                      ${h.action ? "justify-center" : ""}`}>
                        <span>{h.name}</span>
                        {h.sortable && (
                          <button
                            className='ml-2 flex items-center'
                            onClick={() => {
                              if (sorting?.key === key) {
                                setSorting({
                                  key,
                                  orderBy: sorting.orderBy === 'asc' ? 'dsc' : 'asc',
                                });
                              } else {
                                setSorting({
                                  key,
                                  orderBy: 'asc',
                                });
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
                {filteredData.map((items, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={classNames('group hover:bg-slate-200', {
                      'bg-white': rowIndex % 2 === 0,
                      'bg-slate-100': rowIndex % 2 !== 0,
                    })}
                  >
                    {items.map((item, colIndex) => (
                      <td
                        onClick={colIndex === 0 && detail ? () => navigate(`/patients/${items[7]}`) : null}
                        className={classNames(
                          'text-left text-sm border-b border-slate-300/50',
                          { 'cursor-pointer': colIndex === 0 }
                        )}
                        key={colIndex}
                        style={{
                          padding: '8px', 
                          fontSize: '0.875rem', 
                          lineHeight: '1.2rem', 
                          whiteSpace: 'nowrap', 
                          overflow: 'hidden',
                          textOverflow: 'ellipsis', 
                          display: colIndex === detail ? 'none' : 'table-cell',
                        }}
                      >
                        {Array.isArray(item) && typeof item[1] === 'string' ? (
                          <div className='flex items-center gap-x-2.5'>
                            {item[0]}
                            <span>{item[1]}</span>
                          </div>
                        ) : Array.isArray(item) && React.isValidElement(item[0]) ? (
                          <div className='flex justify-end gap-x-2'>
                            {item.map((button, index) => (
                              <React.Fragment key={index}>{button}</React.Fragment>
                            ))}
                          </div>
                        ) : (
                          <p>{item}</p>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobil ve Tablet Görünüm */}
          <div className="block lg:hidden">
            {filteredData.map((items, rowIndex) => (
              <div key={rowIndex} className={classNames('p-4 border rounded-lg mb-2', {
                'bg-white': rowIndex % 2 === 0,
                'bg-gray-100': rowIndex % 2 !== 0,
              })}>
                {items.map((item, colIndex) => (
                  <div key={colIndex} className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">{thead[colIndex].name}</span>
                    <span className="text-sm text-gray-600">
                      {Array.isArray(item) && typeof item[1] === 'string' ? (
                        <div className='flex items-center gap-x-2.5'>
                          {item[0]}
                          <span>{item[1]}</span>
                        </div>
                      ) : (
                        <p>{item}</p>
                      )}
                    </span>
                  </div>
                ))}
                <div className="flex justify-end space-x-2">
                  <button className="bg-cyan-500 text-white px-3 py-1 rounded-md shadow text-xs">Düzenle</button>
                  <button className="bg-orange-500 text-white px-3 py-1 rounded-md shadow text-xs">Sil</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {page && <div className="w-full flex justify-between items-center ">
          <div></div>
          <div className="flex space-x-2">
            <PaginationBar />
            {/* <button className="bg-cyan-500 text-white px-3 py-1 rounded-md shadow text-xs">1</button>
            <button className="bg-white border border-gray-300 text-gray-500 px-3 py-1 rounded-md text-xs">2</button>
            <button className="bg-white border border-gray-300 text-gray-500 px-3 py-1 rounded-md text-xs">3</button>
            <button className="bg-white border border-gray-300 text-gray-500 px-3 py-1 rounded-md text-xs">4</button>
            <button className="bg-white border border-gray-300 text-gray-500 px-3 py-1 rounded-md text-xs">5</button>
            <button className="bg-white border border-gray-300 text-gray-500 px-3 py-1 rounded-md text-xs">6</button>
            <button className="bg-white border border-gray-300 text-gray-500 px-3 py-1 rounded-md text-xs">7</button> */}
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default TableComp;
