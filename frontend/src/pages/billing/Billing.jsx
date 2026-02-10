import React from 'react'
import { motion } from 'framer-motion';
import TableComp2 from '../../UI/TableComp2';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Billing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const invoices = [
    {
      // Fatura Bilgileri
      customizationNo: "TR1.2",
      scenario: "EARSIVFATURA",
      invoiceType: "SATIŞ",
      billNo: "GIB2024000000002",
      billDate: "25-12-2024 09:54",
      
      // Fatura Kesen Firma
      issuerName: "MEHMET ENES DOĞAN",
      issuerAddress: "YAYLA MAH. YOZGAT BUL. No:208 Kapı No:20 K.ÖRENİ Ankara / Türkiye",
      issuerPhone: "05445722634",
      issuerEmail: "mehmetenes600@gmail.com",
      issuerTaxOffice: "YILDIRIM/BEYAZIT VERGİ DAİRESİ MÜD.",
      issuerTaxNumber: "26548351688",
      
      // Fatura Kesilen Firma
      company: "SGENTO ENERJİ ANONİM ŞİRKETİ",
      address: "ALAVARDI MAH. YAKA CAD. NO:80 MERAM/KONYA TÜRKİYE",
      taxOffice: "MEVLANA VERGİ DAİRESİ MÜD.",
      taxNumber: "0961361190",
      phone: "0332 444 55 66",
      email: "muhasebe@sgento.com.tr",
      
      // Mal/Hizmet Detayları
      items: [
        {
          lineNo: 1,
          description: "WEB TABANLI CRM UYGULAMASI MOBİL SÜRÜMÜ",
          quantity: "1",
          unit: "Adet",
          unitPrice: "450.000,00",
          discountRate: "0,00",
          discountAmount: "0,00",
          discountReason: "İskonto",
          vatRate: "20,00",
          vatAmount: "90.000,00",
          totalAmount: "450.000,00"
        }
      ],
      
      // Toplamlar
      subtotal: "450.000,00",
      totalDiscount: "0,00",
      total: "540.000,00",
      
    }
  ];

  const thead = [
    { name: t("Invoice Number"), sortable: true },
    { name: t("Company"), sortable: true },
    { name: t("Tax Number"), sortable: true },
    { name: t("Invoice Date"), sortable: true },
    { name: t("Total"), sortable: true },
    { name: t("Detail"), width: 80 }
  ];

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
          invoice.taxNumber,
          invoice.billDate,
          `${invoice.total} TL`,
          invoice.actions
        ])}
        searchable={true}
        tableTitle={t("INVOICE LIST")}
        billing={true}
        modal={"invoice-modal"}
      />  
    </motion.div>
  )
}

export default Billing;
