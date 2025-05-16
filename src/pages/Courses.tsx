
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getCategoryLabel } from '../data/languages';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { Search, BookOpen, Briefcase, FilterIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import PageNavigation from '../components/PageNavigation';
import { Badge } from '../components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';

interface Course {
  id: string;
  title: {
    en: string;
    de: string;
  };
  type: 'course' | 'resource' | 'exam';
  level?: 'beginner' | 'intermediate' | 'advanced';
  location?: string;
  price?: number;
  online: boolean;
  duration?: string;
  description: {
    en: string;
    de: string;
  };
  tags: string[];
  provider: string;
}

const courseData: Course[] = [
  {
    id: 'german-a1',
    title: {
      en: 'German A1 Course',
      de: 'Deutschkurs A1'
    },
    type: 'course',
    level: 'beginner',
    location: 'Vienna',
    price: 200,
    online: false,
    duration: '8 weeks',
    description: {
      en: 'Foundation German language course for beginners',
      de: 'Grundlegender Deutschkurs für Anfänger'
    },
    tags: ['language', 'german', 'beginner'],
    provider: 'VHS Vienna'
  },
  {
    id: 'german-b1',
    title: {
      en: 'German B1 Course',
      de: 'Deutschkurs B1'
    },
    type: 'course',
    level: 'intermediate',
    location: 'Vienna',
    price: 250,
    online: false,
    duration: '10 weeks',
    description: {
      en: 'Intermediate German language course',
      de: 'Mittlerer Deutschkurs'
    },
    tags: ['language', 'german', 'intermediate'],
    provider: 'VHS Vienna'
  },
  {
    id: 'job-search',
    title: {
      en: 'Job Search Workshop',
      de: 'Workshop zur Arbeitssuche'
    },
    type: 'course',
    location: 'Graz',
    price: 0,
    online: false,
    duration: '2 days',
    description: {
      en: 'Learn how to search and apply for jobs in Austria',
      de: 'Erfahren Sie, wie Sie in Österreich nach Jobs suchen und sich bewerben können'
    },
    tags: ['employment', 'career', 'workshop'],
    provider: 'AMS Austria'
  },
  {
    id: 'german-practice',
    title: {
      en: 'German Practice Resources',
      de: 'Deutsche Übungsmaterialien'
    },
    type: 'resource',
    level: 'beginner',
    online: true,
    description: {
      en: 'Online resources to practice your German language skills',
      de: 'Online-Ressourcen zum Üben Ihrer Deutschkenntnisse'
    },
    tags: ['language', 'german', 'self-study', 'online'],
    provider: 'Integration Fund'
  },
  {
    id: 'integration-exam',
    title: {
      en: 'Integration Exam',
      de: 'Integrationsprüfung'
    },
    type: 'exam',
    location: 'Multiple Locations',
    price: 150,
    online: false,
    description: {
      en: 'Official integration exam required for residency',
      de: 'Offizielle Integrationsprüfung, die für den Aufenthalt erforderlich ist'
    },
    tags: ['exam', 'official', 'integration'],
    provider: 'ÖIF'
  },
  {
    id: 'computer-skills',
    title: {
      en: 'Basic Computer Skills',
      de: 'Grundlegende Computerkenntnisse'
    },
    type: 'course',
    level: 'beginner',
    location: 'Salzburg',
    price: 100,
    online: false,
    duration: '4 weeks',
    description: {
      en: 'Learn essential computer skills for the workplace',
      de: 'Erlernen Sie wichtige Computerkenntnisse für den Arbeitsplatz'
    },
    tags: ['technology', 'skills', 'computer'],
    provider: 'Digital Campus'
  },
  {
    id: 'german-b2',
    title: {
      en: 'German B2 Online Course',
      de: 'Deutschkurs B2 Online'
    },
    type: 'course',
    level: 'advanced',
    price: 300,
    online: true,
    duration: '12 weeks',
    description: {
      en: 'Advanced German language course, fully online',
      de: 'Fortgeschrittener Deutschkurs, vollständig online'
    },
    tags: ['language', 'german', 'advanced', 'online'],
    provider: 'Language Center Vienna'
  },
  {
    id: 'cv-resources',
    title: {
      en: 'CV Writing Resources',
      de: 'Ressourcen zum Lebenslauf-Schreiben'
    },
    type: 'resource',
    online: true,
    description: {
      en: 'Templates and guides for writing an effective CV in Austria',
      de: 'Vorlagen und Anleitungen zum Schreiben eines effektiven Lebenslaufs in Österreich'
    },
    tags: ['employment', 'career', 'self-help'],
    provider: 'Career Center'
  }
];

const Courses: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courseData);
  const [activeTab, setActiveTab] = useState<'all' | 'courses' | 'resources' | 'exams'>('all');
  
  // Filter states
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [onlineOnly, setOnlineOnly] = useState<boolean>(false);
  const [freeOnly, setFreeOnly] = useState<boolean>(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  // Extract all unique locations from course data
  const locations = Array.from(new Set(courseData
    .filter(course => course.location)
    .map(course => course.location as string)));

  // Apply filters whenever they change
  useEffect(() => {
    let results = courseData;
    
    // Apply search filter
    if (searchInput.trim()) {
      const searchTerm = searchInput.toLowerCase();
      results = results.filter(course => 
        course.title[language.code === 'de' ? 'de' : 'en'].toLowerCase().includes(searchTerm) ||
        course.description[language.code === 'de' ? 'de' : 'en'].toLowerCase().includes(searchTerm) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply tab filter
    if (activeTab !== 'all') {
      results = results.filter(course => {
        if (activeTab === 'courses') return course.type === 'course';
        if (activeTab === 'resources') return course.type === 'resource';
        if (activeTab === 'exams') return course.type === 'exam';
        return true;
      });
    }
    
    // Apply level filter
    if (selectedLevels.length > 0) {
      results = results.filter(course => 
        course.level ? selectedLevels.includes(course.level) : false
      );
    }
    
    // Apply location filter
    if (selectedLocations.length > 0) {
      results = results.filter(course => 
        course.location ? selectedLocations.includes(course.location) : false
      );
    }
    
    // Apply online filter
    if (onlineOnly) {
      results = results.filter(course => course.online);
    }
    
    // Apply price filter
    if (freeOnly) {
      results = results.filter(course => course.price === 0);
    }
    
    setFilteredCourses(results);
  }, [searchInput, activeTab, selectedLevels, selectedLocations, onlineOnly, freeOnly, language.code]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // Sound toggle logic would be implemented here
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };
  
  const clearFilters = () => {
    setSelectedLevels([]);
    setSelectedLocations([]);
    setOnlineOnly(false);
    setFreeOnly(false);
  };

  const helpContent = (
    <div>
      {language.code === 'de' 
        ? 'Diese Seite zeigt verfügbare Kurse, Ressourcen und Prüfungen. Sie können die Liste filtern, um genau das zu finden, was Sie suchen.' 
        : 'This page shows available courses, resources, and exams. You can filter the list to find exactly what you\'re looking for.'}
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
        {getCategoryLabel(language.code, 'courses')}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden w-full mb-4">
              <Button variant="outline" className="w-full">
                <FilterIcon className="mr-2 h-4 w-4" />
                {language.code === 'de' ? 'Filter' : 'Filters'}
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  {language.code === 'de' ? 'Filter' : 'Filters'}
                </SheetTitle>
              </SheetHeader>
              <div className="py-4">
                {renderFilters()}
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Filters */}
          <div className="hidden md:block">
            {renderFilters()}
          </div>
        </div>

        <div className="md:col-span-3">
          <form onSubmit={handleSearch} className="flex w-full gap-2 mb-4">
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

          <Tabs defaultValue="all" className="mb-6" onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">
                {language.code === 'de' ? 'Alle' : 'All'}
              </TabsTrigger>
              <TabsTrigger value="courses">
                {language.code === 'de' ? 'Kurse' : 'Courses'}
              </TabsTrigger>
              <TabsTrigger value="resources">
                {language.code === 'de' ? 'Ressourcen' : 'Resources'}
              </TabsTrigger>
              <TabsTrigger value="exams">
                {language.code === 'de' ? 'Prüfungen' : 'Exams'}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {language.code === 'de' ? course.title.de : course.title.en}
                      </h3>
                      <p className="text-sm text-gray-600">{course.provider}</p>
                    </div>
                    <Badge 
                      className={`
                        ${course.type === 'course' ? 'bg-blue-600' : ''}
                        ${course.type === 'resource' ? 'bg-green-600' : ''}
                        ${course.type === 'exam' ? 'bg-orange-600' : ''}
                      `}
                    >
                      {course.type === 'course' && (language.code === 'de' ? 'Kurs' : 'Course')}
                      {course.type === 'resource' && (language.code === 'de' ? 'Ressource' : 'Resource')}
                      {course.type === 'exam' && (language.code === 'de' ? 'Prüfung' : 'Exam')}
                    </Badge>
                  </div>
                  
                  <p className="my-2 text-sm">
                    {language.code === 'de' ? course.description.de : course.description.en}
                  </p>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {course.level && (
                      <Badge variant="outline" className="text-xs">
                        {course.level === 'beginner' && (language.code === 'de' ? 'Anfänger' : 'Beginner')}
                        {course.level === 'intermediate' && (language.code === 'de' ? 'Mittelstufe' : 'Intermediate')}
                        {course.level === 'advanced' && (language.code === 'de' ? 'Fortgeschritten' : 'Advanced')}
                      </Badge>
                    )}
                    {course.location && (
                      <Badge variant="outline" className="text-xs">
                        {course.location}
                      </Badge>
                    )}
                    {course.online && (
                      <Badge variant="outline" className="text-xs">
                        {language.code === 'de' ? 'Online' : 'Online'}
                      </Badge>
                    )}
                    {course.price !== undefined && (
                      <Badge variant="outline" className="text-xs">
                        {course.price === 0 
                          ? (language.code === 'de' ? 'Kostenlos' : 'Free') 
                          : `€${course.price}`}
                      </Badge>
                    )}
                    {course.duration && (
                      <Badge variant="outline" className="text-xs">
                        {course.duration}
                      </Badge>
                    )}
                  </div>
                  
                  <Button className="mt-4 w-full">
                    {language.code === 'de' ? 'Details ansehen' : 'View Details'}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">
                {language.code === 'de' 
                  ? 'Keine Ergebnisse gefunden. Bitte versuchen Sie es mit anderen Filtereinstellungen.' 
                  : 'No results found. Please try with different filter settings.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  function renderFilters() {
    return (
      <>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">
              {language.code === 'de' ? 'Niveau' : 'Level'}
            </h3>
            <div className="space-y-2">
              {['beginner', 'intermediate', 'advanced'].map(level => (
                <div key={level} className="flex items-center">
                  <Checkbox 
                    id={`level-${level}`} 
                    checked={selectedLevels.includes(level)}
                    onCheckedChange={() => toggleLevel(level)} 
                  />
                  <label htmlFor={`level-${level}`} className="ml-2 text-sm">
                    {level === 'beginner' && (language.code === 'de' ? 'Anfänger' : 'Beginner')}
                    {level === 'intermediate' && (language.code === 'de' ? 'Mittelstufe' : 'Intermediate')}
                    {level === 'advanced' && (language.code === 'de' ? 'Fortgeschritten' : 'Advanced')}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">
              {language.code === 'de' ? 'Standort' : 'Location'}
            </h3>
            <div className="space-y-2">
              {locations.map(location => (
                <div key={location} className="flex items-center">
                  <Checkbox 
                    id={`location-${location}`} 
                    checked={selectedLocations.includes(location)}
                    onCheckedChange={() => toggleLocation(location)} 
                  />
                  <label htmlFor={`location-${location}`} className="ml-2 text-sm">
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">
              {language.code === 'de' ? 'Format' : 'Format'}
            </h3>
            <div className="flex items-center">
              <Checkbox 
                id="online-only" 
                checked={onlineOnly}
                onCheckedChange={() => setOnlineOnly(!onlineOnly)} 
              />
              <label htmlFor="online-only" className="ml-2 text-sm">
                {language.code === 'de' ? 'Nur online' : 'Online only'}
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">
              {language.code === 'de' ? 'Preis' : 'Price'}
            </h3>
            <div className="flex items-center">
              <Checkbox 
                id="free-only" 
                checked={freeOnly}
                onCheckedChange={() => setFreeOnly(!freeOnly)} 
              />
              <label htmlFor="free-only" className="ml-2 text-sm">
                {language.code === 'de' ? 'Nur kostenlos' : 'Free only'}
              </label>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={clearFilters}
          >
            {language.code === 'de' ? 'Filter zurücksetzen' : 'Clear Filters'}
          </Button>
        </div>
      </>
    );
  }
};

export default Courses;
