import React from 'react'
import './BillingDetail.css'

const BillingDetail = () => {
  return (
    <div className="fatura-container">
      <div className="fatura-header">
        <div className="satici-bilgileri">
          <div className="border-box">
            <div className='bill-stun'></div>
            <p>MEHMET ENES DOĞAN</p>
            <p>YAYLA MAH. YOZGAT BUL. No:208 Kapı No:20</p>
            <p>K.ÖRENİ Ankara / Türkiye</p>
            <p>Tel: 05445722634 Fax:</p>
            <p>Web Sitesi:</p>
            <p>E-Posta: mehmetenes600@gmail.com</p>
            <p>Vergi Dairesi: YILDIRIM/BEYAZIT VERGİ DAİRESİ MÜD.</p>
            <p>TCKN: 26548351688</p>
            <div className='bill-stun'></div>
          </div>
          <div className="e-arsiv-title"><img src="/img/e-arsiv-logo.jpeg" alt="Logo" className="logo" />e-Arşiv Fatura</div>
        </div>
      </div>

      

      <div className="border-box">
        <div className="musteri-bilgileri">
          <div className='bill-stun'></div>
          <div className="sayin">SAYIN</div>
          <p>SGENTO ENERJİ ANONİM ŞİRKETİ</p>
          <p>ALAVARDI MAH. YAKA CAD. NO:80 MERAM/KONYA No:</p>
          <p>Kapı No:</p>
          <p>/ Türkiye</p>
          <p>Web Sitesi:</p>
          <p>E-Posta:</p>
          <p>Tel: Fax:</p>
          <p>Vergi Dairesi: MEVLANA VERGİ DAİRESİ MÜD.</p>
          <p>VKN: 0961361190</p>
          <div className='bill-stun'></div>
        </div>
        <div className="fatura-detay-tablosu">
        <table>
          <tbody>
            <tr>
              <td>Özelleştirme No:</td>
              <td>TR1.2</td>
            </tr>
            <tr>
              <td>Senaryo:</td>
              <td>EARSIVFATURA</td>
            </tr>
            <tr>
              <td>Fatura Tipi:</td>
              <td>SATIŞ</td>
            </tr>
            <tr>
              <td>Fatura No:</td>
              <td>GIB2024000000002</td>
            </tr>
            <tr>
              <td>Fatura Tarihi:</td>
              <td>25-12-2024 09:54</td>
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
          <tr>
            <td>1</td>
            <td>WEB TABANLI CRM UYGULAMASI MOBİL SÜRÜMÜ</td>
            <td>1 Adet</td>
            <td>450.000,00 TL</td>
            <td>%0,00</td>
            <td>0,00 TL</td>
            <td>İskonto</td>
            <td>%20,00</td>
            <td>90.000,00 TL</td>
            <td></td>
            <td>450.000,00 TL</td>
          </tr>
        </tbody>
      </table>

      <div className="fatura-toplam">
        <table>
          <tbody>
            <tr>
              <td>Mal Hizmet Toplam Tutarı</td>
              <td>450.000,00 TL</td>
            </tr>
            <tr>
              <td>Toplam İskonto</td>
              <td>0,00 TL</td>
            </tr>
            <tr>
              <td>Hesaplanan KDV(%20)</td>
              <td>90.000,00 TL</td>
            </tr>
            <tr>
              <td>Vergiler Dahil Toplam Tutar</td>
              <td>540.000,00 TL</td>
            </tr>
            <tr className="odenecek">
              <td>Ödenecek Tutar</td>
              <td>540.000,00 TL</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BillingDetail