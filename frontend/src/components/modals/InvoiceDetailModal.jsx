import React, { useEffect } from 'react'

const InvoiceDetailModal = ({ data }) => {
    useEffect(() => {
      console.log("Fatura Detayları:", data);
    }, [data]);

  return (
    <div className="add-modal z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="fatura-container">
        <div className="fatura-header">
            <div className="satici-bilgileri">
            <div className="border-box">
                <div className='bill-stun'></div>
                <p>Süleyman TAŞ</p>
                <p>TERRACE FULYA CENTER, Teşvikiye, Hakkı Yeten Cd. No:11 D:1, Daire:97, 34349 Şişli/İstanbul</p>
                <p>Tel: 0543 456 36 93</p>
                <p>Web Sitesi: www.suleymantas.com.tr</p>
                <p>E-Posta: info@suleymantas.com.tr</p>
                <p>Vergi Dairesi: {data.issuerTaxOffice}</p>
                <p>TCKN: 34323456433</p>
                <div className='bill-stun'></div>
            </div>
            <div className="e-arsiv-title"><img src="/img/e-arsiv-logo.jpeg" alt="Logo" className="logo" />e-Arşiv Fatura</div>
            </div>
        </div>

        <div className="border-box">
            <div className="musteri-bilgileri">
            <div className='bill-stun'></div>
            <div className="sayin">SAYIN</div>
            <p>{data.company}</p>
            <p>{data.address}</p>
            <p>Web Sitesi: {data.website || "-"}</p>
            <p>E-Posta: {data.email}</p>
            <p>Tel: {data.phone}</p>
            <p>Vergi Dairesi: {data.taxOffice}</p>
            <p>VKN: {data.taxNumber}</p>
            <div className='bill-stun'></div>
            </div>
            <div className="fatura-detay-tablosu">
            <table>
            <tbody>
                <tr>
                <td>Özelleştirme No:</td>
                <td>{data.customizationNo}</td>
                </tr>
                <tr>
                <td>Senaryo:</td>
                <td>{data.scenario}</td>
                </tr>
                <tr>
                <td>Fatura Tipi:</td>
                <td>{data.invoiceType}</td>
                </tr>
                <tr>
                <td>Fatura No:</td>
                <td>{data.billNo}</td>
                </tr>
                <tr>
                <td>Fatura Tarihi:</td>
                <td>{data.billDate}</td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>

        <table className="fatura-tablo">
            <thead>
            <tr>
                <th>Sıra No</th>
                <th>Mal Hizmet</th>
                <th>Miktar</th>
                <th>Birim Fiyat</th>
                <th>İskonto/ Artırım Oranı</th>
                <th>İskonto/ Artırım Tutarı</th>
                <th>İskonto/ Artırım Nedeni</th>
                <th>KDV Oranı</th>
                <th>KDV Tutarı</th>
                <th>Diğer Vergiler</th>
                <th>Mal Hizmet Tutarı</th>
            </tr>
            </thead>
            <tbody>
            {data.items.map((item) => (
              <tr key={item.lineNo}>
                <td>{item.lineNo}</td>
                <td>{item.description}</td>
                <td>{item.quantity} {item.unit}</td>
                <td>{item.unitPrice} TL</td>
                <td>%{item.discountRate}</td>
                <td>{item.discountAmount} TL</td>
                <td>{item.discountReason}</td>
                <td>%{item.vatRate}</td>
                <td>{item.vatAmount} TL</td>
                <td>{item.otherTaxes || "-"}</td>
                <td>{item.totalAmount} TL</td>
              </tr>
            ))}
            </tbody>
        </table>

        <div className="fatura-toplam">
            <table>
            <tbody>
                <tr>
                <td>Mal Hizmet Toplam Tutarı</td>
                <td>{data.subtotal} TL</td>
                </tr>
                <tr>
                <td>Toplam İskonto</td>
                <td>{data.totalDiscount} TL</td>
                </tr>
                <tr>
                <td>Hesaplanan KDV(%20)</td>
                <td>{data.items[0].vatAmount} TL</td>
                </tr>
                <tr>
                <td>Vergiler Dahil Toplam Tutar</td>
                <td>{data.total} TL</td>
                </tr>
                <tr className="odenecek">
                <td>Ödenecek Tutar</td>
                <td>{data.total} TL</td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
    </div>
  )
}

export default InvoiceDetailModal