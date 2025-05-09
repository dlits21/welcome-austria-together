
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getCategoryLabel } from '../data/languages';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { Checkbox } from '../components/ui/checkbox';
import { Card, CardContent } from '../components/ui/card';
import { BookOpen, FileText, TestTube } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { useNavigate } from 'react-router-dom';
import PageNavigation from '../components/PageNavigation';

// Sample data for German learning resources
const germanLearningData = [
  {
    id: 1,
    title: 'A1 German Course - Beginners',
    state: 'Vienna',
    cost: '€0',
    type: 'course',
    provider: 'VHS Wien',
    duration: '8 weeks',
    startDate: '2025-06-01',
  },
  {
    id: 2,
    title: 'A2 German Practice Exam',
    state: 'Upper Austria',
    cost: '€15',
    type: 'test',
    provider: 'ÖSD',
    duration: '2 hours',
    startDate: '2025-05-15',
  },
  {
    id: 3,
    title: 'German Grammar Handbook',
    state: 'Online',
    cost: '€10',
    type: 'resource',
    provider: 'Deutsche Akademie',
    format: 'PDF',
  },
  {
    id: 4,
    title: 'B1 Intensive Course',
    state: 'Tyrol',
    cost: '€250',
    type: 'course',
    provider: 'Sprachschule Innsbruck',
    duration: '4 weeks',
    startDate: '2025-07-10',
  },
  {
    id: 5,
    title: 'Online German Conversation Club',
    state: 'Online',
    cost: '€5/month',
    type: 'resource',
    provider: 'Deutsch Online',
    format: 'Virtual Meeting',
  },
  {
    id: 6,
    title: 'B2 Practice Test',
    state: 'Salzburg',
    cost: '€20',
    type: 'test',
    provider: 'Goethe Institut',
    duration: '3 hours',
    startDate: '2025-06-20',
  },
  {
    id: 7,
    title: 'C1 Business German',
    state: 'Styria',
    cost: '€350',
    type: 'course',
    provider: 'Business Language Center',
    duration: '12 weeks',
    startDate: '2025-08-05',
  },
  {
    id: 8,
    title: 'German Vocabulary Flashcards',
    state: 'Online',
    cost: '€0',
    type: 'resource',
    provider: 'Deutsch Lernen',
    format: 'App/Website',
  },
  {
    id: 9,
    title: 'A2-B1 Bridge Course',
    state: 'Lower Austria',
    cost: '€180',
    type: 'course',
    provider: 'NÖ Sprachschule',
    duration: '6 weeks',
    startDate: '2025-07-01',
  },
  {
    id: 10,
    title: 'C2 Mock Exam',
    state: 'Vorarlberg',
    cost: '€25',
    type: 'test',
    provider: 'telc GmbH',
    duration: '4 hours',
    startDate: '2025-09-15',
  },
  {
    id: 11,
    title: 'German for Healthcare Professionals',
    state: 'Carinthia',
    cost: '€200',
    type: 'course',
    provider: 'MedSprachInstitut',
    duration: '8 weeks',
    startDate: '2025-06-15',
  },
  {
    id: 12,
    title: 'Children's German Storybooks',
    state: 'Burgenland',
    cost: '€12',
    type: 'resource',
    provider: 'Kinderleicht Deutsch',
    format: 'Print Books',
  },
];

// Extract unique states for filtering
const allStates = [...new Set(germanLearningData.map(item => item.state))];

// Type options
const typeOptions = [
  { id: 'course', label: { en: 'Courses', de: 'Kurse' }, icon: BookOpen },
  { id: 'resource', label: { en: 'Resources', de: 'Ressourcen' }, icon: FileText },
  { id: 'test', label: { en: 'Tests and Practice Exams', de: 'Tests und Übungsprüfungen' }, icon: TestTube },
];

const GermanLearning: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];
  const navigate = useNavigate();
  
  const [searchInput, setSearchInput] = useState('');
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['course', 'resource', 'test']);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Filter data based on search, states, and types
  const filteredData = useMemo(() => {
    return germanLearningData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchInput.toLowerCase());
      const matchesState = selectedStates.length === 0 || selectedStates.includes(item.state);
      const matchesType = selectedTypes.includes(item.type);
      
      return matchesSearch && matchesState && matchesType;
    });
  }, [searchInput, selectedStates, selectedTypes]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search logic is implemented through the filteredData memo
  };
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // Sound toggle logic would be implemented here
  };
  
  const toggleState = (state: string) => {
    setSelectedStates(prev =>
      prev.includes(state)
        ? prev.filter(s => s !== state)
        : [...prev, state]
    );
  };
  
  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  const helpContent = (
    <div>
      {language.code === 'de' 
        ? 'Diese Seite zeigt verschiedene Ressourcen zum Deutschlernen. Nutzen Sie die Filter auf der linken Seite, um die Liste anzupassen.' 
        : 'This page shows various German learning resources. Use the filters on the left side to customize the list.'}
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
        {language.code === 'de' ? 'Deutsch Lernen' : 'Learn German'}
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex w-full gap-2">
            <Input
              type="text"
              placeholder={language.code === 'de' ? 'Suchen...' : 'Search...'}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1"
            />
          </form>
          
          {/* Resource type filter */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">
                {language.code === 'de' ? 'Ressourcentyp' : 'Resource Type'}
              </h3>
              <div className="space-y-2">
                {typeOptions.map(type => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`type-${type.id}`} 
                      checked={selectedTypes.includes(type.id)}
                      onCheckedChange={() => toggleType(type.id)}
                    />
                    <label
                      htmlFor={`type-${type.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                    >
                      {React.createElement(type.icon, { className: "h-4 w-4" })}
                      {language.code === 'de' ? type.label.de : type.label.en}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* State filter */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">
                {language.code === 'de' ? 'Bundesland' : 'State'}
              </h3>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {allStates.sort().map(state => (
                    <div key={state} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`state-${state}`} 
                        checked={selectedStates.includes(state)}
                        onCheckedChange={() => toggleState(state)}
                      />
                      <label
                        htmlFor={`state-${state}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {state}
                      </label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        {/* Results list */}
        <div className="lg:col-span-3">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language.code === 'de' ? 'Titel' : 'Title'}</TableHead>
                  <TableHead>{language.code === 'de' ? 'Typ' : 'Type'}</TableHead>
                  <TableHead>{language.code === 'de' ? 'Bundesland' : 'State'}</TableHead>
                  <TableHead>{language.code === 'de' ? 'Kosten' : 'Cost'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50" onClick={() => console.log(`Selected item: ${item.id}`)}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      {item.type === 'course' && <BookOpen className="h-4 w-4 inline mr-2" />}
                      {item.type === 'resource' && <FileText className="h-4 w-4 inline mr-2" />}
                      {item.type === 'test' && <TestTube className="h-4 w-4 inline mr-2" />}
                      {language.code === 'de' 
                        ? typeOptions.find(t => t.id === item.type)?.label.de 
                        : typeOptions.find(t => t.id === item.type)?.label.en}
                    </TableCell>
                    <TableCell>{item.state}</TableCell>
                    <TableCell>{item.cost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default GermanLearning;
