
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getCategoryLabel } from '../data/languages';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, HelpingHand, Users } from 'lucide-react';
import PageNavigation from '../components/PageNavigation';

const Community: React.FC = () => {
  const { currentLanguage } = useLanguage();
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

  const helpContent = (
    <div>
      {language.code === 'de' 
        ? 'Auf dieser Seite können Sie mit anderen Menschen in Kontakt treten, Hilfe finden oder anbieten.' 
        : 'On this page, you can connect with other people, find or offer help.'}
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
      
      <h1 className="text-3xl font-bold mb-6">
        {getCategoryLabel(language.code, 'community')}
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Button
          variant="outline"
          className="h-auto aspect-video bg-white border-2 flex flex-col gap-4 p-6 hover:bg-gray-50 hover:shadow-md transition-all"
          onClick={() => console.log('I need help')}
        >
          <Users className="h-16 w-16 text-blue-600" />
          <span className="text-2xl">
            {language.code === 'de' ? 'Ich brauche Hilfe mit...' : 'I need help with...'}
          </span>
        </Button>
        
        <Button
          variant="outline"
          className="h-auto aspect-video bg-white border-2 flex flex-col gap-4 p-6 hover:bg-gray-50 hover:shadow-md transition-all"
          onClick={() => console.log('I can help')}
        >
          <HelpingHand className="h-16 w-16 text-green-600" />
          <span className="text-2xl">
            {language.code === 'de' ? 'Ich kann helfen mit...' : 'I can help with...'}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Community;
