
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getHowCanIHelpText, getCategoryLabel, getSearchPlaceholder } from '../data/languages';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Search, HelpCircle, Volume, VolumeX, Languages, MessageSquare, Info, BookOpen, Users } from 'lucide-react';
import LanguageGrid from '../components/LanguageGrid';
import { toast } from '../components/ui/use-toast';
import { AspectRatio } from '../components/ui/aspect-ratio';

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1]; // Default to English

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate('/search', { state: { query: searchInput } });
    } else {
      toast({
        title: language.code === 'de' ? 'Bitte geben Sie einen Suchbegriff ein' : 'Please enter a search term',
        description: language.code === 'de' ? 'Das Suchfeld kann nicht leer sein' : 'The search field cannot be empty',
        variant: "destructive",
      });
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/${category}`);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // Sound toggle logic would be implemented here
    
    toast({
      title: soundEnabled 
        ? (language.code === 'de' ? 'Ton ausgeschaltet' : 'Sound disabled') 
        : (language.code === 'de' ? 'Ton eingeschaltet' : 'Sound enabled'),
      description: soundEnabled
        ? (language.code === 'de' ? 'Die Audio-Funktionen wurden deaktiviert' : 'Audio features have been disabled')
        : (language.code === 'de' ? 'Die Audio-Funktionen wurden aktiviert' : 'Audio features have been enabled'),
    });
  };

  // Prepare translations and text content
  const askTitle = language.code === 'de' ? 'Fragen' : 'Ask';
  const askSubtitle = language.code === 'de' 
    ? 'Haben Sie eine Frage? Kontaktieren Sie uns!' 
    : 'Do you have a question? Get in touch with us!';
    
  const infoTitle = language.code === 'de' ? 'Informationen' : 'Information';
  const infoSubtitle = language.code === 'de'
    ? 'Hier bieten wir spezifische Informationen zu verschiedenen Themen'
    : 'Here we offer specific information to various topics';
    
  const learnTitle = language.code === 'de' ? 'Lernen' : 'Learn';
  const learnSubtitle = language.code === 'de'
    ? 'Klicken Sie hier für Kurse, Ressourcen oder Klassen'
    : 'Click here for courses, resources or classes';
    
  const communityTitle = language.code === 'de' ? 'Gemeinschaft' : 'Community';
  const communitySubtitle = language.code === 'de'
    ? 'Brauchen Sie Hilfe oder möchten Sie anderen helfen? Klicken Sie hier'
    : 'Do you need help or do you want to help others? Click here';

  return (
    <div 
      className="min-h-screen flex flex-col bg-background p-4 md:p-6"
      dir={language.rtl ? 'rtl' : 'ltr'}
    >
      {/* Header with Logo and Icons */}
      <header className="w-full flex justify-between items-center mb-8">
        <div className="flex items-center">
          <img 
            src="/assets/images/icon.png"
            alt="UND Logo"
            className="h-10 md:h-12"
          />
        </div>
        
        <div className="flex gap-2">
          {/* Sound Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSound}
            className="rounded-full"
          >
            {soundEnabled ? <Volume className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
          
          {/* Language Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <Languages className="h-5 w-5" />
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
          
          {/* Help Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {language.code === 'de' ? 'Hilfe' : 'Help'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p>
                  {language.code === 'de' 
                    ? 'Diese Seite bietet Zugang zu Informationen, Lernmaterialien und Community-Ressourcen.' 
                    : 'This page provides access to information, learning materials, and community resources.'}
                </p>
                <p>
                  {language.code === 'de'
                    ? 'Sie können die Suchleiste verwenden, um spezifische Informationen zu finden.'
                    : 'You can use the search bar to find specific information.'}
                </p>
                <p>
                  {language.code === 'de'
                    ? 'Die vier Kacheln unten bieten direkten Zugang zu wichtigen Bereichen der Website.'
                    : 'The four tiles below provide direct access to important areas of the website.'}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          {getHowCanIHelpText(language.code)}
        </h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex w-full gap-2 mb-10">
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
        
        {/* Category Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full overflow-y-auto pb-6">
          {/* Ask Card */}
          <Card 
            className="border-2 hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all"
            onClick={() => handleCategoryClick('ask')}
          >
            <CardHeader className="pb-2">
              <AspectRatio ratio={4/3} className="flex items-center justify-center bg-blue-50 rounded-t-lg">
                <MessageSquare className="h-16 w-16 text-blue-500" />
              </AspectRatio>
              <CardTitle className="mt-4 text-center">{askTitle}</CardTitle>
              <CardDescription className="text-center">{askSubtitle}</CardDescription>
            </CardHeader>
          </Card>
          
          {/* Information Card */}
          <Card 
            className="border-2 hover:border-green-300 hover:shadow-sm cursor-pointer transition-all"
            onClick={() => handleCategoryClick('information')}
          >
            <CardHeader className="pb-2">
              <AspectRatio ratio={4/3} className="flex items-center justify-center bg-green-50 rounded-t-lg">
                <Info className="h-16 w-16 text-green-500" />
              </AspectRatio>
              <CardTitle className="mt-4 text-center">{infoTitle}</CardTitle>
              <CardDescription className="text-center">{infoSubtitle}</CardDescription>
            </CardHeader>
          </Card>
          
          {/* Learn Card */}
          <Card 
            className="border-2 hover:border-purple-300 hover:shadow-sm cursor-pointer transition-all"
            onClick={() => handleCategoryClick('learn')}
          >
            <CardHeader className="pb-2">
              <AspectRatio ratio={4/3} className="flex items-center justify-center bg-purple-50 rounded-t-lg">
                <BookOpen className="h-16 w-16 text-purple-500" />
              </AspectRatio>
              <CardTitle className="mt-4 text-center">{learnTitle}</CardTitle>
              <CardDescription className="text-center">{infoSubtitle}</CardDescription>
            </CardHeader>
          </Card>
          
          {/* Community Card */}
          <Card 
            className="border-2 hover:border-orange-300 hover:shadow-sm cursor-pointer transition-all"
            onClick={() => handleCategoryClick('community')}
          >
            <CardHeader className="pb-2">
              <AspectRatio ratio={4/3} className="flex items-center justify-center bg-orange-50 rounded-t-lg">
                <Users className="h-16 w-16 text-orange-500" />
              </AspectRatio>
              <CardTitle className="mt-4 text-center">{communityTitle}</CardTitle>
              <CardDescription className="text-center">{communitySubtitle}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;
