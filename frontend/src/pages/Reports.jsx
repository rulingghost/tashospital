import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { useTranslation } from 'react-i18next';

// ChartJS ayarları
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const Reports = () => {
  const { t } = useTranslation()
  // Grafik verileri
  const surgeryData = {
    labels: ['Saç', 'Diş', 'Plastik Cerrahi'],
    datasets: [
      {
        label: 'Ameliyat Sayısı',
        data: [120, 90, 45],
        backgroundColor: ['#34D399', '#60A5FA', '#F87171'],
      },
    ],
  };

  const stockData = {
    labels: ['Stokta', 'Kullanılan', 'SKT Geçen'],
    datasets: [
      {
        label: 'İlaç Durumu',
        data: [500, 300, 50],
        backgroundColor: ['#34D399', '#F87171', '#FBBF24'],
      },
    ],
  };

  const socialMediaData = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
    datasets: [
      {
        label: 'Sosyal Medya Mesajları',
        data: [200, 150, 180, 220, 240, 300],
        borderColor: '#60A5FA',
        backgroundColor: '#60A5FA',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const monthlyUsageData = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
    datasets: [
      {
        label: 'Aylık Kullanım (Adet)',
        data: [400, 380, 350, 420, 500, 450],
        backgroundColor: ['#34D399'],
        borderColor: '#34D399',
        borderWidth: 1,
      },
    ],
  };

  const incomeData = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
    datasets: [
      {
        label: 'Gelir',
        data: [3000, 2500, 2700, 3200, 2900, 3100],
        backgroundColor: '#34D399',
      },
    ],
  };

  const expenseData = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
    datasets: [
      {
        label: 'Gider',
        data: [2000, 1800, 1500, 2200, 2000, 2400],
        backgroundColor: '#F87171',
      },
    ],
  };

  return (
    <div className="w-full h-full p-4 bg-gray-50 overflow-hidden">
      {/* Genel İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <h2 className="text-lg font-medium text-gray-600">Toplam Ameliyat</h2>
          <p className="text-2xl font-bold text-green-500 mt-2">255</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <h2 className="text-lg font-medium text-gray-600">Toplam İlaç Stoku</h2>
          <p className="text-2xl font-bold text-blue-500 mt-2">850</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <h2 className="text-lg font-medium text-gray-600">Sosyal Medya Mesajları</h2>
          <p className="text-2xl font-bold text-indigo-500 mt-2">600</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <h2 className="text-lg font-medium text-gray-600">SKT Geçen İlaçlar</h2>
          <p className="text-2xl font-bold text-red-500 mt-2">50</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <h2 className="text-lg font-medium text-gray-600">Toplam Gelir</h2>
          <p className="text-2xl font-bold text-green-500 mt-2">15,000</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <h2 className="text-lg font-medium text-gray-600">Toplam Gider</h2>
          <p className="text-2xl font-bold text-red-500 mt-2">12,000</p>
        </div>
      </div>

      {/* Grafiklerin Olduğu Kısım */}
      <div className="overflow-y-auto h-[calc(100%-120px)]"> {/* Kaydırma için yükseklik ayarı */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {/* Ameliyat Sayıları */}
          <div className="bg-white shadow-lg rounded-lg p-4 h-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Ameliyat Sayıları (Bölüm Bazlı)</h2>
            <div className="h-64">
              <Bar data={surgeryData} />
            </div>
          </div>

          {/* İlaç Stok Durumu */}
          <div className="bg-white shadow-lg rounded-lg p-4 h-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">İlaç Stok Durumu</h2>
            <div className="h-64">
              <Doughnut data={stockData} />
            </div>
          </div>

          {/* Sosyal Medya Mesajları */}
          <div className="bg-white shadow-lg rounded-lg p-4 h-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Sosyal Medya Mesajları (Aylık)</h2>
            <div className="h-64">
              <Line data={socialMediaData} />
            </div>
          </div>

          {/* Aylık Kullanım Oranları */}
          <div className="bg-white shadow-lg rounded-lg p-4 h-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Aylık Kullanım Oranları</h2>
            <div className="h-64">
              <Bar data={monthlyUsageData} />
            </div>
          </div>

          {/* Gelir Grafiği */}
          <div className="bg-white shadow-lg rounded-lg p-4 h-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Gelir Grafiği (Aylık)</h2>
            <div className="h-64">
              <Bar data={incomeData} />
            </div>
          </div>

          {/* Gider Grafiği */}
          <div className="bg-white shadow-lg rounded-lg p-4 h-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Gider Grafiği (Aylık)</h2>
            <div className="h-64">
              <Bar data={expenseData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
