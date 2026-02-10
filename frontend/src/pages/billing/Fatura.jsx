import React, { useState } from 'react'
import { motion } from 'framer-motion';
import TableComp2 from '../../UI/TableComp2';
import { createModal } from '../../components/Utils/Modal';

const Fatura = () => {
  const [searchable, setSearchable] = useState('');

  const invoices = [
    {
      invoiceType: "SATIŞ",
      customizationNo: "TR1.2",
      scenario: "EARSIVFATURA",
      billNo: "GIB2024000000001",
      company: "Acıbadem Hastanesi",
      address: "ALAVARDI MAH. YAKA CAD. NO:80 MERAM/KONYA TÜRKİYE",
      taxOffice: "MEVLANA VERGİ DAİRESİ MÜD.",
      taxNumber: "0961361190",
      phone: "0332 444 55 66",
      email: "muhasebe@acibadem.com.tr",
      billDate: "15-01-2024",
      total: "125.000,00",
      issuerName: "MEHMET ENES DOĞAN",
      issuerAddress: "YAYLA MAH. YOZGAT BUL. No:208 Kapı No:20 K.ÖRENİ Ankara / Türkiye",
      issuerPhone: "05445722634",
      issuerEmail: "mehmetenes600@gmail.com",
      issuerTaxOffice: "YILDIRIM/BEYAZIT VERGİ DAİRESİ MÜD.",
      issuerTaxNumber: "26548351688",
      items: [
        {
          lineNo: 1,
          description: "Ameliyat Hizmetleri",
          quantity: "1",
          unit: "Adet",
          unitPrice: "125.000,00",
          discountRate: "0,00",
          discountAmount: "0,00",
          discountReason: "İskonto",
          vatRate: "20,00",
          vatAmount: "25.000,00",
          totalAmount: "125.000,00"
        }
      ],
      subtotal: "125.000,00",
      totalDiscount: "0,00",
      grandTotal: "150.000,00",
    },
    {
      invoiceType: "SATIŞ",
      customizationNo: "TR1.2",
      scenario: "EARSIVFATURA",
      billNo: "GIB2024000000002",
      company: "Medical Park Hastanesi",
      address: "SELÇUK MAH. HASTANE CAD. NO:55 SELÇUKLU/KONYA TÜRKİYE",
      taxOffice: "SELÇUKLU VERGİ DAİRESİ MÜD.",
      taxNumber: "1234567890",
      phone: "0332 333 44 55",
      email: "muhasebe@medicalpark.com.tr",
      billDate: "22-01-2024",
      total: "85.500,00",
      issuerName: "MEHMET ENES DOĞAN",
      issuerAddress: "YAYLA MAH. YOZGAT BUL. No:208 Kapı No:20 K.ÖRENİ Ankara / Türkiye",
      issuerPhone: "05445722634",
      issuerEmail: "mehmetenes600@gmail.com",
      issuerTaxOffice: "YILDIRIM/BEYAZIT VERGİ DAİRESİ MÜD.",
      issuerTaxNumber: "26548351688",
      items: [
        {
          lineNo: 1,
          description: "Laboratuvar Hizmetleri",
          quantity: "1",
          unit: "Adet",
          unitPrice: "85.500,00",
          discountRate: "0,00",
          discountAmount: "0,00",
          discountReason: "İskonto",
          vatRate: "20,00",
          vatAmount: "17.100,00",
          totalAmount: "85.500,00"
        }
      ],
      subtotal: "85.500,00",
      totalDiscount: "0,00",
      grandTotal: "102.600,00",
    },
    {
      invoiceType: "SATIŞ",
      customizationNo: "TR1.2",
      scenario: "EARSIVFATURA",
      billNo: "GIB2024000000003",
      company: "Medicana Hastanesi",
      address: "FATİH MAH. SAĞLIK CAD. NO:120 KARATAY/KONYA TÜRKİYE",
      taxOffice: "KARATAY VERGİ DAİRESİ MÜD.",
      taxNumber: "9876543210",
      phone: "0332 222 33 44",
      email: "muhasebe@medicana.com.tr",
      billDate: "01-02-2024",
      total: "167.800,00",
      issuerName: "MEHMET ENES DOĞAN",
      issuerAddress: "YAYLA MAH. YOZGAT BUL. No:208 Kapı No:20 K.ÖRENİ Ankara / Türkiye",
      issuerPhone: "05445722634",
      issuerEmail: "mehmetenes600@gmail.com",
      issuerTaxOffice: "YILDIRIM/BEYAZIT VERGİ DAİRESİ MÜD.",
      issuerTaxNumber: "26548351688",
      items: [
        {
          lineNo: 1,
          description: "Yoğun Bakım Hizmetleri",
          quantity: "1",
          unit: "Adet",
          unitPrice: "167.800,00",
          discountRate: "0,00",
          discountAmount: "0,00",
          discountReason: "İskonto",
          vatRate: "20,00",
          vatAmount: "33.560,00",
          totalAmount: "167.800,00"
        }
      ],
      subtotal: "167.800,00",
      totalDiscount: "0,00",
      grandTotal: "201.360,00",
    },
    {
      invoiceType: "SATIŞ",
      customizationNo: "TR1.2",
      scenario: "EARSIVFATURA",
      billNo: "GIB2024000000004",
      company: "Memorial Hastanesi",
      address: "BOSNA MAH. HASTANE CAD. NO:90 SELÇUKLU/KONYA TÜRKİYE",
      taxOffice: "SELÇUKLU VERGİ DAİRESİ MÜD.",
      taxNumber: "5678901234",
      phone: "0332 111 22 33",
      email: "muhasebe@memorial.com.tr",
      billDate: "10-02-2024",
      total: "93.250,00",
      issuerName: "MEHMET ENES DOĞAN",
      issuerAddress: "YAYLA MAH. YOZGAT BUL. No:208 Kapı No:20 K.ÖRENİ Ankara / Türkiye",
      issuerPhone: "05445722634",
      issuerEmail: "mehmetenes600@gmail.com",
      issuerTaxOffice: "YILDIRIM/BEYAZIT VERGİ DAİRESİ MÜD.",
      issuerTaxNumber: "26548351688",
      items: [
        {
          lineNo: 1,
          description: "Radyoloji Hizmetleri",
          quantity: "1",
          unit: "Adet",
          unitPrice: "93.250,00",
          discountRate: "0,00",
          discountAmount: "0,00",
          discountReason: "İskonto",
          vatRate: "20,00",
          vatAmount: "18.650,00",
          totalAmount: "93.250,00"
        }
      ],
      subtotal: "93.250,00",
      totalDiscount: "0,00",
      grandTotal: "111.900,00",
    },
    {
      invoiceType: "SATIŞ",
      customizationNo: "TR1.2",
      scenario: "EARSIVFATURA",
      billNo: "GIB2024000000005",
      company: "Farabi Hastanesi",
      address: "YAZIR MAH. MEDİKAL CAD. NO:150 SELÇUKLU/KONYA TÜRKİYE",
      taxOffice: "SELÇUKLU VERGİ DAİRESİ MÜD.",
      taxNumber: "3456789012",
      phone: "0332 555 66 77",
      email: "muhasebe@farabi.com.tr",
      billDate: "15-02-2024",
      total: "145.750,00",
      issuerName: "MEHMET ENES DOĞAN",
      issuerAddress: "YAYLA MAH. YOZGAT BUL. No:208 Kapı No:20 K.ÖRENİ Ankara / Türkiye",
      issuerPhone: "05445722634",
      issuerEmail: "mehmetenes600@gmail.com",
      issuerTaxOffice: "YILDIRIM/BEYAZIT VERGİ DAİRESİ MÜD.",
      issuerTaxNumber: "26548351688",
      items: [
        {
          lineNo: 1,
          description: "Kardiyoloji Hizmetleri",
          quantity: "1",
          unit: "Adet",
          unitPrice: "145.750,00",
          discountRate: "0,00",
          discountAmount: "0,00",
          discountReason: "İskonto",
          vatRate: "20,00",
          vatAmount: "29.150,00",
          totalAmount: "145.750,00"
        }
      ],
      subtotal: "145.750,00",
      totalDiscount: "0,00",
      grandTotal: "174.900,00",
    }
  ];

  const thead = [
    { name: "Fatura No", sortable: true },
    { name: "Firma", sortable: true },
    { name: "Fatura Tarihi", sortable: true },
    { name: "Toplam Tutar", sortable: true },
    { name: "Detay", width: 80 }
  ];

  const handleDetailClick = (invoice) => {
    createModal("invoice-detail", invoice);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}   
      animate={{ opacity: 1 }}
      className='w-full h-full flex flex-col items-center justify-evenly'
    >
      <TableComp2
        thead={thead}
        tbody={invoices.map(invoice => [
          invoice.billNo,
          invoice.company,
          invoice.billDate,
          `${invoice.total} TL`,
          <button 
            onClick={() => handleDetailClick(invoice)} 
            key={`details-${invoice.billNo}`} 
            className="h-8 px-4 flex items-center justify-center rounded bg-cyan-500 text-white hover:bg-cyan-600"
          >
            Detay
          </button>
        ])}
        searchable={searchable}
        setSearchable={setSearchable}
        tableTitle="FATURA LİSTESİ"
      />  
    </motion.div>
  )
}

export default Fatura