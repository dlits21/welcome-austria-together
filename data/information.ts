
export interface CategoryItem {
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

export const informationCategories: CategoryItem[] = [
    {
      id: 'german-learning',
      icon: '🇩🇪',
      name: { en: 'Learn German', de: 'Deutsch Lernen' },
      description: {
        en: 'Find German language courses, practice materials, and learning resources.',
        de: 'Finden Sie Deutschkurse, Übungsmaterialien und Lernressourcen.'
      },
      color: '#EF4444'
    },
    {
      id: 'work',
      icon: '💼',
      name: { en: 'Work and Career', de: 'Arbeit und Beruf' },
      description: {
        en: 'Job opportunities, work permits, career development, and employment rights.',
        de: 'Arbeitsangebote, Arbeitsgenehmigungen, Karriereentwicklung und Arbeitnehmerrechte.'
      },
      color: '#F59E0B'
    },
    {
      id: 'housing',
      icon: '🏠',
      name: { en: 'Housing', de: 'Wohnen' },
      description: {
        en: 'Find information about housing, including apartments, houses, and rental options.',
        de: 'Finden Sie Informationen über Wohnungen, einschließlich Appartements, Häuser und Mietoptionen.'
      },
      color: '#228B22'
    },
    {
      id: 'translation',
      icon: '🔄',
      name: { en: 'Translation', de: 'Übersetzen' },
      description: {
        en: 'Find translation services and resources.',
        de: 'Finden Sie Übersetzungsdienstleistungen und Ressourcen.'
      },
      color: '#FFA500'
    },
    {
      id: 'political-education',
      icon: '📚',
      name: { en: 'Political Education', de: 'Politische Bildung' },
      description: {
        en: 'Learn about the Austrian political system, your rights and responsibilities.',
        de: 'Erfahren Sie mehr über das österreichische politische System, Ihre Rechte und Pflichten.'
      },
      color: '#3B82F6'
    },
    {
      id: 'security',
      icon: '🛡️',
      name: { en: 'Security', de: 'Sicherheit' },
      description: {
        en: 'Information about security, police, privacy, and online protection.',
        de: 'Informationen zu Sicherheit, Polizei, Datenschutz und Online-Schutz.'
      },
      color: '#8B5CF6'
    },
    {
      id: 'finance',
      icon: '💰',
      name: { en: 'Finance', de: 'Finanzen' },
      description: {
        en: 'Learn about financial planning, budgeting, and investment options.',
        de: 'Erfahren Sie mehr über Finanzplanung, Budgetierung und Investitionsmöglichkeiten.'
      },
      color: '#FF6347'
    },
    {
      id: 'culture',
      icon: '🎭',
      name: { en: 'Culture and Leisure', de: 'Kultur und Freizeit' },
      description: {
        en: 'Explore cultural events, museums, and leisure activities.',
        de: 'Entdecken Sie kulturelle Veranstaltungen, Museen und Freizeitaktivitäten.'
      },
      color: '#007BFF'
    },
    {
      id: 'mobility',
      icon: '🚌',
      name: { en: 'Mobility', de: 'Mobilität' },
      description: {
        en: 'Learn about public transportation, car insurance, and driving tips.',
        de: 'Erfahren Sie mehr über öffentliche Verkehrsmittel, Autoversicherung und Fahrtwege.'
      },
      color: '#FFD700'
    },
    {
      id: 'health',
      icon: '🏥',
      name: { en: 'Health', de: 'Gesundheit' },
      description: {
        en: 'Find information about healthcare, including medical services and treatments.',
        de: 'Finden Sie Informationen über Gesundheitsservice und Behandlungen.'
      },
      color: '#663399'
    },
    {
      id: 'education',
      icon: '🎓',
      name: { en: 'Education and Childcare', de: 'Bildung und Kinderbetreuung' },
      description: {
        en: 'Learn about education options, including schools, universities, and childcare services.',
        de: 'Erfahren Sie mehr über Bildungsangebote, einschließlich Schulen, Universitäten und Kindertagesbetreuungsservice.'
      },
      color: '#4CAF50'
    },
    {
      id: 'funding',
      icon: '💶',
      name: { en: 'Funding', de: 'Förderungen' },
      description: {
        en: 'Find information about funding opportunities, including grants and scholarships.',
        de: 'Finden Sie Informationen über Förderungsoffenlichkeiten, einschließlich Grants und Schulden.'
      },
      color: '#9932CC'
    },
    {
      id: 'volunteering',
      icon: '🤝',
      name: { en: 'Volunteering', de: 'Mithelfen' },
      description: {
        en: 'Learn about volunteer opportunities, including community service and charitable work.',
        de: 'Erfahren Sie mehr über Mithelferangebote, einschließlich Gemeinschaftsdienstleistungen und charitablen Arbeiten.'
      },
      color: '#FF4500'
    },
    {
      id: 'contacts',
      icon: '📞',
      name: { en: 'Important Contacts and Legal Help', de: 'Wichtige Kontakte und rechtliche Hilfe' },
      description: {
        en: 'Find information about important contacts and legal help.',
        de: 'Finden Sie Informationen über wichtige Kontakte und rechtliche Hilfe.'
      },
      color: '#008000'
    },
    {
      id: 'climate-change',
      icon: '🌍',
      name: { en: 'Climate Change', de: 'Klimawandel' },
      description: {
        en: 'Learn about climate change impacts, sustainability, and environmental protection.',
        de: 'Erfahren Sie mehr über Klimawandel-Auswirkungen, Nachhaltigkeit und Umweltschutz.'
      },
      color: '#22C55E'
    },
    {
      id: 'mental-health',
      icon: '🧠',
      name: { en: 'Mental Health', de: 'Psychische Gesundheit' },
      description: {
        en: 'Access mental health resources, counseling services, and wellness support.',
        de: 'Zugang zu Ressourcen für psychische Gesundheit, Beratungsdiensten und Wellness-Unterstützung.'
      },
      color: '#A855F7'
    },
  ];
