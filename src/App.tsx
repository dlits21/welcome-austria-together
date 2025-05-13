
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageGrid from './components/LanguageGrid';
import Home from './pages/Home';
import Information from './pages/Information';
import Courses from './pages/Courses';
import Community from './pages/Community';
import Videos from './pages/Videos';
import GermanLearning from './pages/GermanLearning';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<LanguageGrid />} />
          <Route path="/home" element={<Home />} />
          <Route path="/information" element={<Information />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/community" element={<Community />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/german-learning" element={<GermanLearning />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </Router>
  );
}
