
import React from 'react';
import GenericSupportList from './GenericSupportList';
import legalEntities from '../data/courses/legal-support-entities.json';

interface LegalSupportListProps {
  filters: Record<string, string>;
  languageCode: string;
  onResetFilters: () => void;
}

const LegalSupportList: React.FC<LegalSupportListProps> = ({ filters, languageCode, onResetFilters }) => {
  // Convert JSON object to array format expected by GenericSupportList
  const entitiesArray = Object.values(legalEntities).map(entity => ({
    ...entity,
    category: entity.supportTypes[0] || 'legal-support',
    urgency: 'non-urgent',
    supportType: entity.supportTypes[0] || 'general'
  }));

  const categoryConfig = {
    'asylum-procedures': { icon: 'gavel', color: '#3B82F6' },
    'appeals': { icon: 'record-voice-over', color: '#EF4444' },
    'residence-permits': { icon: 'assignment', color: '#10B981' },
    'family-reunification': { icon: 'family-restroom', color: '#8B5CF6' },
    'citizenship': { icon: 'flag', color: '#06B6D4' },
    'detention': { icon: 'security', color: '#F59E0B' },
    'discrimination': { icon: 'balance', color: '#059669' },
    'work-rights': { icon: 'work', color: '#EC4899' },
    'legal-representation': { icon: 'account-balance', color: '#84CC16' },
    'general': { icon: 'help', color: '#6B7280' },
    'legal-support': { icon: 'gavel', color: '#6B7280' }
  };

  return (
    <GenericSupportList
      entities={entitiesArray}
      filters={filters}
      languageCode={languageCode}
      onResetFilters={onResetFilters}
      routePrefix="/ask/legal-support"
      categoryConfig={categoryConfig}
      noResultsText={{
        en: 'No legal support entities found.',
        de: 'Keine Rechtsberatungsstellen gefunden.'
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

export default LegalSupportList;
