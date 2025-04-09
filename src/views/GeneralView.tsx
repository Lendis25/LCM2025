import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Temporary mock data - replace with your actual data
const data = [
  { year: 2017, Lenguaje: 5.5, Matemática: 5.2, Ciencias: 5.4, Historia: 5.6 },
  { year: 2018, Lenguaje: 5.6, Matemática: 5.3, Ciencias: 5.5, Historia: 5.7 },
  { year: 2019, Lenguaje: 5.7, Matemática: 5.4, Ciencias: 5.6, Historia: 5.8 },
  { year: 2020, Lenguaje: 5.8, Matemática: 5.5, Ciencias: 5.7, Historia: 5.9 },
  { year: 2021, Lenguaje: 5.9, Matemática: 5.6, Ciencias: 5.8, Historia: 6.0 },
  { year: 2022, Lenguaje: 6.0, Matemática: 5.7, Ciencias: 5.9, Historia: 6.1 },
  { year: 2023, Lenguaje: 6.1, Matemática: 5.8, Ciencias: 6.0, Historia: 6.2 },
  { year: 2024, Lenguaje: 6.2, Matemática: 5.9, Ciencias: 6.1, Historia: 6.3 },
];

const GeneralView = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Rendimiento General por Asignatura
        </h1>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                tick={{ fill: '#374151' }}
              />
              <YAxis 
                domain={[1, 7]}
                ticks={[1, 2, 3, 4, 5, 6, 7]}
                tick={{ fill: '#374151' }}
              />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Lenguaje" 
                stroke="#2563EB" 
                strokeWidth={2}
                dot={{ fill: '#2563EB' }}
              />
              <Line 
                type="monotone" 
                dataKey="Matemática" 
                stroke="#DC2626" 
                strokeWidth={2}
                dot={{ fill: '#DC2626' }}
              />
              <Line 
                type="monotone" 
                dataKey="Ciencias" 
                stroke="#059669" 
                strokeWidth={2}
                dot={{ fill: '#059669' }}
              />
              <Line 
                type="monotone" 
                dataKey="Historia" 
                stroke="#7C3AED" 
                strokeWidth={2}
                dot={{ fill: '#7C3AED' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['Lenguaje', 'Matemática', 'Ciencias', 'Historia'].map((subject) => (
          <div key={subject} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{subject}</h3>
            <p className="text-3xl font-bold text-blue-600">
              {data[data.length - 1][subject]}
            </p>
            <p className="text-sm text-gray-500">Promedio actual</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralView;