import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import GeneralView from './views/GeneralView';
import CourseView from './views/CourseView';
import CompareView from './views/CompareView';
import StudentView from './views/StudentView';
import OverviewView from './views/OverviewView';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<GeneralView />} />
            <Route path="/by-course" element={<CourseView />} />
            <Route path="/compare" element={<CompareView />} />
            <Route path="/student" element={<StudentView />} />
            <Route path="/overview" element={<OverviewView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;