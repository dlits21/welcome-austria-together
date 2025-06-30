
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ExpertCardProps {
  name: string;
  specialization: string;
  availableDays: string;
  isOnline: boolean;
}

const ExpertCard: React.FC<ExpertCardProps> = ({
  name,
  specialization,
  availableDays,
  isOnline
}) => {
  return (
    <View style={styles.expertCard}>
      <View style={styles.expertHeader}>
        <View style={styles.avatarContainer}>
          <MaterialIcons name="person" size={32} color="#666" />
          <View style={[styles.statusIndicator, isOnline ? styles.online : styles.offline]} />
        </View>
        <View style={styles.expertInfo}>
          <Text style={styles.expertName}>{name}</Text>
          <Text style={styles.expertSpecialization}>{specialization}</Text>
          <Text style={styles.availableDays}>{availableDays}</Text>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, isOnline ? styles.onlineBadge : styles.offlineBadge]}>
          <Text style={[styles.statusText, isOnline ? styles.onlineText : styles.offlineText]}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  expertCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  expertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  online: {
    backgroundColor: '#10B981',
  },
  offline: {
    backgroundColor: '#EF4444',
  },
  expertInfo: {
    flex: 1,
  },
  expertName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  expertSpecialization: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  availableDays: {
    fontSize: 12,
    color: '#888',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  onlineBadge: {
    backgroundColor: '#D1FAE5',
  },
  offlineBadge: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  onlineText: {
    color: '#065F46',
  },
  offlineText: {
    color: '#991B1B',
  },
});

export default ExpertCard;
