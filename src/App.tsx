
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from './components/ui/toaster';
import LanguageGrid from './components/LanguageGrid';
import Home from './pages/Home';
import Information from './pages/Information';
import Ask from './pages/Ask';
import Learn from './pages/Learn';
import Community from './pages/Community';
import Videos from './pages/Videos';
import GermanLearning from './pages/GermanLearning';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<LanguageGrid />} />
          <Route path="/home" element={<Home />} />
          <Route path="/information" element={<Information />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/community" element={<Community />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/german-learning" element={<GermanLearning />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </LanguageProvider>
    </Router>
  );
}
