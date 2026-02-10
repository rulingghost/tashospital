import React, { useEffect, useState } from 'react'
import Sidebar, { SidebarItem } from '../navigation/Sidebar'
import { CalendarDays, FileText, Handshake, HeartPulse, MessageSquareMore, Outdent, Package2, ReceiptText, Settings, Users } from 'lucide-react'
import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useModals } from '../components/Utils/Modal'
import Modal from '../components/modals'
import { ToastContainer } from 'react-toastify'


const RootLayout = () => {

    const {t} = useTranslation()
    const modals = useModals()

    const [expanded, setExpanded] = useState(true) 
    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 1025) {
            setExpanded(false); // Ekran 1025px'ten küçükse, expanded'ı false yap
          } else {
            setExpanded(true); // Ekran 1025px veya daha büyükse, expanded'ı true yap
          }
        };
    
        // İlk renderda ve her ekran boyutu değiştiğinde kontrol et
        handleResize(); 
    
        // Resize event'ini dinle
        window.addEventListener("resize", handleResize);
    
        // Component unmount olduğunda event listener'ı temizle
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
    const location = useLocation();

 {/* <Sidebar expanded={expanded} setExpanded={setExpanded}>
            <SidebarItem icon={<MessageSquareMore size={20} />} text={"Lead"} active={location.pathname === "/"} path={"/"} />
                <SidebarItem icon={<Users size={20} />} text={t("patients")} active={location.pathname === "/patients"} path={"/patients"} />
                <SidebarItem icon={<CalendarDays size={20} />} text={t('calendar')} active={location.pathname === "/calendar"} path={"/calendar"} />
                <SidebarItem icon={<Package2 size={20} />} text={t('stock')} active={location.pathname === "/stock"} path={"/stock"} />
                <SidebarItem icon={<HeartPulse size={20} />} text={"E-Nabız"} active={location.pathname === "/enabiz"} path={"/enabiz"} />
                <SidebarItem icon={<ReceiptText size={20} />} text={t('invoice')} active={location.pathname === "/billing"} path={"/billing"} />
                <SidebarItem icon={<FileText size={20} />} text={t('reports')} active={location.pathname === "/reporting"} path={"/reporting"} />
                <SidebarItem icon={<Handshake size={20} />} text={t('HR')} active={location.pathname === "/hr"} path={"/human-resources"} />
                <SidebarItem icon={<Settings size={20} />} text={t('settings')} active={location.pathname === "/settings"} path={"/settings"} />
            </Sidebar> */}
  return (    
    <div className='w-screen h-screen flex justify-between overflow-hidden'>
        {modals.length > 0 && <Modal />}
        <div className={` h-full transition-all duration-300 ease-in-out ${
            !expanded ? "!w-16" : "w-[12%]"
            
        }`}>
            <Sidebar expanded={expanded} setExpanded={setExpanded}>
            <SidebarItem icon={<MessageSquareMore size={20} />} text={"Lead"} active={location.pathname === "/lead"} path={"/lead"} />
                <SidebarItem icon={<Users size={20} />} text={t("patients")} active={location.pathname === "/patients"} path={"/patients"} />
                <SidebarItem icon={<CalendarDays size={20} />} text={t('calendar')} active={location.pathname === "/calendar"} path={"/calendar"} />
                <SidebarItem icon={<Package2 size={20} />} text={t('stock')} active={location.pathname === "/stock"} path={"/stock"} />
                <SidebarItem icon={<HeartPulse size={20} />} text={"E-Nabız"} active={location.pathname === "/enabiz"} path={"/e-nabiz"}/>
                <SidebarItem icon={<ReceiptText size={20} />} text={t('invoice')} active={location.pathname === "/billing"} path={"/billing"}/>
                <SidebarItem icon={<FileText size={20} />} text={t('reports')} active={location.pathname === "/reporting"} path={"reporting"} />
                <SidebarItem icon={<Handshake size={20} />} text={t('HR')} active={location.pathname === "/hr"} path={"/human-resources"} />
                <SidebarItem icon={<Settings size={20} />} text={t('settings')} active={location.pathname === "/settings"} path={"settings"} />
            </Sidebar>
        </div>
       
        <div         
         className={`h-full transition-all duration-200 bg-slate-100 ${
            expanded ? "w-[88%]" : "!w-[calc(100%-64px)]"           
        }`}>
            <Outlet />
            <ToastContainer />
        </div>
    </div>
  )
}

export default RootLayout