
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../data/languages';
import PageNavigation from '../components/PageNavigation';

const Learn: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1]; // Default to English

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };
  
  const pageTitle = language.code === 'de' ? 'Lernen' : 'Learn';
  const pageSubtitle = language.code === 'de' 
    ? 'Kurse, Ressourcen und mehr' 
    : 'Courses, resources and more';

  // Help content for this page
  const helpContent = (
    <div className="space-y-4">
      <p>
        {language.code === 'de' 
          ? 'Hier finden Sie Lernmaterialien und Kurse.' 
          : 'Here you can find learning materials and courses.'}
      </p>
    </div>
  );

  return (
    <div 
      className="min-h-screen flex flex-col bg-background p-4 md:p-6"
      dir={language.rtl ? 'rtl' : 'ltr'}
    >
      {/* Page Navigation */}
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        helpContent={helpContent}
      />
      
      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{pageTitle}</h1>
          <p className="text-muted-foreground mt-2">{pageSubtitle}</p>
        </div>
        
        <div className="py-8 text-center">
          <p>
            {language.code === 'de'
              ? 'Lernseite - Inhalte werden in Kürze verfügbar sein.'
              : 'Learning page - content will be available soon.'}
          </p>
        </div>
      </main>
    </div>
  );
};

export default Learn;
