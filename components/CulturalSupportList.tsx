import React, { useState, useEffect } from 'react';
import GenericSupportList from './GenericSupportList';
import culturalEntities from '../data/courses/cultural-integration-entities.json';
import { getAskCulturalText } from '../utils/languageUtils';

interface CulturalEntity {
  id: string;
  name: { en: string; de: string };
  category: string;
  urgency: string;
  supportType: string;
  location: string;
  description: { en: string; de: string };
  services: string[];
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
  languages: string[];
  eligibility: string;
  cost: string;
  openingHours: string;
}

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
      entities={culturalEntities.entities as CulturalEntity[]}
      filters={filters}
      languageCode={languageCode}
      onResetFilters={onResetFilters}
      routePrefix="/ask/cultural"
      categoryConfig={categoryConfig}
      getTranslation={getAskCulturalText}
      noResultsText={getAskCulturalText('noResultsFound', languageCode)}
      resetFiltersText={getAskCulturalText('resetFilters', languageCode)}
      resultsFoundText={getAskCulturalText('resultsFound', languageCode)}
    />
  );
};

export default CulturalSupportList;
