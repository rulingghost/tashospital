import React from "react";
import TopMenu from "../../UI/TopMenu";
import { Outlet } from "react-router-dom";

const NabizLayout = () => {

    
    const tabs = [
        { label: "Hasta", active: true, url: 'patient' },
        { label: "Reçete", active: true, url: 'receipt' },
        { label: "Rapor", active: true, url: 'report' },
        { label: "Tahliller", active: true, url: 'analysis' },
        { label: "Radyolojik Gönrüntüler", active: true, url: 'radiology' },
        { label: "Patolojik Görüntüler", active: true, url: 'pathology' },
        { label: "Epikriz", active: true, url: 'epikriz' },
        
    ];

  return (
    <div className="flex flex-col w-full h-full items-center justify-evenly bg-slate-100 relative">
      <div className="w-[95%] h-[14%] flex">
        <TopMenu tabs={tabs} submenu={false} basePath={"/human-resources"} />
      </div>
      <div className="w-[95%] h-[82%]">
        <Outlet />
      </div>
    </div>
  );
};

export default NabizLayout;
