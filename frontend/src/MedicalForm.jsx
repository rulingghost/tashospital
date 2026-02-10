import React from 'react';

const MedicalForm = () => {
  return (
    <div className='w-[90%] h-[90%]'>
        <div className="max-w-6xl mx-auto h-full max-h-full  p-4 bg-white shadow-lg overflow-hidden">
      <div className="grid grid-cols-3 gap-4 text-xs">
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Name - Surname:</label>
              <p className="border-b border-gray-300 py-2">Maria Kiselyova</p>
            </div>
            <div>
              <label className="block text-gray-700">Consultation Date:</label>
              <p className="border-b border-gray-300 py-2">16/07/2024</p>
            </div>

            <div>
              <label className="block text-gray-700">Country:</label>
              <p className="border-b border-gray-300 py-2">Russia</p>
            </div>
            <div>
              <label className="block text-gray-700">Age:</label>
              <p className="border-b border-gray-300 py-2">16</p>
            </div>

            <div>
              <label className="block text-gray-700">Sharing Permission:</label>
              <p className="border-b border-gray-300 py-2">No</p>
            </div>
            <div>
              <label className="block text-gray-700">Smoke:</label>
              <p className="border-b border-gray-300 py-2">No</p>
            </div>

            <div>
              <label className="block text-gray-700">Medicine:</label>
              <p className="border-b border-gray-300 py-2">No</p>
            </div>
            <div>
              <label className="block text-gray-700">Allergy:</label>
              <p className="border-b border-gray-300 py-2">No</p>
            </div>

            <div>
              <label className="block text-gray-700">Date of Repatriation:</label>
              <input
                type="date"
                name="dateOfRepatriation"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-gray-700">Surgery Day:</label>
              <input
                type="date"
                name="surgeryDay"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 px-2 py-1"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700">Surgeries to be Performed:</label>
              <textarea
                name="surgeriesToBePerformed"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 px-2 py-1 h-20 resize-none"
              />
            </div>

            <div>
              <label className="block text-gray-700">Discharge Day:</label>
              <input
                type="date"
                name="dischargeDay"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-gray-700">Control:</label>
              <input
                type="text"
                name="control1"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 px-2 py-1"
              />
            </div>
            <div>
              <label className="block text-gray-700">Control:</label>
              <input
                type="text"
                name="control2"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 px-2 py-1"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700">Past Surgeries Performed:</label>
              <textarea
                name="pastSurgeries"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 px-2 py-1 h-16 resize-none"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-700">Doctor Notes:</label>
              <textarea
                name="doctorNotes"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 px-2 py-1 h-16 resize-none"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center">
          <img src="https://via.placeholder.com/100x250" alt="Facial Anatomy" className="mb-4" />
          <img src="https://via.placeholder.com/100x250" alt="Body Anatomy" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default MedicalForm;
