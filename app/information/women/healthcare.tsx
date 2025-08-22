import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../../contexts/LanguageContext';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import HighlightedText from '../../../components/HighlightedText';
import { languages } from '../../../data/language/common';

const WomensHealthcarePage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const router = useRouter();
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const definitions = {
    'gynecologist': {
      en: 'A doctor who specializes in womens reproductive health and medical care',
      de: 'Ein Arzt, der sich auf die reproduktive Gesundheit und medizinische Versorgung von Frauen spezialisiert hat'
    },
    'reproductive health': {
      en: 'Healthcare related to pregnancy, childbirth, contraception, and reproductive organs',
      de: 'Gesundheitsversorgung in Bezug auf Schwangerschaft, Geburt, Verhütung und Fortpflanzungsorgane'
    },
    'mental health support': {
      en: 'Professional help for emotional and psychological wellbeing',
      de: 'Professionelle Hilfe für emotionales und psychologisches Wohlbefinden'
    },
    'health insurance': {
      en: 'Insurance that covers medical costs and healthcare services',
      de: 'Versicherung, die medizinische Kosten und Gesundheitsdienste abdeckt'
    },
    'contraception': {
      en: 'Methods used to prevent pregnancy',
      de: 'Methoden zur Schwangerschaftsverhütung'
    },
    'prenatal care': {
      en: 'Medical care during pregnancy to monitor mother and baby health',
      de: 'Medizinische Betreuung während der Schwangerschaft zur Überwachung der Gesundheit von Mutter und Baby'
    },
    'screening': {
      en: 'Medical tests to check for diseases or health problems early',
      de: 'Medizinische Tests zur frühzeitigen Erkennung von Krankheiten oder Gesundheitsproblemen'
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
        showBackButton={true}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <MaterialIcons name="local-hospital" size={40} color="#E91E63" />
          <Text style={styles.title}>Women's Healthcare in Austria</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Right to Healthcare</Text>
          <HighlightedText definitions={definitions} language={currentLanguage}>
            As a woman in Austria, you have the right to access quality healthcare services. Whether you have **health insurance** or not, emergency medical care is always available. Many services are specifically designed to support women's unique health needs.
          </HighlightedText>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Essential Healthcare Services</Text>
          
          <View style={styles.serviceItem}>
            <Text style={styles.serviceTitle}>General Practice</Text>
            <Text style={styles.serviceText}>
              Start with a general practitioner (Hausarzt/Hausärztin) for regular health needs. They can refer you to specialists when needed.
            </Text>
          </View>

          <View style={styles.serviceItem}>
            <Text style={styles.serviceTitle}>Gynecological Care</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              Regular visits to a **gynecologist** are important for women's health. This includes routine check-ups, **reproductive health** services, and **screening** for diseases.
            </HighlightedText>
          </View>

          <View style={styles.serviceItem}>
            <Text style={styles.serviceTitle}>Pregnancy and Maternity Care</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              **Prenatal care** is free in Austria with health insurance. This includes regular check-ups, ultrasounds, and support during pregnancy and childbirth.
            </HighlightedText>
          </View>

          <View style={styles.serviceItem}>
            <Text style={styles.serviceTitle}>Mental Health Services</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              **Mental health support** includes counseling, therapy, and psychiatric care. Many services offer support in multiple languages for migrant women.
            </HighlightedText>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reproductive Health Services</Text>
          
          <View style={styles.reproductiveItem}>
            <Text style={styles.reproductiveTitle}>Family Planning</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              Access to **contraception** and family planning advice is available at family planning centers and gynecologists. Counseling is confidential and non-judgmental.
            </HighlightedText>
          </View>

          <View style={styles.reproductiveItem}>
            <Text style={styles.reproductiveTitle}>Pregnancy Support</Text>
            <Text style={styles.reproductiveText}>
              Free pregnancy counseling, support services, and information about your options are available regardless of your decision.
            </Text>
          </View>

          <View style={styles.reproductiveItem}>
            <Text style={styles.reproductiveTitle}>Sexual Health</Text>
            <Text style={styles.reproductiveText}>
              Confidential testing and treatment for sexually transmitted infections, HIV testing, and sexual health counseling.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Access Healthcare</Text>
          
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>1.</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Get Health Insurance</Text>
              <HighlightedText definitions={definitions} language={currentLanguage}>
                If you work, you automatically have **health insurance**. Asylum seekers and those with subsidiary protection receive healthcare through specific programs.
              </HighlightedText>
            </View>
          </View>

          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>2.</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Register with a Doctor</Text>
              <Text style={styles.stepText}>
                Choose a general practitioner in your area. You can change doctors if needed. Many doctors speak English or other languages.
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>3.</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Make Appointments</Text>
              <Text style={styles.stepText}>
                Call or visit the doctor's office to make an appointment. For emergencies, go to the hospital emergency room or call emergency services.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Health Screenings</Text>
          
          <View style={styles.screeningItem}>
            <Text style={styles.screeningTitle}>Cervical Cancer Screening (PAP Test)</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              Regular **screening** every 1-3 years for women over 18. This test can detect changes early and is covered by health insurance.
            </HighlightedText>
          </View>

          <View style={styles.screeningItem}>
            <Text style={styles.screeningTitle}>Breast Cancer Screening</Text>
            <Text style={styles.screeningText}>
              Mammography screening is recommended for women over 40-50. Earlier screening may be recommended for those with family history.
            </Text>
          </View>

          <View style={styles.screeningItem}>
            <Text style={styles.screeningTitle}>General Health Check-ups</Text>
            <Text style={styles.screeningText}>
              Regular check-ups including blood tests, blood pressure monitoring, and preventive care are important for overall health.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support for Migrant Women</Text>
          
          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.fgoe.org/')}>
            <MaterialIcons name="health-and-safety" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Austrian Health Promotion Fund - Health information in multiple languages</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.orientexpress-wien.com/')}>
            <MaterialIcons name="translate" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Orient Express - Healthcare support for migrant women</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.migrant.at/')}>
            <MaterialIcons name="medical-services" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Migrant Healthcare - Medical services for migrants</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.familienplanung.de/')}>
            <MaterialIcons name="family-restroom" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Austrian Family Planning Association</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mental Health Resources</Text>
          
          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.psyonline.at/')}>
            <MaterialIcons name="psychology" size={20} color="#E91E63" />
            <Text style={styles.linkText}>PsyOnline - Find psychologists and therapists</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.telefonseelsorge.at/')}>
            <MaterialIcons name="phone" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Telephone Counseling - 24/7 mental health support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.frauenberatung.at/')}>
            <MaterialIcons name="support" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Women's Counseling Centers - Psychological support for women</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.costsSection}>
          <Text style={styles.costsTitle}>Healthcare Costs</Text>
          <Text style={styles.costsText}>
            <Text style={styles.bold}>With Health Insurance:</Text> Most services are free or have small co-payments
          </Text>
          <Text style={styles.costsText}>
            <Text style={styles.bold}>Emergency Care:</Text> Always available regardless of insurance status
          </Text>
          <Text style={styles.costsText}>
            <Text style={styles.bold}>Prescription Costs:</Text> Usually €6.10 per medication with insurance
          </Text>
          <Text style={styles.costsText}>
            <Text style={styles.bold}>Financial Help:</Text> Reduced fees available for low-income families
          </Text>
        </View>

        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>Emergency Contacts</Text>
          <Text style={styles.emergencyText}>
            <Text style={styles.bold}>Emergency Services:</Text> 144 (ambulance), 112 (general emergency)
          </Text>
          <Text style={styles.emergencyText}>
            <Text style={styles.bold}>Poison Control:</Text> +43 1 406 43 43
          </Text>
          <Text style={styles.emergencyText}>
            <Text style={styles.bold}>Telephone Counseling:</Text> 142 (24/7, free)
          </Text>
        </View>
      </ScrollView>
      
      <LanguageModal 
        visible={showLanguageModal} 
        onClose={() => setShowLanguageModal(false)} 
        languageCode={language.code}
      />
      
      <HelpModal
        visible={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        languageCode={language.code}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
    color: '#E91E63',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  serviceItem: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  serviceText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  reproductiveItem: {
    backgroundColor: '#FFEBEE',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
  },
  reproductiveTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#C62828',
  },
  reproductiveText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#C62828',
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 8,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    width: 30,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1976D2',
  },
  stepText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1565C0',
  },
  screeningItem: {
    backgroundColor: '#E8F5E8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  screeningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2E7D32',
  },
  screeningText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#388E3C',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E91E63',
  },
  linkText: {
    fontSize: 16,
    color: '#E91E63',
    marginLeft: 12,
    flex: 1,
  },
  costsSection: {
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  costsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#E65100',
  },
  costsText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#E65100',
  },
  emergencySection: {
    backgroundColor: '#FFEBEE',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#C62828',
  },
  emergencyText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default WomensHealthcarePage;