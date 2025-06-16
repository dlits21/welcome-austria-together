
import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface HealthSupportEntity {
  id: string;
  title: { en: string; de: string };
  subtitle: { en: string; de: string };
  location: string;
  supportTypes: string[];
  specializations?: string[];
  description: { en: string; de: string };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
}

interface HealthSupportListProps {
  entities: HealthSupportEntity[];
  languageCode: string;
}

const HealthSupportList: React.FC<HealthSupportListProps> = ({ entities, languageCode }) => {
  const router = useRouter();

  const handleEntityPress = (entityId: string) => {
    router.push(`/ask/health/${entityId}`);
  };

  const renderEntityItem = ({ item }: { item: HealthSupportEntity }) => (
    <TouchableOpacity 
      style={styles.entityCard}
      onPress={() => handleEntityPress(item.id)}
    >
      <View style={styles.entityHeader}>
        <View style={styles.entityInfo}>
          <Text style={styles.entityTitle}>
            {languageCode === 'de' ? item.title.de : item.title.en}
          </Text>
          <Text style={styles.entitySubtitle}>
            {languageCode === 'de' ? item.subtitle.de : item.subtitle.en}
          </Text>
        </View>
      </View>
      
      <View style={styles.tagsContainer}>
        <View style={styles.locationTag}>
          <Text style={styles.locationTagText}>{item.location}</Text>
        </View>
        
        {/* Show specializations */}
        {item.specializations && item.specializations.length > 0 && (
          <View style={styles.specializationsContainer}>
            <Text style={styles.specializationsTitle}>
              {languageCode === 'de' ? 'Spezialisierungen:' : 'Specializations:'}
            </Text>
            <View style={styles.specializationTags}>
              {item.specializations.slice(0, 3).map((spec, index) => (
                <View key={index} style={styles.specializationTag}>
                  <Text style={styles.specializationTagText}>{spec}</Text>
                </View>
              ))}
              {item.specializations.length > 3 && (
                <Text style={styles.moreSpecializations}>
                  +{item.specializations.length - 3} {languageCode === 'de' ? 'mehr' : 'more'}
                </Text>
              )}
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (entities.length === 0) {
    return (
      <View style={styles.noResults}>
        <Text style={styles.noResultsText}>
          {languageCode === 'de' 
            ? 'Keine Gesundheitsdienste gefunden.' 
            : 'No health support services found.'}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={entities}
      renderItem={renderEntityItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.entityList}
    />
  );
};

const styles = StyleSheet.create({
  entityList: {
    paddingBottom: 20,
  },
  entityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  entityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  entityInfo: {
    flex: 1,
  },
  entityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  entitySubtitle: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  tagsContainer: {
    marginTop: 8,
  },
  locationTag: {
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  locationTagText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  specializationsContainer: {
    marginTop: 8,
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
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
});

export default HealthSupportList;
