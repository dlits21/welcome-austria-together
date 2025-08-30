import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTranslation } from '../../../hooks/useTranslation';
import SummaryPageTemplate from '../../../components/SummaryPageTemplate';

const ReproductivePage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const t = useTranslation('reproductive');
  const router = useRouter();

  // Handle emergency calls with privacy notice
  const handleEmergencyCall = (phoneNumber: string) => {
    Alert.alert(
      'Confidential Call',
      'This call will be private and confidential. Your privacy is protected by law.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call Now', 
          onPress: () => Linking.openURL(`tel:${phoneNumber}`)
        }
      ]
    );
  };

  // Tiles data with reproductive health topics
  const tiles = [
    {
      icon: 'pregnant-woman' as keyof typeof MaterialIcons.glyphMap,
      title: t('tiles.pregnancy_care_title'),
      subtitle: t('tiles.pregnancy_care_sub'),
      onPress: () => console.log('Pregnancy care pressed')
    },
    {
      icon: 'assignment' as keyof typeof MaterialIcons.glyphMap,
      title: t('tiles.antenatal_title'),
      subtitle: t('tiles.antenatal_sub'),
      onPress: () => console.log('Antenatal checklist pressed')
    },
    {
      icon: 'medical-services' as keyof typeof MaterialIcons.glyphMap,
      title: t('tiles.contraception_title'),
      subtitle: t('tiles.contraception_sub'),
      onPress: () => console.log('Contraception pressed')
    },
    {
      icon: 'emergency' as keyof typeof MaterialIcons.glyphMap,
      title: t('tiles.emergency_contraception_title'),
      subtitle: t('tiles.emergency_contraception_sub'),
      onPress: () => console.log('Emergency contraception pressed')
    },
    {
      icon: 'support' as keyof typeof MaterialIcons.glyphMap,
      title: t('tiles.women_ngos_title'),
      subtitle: t('tiles.women_ngos_sub'),
      onPress: () => handleEmergencyCall(t('trusted.women_helpline_phone'))
    },
    {
      icon: 'home' as keyof typeof MaterialIcons.glyphMap,
      title: t('tiles.shelter_title'),
      subtitle: t('tiles.shelter_sub'),
      onPress: () => console.log('Shelter pressed')
    },
    {
      icon: 'security' as keyof typeof MaterialIcons.glyphMap,
      title: t('tiles.sexual_violence_title'),
      subtitle: t('tiles.sexual_violence_sub'),
      onPress: () => handleEmergencyCall(t('trusted.sexual_violence_phone'))
    },
    {
      icon: 'gavel' as keyof typeof MaterialIcons.glyphMap,
      title: t('tiles.reproductive_rights_title'),
      subtitle: t('tiles.reproductive_rights_sub'),
      onPress: () => console.log('Reproductive rights pressed')
    }
  ];

  // Trusted contacts for reproductive health
  const contacts = [
    {
      name: t('trusted.women_helpline_name'),
      phone: t('trusted.women_helpline_phone'),
      url: t('trusted.women_helpline_url'),
      subtitle: t('trusted.women_helpline_sub'),
      onCall: () => handleEmergencyCall(t('trusted.women_helpline_phone'))
    },
    {
      name: t('trusted.pregnancy_support'),
      phone: t('trusted.pregnancy_phone'),
      subtitle: t('trusted.pregnancy_sub'),
      onCall: () => handleEmergencyCall(t('trusted.pregnancy_phone'))
    },
    {
      name: t('trusted.sexual_violence_center'),
      phone: t('trusted.sexual_violence_phone'),
      url: t('trusted.sexual_violence_url'),
      subtitle: t('trusted.sexual_violence_sub'),
      onCall: () => handleEmergencyCall(t('trusted.sexual_violence_phone'))
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <SummaryPageTemplate
        translationNamespace="reproductive"
        tiles={tiles}
        contacts={contacts}
        emergencyRoute="/ask/emergency"
        videoId={t('exampleVideoId')}
      />
      
      {/* Confidentiality Notice */}
      <View style={styles.confidentialityContainer}>
        <MaterialIcons name="privacy-tip" size={16} color="#10B981" />
        <Text style={styles.confidentialityText}>
          {t('confidentialityNotice')}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  confidentialityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  confidentialityText: {
    fontSize: 12,
    color: '#059669',
    marginLeft: 8,
    flex: 1,
    fontWeight: '500',
  },
});

export default ReproductivePage;