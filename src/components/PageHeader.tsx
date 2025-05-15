
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../data/languages';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Volume, VolumeX, HelpCircle, Languages } from 'lucide-react';
import LanguageGrid from './LanguageGrid';

interface PageHeaderProps {
  toggleSound: () => void;
  soundEnabled: boolean;
  helpContent?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ toggleSound, soundEnabled, helpContent }) => {
  const { currentLanguage } = useLanguage();
  const language = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const getTooltipText = (iconName: string): string => {
    if (language.code === 'de') {
      switch (iconName) {
        case 'sound': return soundEnabled ? 'Ton ausschalten' : 'Ton einschalten';
        case 'help': return 'Hilfe anzeigen';
        case 'language': return 'Sprache ändern';
        default: return '';
      }
    } else {
      switch (iconName) {
        case 'sound': return soundEnabled ? 'Turn sound off' : 'Turn sound on';
        case 'help': return 'Show help';
        case 'language': return 'Change language';
        default: return '';
      }
    }
  };

  return (
    <header className="w-full flex justify-between items-center mb-6">
      <div className="flex items-center">
        <img 
          src="/assets/images/icon.png"
          alt="App Logo"
          className="h-10 md:h-12"
        />
      </div>
      
      <div className="flex gap-2">
        {/* Sound Toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={toggleSound}
              >
                {soundEnabled ? <Volume className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{getTooltipText('sound')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Language Dialog */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent>
              <p>{getTooltipText('language')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Help Dialog */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
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
    </header>
  );
};

export default PageHeader;
