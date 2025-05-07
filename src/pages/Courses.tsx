
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getCategoryLabel } from '../data/languages';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Courses: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  return (
    <div 
      className="min-h-screen p-4 md:p-8"
      dir={language.rtl ? 'rtl' : 'ltr'}
    >
      <Button 
        variant="outline" 
        onClick={() => navigate('/home')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {language.rtl ? 'رجوع' : 'Back'}
      </Button>
      
      <h1 className="text-3xl font-bold mb-6">
        {getCategoryLabel(language.code, 'courses')}
      </h1>
      
      <div className="prose max-w-3xl">
        <p className="text-lg">Courses content will be displayed here.</p>
      </div>
    </div>
  );
};

export default Courses;
