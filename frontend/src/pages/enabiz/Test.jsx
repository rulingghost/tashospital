import React from 'react'
import { motion } from 'framer-motion'
import { Droplets, Cigarette, Weight, Ruler, User, Activity } from 'lucide-react'

const Test = () => {
  const patientInfo = [
    { icon: <Droplets size={24} />, label: 'ARH+', value: 'A RH+' },
    { icon: <Cigarette size={24} />, label: 'Kullanmıyor', value: 'Kullanmıyor' },
    { icon: <Weight size={24} />, label: '74 kg', value: '74 kg' },
    { icon: <Ruler size={24} />, label: '173 cm', value: '173 cm' },
    { icon: <User size={24} />, label: '23 Yaş', value: '23 Yaş' },
    { icon: <Activity size={24} />, label: '24.73 vki', value: '24.73 vki' },
  ]

  // Daha karmaşık insan vücudu noktaları oluştur
  const createBodyPoints = () => {
    const points = [];
    
    // Yoğun nokta dağılımı için helper fonksiyon
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

    // Baş bölgesi (daha yuvarlak ve detaylı)
    points.push(...addPointsInArea(50, 15, 10, 10, 300));

    // Boyun bölgesi (ince ve uzun)
    points.push(...addPointsInArea(50, 25, 4, 5, 150));

    // Omuzlar (geniş ve kavisli)
    points.push(...addPointsInArea(35, 35, 8, 4, 200));
    points.push(...addPointsInArea(65, 35, 8, 4, 200));

    // Göğüs bölgesi
    points.push(...addPointsInArea(50, 45, 15, 10, 400));

    // Karın bölgesi
    points.push(...addPointsInArea(50, 60, 12, 15, 400));

    // Kollar
    // Sol kol
    points.push(...addPointsInArea(30, 45, 5, 20, 250));
    points.push(...addPointsInArea(25, 65, 4, 15, 200));
    // Sağ kol
    points.push(...addPointsInArea(70, 45, 5, 20, 250));
    points.push(...addPointsInArea(75, 65, 4, 15, 200));

    // Bel bölgesi
    points.push(...addPointsInArea(50, 75, 10, 5, 250));

    // Bacaklar
    // Sol bacak
    points.push(...addPointsInArea(42, 85, 6, 20, 300));
    points.push(...addPointsInArea(40, 105, 5, 15, 250));
    // Sağ bacak
    points.push(...addPointsInArea(58, 85, 6, 20, 300));
    points.push(...addPointsInArea(60, 105, 5, 15, 250));

    return points;
  };

  const bodyPoints = createBodyPoints();

  return (
    <div className="w-full h-screen bg-[#2A3356] p-4 flex flex-col">
      {/* Üst Bilgi Kartları */}
      <div className="grid grid-cols-6 gap-4 mb-4">
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
    </div>
  )
}

export default Test