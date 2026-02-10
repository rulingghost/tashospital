import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "./HrHierarchy.css"
import { GiHamburgerMenu } from "react-icons/gi";
import HierarchtList from './hrComponents/HierarchtList';



const HrHierarchy = () => {
  const [data, setData] = useState([
    
    {
      title: 'MUHASEBE',
      people: [
        { 
          name: 'Seçkin SEYMEN', 
          image: '/img/4.jpg' 
        },
        { 
          name: 'Ahmet KAPAKÇI', 
          image: '/img/7.jpg' 
        },
        { 
          name: 'Yalçın SELİMOĞLU', 
          image: '/img/9.jpg' 
        },
      ],
      extra: 5,
    },
    {
      title: 'PAZARLAMA',
      people: [
        { 
          name: 'Nazan SATIŞOĞLU', 
          image: '/img/2.jpg' 
        },
        { 
          name: 'Alper ÜNLÜ', 
          image: '/img/6.jpg' 
        },
      ],
    },
    {
      title: 'SATIŞ',
      people: [
        { 
          name: 'Aylin GÜMÜŞÇÜ', 
          image: '/img/3.jpg' 
        },
        { name: 'Selin TAŞ', 
          image: '/img/8.jpg' 
        },
        { name: 'Buğra YAĞUŞ', 
          image: '/img/6.jpg' 
        },   
        { 
          name: 'Ayça ÖZEFE', 
          image: '/img/3.jpg' 
        },
        { name: 'Sümeyye EROĞLU', 
          image: '/img/2.jpg' 
        },
        { name: 'Recep MEHMETOĞLU', 
          image: '/img/6.jpg' 
        },    
      ],
    },
    {
      title: 'VEZNE',
      people: [
        { 
          name: 'Tuğçe DAMLALI', 
          image: '/img/5.jpg' 
        }
      ],
    },
  ])

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="tree"
    >    	
    <ul>
      <li className='text-nowrap'>
        <div className="level-1 rectangle bg-slate-50 rounded-lg shadow-lg max-w-72 mx-auto border-2 border-cyan-600">
          <div className="flex items-center justify-between relative  pb-2">        
              <h2 className="text-white font-bold text-lg py-1 pl-3 pr-6 rounded-br-3xl bg-cyan-600">YÖNETİCİ</h2>          
          </div>
          <div className="flex items-center justify-around my-4 mx-3">
              <div className="text-center">
                  <img src="/img/1.jpg" alt="Selim GÜRSES" className="rounded-full w-20 h-20 mx-auto"/>
                  <p className="mt-2 text-sm font-medium">Selim GÜRSES</p>
              </div>
          </div>
        </div>
        <ul>
        { data.map((item, index)=> (
          <li key={index}>
            <div className="bg-slate-50 rounded-lg shadow-lg lg:w-[320px] sm:w-[100px] mx-auto border-2 border-cyan-600">
              <div className="flex items-center justify-between relative  pb-2">        
                  <h2 className="text-white font-bold text-lg py-1 pl-3 pr-6 rounded-br-3xl bg-cyan-600">{item.title}</h2>
                  <div className="flex items-center gap-2">
                      <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center">{item.people.length}</span>
                      <div className="bg-cyan-600 flex items-center px-3 mr-5 rounded-l-full rounded-r-full text-white">
                          <HierarchtList data={item} />
                      </div>
                  </div>
              </div>
              <div className="flex items-center justify-around my-4 mx-3">
                {item.people.slice(0, 2).map((item2, index)=>(
                  <div key={index} className="text-center">
                    <img src={item2.image} alt="Selim GÜRSES" className="rounded-full w-20 h-20 mx-auto"/>
                    <p className="mt-2 text-sm font-medium">{item2.name}</p>
                  </div>              
                ))}                                   
              </div>
            </div>      
          </li>
          ))      
        }   
        </ul>
      </li>
    </ul>	

    </motion.div>
  );
};

export default HrHierarchy;
