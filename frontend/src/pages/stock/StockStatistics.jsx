import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TableComp from '../../UI/TableComp';
import { useTranslation } from 'react-i18next';

const data = [
  { name: 'Adrenalin 0.5mg', alinan: 200, satilan: 110, stokta: 90 },
  { name: 'Akineton 5mg', alinan: 350, satilan: 320, stokta: 30 },
  { name: 'Arcotil 20mg', alinan: 310, satilan: 230, stokta: 80 },
  { name: 'Bepanthene Ampul', alinan: 180, satilan: 90, stokta: 90 },
  { name: 'Bepanthol Cilt Bakım', alinan: 160, satilan: 80, stokta: 80 },
  { name: 'Arnica 75gr Krem', alinan: 120, satilan: 50, stokta: 70 },
];

const StockStatistics = () => {
  const { t } = useTranslation()

  const thead = [
    { name: t("PRODUCT NAME"), sortable: true }, 
    { name: t("STOCK"), sortable: true },
    { name: t("USAGE RATE"), sortable: true }
  ];

  const tbody = [
    { productName: 'Adrenalin 0,5 mg (osel) amp', stock: '163 Ampul', usageRate: '53%' },
    { productName: 'Akineton 5mg 5 amp', stock: '7 Ampul', usageRate: '71.8%' },
    { productName: 'Arcotil 20 mg Flakon', stock: '92 Ampul', usageRate: '62.4%' },
    { productName: 'Artimal %2 Ampul', stock: '111 Ampul', usageRate: '67.5%' },
    { productName: 'Arnica 75gr Krem', stock: '61 Adet', usageRate: '83.1%' },
    { productName: 'Bheptal Ampul', stock: '124 Ampul', usageRate: '33.6%' },
    { productName: 'Bepanthene Ampul', stock: '17 Ampul', usageRate: '48%' },
    { productName: 'Bepanthol Cilt Bakım Kremi 30gr', stock: '38 Adet', usageRate: '48%' },
    { productName: 'Arnica 75gr Krem', stock: '61 Adet', usageRate: '83.1%' },
    { productName: 'Bheptal Ampul', stock: '124 Ampul', usageRate: '33.6%' },
    { productName: 'Bepanthene Ampul', stock: '17 Ampul', usageRate: '48%' },
    { productName: 'Bepanthol Cilt Bakım Kremi 30gr', stock: '38 Adet', usageRate: '48%' },
    { productName: 'Arnica 75gr Krem', stock: '61 Adet', usageRate: '83.1%' },
    { productName: 'Bheptal Ampul', stock: '124 Ampul', usageRate: '33.6%' },
    { productName: 'Bepanthene Ampul', stock: '17 Ampul', usageRate: '48%' },
    { productName: 'Bepanthol Cilt Bakım Kremi 30gr', stock: '38 Adet', usageRate: '48%' },
];

const thead2 = [
  { name: t("PRODUCT"), sortable: false }, 
  { name: t("PRODUCT NAME"), sortable: true },
  { name: t("EXPECTED STOCK"), sortable: true },
  { name: t("LAST PURCHASE"), sortable: true },
  { name: t("CURRENT STOCK"), sortable: true },
  { name: t("STOCK PERCENTAGE"), sortable: true }
];
const tbody2 = [
  { productImage: '🧪', productName: 'Adrenalin 0,5 mg (osel) amp', predictedStock: '420 Ampul', lastPurchase: '400 Ampul', currentStock: '163 Ampul', stockPercentage: '38.81%' },
  { productImage: '🧪', productName: 'Arcotil 20 mg Flakon', predictedStock: '310 Ampul', lastPurchase: '250 Ampul', currentStock: '92 Ampul', stockPercentage: '11.67%' },
  { productImage: '🧪', productName: 'Bepanthol Cilt Bakım Kremi 30gr', predictedStock: '700 Adet', lastPurchase: '520 Adet', currentStock: '38 Adet', stockPercentage: '5.43%' },
  { productImage: '🧪', productName: 'Parol 500mg Tablet', predictedStock: '300 Kutu', lastPurchase: '270 Kutu', currentStock: '90 Kutu', stockPercentage: '30%' },
  { productImage: '🧪', productName: 'Ventolin İnhaler', predictedStock: '250 Adet', lastPurchase: '230 Adet', currentStock: '80 Adet', stockPercentage: '32%' },
  { productImage: '🧪', productName: 'Calpol 120mg/5ml Şurup', predictedStock: '150 Şişe', lastPurchase: '130 Şişe', currentStock: '50 Şişe', stockPercentage: '33%' },
  { productImage: '🧪', productName: 'Aspirin 100mg Tablet', predictedStock: '600 Kutu', lastPurchase: '580 Kutu', currentStock: '300 Kutu', stockPercentage: '50%' },
  { productImage: '🧪', productName: 'Majezik 100mg Tablet', predictedStock: '400 Kutu', lastPurchase: '390 Kutu', currentStock: '200 Kutu', stockPercentage: '51%' },
  { productImage: '🧪', productName: 'Dolven 100mg/5ml Şurup', predictedStock: '120 Şişe', lastPurchase: '100 Şişe', currentStock: '60 Şişe', stockPercentage: '60%' },
  { productImage: '🧪', productName: 'Dexpanthenol 500mg Ampul', predictedStock: '500 Ampul', lastPurchase: '480 Ampul', currentStock: '400 Ampul', stockPercentage: '80%' },
  { productImage: '🧪', productName: 'İburamin Cold Tablet', predictedStock: '450 Kutu', lastPurchase: '400 Kutu', currentStock: '150 Kutu', stockPercentage: '33%' },
  { productImage: '🧪', productName: 'Nurofen Plus Tablet', predictedStock: '550 Kutu', lastPurchase: '530 Kutu', currentStock: '280 Kutu', stockPercentage: '52%' },
  { productImage: '🧪', productName: 'Talcid 500mg Tablet', predictedStock: '300 Kutu', lastPurchase: '270 Kutu', currentStock: '200 Kutu', stockPercentage: '74%' },
  { productImage: '🧪', productName: 'Novalgin Ampul', predictedStock: '350 Ampul', lastPurchase: '320 Ampul', currentStock: '90 Ampul', stockPercentage: '28%' },
  { productImage: '🧪', productName: 'Zantac 150mg Tablet', predictedStock: '250 Kutu', lastPurchase: '230 Kutu', currentStock: '70 Kutu', stockPercentage: '30%' },
  { productImage: '🧪', productName: 'Antigripin Tablet', predictedStock: '100 Kutu', lastPurchase: '80 Kutu', currentStock: '20 Kutu', stockPercentage: '20%' },
  { productImage: '🧪', productName: 'Zyrtec Şurup', predictedStock: '150 Şişe', lastPurchase: '140 Şişe', currentStock: '50 Şişe', stockPercentage: '35%' },
  { productImage: '🧪', productName: 'Claritin Şurup', predictedStock: '120 Şişe', lastPurchase: '100 Şişe', currentStock: '40 Şişe', stockPercentage: '40%' },
  { productImage: '🧪', productName: 'Sudafed Tablet', predictedStock: '300 Kutu', lastPurchase: '280 Kutu', currentStock: '180 Kutu', stockPercentage: '64%' },
  { productImage: '🧪', productName: 'Zestril 20mg Tablet', predictedStock: '200 Kutu', lastPurchase: '180 Kutu', currentStock: '90 Kutu', stockPercentage: '50%' },
];





  return (
    <div className='flex flex-col gap-7 w-full h-full overflow-y-auto'>
        <div className='w-full h-3/4 flex flex-row items-center justify-between'>
            <div className='w-[49%] h-[97%] bg-slate-200 rounded-3xl'>
            <TableComp
                thead={thead}
                tbody={tbody.map(row => [
                    row.productName,    // Ürün Adı
                    row.stock,          
                    row.usageRate       
                ])}
                searchable={true}         // Arama özelliği aktif
                tableTitle={"AYIN EN ÇOK KULLANILAN ÜRÜNLERİ"}  // Tablo başlığı
                modal={'stock'}            // Modal adı (varsa)
            />

            </div>
            <div className='w-[49%] h-[97%] bg-white rounded-3xl'>
              <div className='w-full h-[10%]'>
                  <p className='text-xl font-semibold ml-3 p-5 text-[#038ea7]'>AYIN KAR/ZARAR ANALİZİ</p>
              </div>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false}  />
                    <Tooltip content={ <CustomTooltip /> } />
                    <Bar dataKey="alinan" fill="#07b6d5" radius={[20, 20, 0, 0]} name="Alınan Adet" shape={<CustomBar />} />
                  </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div className=' w-full h-[700px] bg-slate-200 rounded-3xl'>
        <TableComp
            thead={thead2}
            tbody={tbody2.map(row => [
                <img src={row.productImage} alt="Ürün Resmi" />,  // Ürün Resmi
                row.productName,                                  // Ürün Adı
                row.predictedStock,                               // Öngörülen Stok
                row.lastPurchase,                                 // Son Satın Alma
                row.currentStock,                                 // Mevcut Stok
                row.stockPercentage                               // Stok Yüzdesi
            ])}
            searchable={true}         // Arama özelliği aktif
            tableTitle={"STOK ALARMI"}          // Modal adı (varsa)
        />

        </div>
    </div>
  );
}

function CustomTooltip ({active, payload, label}){
  if (active) {
    console.log(payload);
    const { alinan, satilan, stokta } = payload[0].payload;
    return(
      <div className='bg-[#17a5c8] rounded-2xl  p-5 drop-shadow-lg'>
        <h4 className='text-white mb-2 text-lg font-semibold'>{label}</h4>
        <div className=' flex gap-x-4'>
          <div className='bg-white py-2 px-4 rounded-2xl'>
            <p className='font-semibold text-sm text-center'>ALINDI</p>
            <p className='text-2xl font-semibold text-[#17b2c8] text-center'>{alinan}</p>
            <p className='font-semibold text-sm text-center'>ADET</p>
          </div>
          <div className='bg-white py-2 px-4 rounded-2xl text-center'>
            <p className='font-semibold text-sm text-center'>SATILDI</p>
            <p className='text-2xl font-semibold text-[#17b2c8] text-center'>{satilan}</p>
            <p className='font-semibold text-sm text-center'>ADET</p>
          </div>
          <div className='bg-white py-2 px-4 rounded-2xl'>
            <p className='font-semibold text-sm text-center'>STOKTA</p>
            <p className='text-2xl font-semibold text-[#17b2c8] text-center'>{stokta}</p>
            <p className='font-semibold text-sm text-center'>ADET</p>
          </div>
        </div>
      </div>
    )
  }
  return null
}

const CustomBar = (props) => {
  const { x, y, width, height, fill, satilan, alinan } = props;

  const satilanHeight = (satilan / alinan) * height; 
  const satilanPercentage = ((satilan / alinan) * 100).toFixed(1);

  return (
    <g>
    <rect x={x} y={y} width={width} height={height} fill="#d3d3d3" rx="10" ry="10" />    
    <rect x={x} y={y + height - satilanHeight} width={width} height={satilanHeight} fill={fill} />    
    <text    
      style={{ fontSize: '22px', fontWeight: '600', fill: '#fff' }}
      x={x + width / 2} 
      y={y + height / 2} 
      textAnchor="middle"
      dominantBaseline="middle"
      transform={`rotate(-90, ${x + width / 2}, ${y + height / 2})`} 
    >
      {satilanPercentage} %
    </text>
  </g>
  );
};

export default StockStatistics;
