import React from 'react';
import { Trash, Star, Download } from 'lucide-react';

const CVCard = ({ cv }) => {
  return (
    <div className='bg-slate-100 w-[350px] h-[550px] flex items-end'>
        <div key={cv.id} className="bg-white w-full h-[400px] shadow-lg rounded-3xl pt-16 pb-6 px-6 relative">        
            <div className="absolute top-4 left-4">
                <button className="text-gray-400 hover:text-red-500">
                <Trash className="w-5 h-5" />
                </button>
            </div>
            <div className="absolute top-4 right-4">
                <button className="text-gray-400 hover:text-yellow-400">
                <Star className="w-5 h-5" />
                </button>
            </div>
            
            {/* Profil Resmi */}
            <div className="absolute w-[260px] bg-slate-100 h-[260px] rounded-full -top-[160px] left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className="  ">
                    <div className="w-[230px] h-[230px] rounded-full bg-white">
                    <img src={cv.image} alt={cv.name} className="w-full h-full rounded-full" />
                    </div>
                </div>
            </div>
            
            <div className="text-center h-[87%] mt-16 flex flex-col">
                <p className="text-lg font-semibold text-gray-800">{cv.name}</p>
                <p className="text-sm text-cyan-600 font-semibold">{cv.department}</p>
                <div className="flex justify-center items-center mt-2">
                {[...Array(cv.stars)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 w-4 h-4" />
                ))}
                {[...Array(5 - cv.stars)].map((_, i) => (
                    <Star key={i} className="text-gray-300 w-4 h-4" />
                ))}
                </div>
                <p className="mt-4 text-gray-600 text-sm">{cv.description}</p>
                <p className="mt-auto text-cyan-500 text-sm font-semibold">{cv.date}</p>
                <button className="mt-2 mb-3 w-full bg-cyan-500 text-white py-2 rounded-lg flex justify-center items-center">
                CV İndir <Download className="ml-2 w-5 h-5" />
                </button>
            </div>
            </div>
    </div>
  );
};

export default CVCard;
