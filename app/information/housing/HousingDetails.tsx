import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InfoPage from '../../../components/InfoPage';
import housingEntitiesData from '../../../data/information/housing.json';

interface HousingDetailsProps {
    id: string | string[];
}

const HousingDetails: React.FC<HousingDetailsProps> = ({ id }) => {
  const selectedEntityId = Array.isArray(id) ? id[0] : id;

  if (!selectedEntityId) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Invalid entity</Text>
        <Text style={styles.subtitle}>No entity ID provided.</Text>
      </View>
    );
  }

  const entity = housingEntitiesData.entities.find(
    entity => entity.id === selectedEntityId
  );

  if (!entity) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Entity not found</Text>
        <Text style={styles.subtitle}>
            {/*TODO: "{ gibt einen Fehler*/}
          {/*The housing entity "{selectedEntityId}" could not be found.*/}
        </Text>
      </View>
    );
  }

  return <InfoPage
    title={entity.title}
    videoId={entity.videoId}
    // TODO: tiles gibt es nicht
    // tiles={entity.tiles}
    contacts={entity.contacts}
    tutorialData={entity.tutorialData}
    translationNamespace={entity.translationNamespace}
  />;
};

export default HousingDetails;

const styles = StyleSheet.create({
  centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
      fontSize: 16,
      color: '#666',
  }
});
