
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../data/languages';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const getWelcomeMessage = () => {
    switch (currentLanguage) {
      case 'de':
        return 'Willkommen!';
      case 'en':
        return 'Welcome!';
      case 'ar':
        return 'مرحباً!';
      case 'fa':
        return 'خوش آمدید!';
      case 'fr':
        return 'Bienvenue!';
      default:
        return 'Welcome!';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center" dir={language.rtl ? 'rtl' : 'ltr'}>
      <h1 className="text-4xl font-bold mb-8">{getWelcomeMessage()}</h1>
      <p className="text-xl mb-8">
        {language.flag} {language.nativeName}
      </p>
      
      <Button onClick={() => navigate('/')} className="mb-4">
        {currentLanguage === 'de' ? 'Sprache ändern' : 
         currentLanguage === 'ar' ? 'تغيير اللغة' : 
         currentLanguage === 'fa' ? 'تغییر زبان' : 
         'Change Language'}
      </Button>
      
      <p className="text-gray-500 mt-8">
        {currentLanguage === 'de' ? 'Homepage-Inhalt folgt...' : 
         currentLanguage === 'ar' ? 'محتوى الصفحة الرئيسية يتبع...' : 
         currentLanguage === 'fa' ? 'محتوای صفحه اصلی به زودی...' : 
         'Homepage content coming soon...'}
      </p>
    </div>
  );
};

export default Home;
