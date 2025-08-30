import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Alert, Linking } from 'react-native';
import { useTranslation } from "react-i18next";
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import SummaryPageTemplate from "../../../components/SummaryPageTemplate";

export default function ReproductivePage() {
  const { t } = useTranslation("reproductive");
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
      key: 'pregnant-woman',
      icon:  <MaterialIcons name="pregnant-woman" size={24} color="#3B82F6" />,
      title: t('tiles.pregnancy_care_title'),
      sub: t('tiles.pregnancy_care_sub'),
      onPress: () => console.log('Pregnancy care pressed')
    },
    {
      key: "signs",
      icon:  <MaterialIcons name="signs" size={24} color="#DC2626" />,
      title: t('tiles.antenatal_title'),
      sub: t('tiles.antenatal_sub'),
      onPress: () => console.log('Antenatal checklist pressed')
    },
    {
      key: 'medical-services',
      icon:  <MaterialIcons name="medical-services" size={24} color="#F59E0B" />,
      title: t('tiles.contraception_title'),
      sub: t('tiles.contraception_sub'),
      onPress: () => console.log('Contraception pressed')
    },
    {
      key: 'emergency',
      icon:  <MaterialIcons name="emergency" size={24} color="#059669" />,
      title: t('tiles.emergency_contraception_title'),
      sub: t('tiles.emergency_contraception_sub'),
      onPress: () => console.log('Emergency contraception pressed')
    },
    {
      key: 'support',
      icon:  <MaterialIcons name="support" size={24} color="#7C3AED" />,
      title: t('tiles.women_ngos_title'),
      sub: t('tiles.women_ngos_sub'),
      onPress: () => handleEmergencyCall(t('trusted.women_helpline_phone'))
    },
    {
      key: 'home',
      icon:  <MaterialIcons name="home" size={24} color="#0891B2" />,
      title: t('tiles.shelter_title'),
      sub: t('tiles.shelter_sub'),
      onPress: () => console.log('Shelter pressed')
    },
    {
      key: 'security',
      icon:  <MaterialIcons name="security" size={24} color="#EA580C" />,
      title: t('tiles.sexual_violence_title'),
      sub: t('tiles.sexual_violence_sub'),
      onPress: () => handleEmergencyCall(t('trusted.sexual_violence_phone'))
    },
    {
      key: 'gavel',
      title: t('tiles.reproductive_rights_title'),
      icon:  <MaterialIcons name="gavel" size={24} color="#856404" />,
      sub: t('tiles.reproductive_rights_sub'),
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
