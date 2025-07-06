
import React from 'react';
import GenericSupportList from './GenericSupportList';
import financialEntities from '../data/courses/financial-literacy-entities.json';
import { getAskFinancialText, getGlobalText } from '../utils/languageUtils';

interface FinancialSupportListProps {
  filters: Record<string, string>;
  languageCode: string;
  onResetFilters: () => void;
}

const FinancialSupportList: React.FC<FinancialSupportListProps> = ({ filters, languageCode, onResetFilters }) => {
  // Convert JSON object to array format expected by GenericSupportList
  const entitiesArray = Object.values(financialEntities).map(entity => ({
    ...entity,
    category: entity.supportTypes[0] || 'financial-support',
    urgency: 'non-urgent',
    supportType: entity.supportTypes[0] || 'general'
  }));

  const categoryConfig = {
    'budgeting': { icon: 'account-balance-wallet', color: '#3B82F6' },
    'debt-counseling': { icon: 'support-agent', color: '#EF4444' },
    'financial-planning': { icon: 'trending-up', color: '#10B981' },
    'investment-courses': { icon: 'show-chart', color: '#8B5CF6' },
    'banking-basics': { icon: 'account-balance', color: '#06B6D4' },
    'emergency-aid': { icon: 'emergency', color: '#F59E0B' },
    'financial-education': { icon: 'school', color: '#059669' },
    'financial-support': { icon: 'monetization-on', color: '#6B7280' }
  };

  return (
    <GenericSupportList
      entities={entitiesArray}
      filters={filters}
      languageCode={languageCode}
      onResetFilters={onResetFilters}
      getTranslation={getAskFinancialText}
      routePrefix="/ask/financial"
      categoryConfig={categoryConfig}
      noResultsText={getAskFinancialText('noFinancialSupportEntitiesFound', languageCode)}
      resetFiltersText={getGlobalText('resetFilters', languageCode)}
      resultsFoundText={getGlobalText('resultsFound', languageCode)}
    />
  );
};

export default FinancialSupportList;
