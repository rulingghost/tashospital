import React from 'react';

const CompanyStructure = () => {
  // Veri dizisi
  const data = [
    {
      title: 'YÖNETİCİ',
      people: [
        { name: 'Selim GÜRSES', image: 'https://via.placeholder.com/40' },
        { name: 'Cemre YALÇINSOY', image: 'https://via.placeholder.com/40' },
      ],
      active: true,
    },
    {
      title: 'MUHASEBE',
      people: [
        { name: 'Seçkin SEYMEN', image: 'https://via.placeholder.com/40' },
        { name: 'Ahmet KAPAKÇI', image: 'https://via.placeholder.com/40' },
        { name: 'Yalçın SELİMOĞLU', image: 'https://via.placeholder.com/40' },
      ],
      extra: 5,
    },
    {
      title: 'PAZARLAMA',
      people: [
        { name: 'Nazan SATIŞOĞLU', image: 'https://via.placeholder.com/40' },
        { name: 'Alper ÜNLÜ', image: 'https://via.placeholder.com/40' },
      ],
    },
    {
      title: 'SATIŞ',
      people: [
        { name: 'Aylin GÜMÜŞÇÜ', image: 'https://via.placeholder.com/40' },
        { name: 'Selin TAŞ', image: 'https://via.placeholder.com/40' },
        { name: 'Buğra YAĞUŞ', image: 'https://via.placeholder.com/40' },
      ],
    },
    {
      title: 'VEZNE',
      people: [{ name: 'Tuğçe DAMLALI', image: 'https://via.placeholder.com/40' }],
    },
  ];

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6">ŞİRKET YAPISI</h2>

      {/* Üst Yönetici Kartı */}
      <div className="flex justify-center mb-8">
        <Card title={data[0].title} people={data[0].people} />
      </div>

      {/* Alt Departmanlar */}
      <div className="relative w-full">
        {/* Bağlantı Çizgisi */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-cyan-600 w-1 h-24"></div>

        <div className="flex justify-center space-x-16">
          {data.slice(1).map((dept, index) => (
            <React.Fragment key={index}>
              {/* Dikey Bağlantı Çizgisi */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-cyan-600 w-1 h-8"></div>
              <Card title={dept.title} people={dept.people} extra={dept.extra} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

// Kart Bileşeni
const Card = ({ title, people, extra }) => {
  return (
    <div className="flex flex-col items-center bg-cyan-100 rounded-lg p-4 shadow-md w-64">
      <h3 className="text-cyan-600 font-semibold mb-4">{title}</h3>
      <div className="flex space-x-4">
        {people.map((person, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={person.image} alt={person.name} className="w-12 h-12 rounded-full mb-2" />
            <p className="text-sm text-gray-700">{person.name}</p>
          </div>
        ))}
        {extra && (
          <div className="flex flex-col items-center justify-center bg-gray-200 rounded-full w-12 h-12 text-gray-500 text-lg font-semibold">
            +{extra}
          </div>
        )}
      </div>
      <button className="mt-4 bg-cyan-600 text-white py-2 px-4 rounded-full text-sm">
        Listele
      </button>
    </div>
  );
};

export default CompanyStructure;
