import React, { useState } from 'react';

export default function Mytable({ className, tableData }){
  const [showTable, setShowTable] = useState(false);
  
  const handleButtonClick = (row) => {
    console.log(`Bouton cliqué pour la ligne : ${row.Jour}`);
  };
  return (
    <div>
        <div className="block text-1xl font-semibold clr-neutral-600 mb-4 flex flex-col gap-4">
            <button onClick={() => setShowTable(!showTable)} className="flex items-center justify-between flex-wrap">
                {showTable ? 'Afficher la disponibilité du chauffeur' : 'Afficher la disponibilité du chauffeur'}
                <span className={`inline-block transition-transform ${showTable ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </span>
            </button>
        </div>
      {showTable && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2"> Jour </th>
              <th className="border border-gray-400 px-4 py-2"> Heure de début </th>
              <th className="border border-gray-400 px-4 py-2"> Heure de fin </th>
              <th className="border border-gray-400 px-4 py-2"> Action </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">{row.Jour}</td>
                <td className="border border-gray-400 px-4 py-2">{row.HeureDebut}</td>
                <td className="border border-gray-400 px-4 py-2">{row.HeureFin}</td>
                <td className="border border-gray-400 px-4 py-2">
                    <button
                    className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleButtonClick(row)}
                    >
                      Réserver
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
