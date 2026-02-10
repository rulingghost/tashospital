import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-cyan-600">404</h1>
        <div className="mt-4">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            Sayfa Bulunamadı
          </h3>
          <p className="text-gray-500 mb-8">
            Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.
          </p>
        </div>

        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Geri Dön
          </button>
          <button
            onClick={() => navigate('/e-nabiz')}
            className="px-6 py-3 bg-white text-cyan-600 border-2 border-cyan-600 rounded-lg hover:bg-cyan-50 transition-colors"
          >
            Ana Sayfaya Git
          </button>
        </div> */}
      </div>

      {/* Dekoratif Elementler */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
        <div className="w-64 h-64 bg-cyan-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
      <div className="absolute bottom-1/4 right-1/4 -z-10">
        <div className="w-32 h-32 bg-cyan-200 rounded-full opacity-20 blur-2xl"></div>
      </div>
    </div>
  )
}

export default NotFound 