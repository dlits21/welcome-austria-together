
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getHowCanIHelpText, getInformationHoverText, getCategoryLabel, getSearchPlaceholder } from '../data/languages';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../components/ui/hover-card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { Search, Info, BookOpen, Users, HelpCircle, Home as HomeIcon, Volume, VolumeX, PlaySquare, Languages } from 'lucide-react';
import LanguageGrid from '../components/LanguageGrid';

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = React.useState('');
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1]; // Default to English

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      console.log('Search query:', searchInput);
      // Navigate to search results page or handle search
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/${category}`);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // Sound toggle logic would be implemented here
  };

  const getTooltipText = (iconName: string): string => {
    if (language.code === 'de') {
      switch (iconName) {
        case 'home': return 'Zur Startseite';
        case 'sound': return soundEnabled ? 'Ton ausschalten' : 'Ton einschalten';
        case 'help': return 'Hilfe anzeigen';
        case 'language': return 'Sprache ändern';
        default: return '';
      }
    } else {
      switch (iconName) {
        case 'home': return 'Go to home page';
        case 'sound': return soundEnabled ? 'Turn sound off' : 'Turn sound on';
        case 'help': return 'Show help';
        case 'language': return 'Change language';
        default: return '';
      }
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center p-4 md:p-8 text-center"
      dir={language.rtl ? 'rtl' : 'ltr'}
    >
      <div className="w-full flex justify-between mb-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="p-2"
                onClick={() => navigate('/home')}
              >
                <HomeIcon className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{getTooltipText('home')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-2"
                  onClick={toggleSound}
                >
                  {soundEnabled ? <Volume className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{getTooltipText('sound')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-2"
                    >
                      <Languages className="h-6 w-6" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto p-0">
                    <DialogHeader className="p-4 border-b">
                      <DialogTitle>
                        {language.code === 'de' ? 'Sprache ändern' : 'Change Language'}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                      <LanguageGrid inDialog={true} />
                    </div>
                  </DialogContent>
                </Dialog>
              </TooltipTrigger>
              <TooltipContent>
                <p>{getTooltipText('language')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-2"
                    >
                      <HelpCircle className="h-6 w-6" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {language.code === 'de' ? 'Hilfe' : 'Help'}
                      </DialogTitle>
                    </DialogHeader>
                    <div>
                      {language.code === 'de' 
                        ? 'Hier finden Sie hilfreiche Informationen über die Startseite.' 
                        : 'Here you will find helpful information about the home page.'}
                    </div>
                  </DialogContent>
                </Dialog>
              </TooltipTrigger>
              <TooltipContent>
                <p>{getTooltipText('help')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <header className="mb-8 w-full max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">{getHowCanIHelpText(language.code)}</h1>
        
        <form onSubmit={handleSearch} className="flex w-full gap-2">
          <Input
            type="text"
            placeholder={getSearchPlaceholder(language.code)}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 text-lg py-6"
          />
          <Button type="submit" size="icon" className="h-auto w-12">
            <Search className="h-5 w-5" />
          </Button>
        </form>
      </header>
      
      <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-3xl">
        {/* Information Card */}
        <HoverCard openDelay={300}>
          <HoverCardTrigger asChild>
            <Button
              variant="outline"
              className="h-auto aspect-square bg-white border-2 flex flex-col gap-4 p-6 hover:bg-gray-50 hover:shadow-md transition-all"
              onClick={() => handleCategoryClick('information')}
            >
              <Info className="h-12 w-12 text-blue-600" />
              <span className="text-xl">{getCategoryLabel(language.code, 'information')}</span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent 
            className="w-80 p-4" 
            side="right"
            dir={language.rtl ? 'rtl' : 'ltr'}
          >
            <p>{getInformationHoverText(language.code)}</p>
          </HoverCardContent>
        </HoverCard>
        
        {/* Courses Card */}
        <HoverCard openDelay={300}>
          <HoverCardTrigger asChild>
            <Button
              variant="outline"
              className="h-auto aspect-square bg-white border-2 flex flex-col gap-4 p-6 hover:bg-gray-50 hover:shadow-md transition-all"
              onClick={() => handleCategoryClick('courses')}
            >
              <BookOpen className="h-12 w-12 text-green-600" />
              <span className="text-xl">{getCategoryLabel(language.code, 'courses')}</span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent 
            className="w-80 p-4" 
            side="right"
            dir={language.rtl ? 'rtl' : 'ltr'}
          >
            <div className="space-y-2">
              <p>Lorem ipsum text 1</p>
              <p>Additional information can go here. This content supports multiple lines.</p>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        {/* Community Card */}
        <HoverCard openDelay={300}>
          <HoverCardTrigger asChild>
            <Button
              variant="outline"
              className="h-auto aspect-square bg-white border-2 flex flex-col gap-4 p-6 hover:bg-gray-50 hover:shadow-md transition-all"
              onClick={() => handleCategoryClick('community')}
            >
              <Users className="h-12 w-12 text-purple-600" />
              <span className="text-xl">{getCategoryLabel(language.code, 'community')}</span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent 
            className="w-80 p-4" 
            side="right"
            dir={language.rtl ? 'rtl' : 'ltr'}
          >
            <div className="space-y-2">
              <p>Lorem ipsum text 2</p>
              <p>Community information with multiple lines of text to demonstrate multiline content in the hover card.</p>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        {/* Videos Card (replacing Help) */}
        <HoverCard openDelay={300}>
          <HoverCardTrigger asChild>
            <Button
              variant="outline"
              className="h-auto aspect-square bg-white border-2 flex flex-col gap-4 p-6 hover:bg-gray-50 hover:shadow-md transition-all"
              onClick={() => handleCategoryClick('videos')}
            >
              <PlaySquare className="h-12 w-12 text-red-600" />
              <span className="text-xl">
                {language.code === 'de' ? 'Videos' : 'Videos'}
              </span>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent 
            className="w-80 p-4" 
            side="right"
            dir={language.rtl ? 'rtl' : 'ltr'}
          >
            <div className="space-y-2">
              <p>Lorem ipsum text 3</p>
              <p>Help and support information can span multiple lines.</p>
              <p>The hover card will adjust its size to fit the content.</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
};

export default Home;
