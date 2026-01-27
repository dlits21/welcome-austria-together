import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import InfoPage from '../../../components/InfoPage';
import asylumEntitiesData from '../../../data/information/asylum.json';

const DynamicAsylumPage: React.FC = () => {
  const { entityId } = useLocalSearchParams();
  const selectedEntityId = Array.isArray(entityId) ? entityId[0] : entityId;

  if (!selectedEntityId) {
    return (
        // TODO: Was möchte da zentriert werden?
      // <View style={styles.centered}>
      <View>
        <Text style={styles.title}>Invalid entity</Text>
        <Text style={styles.subtitle}>No entity ID provided.</Text>
      </View>
    );
  }

  const entity = asylumEntitiesData.entities.find(
    entity => entity.id === selectedEntityId
  );

  if (!entity) {
    return (
        // TODO: Was möchte da zentriert werden?
      // <View style={styles.centered}>
      <View>
        <Text style={styles.title}>Entity not found</Text>
        <Text style={styles.subtitle}>
          {/*TODO: "{ gibt einen Fehler*/}
          {/*The document support entity "{selectedEntityId}" could not be found.*/}
        </Text>
      </View>
    );
  }

  return <InfoPage
    title={entity.title}
    videoId={entity.videoId}
    // TODO: tiles gibt es nicht
    tiles={entity.tiles}
    contacts={entity.contacts}
    tutorialData={entity.tutorialData}
    translationNamespace={entity.translationNamespace}
  />;
};

export default DynamicAsylumPage;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'center',
  },
});