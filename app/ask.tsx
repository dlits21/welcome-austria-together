
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../data/languages';
import PageNavigation from '../components/PageNavigation';

// Accordion item component
interface AccordionItemProps {
  title: string;
  icon: string;
  iconColor: string;
  expanded: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  icon,
  iconColor,
  expanded,
  onPress,
  children
}) => {
  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity 
        style={styles.accordionHeader} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.accordionTitleContainer}>
          <MaterialIcons name={icon} size={24} color={iconColor} />
          <Text style={styles.accordionTitle}>{title}</Text>
        </View>
        <MaterialIcons 
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={24} 
          color="#666" 
        />
      </TouchableOpacity>
      
      {expanded && (
        <View style={styles.accordionContent}>
          {children}
        </View>
      )}
    </View>
  );
};

// Contact button component
interface ContactButtonProps {
  title: string;
  icon: string;
  onPress: () => void;
}

const ContactButton: React.FC<ContactButtonProps> = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.contactButton} onPress={onPress}>
      <Text style={styles.contactButtonText}>{title}</Text>
      <MaterialIcons name={icon} size={20} color="#666" />
    </TouchableOpacity>
  );
};

// State card component
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

const Ask: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const router = useRouter();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1]; // Default to English

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  const handleContactClick = (method: string) => {
    console.log(`Contact via ${method}`);
    // Implementation for contacting via different methods would go here
  };
  
  // States of Austria
  const austrianStates = [
    { name: 'Vienna', nameDe: 'Wien', address: 'Quellenstraße 51, 1100 Wien' },
    { name: 'Lower Austria', nameDe: 'Niederösterreich', address: 'Wiener Straße 31, 3100 St. Pölten' },
    { name: 'Upper Austria', nameDe: 'Oberösterreich', address: 'Landstraße 36, 4020 Linz' },
    { name: 'Styria', nameDe: 'Steiermark', address: 'Herrengasse 16, 8010 Graz' },
    { name: 'Tyrol', nameDe: 'Tirol', address: 'Maria-Theresien-Straße 42, 6020 Innsbruck' },
    { name: 'Carinthia', nameDe: 'Kärnten', address: 'Alter Platz 30, 9020 Klagenfurt' },
    { name: 'Salzburg', nameDe: 'Salzburg', address: 'Getreidegasse 33, 5020 Salzburg' },
    { name: 'Vorarlberg', nameDe: 'Vorarlberg', address: 'Marktstraße 11, 6900 Bregenz' },
    { name: 'Burgenland', nameDe: 'Burgenland', address: 'Hauptstraße 31, 7000 Eisenstadt' },
  ];
  
  // Translate based on language
  const mentorTitle = language.code === 'de' ? 'Mit einem Mentor sprechen' : 'Talk to a mentor';
  const communityTitle = language.code === 'de' ? 'Frage die Community' : 'Ask the community';
  const visitTitle = language.code === 'de' ? 'Besuche uns persönlich' : 'Visit us in person';
  const pageTitle = language.code === 'de' ? 'Fragen' : 'Ask';
  const pageSubtitle = language.code === 'de' ? 'Kontaktiere uns direkt' : 'Reach out to us directly';

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
      />
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{pageTitle}</Text>
        <Text style={styles.subtitle}>{pageSubtitle}</Text>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Talk to a mentor */}
        <AccordionItem
          title={mentorTitle}
          icon="question-answer"
          iconColor="#3B82F6"
          expanded={expandedSection === 'mentor'}
          onPress={() => toggleSection('mentor')}
        >
          <ContactButton 
            title="WhatsApp" 
            icon="message" 
            onPress={() => handleContactClick('whatsapp')}
          />
          <ContactButton 
            title="Signal" 
            icon="message" 
            onPress={() => handleContactClick('signal')}
          />
          <ContactButton 
            title="Facebook" 
            icon="facebook" 
            onPress={() => handleContactClick('facebook')}
          />
          <ContactButton 
            title="Email" 
            icon="email" 
            onPress={() => handleContactClick('email')}
          />
          <ContactButton 
            title={language.code === 'de' ? 'Telefon' : 'Phone'} 
            icon="phone" 
            onPress={() => handleContactClick('phone')}
          />
        </AccordionItem>
        
        {/* Ask the community */}
        <AccordionItem
          title={communityTitle}
          icon="people"
          iconColor="#10B981"
          expanded={expandedSection === 'community'}
          onPress={() => toggleSection('community')}
        >
          <ContactButton 
            title="WhatsApp" 
            icon="message" 
            onPress={() => handleContactClick('community-whatsapp')}
          />
          <ContactButton 
            title="Signal" 
            icon="message" 
            onPress={() => handleContactClick('community-signal')}
          />
          <ContactButton 
            title="Forum" 
            icon="forum" 
            onPress={() => handleContactClick('community-forum')}
          />
        </AccordionItem>
        
        {/* Visit in person */}
        <AccordionItem
          title={visitTitle}
          icon="location-on"
          iconColor="#8B5CF6"
          expanded={expandedSection === 'visit'}
          onPress={() => toggleSection('visit')}
        >
          {austrianStates.map((state) => (
            <StateCard 
              key={state.name}
              stateName={language.code === 'de' ? state.nameDe : state.name}
              address={state.address}
            />
          ))}
        </AccordionItem>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  accordionItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  accordionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  accordionContent: {
    padding: 16,
    backgroundColor: '#fff',
  },
  contactButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  contactButtonText: {
    fontSize: 16,
  },
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

export default Ask;
