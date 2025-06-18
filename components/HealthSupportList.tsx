
import React from 'react';
import GenericSupportList from './GenericSupportList';

interface HealthSupportEntity {
  id: string;
  title: { en: string; de: string };
  subtitle: { en: string; de: string };
  location: string;
  supportTypes: string[];
  specializations?: string[];
  description: { en: string; de: string };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  category: string;
  urgency: string;
  supportType: string;
}

interface HealthSupportListProps {
  entities: HealthSupportEntity[];
  languageCode: string;
}

const HealthSupportList: React.FC<HealthSupportListProps> = ({ entities, languageCode }) => {
  const categoryConfig = {
    'general-practice': { icon: 'local-hospital', color: '#3B82F6' },
    'mental-health': { icon: 'psychology', color: '#8B5CF6' },
    'specialized-care': { icon: 'medical-services', color: '#10B981' },
    'emergency': { icon: 'emergency', color: '#EF4444' },
    'women-health': { icon: 'pregnant-woman', color: '#EC4899' },
    'dental': { icon: 'dentistry', color: '#06B6D4' },
    'pharmacy': { icon: 'local-pharmacy', color: '#F59E0B' }
  };

  return (
    <GenericSupportList
      entities={entities}
      filters={{}}
      languageCode={languageCode}
      onResetFilters={() => {}}
      routePrefix="/ask/health"
      categoryConfig={categoryConfig}
      noResultsText={{
        en: 'No health support services found.',
        de: 'Keine Gesundheitsdienste gefunden.'
      }}
      resetFiltersText={{
        en: 'Reset filters',
        de: 'Filter zurücksetzen'
      }}
      resultsFoundText={{
        en: 'results found',
        de: 'Ergebnisse gefunden'
      }}
    />
  );
};

export default HealthSupportList;
