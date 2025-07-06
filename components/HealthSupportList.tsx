
import React from 'react';
import GenericSupportList from './GenericSupportList';
import healthEntities from '../data/courses/health-support-entities.json';
import { getAskHealthText, getGlobalText } from '../utils/languageUtils';

interface HealthSupportListProps {
  filters: Record<string, string>;
  languageCode: string;
  onResetFilters: () => void;
}

const HealthSupportList: React.FC<HealthSupportListProps> = ({ filters, languageCode, onResetFilters }) => {
  const categoryConfig = {
    'generalPractice': { icon: 'local-hospital', color: '#3B82F6' },
    'mentalHealth': { icon: 'psychology', color: '#8B5CF6' },
    'specializedCare': { icon: 'medical-services', color: '#10B981' },
    'emergency': { icon: 'emergency', color: '#EF4444' },
    'women-health': { icon: 'pregnant-woman', color: '#EC4899' },
    'dental': { icon: 'dentistry', color: '#06B6D4' },
    'pharmacy': { icon: 'local-pharmacy', color: '#F59E0B' },
    'community': { icon: 'people', color: '#059669' }
  };

  return (
    <GenericSupportList
      entities={healthEntities.entities}
      filters={filters}
      languageCode={languageCode}
      onResetFilters={onResetFilters}
      getTranslation={getAskHealthText}
      routePrefix="/ask/health"
      categoryConfig={categoryConfig}
      noResultsText={getAskHealthText('noHealthSupportEntitiesFound', languageCode)}
      resetFiltersText={getGlobalText('resetFilters', languageCode)}
      resultsFoundText={getGlobalText('resultsFound', languageCode)}
    />
  );
};

export default HealthSupportList;
