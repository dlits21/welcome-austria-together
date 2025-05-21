export interface Course {
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

export const courseData: Course[] = [
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
];