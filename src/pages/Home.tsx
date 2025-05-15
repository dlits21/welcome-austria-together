
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getHowCanIHelpText, getSearchPlaceholder } from '../data/languages';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Search, MessageSquare, Info, BookOpen, Users } from 'lucide-react';
import { toast } from '../components/ui/use-toast';
import { AspectRatio } from '../components/ui/aspect-ratio';
import PageHeader from '../components/PageHeader';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../components/ui/hover-card';

const Home: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[0];

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
  const askDescription = language.code === 'de'
    ? 'Haben Sie eine Frage zur Integration oder zum Leben in Österreich? Wir helfen Ihnen gerne.'
    : 'Do you have a question about integration or living in Austria? We are here to help.';
    
  const infoTitle = language.code === 'de' ? 'Informationen' : 'Information';
  const infoSubtitle = language.code === 'de'
    ? 'Hier bieten wir spezifische Informationen zu verschiedenen Themen'
    : 'Here we offer specific information to various topics';
  const infoDescription = language.code === 'de'
    ? 'Finden Sie umfassende Informationen zu verschiedenen Themen, die für Neuankömmlinge in Österreich wichtig sind.'
    : 'Find comprehensive information on various topics that are important for newcomers to Austria.';
    
  const learnTitle = language.code === 'de' ? 'Lernen' : 'Learn';
  const learnSubtitle = language.code === 'de'
    ? 'Klicken Sie hier für Kurse, Ressourcen oder Klassen'
    : 'Click here for courses, resources or classes';
  const learnDescription = language.code === 'de'
    ? 'Entdecken Sie Lernmöglichkeiten, Kurse und Ressourcen, um Ihre Fähigkeiten zu verbessern.'
    : 'Discover learning opportunities, courses, and resources to improve your skills.';
    
  const communityTitle = language.code === 'de' ? 'Gemeinschaft' : 'Community';
  const communitySubtitle = language.code === 'de'
    ? 'Brauchen Sie Hilfe oder möchten Sie anderen helfen? Klicken Sie hier'
    : 'Do you need help or do you want to help others? Click here';
  const communityDescription = language.code === 'de'
    ? 'Verbinden Sie sich mit der Gemeinschaft, finden Sie Unterstützung oder bieten Sie Ihre Hilfe an.'
    : 'Connect with the community, find support, or offer your help to others.';

  const helpContent = (
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
  );

  return (
    <div 
      className="min-h-screen flex flex-col bg-background p-4 md:p-6"
      dir={language.rtl ? 'rtl' : 'ltr'}
    >
      {/* Header with Logo and Icons */}
      <PageHeader 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        helpContent={helpContent}
      />
      
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
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
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
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex flex-col space-y-2">
                <p className="text-sm">{askDescription}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
          
          {/* Information Card */}
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
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
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex flex-col space-y-2">
                <p className="text-sm">{infoDescription}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
          
          {/* Learn Card */}
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Card 
                className="border-2 hover:border-purple-300 hover:shadow-sm cursor-pointer transition-all"
                onClick={() => handleCategoryClick('learn')}
              >
                <CardHeader className="pb-2">
                  <AspectRatio ratio={4/3} className="flex items-center justify-center bg-purple-50 rounded-t-lg">
                    <BookOpen className="h-16 w-16 text-purple-500" />
                  </AspectRatio>
                  <CardTitle className="mt-4 text-center">{learnTitle}</CardTitle>
                  <CardDescription className="text-center">{learnSubtitle}</CardDescription>
                </CardHeader>
              </Card>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex flex-col space-y-2">
                <p className="text-sm">{learnDescription}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
          
          {/* Community Card */}
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
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
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex flex-col space-y-2">
                <p className="text-sm">{communityDescription}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </main>
    </div>
  );
};

export default Home;
