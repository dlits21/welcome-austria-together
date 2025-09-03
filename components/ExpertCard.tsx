import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getGlobalText } from '../utils/languageUtils';
import BookAppointmentModal from './BookAppointmentModal';
import GroupMeetingsModal from './GroupMeetingsModal';
import ContactPreferenceModal from './ContactPreferenceModal';
import { handleContactClick } from '../utils/contactUtils';
import { GermanFlag, AlbanianFlag, AfghaniFlag, SyrianFlag, IranianFlag, RussianFlag, SomaliFlag, GeorgianFlag } from './Flags';

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
  languages?: string[];
}

const getCountryFlag = (language: string) => {
  const flagMap: { [key: string]: React.ComponentType<any> } = {
    'German': GermanFlag,
    'Albanian': AlbanianFlag,
    'Dari': AfghaniFlag,
    'Arabic': SyrianFlag, // Using Syrian flag for Arabic
    'Persian': IranianFlag,
    'Russian': RussianFlag,
    'Somali': SomaliFlag,
    'Georgian': GeorgianFlag
  };
  
  const FlagComponent = flagMap[language];
  return FlagComponent ? <FlagComponent width={12} height={9} /> : null;
};

const ExpertCard: React.FC<ExpertCardProps> = ({
  name,
  specialization,
  availableDays,
  isOnline,
  languageCode,
  languages = []
}) => {
  const [showBookAppointment, setShowBookAppointment] = useState(false);
  const [showGroupMeetings, setShowGroupMeetings] = useState(false);
  const [showContactPreference, setShowContactPreference] = useState(false);
  
  // Get a unique PNG for each expert based on their name (cycling through 5 images)
  const expertImages = [
      require('../assets/images/abdul.png'),
      require('../assets/images/amina.png'),
      require('../assets/images/arlinda.png'),
      require('../assets/images/fatima.png'),
      require('../assets/images/giorgi.png'),
      require('../assets/images/leila.png'),
      require('../assets/images/liridon.png'),
      require('../assets/images/maryam.png'),
      require('../assets/images/nino.png'),
      require('../assets/images/omar.png'),
      require('../assets/images/rustam.png'),
      require('../assets/images/timur.png'),
      require('../assets/images/zainab.png'),
    ];

    const expertImage = expertImages[Math.floor(Math.random() * expertImages.length)];

  const handleTextContact = () => {
    setShowContactPreference(true);
  };

  const handleEmailContact = () => {
    handleContactClick('email', true, languageCode);
  };

  return (
    <View style={styles.expertCard}>
      <View style={styles.expertHeader}>
        <View style={styles.avatarContainer}>
        <Image source={expertImage} style={styles.expertImage} />
        </View>
        <View style={styles.expertInfo}>
          <Text style={styles.expertName}>{name}</Text>
          <Text style={styles.expertSpecialization}>{specialization}</Text>
          {languages.length > 0 && (
            <View style={styles.languagesContainer}>
              <MaterialIcons name="language" size={14} color="#8B5CF6" />
              <View style={styles.flagsContainer}>
                {languages.map((lang, index) => (
                  <View key={index} style={styles.flagWrapper}>
                    {getCountryFlag(lang)}
                  </View>
                ))}
              </View>
            </View>
          )}
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
        contactType="text"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  expertCard: {
    flex: 1,
    minWidth: 250,
    maxWidth: 350,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    margin: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expertHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  expertImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  expertInfo: {
    alignItems: 'center',
  },
  expertName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  expertSpecialization: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  actionButtons: {
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
  },
  languagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  flagsContainer: {
    flexDirection: 'row',
    marginLeft: 4,
  },
  flagWrapper: {
    width: 20,
    height: 15,
    marginRight: 3,
    borderRadius: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ExpertCard;