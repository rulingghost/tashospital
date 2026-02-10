import { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import classNames from 'classnames';

import { BiLogOut } from 'react-icons/bi';
import { LiaWarehouseSolid, LiaFileInvoiceSolid, LiaHandshake } from "react-icons/lia";
import { TbReport } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import { PiHeartbeatBold } from "react-icons/pi";
import { SlCalender, SlPeople } from "react-icons/sl";
import { IoHomeOutline, IoHomeSharp, IoSettingsOutline, IoSettingsSharp, IoShareSocial } from 'react-icons/io5';
import { FaCalendarAlt, FaChartPie, FaHandshake, FaHeartbeat, FaHospitalUser, FaWarehouse } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";

const LeftNav = ({close , setClose}) => {  
    
    const [hidden, setHidden] = useState(false);
    
    useEffect(() => {
      if (close) {
        const timeout = setTimeout(() => {
          setHidden(true);
        }, 0);   
        return () => clearTimeout(timeout);
      }else{
        const timeout = setTimeout(() => {
          setHidden(false);
        }, 260);   
        return () => clearTimeout(timeout);
      }
    }, [close]);
  
    // const [rotatedCategories, setRotatedCategories] = useState(false);
    // const [rotatedPost, setRotatedPost] = useState(false);
    // const [rotatedPlugins, setRotatedPlugins] = useState(false);
  
    return (
      <>
        <div className={classNames("sidebar h-full  bg-cyan-500 fixed top-0 left-0 z-10 transition-all ease-in-out duration-500",
            close ? "w-[78px]" : "",
            "w-[78px] sm:block sm:fixed lg:w-[260px]"
        )}>
          <div className={classNames("h-[60px] w-full flex items-center")}>
            <div onClick={()=>setClose(!close)} className="flex items-center justify-center h-12 min-w-[78px] text-center text-white text-[30px] leading-[50px]">
              <GiHamburgerMenu className='w-[26px] h-[26px]'/>
            </div>
            <span className={classNames("text-[22px] text-white font-semibold transition ease-in-out delay-100 duration-300",
              hidden ? "delay-0 hidden pointer-events-none" : "" 
            )}>Hastane CRM</span>
          </div>
          <ul className={classNames("nav-links h-full pt-[30px] pb-[150px] overflow-auto no-scrollbar",
            close ? "overflow-visible" : ""
          )}>

              <li>
                  <div className="iocn-link">
                    <NavLink to={"/"}>
                      <div className="h-[50px] w-[78px] flex items-center justify-center text-white cursor-pointer transition-all duration-300">
                        <IoHomeSharp className='w-[20px] h-[20px]'/>
                      </div>                
                      <span className={classNames("link_name",{
                          "delay-0 opacity-0 pointer-events-none": close,
                          "hidden": hidden
                        }
                      )}>Anasayfa</span>
                    </NavLink>
                    <ul className={classNames("sub-menu blank",{
                      "closed": close
                    })}>
                      <li><a className={classNames("link_name",
                        close ? "opacity-0 pointer-events-none" : ""
                      )} href="#">Anasayfa</a></li>
                    </ul>
                  </div>
                </li>

                <li>
                  <div className="iocn-link">
                    <NavLink to={"/lead"}>
                      <div className="h-[50px] w-[78px] flex items-center justify-center text-white cursor-pointer transition-all duration-300">
                        <IoShareSocial className='w-[20px] h-[20px]'/>
                      </div>                
                      <span className={classNames("link_name",{
                          "delay-0 opacity-0 pointer-events-none": close,
                          "hidden": hidden
                        }
                      )}>Lead</span>
                    </NavLink>
                    <ul className={classNames("sub-menu blank",{
                      "closed": close
                    })}>
                      <li><a className={classNames("link_name",
                        close ? "opacity-0 pointer-events-none" : ""
                      )} href="#">Lead</a></li>
                    </ul>
                  </div>
                </li>
  
                <li>
                  <div className="iocn-link">
                    <NavLink to={"/hasta"}>
                    <div className="h-[50px] w-[78px] flex items-center justify-center text-white cursor-pointer transition-all duration-300">
                      <FaHospitalUser className='w-[20px] h-[20px]'/>
                    </div>   
                      <span className={classNames("link_name",{
                          "delay-0 opacity-0 pointer-events-none": close,
                          "hidden": hidden
                        }
                    )}>Hasta</span>
                    </NavLink>
                    <ul className={classNames("sub-menu blank",{
                      "closed": close
                    })}>
                      <li><a className={classNames("link_name",
                        close ? "opacity-0 pointer-events-none" : ""
                      )} href="#">Hasta</a></li>
                    </ul>                    
                  </div>                  
                </li>
                <li>
                  <div className="iocn-link">
                    <NavLink to={"#"}>
                    <div className="h-[50px] w-[78px] flex items-center justify-center text-white cursor-pointer transition-all duration-300">
                      <FaCalendarAlt className='w-[20px] h-[20px]'/>
                    </div>   
                      <span className={classNames("link_name",{
                          "delay-0 opacity-0 pointer-events-none": close,
                          "hidden": hidden
                        } 
                    )}>Takvim</span>
                    </NavLink>
                    <ul className={classNames("sub-menu blank",{
                      "closed": close
                    })}>
                      <li><a className={classNames("link_name",
                        close ? "opacity-0 pointer-events-none" : ""
                      )} href="#">Takvim</a></li>
                    </ul>  
                  </div>                  
                </li>
                <li>
                  <div className='iocn-link'>
                    <NavLink to={"/stok"}>
                    <div className="h-[50px] w-[78px] flex items-center justify-center text-white cursor-pointer transition-all duration-300">
                        <FaWarehouse className='w-[20px] h-[20px]'/>
                      </div>   
                      <span className={classNames("link_name",{
                          "delay-0 opacity-0 pointer-events-none": close,
                          "hidden": hidden
                        }
                      )}>Stok</span>
                    </NavLink>
                    <ul className={classNames("sub-menu blank",{
                      "closed": close
                    })}>
                      <li><a className="link_name" href="#">Stok</a></li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className='iocn-link'>
                    <NavLink to={"/"}>
                    <div className="h-[50px] w-[78px] flex items-center justify-center text-white cursor-pointer transition-all duration-300">
                        <FaHeartbeat className='w-[20px] h-[20px]'/>
                      </div>   
                      <span className={classNames("link_name",{
                          "delay-0 opacity-0 pointer-events-none": close,
                          "hidden": hidden
                        }
                      )}>E-Nabız</span>
                    </NavLink>
                    <ul className={classNames("sub-menu blank",{
                      "closed": close
                    })}>
                      <li><a className="link_name" href="#">E-Nabız</a></li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="iocn-link">
                    <NavLink to={"/"}>
                    <div className="h-[50px] w-[78px] flex items-center justify-center text-white cursor-pointer transition-all duration-300">
                      <RiBillFill className='w-[20px] h-[20px]'/>
                    </div>   
                      <span className={classNames("link_name",{
                          "delay-0 opacity-0 pointer-events-none": close,
                          "hidden": hidden
                        }
                    )}>Fatura</span>
                    </NavLink>
                    <ul className={classNames("sub-menu blank",{
                      "closed": close
                    })}>
                      <li><a className="link_name" href="#">Fatura</a></li>
                    </ul>
                  </div>
                  
                </li>
                <li>
                  <div className="iocn-link">
                    <NavLink to={"/"}>
                    <div className="h-[50px] w-[78px] flex items-center justify-center text-white cursor-pointer transition-all duration-300">
                        <FaChartPie className='w-[20px] h-[20px]'/>
                      </div>   
                      <span className={classNames("link_name",{
                          "delay-0 opacity-0 pointer-events-none": close,
                          "hidden": hidden
                        }
                      )}>Raporlama</span>
                    </NavLink>
                    <ul className={classNames("sub-menu blank",{
                      "closed": close
                    })}>
                      <li><a className="link_name" href="#">Raporlama</a></li>
                    </ul>
                  </div>
                </li>
                <li>
                 <div className="iocn-link">
                  <NavLink to={"/insan-kaynaklari"}>
                    <div className="h-[50px] w-[78px] flex items-center justify-center text-white cursor-pointer transition-all duration-300">
                        <FaHandshake  className='w-[20px] h-[20px]'/>
                      </div>   
                      <span className={classNames("link_name",{
                          "delay-0 opacity-0 pointer-events-none": close,
                          "hidden": hidden
                        }
                      )}>İnsan Kaynakları</span>
                    </NavLink>
                    <ul className={classNames("sub-menu blank",{
                      "closed": close
                    })}>
                      <li><a className="link_name" href="#">İnsan Kaynakları</a></li>
                    </ul>
                 </div>
                </li>
                <li>
                  <div className="iocn-link">
                    <NavLink to={"/"}>
                    <div className="h-[50px] w-[78px] flex items-center justify-center text-white cursor-pointer transition-all duration-300">
                        <IoSettingsSharp className='w-[20px] h-[20px]'/>
                      </div>   
                      <span className={classNames("link_name",{
                          "delay-0 opacity-0 pointer-events-none": close,
                          "hidden": hidden
                        }
                      )}>Ayarlar</span>
                    </NavLink>
                    <ul className={classNames("sub-menu blank",{
                      "closed": close
                    })}>
                      <li><a className="link_name" href="#">Ayarlar</a></li>
                    </ul>
                  </div>
                </li>
                <li>
              <div className={classNames("py-[12px] fixed bottom-0 w-[260px] flex items-center justify-between bg-cyan-600 transition-all ease-in-out duration-500",{
                "bg-transparent w-[78px]": close
              })}>
                <div className="flex items-center">
                  <img className={classNames("h-[52px] w-[52px] object-cover rounded-2xl mr-[14px] ml-[12px] bg-cyan-700 transition-all ease-in-out duration-500",{
                    "p-[10px]": close
                  })} src="images/profile.jpg" alt="profileImg"/>
                </div>
                <div>
                  <div className={classNames("text-white text-[18px] font-medium whitespace-nowrap",{
                    "hidden": hidden
                  })}>Prem Shahi</div>
                  <div className={classNames("text-white text-[12px] font-medium whitespace-nowrap",{
                    "hidden": hidden
                  })}>Web Desginer</div>
                </div>
                <div className={classNames("h-[50px] w-[78px] flex items-center justify-center text-white cursor-pointer transition-all duration-300",{
                  "hidden": hidden
                })}>
                  <BiLogOut className='w-[20px] h-[20px]'/>
                </div> 
              </div>
            </li>
          </ul>
        </div>
        
      </>
    )
}

export default LeftNav