
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { getGlobalText } from '../utils/languageUtils';

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
  // German learning specific properties
  type?: 'course' | 'resource' | 'exam';
  level?: string[];
  online?: boolean;
  forWomen?: boolean;
  forYoungMigrants?: boolean;
  childcare?: boolean;
  integrationRequirement?: boolean;
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
  getTranslation: (key: string, languageCode: string) => string;
  routePrefix: string;
  categoryConfig: Record<string, CategoryConfig>;
  noResultsText: string;
  resetFiltersText: string;
  resultsFoundText: string;
  isGermanLearning?: boolean;
}

const GenericSupportList: React.FC<GenericSupportListProps> = ({
  entities,
  filters,
  languageCode,
  onResetFilters,
  getTranslation,
  routePrefix,
  categoryConfig,
  noResultsText,
  resetFiltersText,
  resultsFoundText,
  isGermanLearning = false
}) => {
  const router = useRouter();
  const [filteredEntities, setFilteredEntities] = useState<Entity[]>([]);

  useEffect(() => {
    let filtered = entities;

    // Filter by urgency
    if (filters.urgency) {
      filtered = filtered.filter(entity => entity.urgency === filters.urgency);
    }

    // Filter by support type (course/resource/exam)
    if (filters.supportType) {
      if (isGermanLearning) {
        // For German learning, filter by type directly
        filtered = filtered.filter(entity => entity.type === filters.supportType);
      } else {
        filtered = filtered.filter(entity =>
          entity.supportTypes && entity.supportTypes.includes(filters.supportType)
        );
      }
    }

    // Filter by level (for German learning)
    if (filters.level && isGermanLearning) {
      filtered = filtered.filter(entity =>
        entity.level && entity.level.some(level => level.includes(filters.level))
      );
    }

    // Filter by location
    if (filters.location && filters.location !== 'all-austria' && filters.location !== 'anywhere') {
      if (filters.location === 'Online') {
        filtered = filtered.filter(entity => entity.online === true);
      } else {
        filtered = filtered.filter(entity => 
          entity.location === filters.location || 
          entity.location === 'all-austria' ||
          (entity.online && filters.location === 'Online')
        );
      }
    }

    // Additional filters for German learning
    if (isGermanLearning) {
      Object.keys(filters).forEach(filterKey => {
        if (!['supportType', 'level', 'location', 'urgency'].includes(filterKey)) {
          const filterValue = filters[filterKey];
          if (filterValue === 'true') {
            if (filterKey === 'forWomen') {
              filtered = filtered.filter(entity => entity.forWomen === true);
            } else if (filterKey === 'forYoungMigrants') {
              filtered = filtered.filter(entity => entity.forYoungMigrants === true);
            } else if (filterKey === 'childcare') {
              filtered = filtered.filter(entity => entity.childcare === true);
            } else if (filterKey === 'integrationRequirement') {
              filtered = filtered.filter(entity => entity.integrationRequirement === true);
            } else if (filterKey === 'onlineOnly') {
              filtered = filtered.filter(entity => entity.online === true);
            }
          }
        }
      });
    }

    setFilteredEntities(filtered);
  }, [filters, entities, isGermanLearning]);

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
      return entity.name[languageCode] || entity.name['de'];
    }
    if (entity.title) {
      return entity.title[languageCode] || entity.title['de'];
    }
    return '';
  };

  const getEntitySubtitle = (entity: Entity): string => {
    console.error("help", entity)
    if (entity.subtitle) {
      return entity.subtitle[languageCode] || entity.subtitle['de'];
    }
    return entity.description[languageCode] || entity.description['de'];
  };

  const renderIcon = (category: string) => {
    const iconValue = getCategoryIcon(category);
    const color = getCategoryColor(category);
    
    // Check if icon is a file path (contains . or /)
    if (iconValue.includes('.') || iconValue.includes('/')) {
      return (
        <Image 
          source={{ uri: iconValue }} 
          style={[styles.iconImage, { tintColor: color }]}
          resizeMode="contain"
        />
      );
    } else {
      // Use MaterialIcons for icon names
      return (
        <MaterialIcons name={iconValue as any} size={24} color={color} />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.resultsText}>
          {`${filteredEntities.length} ${resultsFoundText}`}
        </Text>
        <TouchableOpacity style={styles.resetButton} onPress={onResetFilters}>
          <Text style={styles.resetButtonText}>
            {resetFiltersText}
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
                {renderIcon(entity.category)}
              </View>
              <View style={styles.headerText}>
                <Text style={styles.entityName}>
                  {getEntityTitle(entity)}
                </Text>
                <View style={styles.badgeContainer}>
                  {isGermanLearning ? (
                    // For German learning, show level badge instead of urgency
                    entity.level && entity.level.find(type => ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].some(level => type.includes(level))) && (
                      <View style={[styles.levelBadge, { backgroundColor: '#3B82F6' }]}>
                        <Text style={styles.badgeText}>
                          {entity.level.join("-")}
                        </Text>
                      </View>
                    )
                  ) : (
                    <View style={[styles.urgencyBadge, { backgroundColor: getUrgencyColor(entity.urgency) }]}>
                      <Text style={styles.badgeText}>
                        {entity.urgency === 'urgent' 
                          ? (getGlobalText('urgent', languageCode))
                          : (getGlobalText('nonUrgent', languageCode))}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              {/* Course Type Tag for German Learning */}
              {isGermanLearning && (
                <View style={[styles.courseTypeBadge, { backgroundColor: getCategoryColor(entity.category) }]}>
                  <Text style={styles.courseTypeText}>
                    {getTranslation(`courseTypes.${entity.category}`, languageCode)}
                  </Text>
                </View>
              )}
            </View>

            <Text style={styles.entityDescription}>
              {getEntitySubtitle(entity)}
            </Text>

            {/* Show all specializations */}
            <View style={styles.tagsContainer}>
              {entity.supportTypes?.map((spec, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{getTranslation(spec, languageCode)}</Text>
                </View>
              ))}
              <View style={styles.tag}>
                <Text style={styles.tagText}>{getGlobalText(entity.location.replace(" ", "").toLowerCase(), languageCode)}</Text>
              </View>
              {entity.cost && (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{getGlobalText(entity.cost.toLowerCase(), languageCode)}</Text>
                </View>
              )}
            </View>

            {/* Show all specializations */}
            {entity.specializations && entity.specializations.length > 0 && (
              <View style={styles.specializationsContainer}>
                <Text style={styles.specializationsTitle}>
                  {getGlobalText('specializations', languageCode)}
                </Text>
                <View style={styles.specializationTags}>
                  {entity.specializations.map((spec, index) => (
                    <View key={index} style={styles.specializationTag}>
                      <Text style={styles.specializationTagText}>{getTranslation(spec.charAt(0).toLowerCase()+ spec.replace(" ", "").replace("-","").slice(1), languageCode)}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Only show phone if it exists */}
            {entity.contact.phone && entity.contact.phone.trim() && (
              <View style={styles.contactInfo}>
                <MaterialIcons name="phone" size={16} color="#6B7280" />
                <Text style={styles.contactText}>{entity.contact.phone}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {filteredEntities.length === 0 && (
          <View style={styles.noResults}>
            <MaterialIcons name="search-off" size={48} color="#D1D5DB" />
            <Text style={styles.noResultsText}>
              {noResultsText}
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
  iconImage: {
    width: 24,
    height: 24,
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
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  courseTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  courseTypeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'uppercase',
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
