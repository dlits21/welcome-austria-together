
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { languages, getConfirmationText, getHoverText, getWelcomeText, type Language } from '../data/languages';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../components/ui/hover-card';
import { Popover, PopoverTrigger, PopoverContent } from '../components/ui/popover';
import { X, Volume, VolumeX, HelpCircle, Check } from 'lucide-react';

interface LanguageGridProps {
  inDialog?: boolean;
}

const LanguageGrid: React.FC<LanguageGridProps> = ({ inDialog = false }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [progressValue, setProgressValue] = useState(100);
  const [currentTitleLanguage, setCurrentTitleLanguage] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { setLanguage, currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const timerInterval = useRef<number | null>(null);

  // Rotate welcome title every 5 seconds
  useEffect(() => {
    if (!inDialog) {
      const titleInterval = window.setInterval(() => {
        setCurrentTitleLanguage((prev) => (prev + 1) % languages.length);
      }, 5000);
  
      return () => {
        clearInterval(titleInterval);
      };
    }
  }, [inDialog]);

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, [timer]);

  const handleLanguageClick = (language: Language) => {
    setSelectedLanguage(language);
    setShowConfirmation(true);
    setProgressValue(100);
    
    // Clear any existing timers
    if (timer) clearTimeout(timer);
    if (timerInterval.current) clearInterval(timerInterval.current);
    
    // Set timeout to return to grid after 20 seconds
    const timeoutId = window.setTimeout(() => {
      setSelectedLanguage(null);
      setShowConfirmation(false);
    }, 20000);
    
    // Set interval to update progress bar
    timerInterval.current = window.setInterval(() => {
      setProgressValue((prev) => Math.max(prev - 0.5, 0));
    }, 100);
    
    setTimer(timeoutId);
  };

  const handleConfirm = () => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage.code);
      if (timer) clearTimeout(timer);
      if (timerInterval.current) clearInterval(timerInterval.current);
      
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
    if (timer) clearTimeout(timer);
    if (timerInterval.current) clearInterval(timerInterval.current);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  return (
    <div className={`${inDialog ? '' : 'h-screen'} w-full bg-background ${inDialog ? 'p-0' : 'p-4 md:p-8'} overflow-hidden relative`}>
      {!inDialog && (
        <h1 className="text-2xl md:text-3xl text-center font-bold mb-8">
          {getWelcomeText(languages[currentTitleLanguage].code)}
        </h1>
      )}
      
      {inDialog && (
        <h2 className="text-xl md:text-2xl text-center font-semibold mb-6">
          {currentLanguage === 'de' ? 'Sprache auswählen' : 'Select Language'}
        </h2>
      )}
      
      {/* Sound and Help buttons - only show on main page, not in dialog */}
      {!inDialog && (
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleSound}
            className="rounded-full"
          >
            {soundEnabled ? <Volume className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-full"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Language Selection</h3>
                <p>Please select your mother tongue to continue. This will set the language for the entire platform.</p>
                <p>You can change the language later if needed.</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
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

      {/* Language selection overlay with zoom animation - now with Yes/No buttons */}
      {selectedLanguage && (
        <div 
          className={`${inDialog ? 'fixed' : 'fixed'} inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in`}
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
          
          <div className="bg-white rounded-2xl p-6 w-[85%] max-w-md mx-auto flex flex-col items-center animate-zoom-in">
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
              
              <p className="text-sm md:text-base">
                {selectedLanguage.rtl ? `يمكنك تغيير هذا لاحقاً!` : `You can change this later!`}
              </p>
            </div>
            
            <div className="flex w-full gap-4 mb-4">
              <Button 
                onClick={handleCancel}
                variant="outline"
                className="flex-1 py-2 md:py-4 border-red-500 text-red-500 hover:bg-red-50"
              >
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
