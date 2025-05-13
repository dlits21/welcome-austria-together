
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../data/languages';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Volume, VolumeX, HelpCircle, Languages, Home as HomeIcon } from 'lucide-react';
import LanguageGrid from './LanguageGrid';

interface PageNavigationProps {
  toggleSound: () => void;
  soundEnabled: boolean;
  helpContent?: React.ReactNode;
}

const PageNavigation: React.FC<PageNavigationProps> = ({ toggleSound, soundEnabled, helpContent }) => {
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

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
    <div className="flex justify-between mb-6">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              onClick={() => navigate('/home')}
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              {language.rtl ? 'رجوع' : 'Back'}
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
                  {helpContent || (
                    <div>
                      {language.code === 'de' 
                        ? 'Hier finden Sie hilfreiche Informationen.' 
                        : 'Here you will find helpful information.'}
                    </div>
                  )}
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
  );
};

export default PageNavigation;
