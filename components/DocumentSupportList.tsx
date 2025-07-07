
import React from 'react';
import GenericSupportList from './GenericSupportList';
import documentEntities from '../data/courses/document-certification-entities.json';
import { getAskDocumentText } from '../utils/languageUtils';

interface DocumentSupportListProps {
  filters: Record<string, string>;
  languageCode: string;
  onResetFilters: () => void;
}

const DocumentSupportList: React.FC<DocumentSupportListProps> = ({ filters, languageCode, onResetFilters }) => {
  const categoryConfig = {
    'translation': { icon: 'translate', color: '#3B82F6' },
    'certification': { icon: 'verified', color: '#10B981' },
    'assistance': { icon: 'support-agent', color: '#8B5CF6' },
    'recognition': { icon: 'school', color: '#F59E0B' },
    'legal': { icon: 'gavel', color: '#EF4444' },
    'professional': { icon: 'work', color: '#06B6D4' }
  };

  return (
    <GenericSupportList
      entities={documentEntities.entities}
      filters={filters}
      languageCode={languageCode}
      onResetFilters={onResetFilters}
      getTranslation={getAskDocumentText}
      routePrefix="/ask/document"
      categoryConfig={categoryConfig}
      noResultsText={getAskDocumentText('noDocumentServicesFound', languageCode)}
      resetFiltersText={getAskDocumentText('resetFilters', languageCode)}
      resultsFoundText={getAskDocumentText('resultsFound', languageCode)}
    />
  );
};

export default DocumentSupportList;
