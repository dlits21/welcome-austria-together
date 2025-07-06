
import React, { useState, useEffect } from 'react';
import GenericSupportList from './GenericSupportList';
import careerEntities from '../data/courses/career-counseling-entities.json';
import { getAskCareerText, getGlobalText } from '../utils/languageUtils';

interface CareerEntity {
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

interface CareerSupportListProps {
  filters: Record<string, string>;
  languageCode: string;
  onResetFilters: () => void;
}

const CareerSupportList: React.FC<CareerSupportListProps> = ({
  filters,
  languageCode,
  onResetFilters
}) => {
  const categoryConfig = {
    'employment': { icon: 'work', color: '#3B82F6' },
    'integration': { icon: 'groups', color: '#10B981' },
    'education': { icon: 'school', color: '#8B5CF6' },
    'networking': { icon: 'people', color: '#F59E0B' }
  };

  return (
    <GenericSupportList
      entities={careerEntities.entities as CareerEntity[]}
      filters={filters}
      languageCode={languageCode}
      onResetFilters={onResetFilters}
      getTranslation={getAskCareerText}
      routePrefix="/ask/career"
      categoryConfig={categoryConfig}
      noResultsText={getAskCareerText('noResultsFound', languageCode)}
      resetFiltersText={getGlobalText('resetFilters', languageCode)}
      resultsFoundText={getGlobalText('resultsFound', languageCode)}
    />
  );
};

export default CareerSupportList;
