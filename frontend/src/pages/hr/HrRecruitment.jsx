import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import CVCard from '../../UI/CVCard';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HrRecruitment = () => {
  const { t } = useTranslation()
  const [selectedDepartment, setSelectedDepartment] = useState('Tümü');
  const [selectedGender, setSelectedGender] = useState('Tümü');
  const [selectedStars, setSelectedStars] = useState('Tümü');
  const [dropdownOpen, setDropdownOpen] = useState({ department: false, gender: false, stars: false });

  const cvData = [
    {
      id: 1,
      name: 'Seçkin SEYMEN',
      department: 'Satınalma',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '06.07.2024',
      image: 'https://via.placeholder.com/100',
      stars: 4,
      gender: 'Erkek',
    },
    {
      id: 2,
      name: 'Arslan ŞAHİN',
      department: 'Pazarlama',
      description: 'Incididunt ut labore et dolore magna aliqua.',
      date: '04.06.2024',
      image: 'https://via.placeholder.com/100',
      stars: 4,
      gender: 'Erkek',
    },
    {
      id: 3,
      name: 'Didem TAŞ',
      department: 'Muhasebe',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '16.05.2024',
      image: 'https://via.placeholder.com/100',
      stars: 5,
      gender: 'Kadın',
    },
    {
      id: 4,
      name: 'Berkcan ÇAKMAKÇI',
      department: 'Temizlik',
      description: 'Vestibulum ac diam sit amet quam vehicula elementum.',
      date: '12.04.2024',
      image: 'https://via.placeholder.com/100',
      stars: 3,
      gender: 'Erkek',
    },
    {
      id: 5,
      name: 'Melike ÖZŞEKER',
      department: 'Vezne',
      description: 'Sed porttitor lectus nibh.',
      date: '25.03.2024',
      image: 'https://via.placeholder.com/100',
      stars: 4,
      gender: 'Kadın',
    },
    {
      id: 6,
      name: 'Nur CAMGÖZ',
      department: 'Satınalma',
      description: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
      date: '19.02.2024',
      image: 'https://via.placeholder.com/100',
      stars: 5,
      gender: 'Kadın',
    },
    {
      id: 7,
      name: 'Salih ADIGÜZEL',
      department: 'Muhasebe',
      description: 'Pellentesque in ipsum id orci porta dapibus.',
      date: '06.01.2024',
      image: 'https://via.placeholder.com/100',
      stars: 4,
      gender: 'Erkek',
    },
    {
      id: 8,
      name: 'Leyla KAPLAN',
      department: 'Pazarlama',
      description: 'Nulla quis lorem ut libero malesuada feugiat.',
      date: '11.12.2023',
      image: 'https://via.placeholder.com/100',
      stars: 3,
      gender: 'Kadın',
    },
    {
      id: 9,
      name: 'Mehmet AKSOY',
      department: 'Vezne',
      description: 'Proin eget tortor risus.',
      date: '28.11.2023',
      image: 'https://via.placeholder.com/100',
      stars: 4,
      gender: 'Erkek',
    },
    {
      id: 10,
      name: 'Zeynep ŞAHİN',
      department: 'Muhasebe',
      description: 'Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.',
      date: '15.10.2023',
      image: 'https://via.placeholder.com/100',
      stars: 5,
      gender: 'Kadın',
    },
    {
      id: 11,
      name: 'Ali YILMAZ',
      department: 'Satınalma',
      description: 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
      date: '03.09.2023',
      image: 'https://via.placeholder.com/100',
      stars: 3,
      gender: 'Erkek',
    },
    {
      id: 12,
      name: 'Gizem YILDIRIM',
      department: 'Temizlik',
      description: 'Pellentesque in ipsum id orci porta dapibus.',
      date: '22.08.2023',
      image: 'https://via.placeholder.com/100',
      stars: 4,
      gender: 'Kadın',
    },
    {
      id: 13,
      name: 'Murat DEMİR',
      department: 'Pazarlama',
      description: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
      date: '09.07.2023',
      image: 'https://via.placeholder.com/100',
      stars: 5,
      gender: 'Erkek',
    },
    {
      id: 14,
      name: 'Elif KARACA',
      department: 'Vezne',
      description: 'Nulla porttitor accumsan tincidunt.',
      date: '27.06.2023',
      image: 'https://via.placeholder.com/100',
      stars: 3,
      gender: 'Kadın',
    },
    {
      id: 15,
      name: 'Ahmet KARA',
      department: 'Muhasebe',
      description: 'Vivamus suscipit tortor eget felis porttitor volutpat.',
      date: '14.05.2023',
      image: 'https://via.placeholder.com/100',
      stars: 4,
      gender: 'Erkek',
    },
  ];

  const filteredCVs = cvData.filter(cv => 
    (selectedDepartment === 'Tümü' || cv.department === selectedDepartment) &&
    (selectedGender === 'Tümü' || cv.gender === selectedGender) &&
    (selectedStars === 'Tümü' || cv.stars === parseInt(selectedStars))
  );

  const containerMotion = {        
    visible:{
        transition: {
            //delayChildren: 0.1,
            staggerChildren: 0.1
        }
    }
}
const itemMotion = {
    hidden: {
        opacity: 0,
        translateY: 20
    },
    visible:{
        opacity: 1,
        translateY: 0
    }
}

  return (
    <motion.div 
        variants={containerMotion}
        initial={"hidden"}   
        animate={"visible"}
        className="px-6 bg-slate-100 h-full"
    >
      <div className="bg-white flex items-center h-[13%] justify-between p-4 rounded-lg shadow-md">
        <div className="flex flex-col justify-between items-center">
          <h1 className="text-2xl font-semibold text-cyan-600">{t("RECRUITMENT")}</h1>
          <p className="text-gray-600">{t("Total")} {filteredCVs.length} CV {t("Found")}</p>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen({ ...dropdownOpen, department: !dropdownOpen.department })}
              className="bg-gray-100 border flex border-gray-300 text-gray-700 pl-4 pr-2 py-2 rounded-lg shadow"
            >
              {t("By Department")}
              <ChevronDown className='ml-1'/>
            </button>
            {dropdownOpen.department && (
              <div className="absolute mt-2 w-full bg-gray-100 border border-gray-200 shadow-lg rounded-lg z-10">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {setSelectedDepartment('Tümü'); setDropdownOpen({ ...dropdownOpen, department: false });}}>{t("All")}</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {setSelectedDepartment('Muhasebe'); setDropdownOpen({ ...dropdownOpen, department: false });}}>{t("Accounting")}</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {setSelectedDepartment('Satınalma'); setDropdownOpen({ ...dropdownOpen, department: false });}}>{t("Purchasing")}</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {setSelectedDepartment('Pazarlama'); setDropdownOpen({ ...dropdownOpen, department: false });}}>{t("Marketing")}</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {setSelectedDepartment('Vezne'); setDropdownOpen({ ...dropdownOpen, department: false });}}>{t("Cashier")}</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {setSelectedDepartment('Temizlik Elemanı'); setDropdownOpen({ ...dropdownOpen, department: false });}}>{t("Cleaning Staff")}</li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen({ ...dropdownOpen, gender: !dropdownOpen.gender })}
              className="bg-gray-100 flex border border-gray-300 text-gray-700 pl-4 pr-2 py-2 rounded-lg shadow"
            >
              {t("By Gender")}
              <ChevronDown className='ml-1'/>
            </button>
            {dropdownOpen.gender && (
              <div className="absolute mt-2 w-full bg-gray-100 border border-gray-200 shadow-lg rounded-lg z-10">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {setSelectedGender('Tümü'); setDropdownOpen({ ...dropdownOpen, gender: false });}}>{t("All")}</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {setSelectedGender('Erkek'); setDropdownOpen({ ...dropdownOpen, gender: false });}}>{t("Male")}</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {setSelectedGender('Kadın'); setDropdownOpen({ ...dropdownOpen, gender: false });}}>{t("Female")}</li>
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen({ ...dropdownOpen, stars: !dropdownOpen.stars })}
              className="bg-gray-100 flex border border-gray-300 text-gray-700 pl-4 pr-2 py-2 rounded-lg shadow"
            >
              {t("By Star")}
              <ChevronDown className='ml-1'/>
            </button>
            {dropdownOpen.stars && (
              <div className="absolute mt-2 w-full bg-gray-100 border border-gray-200 shadow-lg rounded-lg z-10">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {setSelectedStars('Tümü'); setDropdownOpen({ ...dropdownOpen, stars: false });}}>{t("All")}</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {setSelectedStars('5'); setDropdownOpen({ ...dropdownOpen, stars: false });}}>5 {t("Star")}</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {setSelectedStars('4'); setDropdownOpen({ ...dropdownOpen, stars: false });}}>4 {t("Star")}</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {setSelectedStars('3'); setDropdownOpen({ ...dropdownOpen, stars: false });}}>3 {t("Star")}</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {setSelectedStars('2'); setDropdownOpen({ ...dropdownOpen, stars: false });}}>2 {t("Star")}</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={() => {setSelectedStars('1'); setDropdownOpen({ ...dropdownOpen, stars: false });}}>1 {t("Star")}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-1 h-[87%] lg:grid-cols-4 gap-6 overflow-scroll">
      {filteredCVs.map((cv) => (
          <motion.div variants={itemMotion} className='mt-2'>
            <CVCard key={cv.id} cv={cv} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HrRecruitment