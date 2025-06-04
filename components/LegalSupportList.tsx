
import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface LegalSupportEntity {
  id: string;
  title: { en: string; de: string };
  subtitle: { en: string; de: string };
  location: string;
  supportTypes: string[];
  description: { en: string; de: string };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
}

interface LegalSupportListProps {
  entities: LegalSupportEntity[];
  languageCode: string;
}

const LegalSupportList: React.FC<LegalSupportListProps> = ({ entities, languageCode }) => {
  const router = useRouter();

  const handleEntityPress = (entityId: string) => {
    router.push(`/ask/legal-support/${entityId}`);
  };

  const renderEntityItem = ({ item }: { item: LegalSupportEntity }) => (
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
      </View>
    </TouchableOpacity>
  );

  if (entities.length === 0) {
    return (
      <View style={styles.noResults}>
        <Text style={styles.noResultsText}>
          {languageCode === 'de' 
            ? 'Keine Rechtsberatungsstellen gefunden.' 
            : 'No legal support entities found.'}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  locationTag: {
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  locationTagText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
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

export default LegalSupportList;
