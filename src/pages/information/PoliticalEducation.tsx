
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { languages } from '../../data/languages';
import PageNavigation from '../../components/PageNavigation';

const PoliticalEducation: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const pageTitle = language.code === 'de' ? 'Politische Bildung' : 'Political Education';
  const pageDescription = language.code === 'de' 
    ? 'Erfahren Sie mehr über das österreichische politische System, Ihre Rechte und Pflichten.'
    : 'Learn about the Austrian political system, your rights and responsibilities.';

  const helpContent = (
    <div>
      {language.code === 'de' 
        ? 'Auf dieser Seite finden Sie Informationen zur politischen Bildung in Österreich.'
        : 'On this page, you will find information about political education in Austria.'}
    </div>
  );

  return (
    <div 
      className="min-h-screen p-4 md:p-8"
      dir={language.rtl ? 'rtl' : 'ltr'}
    >
      <PageNavigation 
        toggleSound={toggleSound} 
        soundEnabled={soundEnabled}
        helpContent={helpContent} 
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
        <p className="text-gray-600 mb-8">{pageDescription}</p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {language.code === 'de' ? 'Über diese Seite' : 'About this page'}
          </h2>
          <p>
            {language.code === 'de'
              ? 'Diese Seite wird bald mit Informationen gefüllt.'
              : 'This page will soon be filled with information.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoliticalEducation;
