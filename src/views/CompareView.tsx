import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Temporary mock data - replace with actual data
const data = [
  {
    course: '8° Básico A',
    Lenguaje: 5.8,
    Matemática: 5.5,
    Ciencias: 5.7,
    Historia: 5.9,
  },
  {
    course: '8° Básico B',
    Lenguaje: 5.6,
    Matemática: 5.7,
    Ciencias: 5.8,
    Historia: 5.6,
  },
  {
    course: '8° Básico C',
    Lenguaje: 5.9,
    Matemática: 5.4,
    Ciencias: 5.6,
    Historia: 5.8,
  },
];

const CompareView = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Comparación entre Cursos
        </h1>
        
        <div className="mb-6 flex space-x-4">
          <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
          
          <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="8">8° Básico</option>
            <option value="7">7° Básico</option>
            <option value="6">6° Básico</option>
            <option value="5">5° Básico</option>
          </select>
        </div>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="course" 
                tick={{ fill: '#374151' }}
              />
              <YAxis 
                domain={[1, 7]}
                ticks={[1, 2, 3, 4, 5, 6, 7]}
                tick={{ fill: '#374151' }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="Lenguaje" fill="#2563EB" />
              <Bar dataKey="Matemática" fill="#DC2626" />
              <Bar dataKey="Ciencias" fill="#059669" />
              <Bar dataKey="Historia" fill="#7C3AED" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Promedio General por Curso</h3>
          <div className="space-y-2">
            {data.map((course) => {
              const avg = (course.Lenguaje + course.Matemática + course.Ciencias + course.Historia) / 4;
              return (
                <div key={course.course} className="flex justify-between items-center">
                  <span className="text-gray-600">{course.course}</span>
                  <span className="font-semibold text-blue-600">{avg.toFixed(1)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Mejor Desempeño</h3>
          <div className="space-y-4">
            {['Lenguaje', 'Matemática', 'Ciencias', 'Historia'].map((subject) => {
              const best = Math.max(...data.map(course => course[subject]));
              const bestCourse = data.find(course => course[subject] === best)?.course;
              return (
                <div key={subject} className="flex justify-between items-center">
                  <span className="text-gray-600">{subject}</span>
                  <div className="text-right">
                    <div className="font-semibold text-blue-600">{best.toFixed(1)}</div>
                    <div className="text-sm text-gray-500">{bestCourse}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareView;