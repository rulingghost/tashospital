import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Droplets, Cigarette, Weight, Ruler, User, Activity } from 'lucide-react'

const NabizPatient = () => {
  const [showBodyPoints, setShowBodyPoints] = useState(false)

  const patients = [
    { id: 1, name: "Ahmet Yılmaz", tc: "12345678901", nationality: "T.C.", status: "Devam Ediyor" },
    { id: 2, name: "Mehmet Demir", tc: "23456789012", nationality: "T.C.", status: "Tamamlandı" },
    { id: 3, name: "Ayşe Kaya", tc: "34567890123", nationality: "T.C.", status: "Devam Ediyor" },
    { id: 4, name: "Fatma Şahin", tc: "45678901234", nationality: "Diğer", status: "Tamamlandı" },
    { id: 5, name: "Ali Öztürk", tc: "56789012345", nationality: "T.C.", status: "Devam Ediyor" },
  ]

  const patientInfo = [
    { icon: <Droplets size={24} />, label: 'ARH+', value: 'A RH+' },
    { icon: <Cigarette size={24} />, label: 'Kullanmıyor', value: 'Kullanmıyor' },
    { icon: <Weight size={24} />, label: '74 kg', value: '74 kg' },
    { icon: <Ruler size={24} />, label: '173 cm', value: '173 cm' },
    { icon: <User size={24} />, label: '23 Yaş', value: '23 Yaş' },
    { icon: <Activity size={24} />, label: '24.73 vki', value: '24.73 vki' },
  ]

  // Vücut noktaları oluşturma fonksiyonu
  const createBodyPoints = () => {
    const points = [];
    
    const addPointsInArea = (centerX, centerY, width, height, density) => {
      const areaPoints = [];
      for (let i = 0; i < density; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random();
        const x = centerX + Math.cos(angle) * width * radius;
        const y = centerY + Math.sin(angle) * height * radius;
        areaPoints.push({ x, y });
      }
      return areaPoints;
    };

    points.push(...addPointsInArea(50, 15, 10, 10, 300));
    points.push(...addPointsInArea(50, 25, 4, 5, 150));
    points.push(...addPointsInArea(35, 35, 8, 4, 200));
    points.push(...addPointsInArea(65, 35, 8, 4, 200));
    points.push(...addPointsInArea(50, 45, 15, 10, 400));
    points.push(...addPointsInArea(50, 60, 12, 15, 400));
    points.push(...addPointsInArea(30, 45, 5, 20, 250));
    points.push(...addPointsInArea(25, 65, 4, 15, 200));
    points.push(...addPointsInArea(70, 45, 5, 20, 250));
    points.push(...addPointsInArea(75, 65, 4, 15, 200));
    points.push(...addPointsInArea(50, 75, 10, 5, 250));
    points.push(...addPointsInArea(42, 85, 6, 20, 300));
    points.push(...addPointsInArea(40, 105, 5, 15, 250));
    points.push(...addPointsInArea(58, 85, 6, 20, 300));
    points.push(...addPointsInArea(60, 105, 5, 15, 250));

    return points;
  };

  const bodyPoints = createBodyPoints();

  return (
    <div className="w-full h-full p-6">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-semibold text-cyan-600">Hasta Listesi</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Hasta Adı</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">T.C. No</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Uyruk</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr 
                  key={patient.id}
                  onClick={() => setShowBodyPoints(true)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">{patient.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{patient.tc}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{patient.nationality}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                      ${patient.status === "Tamamlandı" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Body Points Popup */}
      {showBodyPoints && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-[#2A3356] flex flex-col z-50"
        >
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={() => setShowBodyPoints(false)}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Üst Bilgi Kartları */}
          <div className="grid grid-cols-6 gap-4 p-4">
            {patientInfo.map((info, index) => (
              <div key={index} className="bg-[#2A3356] p-3 rounded-lg flex flex-col items-center justify-center text-white">
                <div className="mb-1">
                  {info.icon}
                </div>
                <div className="text-sm opacity-80">{info.label}</div>
              </div>
            ))}
          </div>

          {/* Ana Görsel Alanı */}
          <div className="flex-1 flex justify-center items-start relative -mt-8">
            {/* Dış Daire */}
            <div className="w-[900px] h-[900px] rounded-full border-2 border-[#3B4575] flex items-center justify-center">
              {/* İç Daire */}
              <div className="w-[800px] h-[800px] rounded-full border-2 border-[#3B4575] flex items-center justify-center">
                {/* Vücut Noktaları */}
                <div className="relative w-full h-full">
                  {/* Vücut şekli */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[500px] h-[700px] relative">
                      {bodyPoints.map((point, i) => (
                        <div
                          key={i}
                          className="absolute w-[3px] h-[3px] bg-orange-500 rounded-full"
                          style={{
                            left: `${point.x}%`,
                            top: `${point.y}%`,
                            opacity: Math.random() * 0.3 + 0.5
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Aktif nokta temsili */}
                  <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 bg-cyan-400 rounded-full animate-pulse" />
                    <div className="w-16 h-16 bg-cyan-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping opacity-25" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default NabizPatient