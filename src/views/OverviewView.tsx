import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useSchoolData } from '../hooks/useSchoolData';

const distributionData = [
  { name: 'Sobresaliente (6.0-7.0)', value: 30, color: '#2563EB' },
  { name: 'Bueno (5.0-5.9)', value: 45, color: '#059669' },
  { name: 'Suficiente (4.0-4.9)', value: 20, color: '#EAB308' },
  { name: 'Insuficiente (<4.0)', value: 5, color: '#DC2626' },
];

const OverviewView = () => {
  const { data: yearlyData, loading, error } = useSchoolData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Promedios Generales */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Evolución del Promedio General
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yearlyData}>
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
                <Line 
                  type="monotone" 
                  dataKey="promedio" 
                  stroke="#2563EB" 
                  strokeWidth={2}
                  dot={{ fill: '#2563EB' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución de Notas */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Distribución de Notas {new Date().getFullYear()}
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Promedio General</h3>
          <p className="text-3xl font-bold text-blue-600">
            {yearlyData[yearlyData.length - 1]?.promedio.toFixed(1)}
          </p>
          <p className="text-sm text-gray-500">Año {yearlyData[yearlyData.length - 1]?.year}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tasa de Aprobación</h3>
          <p className="text-3xl font-bold text-green-600">
            {yearlyData[yearlyData.length - 1]?.aprobacion}%
          </p>
          <p className="text-sm text-gray-500">Año {yearlyData[yearlyData.length - 1]?.year}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Estudiantes</h3>
          <p className="text-3xl font-bold text-purple-600">850</p>
          <p className="text-sm text-gray-500">Matriculados</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Asistencia</h3>
          <p className="text-3xl font-bold text-yellow-600">95%</p>
          <p className="text-sm text-gray-500">Promedio anual</p>
        </div>
      </div>

      {/* Tabla de Tendencias */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Tendencias Históricas
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Año</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promedio General</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasa de Aprobación</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...yearlyData].reverse().map((year) => (
                <tr key={year.year}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{year.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{year.promedio.toFixed(1)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{year.aprobacion}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverviewView;