
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { languages, getConfirmationText, type Language } from '../data/languages';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { X } from 'lucide-react';

const LanguageGrid: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const handleLanguageClick = (language: Language) => {
    setSelectedLanguage(language);
    setShowConfirmation(true);
    
    // Set timeout to return to grid after 20 seconds
    const timeoutId = window.setTimeout(() => {
      setSelectedLanguage(null);
      setShowConfirmation(false);
    }, 20000);
    
    setTimer(timeoutId);
  };

  const handleConfirm = () => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage.code);
      if (timer) clearTimeout(timer);
      navigate('/home');
    }
  };

  const handleCancel = () => {
    setSelectedLanguage(null);
    setShowConfirmation(false);
    if (timer) clearTimeout(timer);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  // Create a 5x5 grid from the languages array
  const gridLanguages = [...languages];
  while (gridLanguages.length < 25) {
    gridLanguages.push({ ...languages[0], code: `placeholder-${gridLanguages.length}` });
  }

  return (
    <div className="h-screen w-full bg-background p-4 md:p-8 overflow-hidden relative">
      <h1 className="text-2xl md:text-3xl text-center font-bold mb-8">Select Your Language</h1>
      
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 max-w-4xl mx-auto">
        {gridLanguages.slice(0, 25).map((language, index) => (
          <button
            key={`${language.code}-${index}`}
            onClick={() => handleLanguageClick(language)}
            className={`bg-white hover:bg-gray-50 border-2 rounded-lg p-4 flex flex-col items-center justify-center transition-all transform hover:scale-105 ${
              language.code.includes('placeholder') ? 'invisible' : ''
            }`}
            disabled={language.code.includes('placeholder')}
          >
            <div className="text-4xl md:text-5xl mb-2">{language.flag}</div>
            <p className={`font-medium text-sm md:text-base ${language.rtl ? 'text-right' : 'text-left'}`}>
              {language.nativeName}
            </p>
          </button>
        ))}
      </div>

      {/* Language selection overlay with zoom animation */}
      {selectedLanguage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in"
          onClick={handleOverlayClick}
        >
          <div className="absolute top-4 left-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleCancel}
              className="bg-white hover:bg-gray-100 h-10 w-10 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 flex flex-col items-center">
            <div className="text-7xl md:text-8xl mb-6 animate-zoom-in">
              {selectedLanguage.flag}
            </div>
            
            <p 
              className={`text-center mb-8 text-lg ${selectedLanguage.rtl ? 'text-right' : 'text-left'}`}
              dir={selectedLanguage.rtl ? 'rtl' : 'ltr'}
            >
              {getConfirmationText(selectedLanguage.code)}
            </p>
            
            <Button 
              onClick={handleConfirm}
              className="px-8 py-6 text-lg w-full"
              dir={selectedLanguage.rtl ? 'rtl' : 'ltr'}
            >
              {selectedLanguage.rtl ? '✓ تأكيد' : '✓ Confirm'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageGrid;
