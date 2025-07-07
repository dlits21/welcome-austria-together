
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import GenericGermanCoursePage from '../../../components/GenericGermanCoursePage';
import culturalEntitiesData from '../../../data/courses/cultural-integration-entities.json';

const DynamicCulturalSupportPage: React.FC = () => {
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

  const entity = culturalEntitiesData.entities.find(
    entity => entity.id === selectedEntityId
  );

  if (!entity) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Entity not found</Text>
        <Text style={styles.subtitle}>
          The document support entity "{selectedEntityId}" could not be found.
        </Text>
      </View>
    );
  }

  return <GenericGermanCoursePage courseData={entity} />;
};

export default DynamicCulturalSupportPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  contactText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#374151',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#6B7280',
  },
});
