
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getCategoryLabel } from '../data/languages';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, Sound, SoundOff, HelpCircle, Languages, Search, BookOpen, Briefcase } from 'lucide-react';

const courseCategories = [
  { id: 'take-course', icon: <BookOpen className="h-12 w-12 text-blue-600" />, name: { en: 'Take a Course', de: 'Einen Kurs besuchen' } },
  { id: 'learn-skill', icon: <BookOpen className="h-12 w-12 text-green-600" />, name: { en: 'Learn a Skill', de: 'Eine Fähigkeit erlernen' } },
  { id: 'find-job1', icon: <Briefcase className="h-12 w-12 text-purple-600" />, name: { en: 'Find a Job', de: 'Einen Job finden' } },
  { id: 'find-job2', icon: <Briefcase className="h-12 w-12 text-red-600" />, name: { en: 'Find a Job', de: 'Einen Job finden' } },
];

const Courses: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      console.log('Search query:', searchInput);
      // Search logic here
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // Sound toggle logic would be implemented here
  };

  return (
    <div 
      className="min-h-screen p-4 md:p-8"
      dir={language.rtl ? 'rtl' : 'ltr'}
    >
      <div className="flex justify-between mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/home')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language.rtl ? 'رجوع' : 'Back'}
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="p-2"
            onClick={toggleSound}
          >
            {soundEnabled ? <Sound className="h-6 w-6" /> : <SoundOff className="h-6 w-6" />}
          </Button>
          <Button
            variant="ghost"
            className="p-2"
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            className="p-2"
          >
            <Languages className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">
        {getCategoryLabel(language.code, 'courses')}
      </h1>
      
      <form onSubmit={handleSearch} className="flex w-full gap-2 mb-8 max-w-3xl">
        <Input
          type="text"
          placeholder={language.code === 'de' ? 'Was möchtest du lernen?' : 'What would you like to learn?'}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </form>
      
      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        {courseCategories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            className="h-auto aspect-square bg-white border-2 flex flex-col gap-4 p-6 hover:bg-gray-50 hover:shadow-md transition-all"
            onClick={() => console.log(`Selected: ${category.id}`)}
          >
            {category.icon}
            <span className="text-xl">
              {language.code === 'de' ? category.name.de : category.name.en}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Courses;
