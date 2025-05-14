
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../data/languages';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import PageNavigation from '../components/PageNavigation';

const Search: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Get the search query from location state or set empty
  const initialQuery = location.state?.query || '';
  const [searchInput, setSearchInput] = useState(initialQuery);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Would normally trigger a search here
    console.log(`Searching for: ${searchInput}`);
  };

  // Help content for this page
  const helpContent = (
    <div className="space-y-4">
      <p>
        {language.code === 'de' 
          ? 'Auf dieser Seite können Sie nach Inhalten suchen.' 
          : 'On this page, you can search for content.'}
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
          <h1 className="text-3xl font-bold">
            {language.code === 'de' ? 'Suche' : 'Search'}
          </h1>
        </div>
        
        <form onSubmit={handleSearch} className="flex w-full gap-2 mb-10">
          <Input
            type="text"
            placeholder={language.code === 'de' ? 'Wonach suchen Sie?' : 'What are you looking for?'}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 text-lg py-6"
          />
          <Button type="submit" size="icon" className="h-auto w-12">
            <SearchIcon className="h-5 w-5" />
          </Button>
        </form>

        {searchInput && (
          <div className="text-center py-8">
            <p>
              {language.code === 'de'
                ? `Suchergebnisse für: "${searchInput}"`
                : `Search results for: "${searchInput}"`}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
