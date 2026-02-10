import React from 'react'

const Card = () => {
    return (
        <div className="flex flex-col items-center bg-cyan-100 rounded-lg p-4 shadow-md w-64">
            <h3 className="text-cyan-600 font-semibold mb-4">BAŞLIK</h3>
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
}

export default Card