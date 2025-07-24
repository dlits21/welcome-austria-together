import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Import general support translations
import generalTranslations from '../data/language/ask/general.json';

const getGeneralText = (key: string, languageCode: string): string => {
  const translation = generalTranslations[key as keyof typeof generalTranslations];
  return translation?.[languageCode as keyof typeof translation] || translation?.en || key;
};

interface GroupMeetingsModalProps {
  visible: boolean;
  onClose: () => void;
  languageCode: string;
}

const GroupMeetingsModal: React.FC<GroupMeetingsModalProps> = ({
  visible,
  onClose,
  languageCode,
}) => {
  // Sample group meetings data
  const groupMeetings = [
    {
      title: 'Integration Workshop',
      date: '2024-07-28',
      time: '14:00-16:00',
      participants: 12,
    },
    {
      title: 'Legal Rights Session',
      date: '2024-07-30',
      time: '10:00-12:00',
      participants: 8,
    },
    {
      title: 'Healthcare Information',
      date: '2024-08-02',
      time: '16:00-18:00',
      participants: 15,
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>
              {getGeneralText('upcomingGroupMeetings', languageCode)}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.content}>
            {groupMeetings.map((meeting, index) => (
              <View key={index} style={styles.meetingCard}>
                <View style={styles.meetingHeader}>
                  <MaterialIcons name="group" size={24} color="#10B981" />
                  <Text style={styles.meetingTitle}>{meeting.title}</Text>
                </View>
                <Text style={styles.meetingDate}>{meeting.date}</Text>
                <Text style={styles.meetingTime}>{meeting.time}</Text>
                <Text style={styles.participants}>
                  {meeting.participants} participants
                </Text>
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>
                    {getGeneralText('joinGroupMeeting', languageCode)}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity style={styles.closeButtonBottom} onPress={onClose}>
              <Text style={styles.closeButtonText}>
                {getGeneralText('cancel', languageCode)}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    padding: 20,
  },
  meetingCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  meetingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  meetingDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  meetingTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  participants: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  joinButton: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  closeButtonBottom: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GroupMeetingsModal;