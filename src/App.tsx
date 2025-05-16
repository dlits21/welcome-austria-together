
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

// Information subpages
import PoliticalEducation from './pages/information/PoliticalEducation';
import GermanLearningInfo from './pages/information/GermanLearningInfo';
import Work from './pages/information/Work';
import AskMe from './pages/information/AskMe';
import Housing from './pages/information/Housing';
import Finance from './pages/information/Finance';
import Culture from './pages/information/Culture';
import Mobility from './pages/information/Mobility';
import Health from './pages/information/Health';
import Education from './pages/information/Education';
import Funding from './pages/information/Funding';
import Volunteering from './pages/information/Volunteering';
import Contacts from './pages/information/Contacts';
import Translation from './pages/information/Translation';

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
          
          {/* Information subpages */}
          <Route path="/information/political-education" element={<PoliticalEducation />} />
          <Route path="/information/german-learning" element={<GermanLearningInfo />} />
          <Route path="/information/work" element={<Work />} />
          <Route path="/information/ask-me" element={<AskMe />} />
          <Route path="/information/housing" element={<Housing />} />
          <Route path="/information/finance" element={<Finance />} />
          <Route path="/information/culture" element={<Culture />} />
          <Route path="/information/mobility" element={<Mobility />} />
          <Route path="/information/health" element={<Health />} />
          <Route path="/information/education" element={<Education />} />
          <Route path="/information/funding" element={<Funding />} />
          <Route path="/information/volunteering" element={<Volunteering />} />
          <Route path="/information/contacts" element={<Contacts />} />
          <Route path="/information/translation" element={<Translation />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </LanguageProvider>
    </Router>
  );
}
