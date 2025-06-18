
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

interface Entity {
  id: string;
  name?: { en: string; de: string };
  title?: { en: string; de: string };
  category: string;
  urgency: string;
  supportType: string;
  location: string;
  description: { en: string; de: string };
  subtitle?: { en: string; de: string };
  services?: string[];
  supportTypes?: string[];
  specializations?: string[];
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
  languages?: string[];
  eligibility?: string;
  cost?: string;
  openingHours?: string;
}

interface CategoryConfig {
  icon: string;
  color: string;
}

interface GenericSupportListProps {
  entities: Entity[];
  filters: Record<string, string>;
  languageCode: string;
  onResetFilters: () => void;
  routePrefix: string;
  categoryConfig: Record<string, CategoryConfig>;
  noResultsText: { en: string; de: string };
  resetFiltersText: { en: string; de: string };
  resultsFoundText: { en: string; de: string };
}

const GenericSupportList: React.FC<GenericSupportListProps> = ({
  entities,
  filters,
  languageCode,
  onResetFilters,
  routePrefix,
  categoryConfig,
  noResultsText,
  resetFiltersText,
  resultsFoundText
}) => {
  const router = useRouter();
  const [filteredEntities, setFilteredEntities] = useState<Entity[]>([]);

  useEffect(() => {
    let filtered = entities;

    if (filters.urgency) {
      filtered = filtered.filter(entity => entity.urgency === filters.urgency);
    }

    if (filters.supportType) {
      filtered = filtered.filter(entity => entity.supportType === filters.supportType);
    }

    if (filters.location && filters.location !== 'all-austria') {
      filtered = filtered.filter(entity => 
        entity.location === filters.location || entity.location === 'all-austria'
      );
    }

    setFilteredEntities(filtered);
  }, [filters, entities]);

  const getCategoryIcon = (category: string): string => {
    return categoryConfig[category]?.icon || 'help';
  };

  const getCategoryColor = (category: string): string => {
    return categoryConfig[category]?.color || '#6B7280';
  };

  const getUrgencyColor = (urgency: string): string => {
    return urgency === 'urgent' ? '#EF4444' : '#10B981';
  };

  const getEntityTitle = (entity: Entity): string => {
    if (entity.name) {
      return languageCode === 'de' ? entity.name.de : entity.name.en;
    }
    if (entity.title) {
      return languageCode === 'de' ? entity.title.de : entity.title.en;
    }
    return '';
  };

  const getEntitySubtitle = (entity: Entity): string => {
    if (entity.subtitle) {
      return languageCode === 'de' ? entity.subtitle.de : entity.subtitle.en;
    }
    return languageCode === 'de' ? entity.description.de : entity.description.en;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.resultsText}>
          {`${filteredEntities.length} ${languageCode === 'de' ? resultsFoundText.de : resultsFoundText.en}`}
        </Text>
        <TouchableOpacity style={styles.resetButton} onPress={onResetFilters}>
          <Text style={styles.resetButtonText}>
            {languageCode === 'de' ? resetFiltersText.de : resetFiltersText.en}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredEntities.map((entity) => (
          <TouchableOpacity
            key={entity.id}
            style={styles.entityCard}
            onPress={() => router.push(`${routePrefix}/${entity.id}`)}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.categoryIcon, { backgroundColor: getCategoryColor(entity.category) + '20' }]}>
                <MaterialIcons name={getCategoryIcon(entity.category) as any} size={24} color={getCategoryColor(entity.category)} />
              </View>
              <View style={styles.headerText}>
                <Text style={styles.entityName}>
                  {getEntityTitle(entity)}
                </Text>
                <View style={styles.badgeContainer}>
                  <View style={[styles.urgencyBadge, { backgroundColor: getUrgencyColor(entity.urgency) }]}>
                    <Text style={styles.badgeText}>
                      {entity.urgency === 'urgent' 
                        ? (languageCode === 'de' ? 'Dringend' : 'Urgent')
                        : (languageCode === 'de' ? 'Nicht dringend' : 'Non-urgent')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <Text style={styles.entityDescription}>
              {getEntitySubtitle(entity)}
            </Text>

            <View style={styles.tagsContainer}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{entity.category}</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{entity.supportType}</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{entity.location}</Text>
              </View>
              {entity.cost && (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{entity.cost}</Text>
                </View>
              )}
            </View>

            {/* Show specializations for health/legal support */}
            {entity.specializations && entity.specializations.length > 0 && (
              <View style={styles.specializationsContainer}>
                <Text style={styles.specializationsTitle}>
                  {languageCode === 'de' ? 'Spezialisierungen:' : 'Specializations:'}
                </Text>
                <View style={styles.specializationTags}>
                  {entity.specializations.slice(0, 3).map((spec, index) => (
                    <View key={index} style={styles.specializationTag}>
                      <Text style={styles.specializationTagText}>{spec}</Text>
                    </View>
                  ))}
                  {entity.specializations.length > 3 && (
                    <Text style={styles.moreSpecializations}>
                      +{entity.specializations.length - 3} {languageCode === 'de' ? 'mehr' : 'more'}
                    </Text>
                  )}
                </View>
              </View>
            )}

            <View style={styles.contactInfo}>
              <MaterialIcons name="phone" size={16} color="#6B7280" />
              <Text style={styles.contactText}>{entity.contact.phone}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {filteredEntities.length === 0 && (
          <View style={styles.noResults}>
            <MaterialIcons name="search-off" size={48} color="#D1D5DB" />
            <Text style={styles.noResultsText}>
              {languageCode === 'de' ? noResultsText.de : noResultsText.en}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  resetButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  resetButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  entityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  entityName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
  },
  entityDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  specializationsContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  specializationsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  specializationTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  specializationTag: {
    backgroundColor: '#dcfce7',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#16a34a',
  },
  specializationTagText: {
    fontSize: 10,
    color: '#16a34a',
    fontWeight: '500',
  },
  moreSpecializations: {
    fontSize: 10,
    color: '#64748b',
    fontStyle: 'italic',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  noResultsText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 32,
  },
});

export default GenericSupportList;
