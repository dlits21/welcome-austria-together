import React, { useState, useEffect } from 'react';
import GenericSupportList from './GenericSupportList';
import culturalEntities from '../data/courses/cultural-integration-entities.json';
import { getAskCulturalText, getGlobalText } from '../utils/languageUtils';

interface CulturalSupportListProps {
  filters: Record<string, string>;
  languageCode: string;
  onResetFilters: () => void;
}

const CulturalSupportList: React.FC<CulturalSupportListProps> = ({
  filters,
  languageCode,
  onResetFilters
}) => {
  const entitiesArray = Object.values(culturalEntities).map(entity => ({
      ...entity,
      category: entity.supportTypes[0] || 'cultural-support',
      urgency: 'non-urgent',
      supportType: entity.supportTypes[0] || 'general'
    }));

  const categoryConfig = {
    'language-culture': { icon: 'translate', color: '#8B5CF6' },
    'social-integration': { icon: 'groups', color: '#10B981' },
    'cultural-exchange': { icon: 'public', color: '#F59E0B' },
    'education': { icon: 'school', color: '#3B82F6' },
    'humanitarian': { icon: 'volunteer-activism', color: '#EF4444' },
    'community': { icon: 'people', color: '#06B6D4' }
  };

  return (
    <GenericSupportList
      entities={entitiesArray}
      filters={filters}
      languageCode={languageCode}
      onResetFilters={onResetFilters}
      getTranslation={getAskCulturalText}
      routePrefix="/ask/cultural"
      categoryConfig={categoryConfig}
      noResultsText={getAskCulturalText('noResultsFound', languageCode)}
      resetFiltersText={getGlobalText('resetFilters', languageCode)}
      resultsFoundText={getGlobalText('resultsFound', languageCode)}
    />
  );
};

export default CulturalSupportList;
