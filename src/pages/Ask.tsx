
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { languages } from '../data/languages';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { ArrowLeft, MessageSquare, Mail, Phone, Facebook, Users } from 'lucide-react';
import PageNavigation from '../components/PageNavigation';

const Ask: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1]; // Default to English

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };
  
  const handleContactClick = (method: string) => {
    console.log(`Contact via ${method}`);
    // Implementation for contacting via different methods would go here
  };
  
  // States of Austria
  const austrianStates = [
    { name: 'Vienna', nameDe: 'Wien', address: 'Quellenstraße 51, 1100 Wien' },
    { name: 'Lower Austria', nameDe: 'Niederösterreich', address: 'Wiener Straße 31, 3100 St. Pölten' },
    { name: 'Upper Austria', nameDe: 'Oberösterreich', address: 'Landstraße 36, 4020 Linz' },
    { name: 'Styria', nameDe: 'Steiermark', address: 'Herrengasse 16, 8010 Graz' },
    { name: 'Tyrol', nameDe: 'Tirol', address: 'Maria-Theresien-Straße 42, 6020 Innsbruck' },
    { name: 'Carinthia', nameDe: 'Kärnten', address: 'Alter Platz 30, 9020 Klagenfurt' },
    { name: 'Salzburg', nameDe: 'Salzburg', address: 'Getreidegasse 33, 5020 Salzburg' },
    { name: 'Vorarlberg', nameDe: 'Vorarlberg', address: 'Marktstraße 11, 6900 Bregenz' },
    { name: 'Burgenland', nameDe: 'Burgenland', address: 'Hauptstraße 31, 7000 Eisenstadt' },
  ];
  
  // Translate based on language
  const mentorTitle = language.code === 'de' ? 'Mit einem Mentor sprechen' : 'Talk to a mentor';
  const communityTitle = language.code === 'de' ? 'Frage die Community' : 'Ask the community';
  const visitTitle = language.code === 'de' ? 'Besuche uns persönlich' : 'Visit us in person';
  const pageTitle = language.code === 'de' ? 'Fragen' : 'Ask';
  const pageSubtitle = language.code === 'de' ? 'Kontaktiere uns direkt' : 'Reach out to us directly';
  
  // Help content for this page
  const helpContent = (
    <div className="space-y-4">
      <p>
        {language.code === 'de' 
          ? 'Auf dieser Seite können Sie mit uns in Kontakt treten.' 
          : 'On this page, you can get in touch with us.'}
      </p>
      <p>
        {language.code === 'de'
          ? 'Wählen Sie eine der Optionen, um mehr Informationen zu erhalten.'
          : 'Select one of the options to get more information.'}
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
          <h1 className="text-3xl font-bold">{pageTitle}</h1>
          <p className="text-muted-foreground mt-2">{pageSubtitle}</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {/* Talk to a mentor */}
          <AccordionItem value="mentor" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:bg-muted/20">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                <span className="font-medium">{mentorTitle}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-between text-left" 
                  onClick={() => handleContactClick('whatsapp')}
                >
                  WhatsApp
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between text-left" 
                  onClick={() => handleContactClick('signal')}
                >
                  Signal
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between text-left" 
                  onClick={() => handleContactClick('facebook')}
                >
                  Facebook
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between text-left" 
                  onClick={() => handleContactClick('email')}
                >
                  Email
                  <Mail className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between text-left" 
                  onClick={() => handleContactClick('phone')}
                >
                  {language.code === 'de' ? 'Telefon' : 'Phone'}
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Ask the community */}
          <AccordionItem value="community" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:bg-muted/20">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-green-500" />
                <span className="font-medium">{communityTitle}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-between text-left" 
                  onClick={() => handleContactClick('community-whatsapp')}
                >
                  WhatsApp
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between text-left" 
                  onClick={() => handleContactClick('community-signal')}
                >
                  Signal
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-between text-left" 
                  onClick={() => handleContactClick('community-forum')}
                >
                  Forum
                  <Users className="h-4 w-4" />
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          {/* Visit in person */}
          <AccordionItem value="visit" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 hover:bg-muted/20">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                <span className="font-medium">{visitTitle}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3">
              <div className="space-y-2">
                {austrianStates.map((state) => (
                  <Card key={state.name} className="p-3">
                    <h3 className="font-medium">
                      {language.code === 'de' ? state.nameDe : state.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{state.address}</p>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
};

export default Ask;
