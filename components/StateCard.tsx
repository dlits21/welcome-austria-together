
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StateCardProps {
  stateName: string;
  address: string;
}

const StateCard: React.FC<StateCardProps> = ({ stateName, address }) => {
  return (
    <View style={styles.stateCard}>
      <Text style={styles.stateCardTitle}>{stateName}</Text>
      <Text style={styles.stateCardAddress}>{address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stateCard: {
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  stateCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stateCardAddress: {
    fontSize: 14,
    color: '#666',
  },
});

export default StateCard;
