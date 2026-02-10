import React, { useState } from 'react'
import { motion } from 'framer-motion';
import TableComp2 from '../../UI/TableComp2';

const PatientListBill = () => {
    const [searchable, setSearchable] = useState(''); 
  const patientPayments = [
    {
      patientCode: "0205202401",
      patientName: "Ahmet Yılmaz",
      phone: "0532 123 4567",
      agreedPayment: "5.000,00 TL",
      remainingPayment: "2.500,00 TL"
    },
    {
      patientCode: "0205202402",
      patientName: "Ayşe Demir",
      phone: "0533 234 5678",
      agreedPayment: "7.500,00 TL",
      remainingPayment: "3.750,00 TL"
    },
    {
      patientCode: "0205202403",
      patientName: "Mehmet Kaya",
      phone: "0535 345 6789",
      agreedPayment: "3.200,00 TL",
      remainingPayment: "800,00 TL"
    },
    {
      patientCode: "0205202404",
      patientName: "Fatma Öztürk",
      phone: "0536 456 7890",
      agreedPayment: "6.800,00 TL",
      remainingPayment: "4.500,00 TL"
    },
    {
      patientCode: "0205202405",
      patientName: "Ali Şahin",
      phone: "0537 567 8901",
      agreedPayment: "4.200,00 TL",
      remainingPayment: "1.200,00 TL"
    }
  ];

  const thead = [
    { name: "Hasta Kodu", sortable: true },
    { name: "Hasta Adı", sortable: true },
    { name: "İletişim", sortable: true },
    { name: "Anlaşılan Ödeme", sortable: true },
    { name: "Kalan Ödeme", sortable: true }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}   
      animate={{ opacity: 1 }}
      className='w-full h-full flex flex-col items-center justify-evenly'
    >
      <TableComp2
        thead={thead}
        tbody={patientPayments.map(payment => [
          payment.patientCode,
          payment.patientName,
          payment.phone,
          payment.agreedPayment,
          payment.remainingPayment
        ])}
        searchable={searchable}
        setSearchable={setSearchable}
        tableTitle="HASTA ÖDEMELERİ"
      />  
    </motion.div>
  )
}

export default PatientListBill