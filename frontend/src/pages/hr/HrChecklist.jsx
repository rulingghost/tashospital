import React from 'react'
import TableComp from '../../UI/TableComp';

const HrChecklist = () => {
    const thead = [
        { name: 'GÖREV YERİ', sortable: true },
        { name: 'PAZARTESİ', sortable: true },
        { name: 'SALI', sortable: true },
        { name: 'ÇARŞAMBA', sortable: true },
        { name: 'PERŞEMBE', sortable: true },
        { name: 'CUMA', sortable: true },
        { name: 'CUMARTESİ', sortable: true },
      ];

      const tbody = [
        ["Mesai Başlangıcı", "08:05", "08:00", <input placeholder='Saat Giriniz' type="text" className="outline-none py-3 border border-gray-400 rounded-2xl px-2 w-[50%]" />, "", "", ""],
        ["Kaydı Açılan Hasta Sayısı", "325 Hasta", "416 Hasta", <input placeholder='Hasta Sayısı' type="text" className="outline-none py-3 border border-gray-400 rounded-2xl px-2 w-[50%]" />, "", "", ""],
        ["Değer Yaratma Zamanı", "16:30", "-", <input placeholder='Saat Giriniz' type="text" className="outline-none py-3 border border-gray-400 rounded-2xl px-2 w-[50%]" />, "", "", ""],
        ["Değer Yaratma Zamanında Yapılanlar", "Eğitim Semineri Alındı", "-", <input placeholder='Etkinlik Sayısı' type="text" className="outline-none py-3 border border-gray-400 rounded-2xl px-2 w-[50%]" />, "", "", ""],
        ["Mesai Sonu", "18:30", "18:00", <input placeholder='Saat Giriniz' type="text" className="outline-none py-3 border border-gray-400 rounded-2xl px-2 w-[50%]" />, "", "", ""],
      ];
  return (
    <div className='w-full h-full p-4'>
        <TableComp
            thead={thead}
            tbody={tbody}
            searchable={true}
            backButton={true}
            tableTitle={"KONTROL LİSTESİ"}
            />
    </div>
  )
}

export default HrChecklist