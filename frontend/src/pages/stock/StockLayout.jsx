import React from 'react'
import { Outlet } from 'react-router-dom'
import TopMenu from '../../UI/TopMenu';
import { useTranslation } from 'react-i18next';

const StockLayout = () => {
    const { t } = useTranslation()

    const tabs = [
        { label: t("OVERVIEW"), active: true, url: 'overwiev' },
        { label: t("PRODUCTS"), active: false, url: 'products' },
        { label: t("WAREHOUSES"), active: false, url: 'warehouse' },
        { label: t("ORDERS"), active: false, url: 'orders' },
        { label: t("STATISTIC"), active: false, url: 'statistics' },       
      ];

  return (
    <div className='flex flex-col w-full h-full items-center justify-evenly bg-slate-100'>
        <div className='w-[95%] h-[14%] flex items-center'>
            <TopMenu tabs={tabs} submenu={false} />
        </div>
        <div className='w-[95%] h-[82%]'>
            <Outlet />
        </div>
    </div>
  )
}

export default StockLayout