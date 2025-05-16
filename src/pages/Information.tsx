import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getCategoryLabel } from '../data/languages';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { Search } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../components/ui/hover-card';

// Interface for the information categories
interface CategoryItem {
  id: string;
  icon: string;
  name: {
    en: string;
    de: string;
  };
  description: {
    en: string;
    de: string;
  };
  color: string;
}

const informationCategories: CategoryItem[] = [
  { 
    id: 'political-education', 
    icon: '📚', 
    name: { en: 'Political Education', de: 'Politische Bildung' },
    description: { 
      en: 'Learn about the Austrian political system, your rights and responsibilities.', 
      de: 'Erfahren Sie mehr über das österreichische politische System, Ihre Rechte und Pflichten.' 
    },
    color: 'bg-blue-50 hover:bg-blue-100'
  },
  { 
    id: 'german-learning', 
    icon: '🇩🇪', 
    name: { en: 'Learn German', de: 'Deutsch Lernen' },
    description: { 
      en: 'Find German language courses, practice materials, and learning resources.', 
      de: 'Finden Sie Deutschkurse, Übungsmaterialien und Lernressourcen.' 
    },
    color: 'bg-red-50 hover:bg-red-100'
  },
  { 
    id: 'work', 
    icon: '💼', 
    name: { en: 'Work and Career', de: 'Arbeit und Beruf' },
    description: { 
      en: 'Job opportunities, work permits, career development, and employment rights.', 
      de: 'Arbeitsangebote, Arbeitsgenehmigungen, Karriereentwicklung und Arbeitnehmerrechte.' 
    },
    color: 'bg-amber-50 hover:bg-amber-100'
  },
  { 
    id: 'ask-me', 
    icon: '❓', 
    name: { en: 'Just Ask Me', de: 'Frag mich einfach' },
    description: { 
      en: 'Have a question? Get personalized answers and guidance here.', 
      de: 'Haben Sie eine Frage? Erhalten Sie hier personalisierte Antworten und Anleitungen.' 
    },
    color: 'bg-purple-50 hover:bg-purple-100'
  },
  { 
    id: 'housing', 
    icon: '🏠', 
    name: { en: 'Housing', de: 'Wohnen' },
    description: { 
      en: 'Finding accommodation, rental laws, housing subsidies, and tenant rights.', 
      de: 'Wohnungssuche, Mietrecht, Wohnbeihilfen und Mieterrechte.' 
    },
    color: 'bg-green-50 hover:bg-green-100'
  },
  { 
    id: 'finance', 
    icon: '💰', 
    name: { en: 'Finance', de: 'Finanzen' },
    description: { 
      en: 'Banking, taxes, financial assistance, and managing your money.', 
      de: 'Bankwesen, Steuern, finanzielle Unterstützung und Umgang mit Ihrem Geld.' 
    },
    color: 'bg-emerald-50 hover:bg-emerald-100'
  },
  { 
    id: 'culture', 
    icon: '🎭', 
    name: { en: 'Culture and Leisure', de: 'Kultur und Freizeit' },
    description: { 
      en: 'Cultural activities, events, sports, and recreational opportunities.', 
      de: 'Kulturelle Aktivitäten, Veranstaltungen, Sport und Freizeitmöglichkeiten.' 
    },
    color: 'bg-pink-50 hover:bg-pink-100'
  },
  { 
    id: 'mobility', 
    icon: '🚌', 
    name: { en: 'Mobility', de: 'Mobilität' },
    description: { 
      en: 'Public transportation, driving licenses, and getting around Austria.', 
      de: 'Öffentliche Verkehrsmittel, Führerscheine und Fortbewegung in Österreich.' 
    },
    color: 'bg-cyan-50 hover:bg-cyan-100'
  },
  { 
    id: 'health', 
    icon: '🏥', 
    name: { en: 'Health', de: 'Gesundheit' },
    description: { 
      en: 'Healthcare system, insurance, emergency services, and mental health support.', 
      de: 'Gesundheitssystem, Versicherung, Notdienste und psychische Gesundheitsversorgung.' 
    },
    color: 'bg-rose-50 hover:bg-rose-100'
  },
  { 
    id: 'education', 
    icon: '🎓', 
    name: { en: 'Education and Childcare', de: 'Bildung und Kinderbetreuung' },
    description: { 
      en: 'Schools, universities, childcare options, and educational opportunities.', 
      de: 'Schulen, Universitäten, Kinderbetreuungsmöglichkeiten und Bildungschancen.' 
    },
    color: 'bg-indigo-50 hover:bg-indigo-100'
  },
  { 
    id: 'funding', 
    icon: '💶', 
    name: { en: 'Funding', de: 'Förderungen' },
    description: { 
      en: 'Grants, subsidies, and financial assistance programs available to you.', 
      de: 'Zuschüsse, Subventionen und für Sie verfügbare finanzielle Hilfsprogramme.' 
    },
    color: 'bg-lime-50 hover:bg-lime-100'
  },
  { 
    id: 'volunteering', 
    icon: '🤝', 
    name: { en: 'Volunteering', de: 'Mithelfen' },
    description: { 
      en: 'Opportunities to volunteer, help others, and contribute to your community.', 
      de: 'Möglichkeiten zur Freiwilligenarbeit, anderen zu helfen und zur Gemeinschaft beizutragen.' 
    },
    color: 'bg-orange-50 hover:bg-orange-100'
  },
  { 
    id: 'contacts', 
    icon: '📞', 
    name: { en: 'Important Contacts and Legal Help', de: 'Wichtige Kontakte und rechtliche Hilfe' },
    description: { 
      en: 'Emergency numbers, legal assistance, and important organizations to know.', 
      de: 'Notrufnummern, Rechtshilfe und wichtige Organisationen, die Sie kennen sollten.' 
    },
    color: 'bg-teal-50 hover:bg-teal-100'
  },
  { 
    id: 'translation', 
    icon: '🔄', 
    name: { en: 'Translation', de: 'Übersetzen' },
    description: { 
      en: 'Translation services, language assistance, and communication support.', 
      de: 'Übersetzungsdienste, Sprachunterstützung und Kommunikationshilfe.' 
    },
    color: 'bg-sky-50 hover:bg-sky-100'
  },
];

const Information: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const navigate = useNavigate();
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      console.log('Search query:', searchInput);
      // Search logic would go here
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // Sound toggle logic would be implemented here
  };

  const handleCategoryClick = (categoryId: string) => {
    console.log(`Selected: ${categoryId}`);
    navigate(`/information/${categoryId}`);
  };

  const helpContent = (
    <div>
      {language.code === 'de' 
        ? 'Diese Seite enthält Informationen zu verschiedenen Themen, die Ihnen bei der Integration helfen können. Sie können auf jede Kachel klicken, um weitere Informationen zu diesem Thema zu erhalten.' 
        : 'This page contains information on various topics that can help you with integration. You can click on any tile to get more information about that topic.'}
    </div>
  );

  return (
    <div 
      className="min-h-screen p-4 md:p-8"
      dir={language.rtl ? 'rtl' : 'ltr'}
    >
      <PageHeader 
        toggleSound={toggleSound} 
        soundEnabled={soundEnabled}
        helpContent={helpContent}
      />
      
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
      
      <ScrollArea className="h-[60vh] max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {informationCategories.map((category) => (
            <HoverCard key={category.id} openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Button
                  variant="outline"
                  className={`h-auto flex flex-col gap-2 p-4 items-center justify-center text-center border-2 hover:shadow-md transition-all ${category.color} sm:w-full`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span className="text-4xl mb-2">{category.icon}</span>
                  <span className="text-center font-medium text-base">
                    {language.code === 'de' ? category.name.de : category.name.en}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {language.code === 'de' 
                      ? 'Klicken f��r Details' 
                      : 'Click for details'}
                  </span>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">
                      {language.code === 'de' ? category.name.de : category.name.en}
                    </h4>
                    <p className="text-sm">
                      {language.code === 'de' ? category.description.de : category.description.en}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Information;
