import React from 'react';
import { createModal } from '../components/Utils/Modal';

const Bodro = () => {
  return (
    <div className='w-full h-full flex flex-col bg-white rounded-xl p-6 overflow-hidden'>
      <div className='flex justify-between items-center mb-5'>
        <h2 className='text-xl font-semibold text-cyan-600 mb-4'>Bodro</h2>
        <button
            onClick={()=> createModal("bodro-modal")}
             className='bg-cyan-600 hover:bg-cyan-500 text-lg text-white font-semibold py-3 px-10 rounded-xl '>EKLE</button>
      </div>
      <div className='overflow-auto w-[1640px] bg-white shadow-md scrollbar-custom'>
        <table className='w-[2900px] border-collapse border border-gray-500 table-auto rounded-md'>
          <thead className='bg-gray-300'>
            <tr>
              <th className='border border-gray-300 px-1 py-2'>ADI SOYADI</th>
              <th className='border border-gray-300 px-1 py-2'>GİRİŞ TARİHİ</th>
              <th className='border border-gray-300 px-1 py-2'>ÇIKIŞ TARİHİ</th>
              <th className='border border-gray-300 px-1 py-2'>T.C. KİMLİK NO</th>
              <th className='border border-gray-300 px-1 py-2'>SSK SİCİL NO</th>
              <th className='border border-gray-300 px-1 py-2'>GÜN</th>
              <th className='border border-gray-300 px-1 py-2'>NORMAL KAZANÇ</th>
              <th className='border border-gray-300 px-1 py-2'>DİĞER KAZANÇ</th>
              <th className='border border-gray-300 px-1 py-2'>TOPLAM KAZANÇ</th>
              <th className='border border-gray-300 px-1 py-2'>SSK MATRAH</th>
              <th className='border border-gray-300 px-1 py-2'>SSK PRİMİ</th>
              <th className='border border-gray-300 px-1 py-2'>İŞSİZLİK PRİMİ</th>
              <th className='border border-gray-300 px-1 py-2'>G.V.M. (AYLIK)</th>
              <th className='border border-gray-300 px-1 py-2'>GELİR VERGİSİ</th>
              <th className='border border-gray-300 px-1 py-2'>ASGARİ GEÇ.İND.</th>
              <th className='border border-gray-300 px-1 py-2'>KALAN G.VER.</th>
              <th className='border border-gray-300 px-1 py-2'>DAMGA VERGİSİ</th>
              <th className='border border-gray-300 px-1 py-2'>ÖZEL KESİNTİ</th>
              <th className='border border-gray-300 px-1 py-2'>AGI Hariç Ücret</th>
              <th className='border border-gray-300 px-1 py-2'>NET İSTİHKAK</th>
              <th className='border border-gray-300 px-1 py-2'>İMZA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border border-gray-300 px-1 py-2'>TUĞBA BESİM</td>
              <td className='border border-gray-300 px-1 py-2'>12/09/2024</td>
              <td className='border border-gray-300 px-1 py-2'></td>
              <td className='border border-gray-300 px-1 py-2'>14228662438</td>
              <td className='border border-gray-300 px-1 py-2'></td>
              <td className='border border-gray-300 px-1 py-2'>30 Gün</td>
              <td className='border border-gray-300 px-1 py-2'>30.000,00</td>
              <td className='border border-gray-300 px-1 py-2'>13.496,56</td>
              <td className='border border-gray-300 px-1 py-2'>43.496,56</td>
              <td className='border border-gray-300 px-1 py-2'>30.000,00</td>
              <td className='border border-gray-300 px-1 py-2'>4.200,00</td>
              <td className='border border-gray-300 px-1 py-2'>300,00</td>
              <td className='border border-gray-300 px-1 py-2'>34.996,56</td>
              <td className='border border-gray-300 px-1 py-2'>2.699,17</td>
              <td className='border border-gray-300 px-1 py-2'>0,00</td>
              <td className='border border-gray-300 px-1 py-2'>2.699,17</td>
              <td className='border border-gray-300 px-1 py-2'>147,96</td>
              <td className='border border-gray-300 px-1 py-2'>0,00</td>
              <td className='border border-gray-300 px-1 py-2'>36.149,43</td>
              <td className='border border-gray-300 px-1 py-2'>36.149,43</td>
            </tr>
            <tr>
              <td colSpan={6} className='border border-gray-300 px-1 py-2'>Normal Gün: 24 Gün</td>
              <td className='border border-gray-300 px-1 py-2'>24.000,00</td>
              <td className='border border-gray-300 px-1 py-2'>---</td>
              <td colSpan={9} className='border border-gray-300 px-1 py-2'>Hafta Tatili: 4 Gün, 4.000,00</td>
              <td className='border border-gray-300 px-1 py-2'>---</td>
            </tr>
            <tr>
              <td colSpan={6} className='border border-gray-300 px-1 py-2'>Genel Tatil: 2 Gün</td>
              <td className='border border-gray-300 px-1 py-2'>2.000,00</td>
              <td className='border border-gray-300 px-1 py-2'>---</td>
              <td colSpan={9} className='border border-gray-300 px-1 py-2'>Fazla Mesai: 0 Saat, 0,00</td>
              <td className='border border-gray-300 px-1 py-2'>---</td>
            </tr>
            <tr>
              <td colSpan={6} className='border border-gray-300 px-1 py-2'>Gece Mesaisi: 0 Saat</td>
              <td className='border border-gray-300 px-1 py-2'>0,00</td>
              <td className='border border-gray-300 px-1 py-2'>---</td>
              <td colSpan={9} className='border border-gray-300 px-1 py-2'>Tatil Mesaisi: 0 Gün, 0,00</td>
              <td className='border border-gray-300 px-1 py-2'>---</td>
            </tr>
            <tr>
              <td colSpan={6} className='border border-gray-300 px-1 py-2'>Yemek: 30 Gün</td>
              <td className='border border-gray-300 px-1 py-2'>4.000,00</td>
              <td className='border border-gray-300 px-1 py-2'>---</td>
              <td colSpan={9} className='border border-gray-300 px-1 py-2'>Giyim Yardımı: 0 Gün, 9.496,56</td>
              <td className='border border-gray-300 px-1 py-2'>---</td>
            </tr>
            <tr>
                <td colSpan={4}></td>
                <td colSpan={1}><span className=' text-lg font-semibold '>Toplam:</span></td>
                <td colSpan={0}><span className=''>30 Gün,</span></td>
                <td colSpan={0}><span className=''>30.000,00,</span></td>
                <td colSpan={0}><span className=''>13.496,56,</span></td>
                <td colSpan={0}><span className=''>43.496,56,</span></td>
                <td colSpan={0}><span className=''>30.000,00,</span></td>
                <td colSpan={0}><span className=''>4.200,00,</span></td>
                <td colSpan={0}><span className=''>300,00,</span></td>
                <td colSpan={0}><span className=''>34.996,56,</span></td>
                <td colSpan={0}><span className=''>2.699,17,</span></td>
                <td colSpan={0}><span className=''>-,</span></td>
                <td colSpan={0}><span className=''>2.699,17,</span></td>
                <td colSpan={0}><span className=''>147,96,</span></td>
                <td colSpan={0}> <span className=''>-,</span></td>
                <td colSpan={0}><span className=''>36.149,43,</span></td>
                <td colSpan={0}><span className=''>36.149,43</span></td>               
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bodro;
