import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import TableComp2 from '../../UI/TableComp2';

const BillingExpense = () => {
  const [searchable, setSearchable] = useState('');
  const [expenses, setExpenses] = useState([
    {
      itemName: "Antibiyotik İlaç (100mg)",
      quantity: "250 Kutu",
      price: "12.500,00 TL"
    },
    {
      itemName: "Dezenfektan (5L)",
      quantity: "50 Bidon",
      price: "7.500,00 TL"
    },
    {
      itemName: "Cerrahi Eldiven",
      quantity: "1000 Çift",
      price: "4.200,00 TL"
    },
    {
      itemName: "Steril Gazlı Bez",
      quantity: "500 Paket",
      price: "3.800,00 TL"
    },
    {
      itemName: "Yüzey Temizleyici (10L)",
      quantity: "30 Bidon",
      price: "2.700,00 TL"
    },
    {
      itemName: "Tek Kullanımlık Önlük",
      quantity: "300 Adet",
      price: "9.000,00 TL"
    },
    {
      itemName: "Tıbbi Atık Poşeti",
      quantity: "1000 Adet",
      price: "5.500,00 TL"
    }
  ]);

  useEffect(() => {
    // LocalStorage'dan giderleri al
    const savedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    if (savedExpenses.length > 0) {
      setExpenses(prevExpenses => [...prevExpenses, ...savedExpenses]);
    }
  }, []);

  const thead = [
    { name: "Detay", sortable: true },
    { name: "Miktar", sortable: true },
    { name: "Tutar", sortable: true }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}   
      animate={{ opacity: 1 }}
      className='w-full h-full flex flex-col items-center justify-evenly'
    >
      <TableComp2
        thead={thead}
        tbody={expenses.map(expense => [
          expense.itemName,
          expense.quantity,
          expense.price
        ])}
        searchable={searchable}
        setSearchable={setSearchable}
        tableTitle="HASTANE GİDERLERİ"
        modal={"expense"}
      />  
    </motion.div>
  )
}

export default BillingExpense