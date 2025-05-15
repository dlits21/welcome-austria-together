
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { languages, getHoverText, type Language } from '../data/languages';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './ui/hover-card';
import { Check, X } from 'lucide-react';

interface LanguageGridProps {
  inDialog?: boolean;
}

const LanguageGrid: React.FC<LanguageGridProps> = ({ inDialog = false }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [progressValue, setProgressValue] = useState(100);
  const { setLanguage, currentLanguage } = useLanguage();
  const navigate = useNavigate();

  // Use Effect for progress bar countdown is omitted for simplicity

  const handleLanguageClick = (language: Language) => {
    setSelectedLanguage(language);
    setShowConfirmation(true);
    setProgressValue(100);
  };

  const handleConfirm = () => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage.code);
      
      if (inDialog) {
        // Just close confirmation and stay on the same page
        setSelectedLanguage(null);
        setShowConfirmation(false);
      } else {
        // Navigate to home for first-time language selection
        navigate('/home');
      }
    }
  };

  const handleCancel = () => {
    setSelectedLanguage(null);
    setShowConfirmation(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  return (
    <div className={`${inDialog ? '' : 'h-screen'} w-full bg-background ${inDialog ? 'p-0' : 'p-4 md:p-8'} overflow-hidden relative`}>
      {inDialog && (
        <h2 className="text-xl md:text-2xl text-center font-semibold mb-6">
          {currentLanguage === 'de' ? 'Sprache auswählen' : 'Select Language'}
        </h2>
      )}
      
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
        {languages.slice(0, 12).map((language, index) => (
          <HoverCard key={`${language.code}-${index}`} openDelay={300} closeDelay={100}>
            <HoverCardTrigger asChild>
              <button
                onClick={() => handleLanguageClick(language)}
                className="bg-white hover:bg-gray-50 border-2 rounded-lg p-4 flex flex-col items-center justify-center transition-all transform hover:scale-105"
              >
                <div className="text-4xl md:text-5xl mb-2">{language.flag}</div>
                <p className={`font-medium text-sm md:text-base ${language.rtl ? 'text-right' : 'text-left'}`}>
                  {language.nativeName}
                </p>
              </button>
            </HoverCardTrigger>
            <HoverCardContent 
              className="w-auto p-2"
              dir={language.rtl ? 'rtl' : 'ltr'}
              side="right"
            >
              <p className="text-sm">{getHoverText(language.code)}</p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>

      {/* Language selection confirmation overlay */}
      {selectedLanguage && (
        <div 
          className={`${inDialog ? 'fixed' : 'fixed'} inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in`}
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-2xl p-6 w-[85%] max-w-md mx-auto flex flex-col items-center">
            <div className="text-5xl md:text-7xl mb-4 md:mb-6">
              {selectedLanguage.flag}
            </div>
            
            <div 
              className={`text-center mb-6 space-y-3 w-full ${selectedLanguage.rtl ? 'text-right' : 'text-left'}`}
              dir={selectedLanguage.rtl ? 'rtl' : 'ltr'}
            >
              <h2 className="text-lg md:text-xl font-semibold">
                {selectedLanguage.rtl ? `هل ${selectedLanguage.nativeName} لغتك الأم؟` : `Is ${selectedLanguage.nativeName} your native tongue?`}
              </h2>
              
              <p className="text-sm md:text-base">
                {selectedLanguage.rtl ? `ستكون الموقع باللغة ${selectedLanguage.nativeName} من الآن فصاعداً.` : `The website will be in ${selectedLanguage.nativeName} from now on.`}
              </p>
            </div>
            
            <div className="flex w-full gap-4 mb-4">
              <Button 
                onClick={handleCancel}
                variant="outline"
                className="flex-1 py-2 md:py-4 border-red-500 text-red-500 hover:bg-red-50"
              >
                <X className="mr-2 h-4 w-4" />
                {selectedLanguage.rtl ? 'لا' : 'No'}
              </Button>
              
              <Button 
                onClick={handleConfirm}
                className="flex-1 py-2 md:py-4 bg-green-500 hover:bg-green-600"
              >
                <Check className="mr-2 h-4 w-4" />
                {selectedLanguage.rtl ? 'نعم' : 'Yes'}
              </Button>
            </div>
            
            <Progress value={progressValue} className="w-full h-1.5" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageGrid;
