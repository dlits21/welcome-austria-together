
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Linking
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';

const BBUGmbHDetail: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleContact = (type: string, value: string) => {
    switch (type) {
      case 'phone':
        Linking.openURL(`tel:${value}`);
        break;
      case 'email':
        Linking.openURL(`mailto:${value}`);
        break;
      case 'website':
        Linking.openURL(value);
        break;
    }
  };

  const pageTitle = language.code === 'de' 
    ? 'BBU GmbH (Bundesagentur für Betreuungs- und Unterstützungsleistungen)'
    : 'BBU GmbH (Federal Agency for Care and Support Services)';
    
  const description = language.code === 'de'
    ? 'BBU bietet umfassende Rechtsunterstützung für Asylsuchende in ganz Österreich. Unsere erfahrenen Rechtsberater helfen bei Asylverfahren, Berufungen und anderen rechtlichen Angelegenheiten.'
    : 'BBU provides comprehensive legal support for asylum seekers throughout Austria. Our experienced legal advisors help with asylum procedures, appeals, and other legal matters.';

  const services = language.code === 'de' ? [
    'Rechtsberatung für Asylverfahren',
    'Unterstützung bei Berufungsverfahren',
    'Begleitung bei Behördenterminen',
    'Hilfe bei Haftangelegenheiten',
    'Dolmetscherdienste',
    'Dokumentenhilfe'
  ] : [
    'Legal counseling for asylum procedures',
    'Support with appeal procedures', 
    'Assistance with authority appointments',
    'Help with detention matters',
    'Interpreter services',
    'Document assistance'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{pageTitle}</Text>
        
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={20} color="#666" />
          <Text style={styles.locationText}>
            {language.code === 'de' ? 'Österreichweit' : 'Nationwide'}
          </Text>
        </View>
        
        <Text style={styles.description}>{description}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Unsere Dienstleistungen' : 'Our Services'}
          </Text>
          {services.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <MaterialIcons name="check-circle" size={20} color="#10B981" />
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Kontaktinformationen' : 'Contact Information'}
          </Text>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleContact('phone', '+43 1 234 5678')}
          >
            <MaterialIcons name="phone" size={24} color="#3B82F6" />
            <Text style={styles.contactText}>+43 1 234 5678</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleContact('email', 'info@bbu.gv.at')}
          >
            <MaterialIcons name="email" size={24} color="#3B82F6" />
            <Text style={styles.contactText}>info@bbu.gv.at</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handleContact('website', 'https://www.bbu.gv.at')}
          >
            <MaterialIcons name="language" size={24} color="#3B82F6" />
            <Text style={styles.contactText}>www.bbu.gv.at</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Öffnungszeiten' : 'Opening Hours'}
          </Text>
          <Text style={styles.hoursText}>
            {language.code === 'de' 
              ? 'Montag - Freitag: 08:00 - 17:00\nSamstag: 09:00 - 12:00\nSonntag: Geschlossen'
              : 'Monday - Friday: 08:00 - 17:00\nSaturday: 09:00 - 12:00\nSunday: Closed'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    lineHeight: 32,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1f2937',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  contactText: {
    fontSize: 16,
    color: '#3B82F6',
    marginLeft: 12,
    fontWeight: '500',
  },
  hoursText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default BBUGmbHDetail;
