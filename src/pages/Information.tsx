import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getCategoryLabel, getSearchPlaceholder } from '../data/languages';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { ArrowLeft, Volume, VolumeX, HelpCircle, Languages, Search } from 'lucide-react';

const informationCategories = [
  { id: 'political-education', icon: '📚', name: { en: 'Political Education', de: 'Politische Bildung' } },
  { id: 'german-learning', icon: '🇩🇪', name: { en: 'Learn German', de: 'Deutsch Lernen' } },
  { id: 'work', icon: '💼', name: { en: 'Work and Career', de: 'Arbeit und Beruf' } },
  { id: 'ask-me', icon: '❓', name: { en: 'Just Ask Me', de: 'Frag mich einfach' } },
  { id: 'housing', icon: '🏠', name: { en: 'Housing', de: 'Wohnen' } },
  { id: 'finance', icon: '💰', name: { en: 'Finance', de: 'Finanzen' } },
  { id: 'culture', icon: '🎭', name: { en: 'Culture and Leisure', de: 'Kultur und Freizeit' } },
  { id: 'mobility', icon: '🚌', name: { en: 'Mobility', de: 'Mobilität' } },
  { id: 'health', icon: '🏥', name: { en: 'Health', de: 'Gesundheit' } },
  { id: 'education', icon: '🎓', name: { en: 'Education and Childcare', de: 'Bildung und Kinderbetreuung' } },
  { id: 'funding', icon: '💶', name: { en: 'Funding', de: 'Förderungen' } },
  { id: 'volunteering', icon: '🤝', name: { en: 'Volunteering', de: 'Mithelfen' } },
  { id: 'contacts', icon: '📞', name: { en: 'Important Contacts and Legal Help', de: 'Wichtige Kontakte und rechtliche Hilfe' } },
  { id: 'translation', icon: '🔄', name: { en: 'Translation', de: 'Übersetzen' } },
];

const Information: React.FC = () => {
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
            {soundEnabled ? <Volume className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
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
        {getCategoryLabel(language.code, 'information')}
      </h1>
      
      <form onSubmit={handleSearch} className="flex w-full gap-2 mb-8 max-w-3xl">
        <Input
          type="text"
          placeholder={language.code === 'de' ? 'Worüber möchtest du mehr wissen?' : 'What would you like to know more about?'}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </form>
      
      <ScrollArea className="h-[60vh] max-w-3xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {informationCategories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              className="h-auto aspect-square flex flex-col gap-2 p-4 items-center justify-center"
              onClick={() => console.log(`Selected: ${category.id}`)}
            >
              <span className="text-4xl">{category.icon}</span>
              <span className="text-center">
                {language.code === 'de' ? category.name.de : category.name.en}
              </span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Information;
