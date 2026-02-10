import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import i18n from "../i18n";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const SidebarContext = createContext();

export default function Sidebar({ children, setExpanded, expanded }) {

  const langHandle = async lang => {
    await i18n.changeLanguage(lang)
  }



  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate("/login");
  }


  return (
    <aside className={`h-screen transition-all`}>
      <nav className="h-full flex flex-col bg-cyan-600 border-r border-cyan-600 shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center border-b border-neutral-200  " >
          <img
            src="/img/sarfea-logo.png"
            className={`overflow-hidden transition-all brightness-0 invert ${
              expanded ? "w-32" : "w-10"
            }`}
            alt="Sarfea Logo"
          />
          {/* <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          /> */}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500"
          >
            {expanded ? <ChevronFirst color="white" /> : <ChevronLast color="white" />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 text-white">{children}</ul>
        </SidebarContext.Provider>
        <div className="w-full flex border-t border-b">
            <button onClick={() => langHandle('tr')} className="text-white w-[50%] font-semibold text-lg py-2 hover:bg-cyan-500 bg-cyan-600">TR</button>
            <div className="bg-white h-full w-[1px]"></div>
            <button onClick={() => langHandle('en')} className="text-white w-[50%] font-semibold text-lg py-2 hover:bg-cyan-500 bg-cyan-600">EN</button>
        </div>
        <div className="border-t border-cyan-600 flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-white">Süleyman TAŞ</h4>
              <span className="text-xs text-gray-200">s.tas@gmail.com</span>
            </div>
            <button onClick={() => handleLogout()}>
              <MoreVertical size={20} color="white" />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, path }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
    className={`
      relative flex items-center py-2 px-3 my-1
      font-medium rounded-md cursor-pointer
      transition-colors group
      ${
        active
          ? "bg-cyan-700 text-white"
          : "hover:bg-cyan-500 text-gray-100"
      }
      h-10
  `}
  >
    <Link 
      to={path} 
      className="w-full h-full flex items-center"
    >
      <div className="w-5 h-5 flex-shrink-0"> {/* İkonun boyutunu sabitler */}
        {icon}
      </div>
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-cyan-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-3 py-2 ml-6
          bg-cyan-600 text-white 
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap
          z-50
      `}
        >
          {text}
        </div>
      )}
    </Link>
  </li>
  );
}
