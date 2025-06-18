
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import culturalEntities from '../data/courses/cultural-integration-entities.json';

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
  const router = useRouter();
  const [filteredEntities, setFilteredEntities] = useState<CulturalEntity[]>([]);

  useEffect(() => {
    let filtered = culturalEntities.entities as CulturalEntity[];

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
  }, [filters]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'language-culture': return 'translate';
      case 'social-integration': return 'groups';
      case 'cultural-exchange': return 'public';
      case 'education': return 'school';
      case 'humanitarian': return 'volunteer-activism';
      case 'community': return 'people';
      default: return 'help';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'language-culture': return '#8B5CF6';
      case 'social-integration': return '#10B981';
      case 'cultural-exchange': return '#F59E0B';
      case 'education': return '#3B82F6';
      case 'humanitarian': return '#EF4444';
      case 'community': return '#06B6D4';
      default: return '#6B7280';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    return urgency === 'urgent' ? '#EF4444' : '#10B981';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.resultsText}>
          {languageCode === 'de' 
            ? `${filteredEntities.length} Ergebnisse gefunden`
            : `${filteredEntities.length} results found`}
        </Text>
        <TouchableOpacity style={styles.resetButton} onPress={onResetFilters}>
          <Text style={styles.resetButtonText}>
            {languageCode === 'de' ? 'Filter zurücksetzen' : 'Reset filters'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredEntities.map((entity) => (
          <TouchableOpacity
            key={entity.id}
            style={styles.entityCard}
            onPress={() => router.push(`/ask/cultural/${entity.id}`)}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.categoryIcon, { backgroundColor: getCategoryColor(entity.category) + '20' }]}>
                <MaterialIcons name={getCategoryIcon(entity.category) as any} size={24} color={getCategoryColor(entity.category)} />
              </View>
              <View style={styles.headerText}>
                <Text style={styles.entityName}>
                  {languageCode === 'de' ? entity.name.de : entity.name.en}
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
              {languageCode === 'de' ? entity.description.de : entity.description.en}
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
              <View style={styles.tag}>
                <Text style={styles.tagText}>{entity.cost}</Text>
              </View>
            </View>

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
              {languageCode === 'de' 
                ? 'Keine Ergebnisse gefunden. Versuchen Sie, Ihre Filter anzupassen.'
                : 'No results found. Try adjusting your filters.'}
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

export default CulturalSupportList;
