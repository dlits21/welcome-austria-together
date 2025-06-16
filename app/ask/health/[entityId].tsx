
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import GenericGermanCoursePage from '../../../components/GenericGermanCoursePage';
import healthSupportEntitiesData from '../../../data/courses/health-support-entities.json';

const DynamicHealthSupportPage: React.FC = () => {
  const { entityId } = useLocalSearchParams();
  const selectedEntityId = Array.isArray(entityId) ? entityId[0] : entityId;

  if (!selectedEntityId) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Invalid entity</Text>
        <Text style={styles.subtitle}>No entity ID provided.</Text>
      </View>
    );
  }

  const entityData = healthSupportEntitiesData[selectedEntityId as keyof typeof healthSupportEntitiesData];

  if (!entityData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Entity not found</Text>
        <Text style={styles.subtitle}>
          The health support entity "{selectedEntityId}" could not be found.
        </Text>
      </View>
    );
  }

  return <GenericGermanCoursePage courseData={entityData} />;
};

export default DynamicHealthSupportPage;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
