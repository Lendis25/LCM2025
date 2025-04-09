import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { School, LineChart, Users, UserSearch, BarChart2 } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: School, label: 'General' },
    { path: '/by-course', icon: Users, label: 'Por Curso' },
    { path: '/compare', icon: BarChart2, label: 'Comparar Cursos' },
    { path: '/student', icon: UserSearch, label: 'Estudiante' },
    { path: '/overview', icon: LineChart, label: 'Datos Generales' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div className="flex items-center py-4">
              <School className="h-8 w-8 text-blue-600" />
              <span className="font-semibold text-gray-800 text-lg ml-2">
                Colegio Luis Cruz Martínez
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`py-4 px-2 ${
                    isActive
                      ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                      : 'text-gray-500 hover:text-blue-600 transition duration-300'
                  } flex items-center space-x-1`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;