
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getGlobalText } from '../utils/languageUtils';
import BookAppointmentModal from './BookAppointmentModal';
import GroupMeetingsModal from './GroupMeetingsModal';
import ContactPreferenceModal from './ContactPreferenceModal';

// Import general support translations
import generalTranslations from '../data/language/ask/general.json';

const getGeneralText = (key: string, languageCode: string): string => {
  const translation = generalTranslations[key as keyof typeof generalTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.en || key;
};

interface ExpertCardProps {
  name: string;
  specialization: string;
  availableDays: string;
  isOnline: boolean;
  languageCode: string;
}

const ExpertCard: React.FC<ExpertCardProps> = ({
  name,
  specialization,
  availableDays,
  isOnline,
  languageCode
}) => {
  const [showBookAppointment, setShowBookAppointment] = useState(false);
  const [showGroupMeetings, setShowGroupMeetings] = useState(false);
  const [showContactPreference, setShowContactPreference] = useState(false);
  const [contactType, setContactType] = useState<'text' | 'email'>('text');

  const handleTextContact = () => {
    setContactType('text');
    setShowContactPreference(true);
  };

  const handleEmailContact = () => {
    setContactType('email');
    setShowContactPreference(true);
  };

  return (
    <>
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
              {isOnline ? getGlobalText('online', languageCode) : getGlobalText('offline', languageCode)}
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setShowBookAppointment(true)}
        >
          <MaterialIcons name="calendar-today" size={16} color="#3B82F6" />
          <Text style={styles.actionButtonText}>{getGeneralText('talkToMe', languageCode)}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setShowGroupMeetings(true)}
        >
          <MaterialIcons name="group" size={16} color="#10B981" />
          <Text style={styles.actionButtonText}>{getGeneralText('joinGroupMeeting', languageCode)}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleTextContact}
        >
          <MaterialIcons name="message" size={16} color="#8B5CF6" />
          <Text style={styles.actionButtonText}>{getGeneralText('textMe', languageCode)}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleEmailContact}
        >
          <MaterialIcons name="email" size={16} color="#F59E0B" />
          <Text style={styles.actionButtonText}>{getGeneralText('emailMe', languageCode)}</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <BookAppointmentModal
        visible={showBookAppointment}
        onClose={() => setShowBookAppointment(false)}
        languageCode={languageCode}
        expertName={name}
      />

      <GroupMeetingsModal
        visible={showGroupMeetings}
        onClose={() => setShowGroupMeetings(false)}
        languageCode={languageCode}
      />

      <ContactPreferenceModal
        visible={showContactPreference}
        onClose={() => setShowContactPreference(false)}
        languageCode={languageCode}
        contactType={contactType}
      />
    </>
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
    marginBottom: 8,
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
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flex: 1,
    minWidth: '48%',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 6,
    fontWeight: '500',
    flex: 1,
  },
});

export default ExpertCard;
