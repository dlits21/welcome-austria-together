import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const SecuritySafetyPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const handleVideoPress = () => {
    Linking.openURL('https://youtube.com/watch?v=dQw4w9WgXcQ');
  };

  const content = {
    title: {
      en: 'Personal Safety and Security',
      de: 'Persönliche Sicherheit und Schutz'
    },
    subtitle: {
      en: 'Essential safety information for protection against violence and harassment',
      de: 'Wichtige Sicherheitsinformationen zum Schutz vor Gewalt und Belästigung'
    },
    text: {
      en: `Personal safety encompasses protection from various forms of violence and knowing how to respond in dangerous situations. This guide provides essential information for staying safe.

**General Safety Tips:**
• Trust your instincts - if something feels wrong, leave the situation
• Stay aware of your surroundings, especially in unfamiliar areas
• Keep emergency contacts easily accessible on your phone
• Inform trusted people about your whereabouts when going out
• Avoid isolated areas, especially at night
• Keep doors and windows locked at home
• Be cautious about sharing personal information with strangers

**Self-Defense Basics:**
Self-defense is your legal right to protect yourself from harm:
• **Proportional response:** Use only the force necessary to escape danger
• **Immediate threat:** Self-defense applies when facing imminent danger
• **Escape first:** Always try to leave the situation safely if possible
• **Legal boundaries:** Excessive force can lead to legal consequences
• Consider taking self-defense classes to build confidence and skills

**Sexual Harassment and Assault:**
Sexual harassment and assault are serious crimes. Important information:
• **Consent** is required for all sexual activity - it can be withdrawn at any time
• Report incidents to police (call **133** for emergencies)
• Seek medical attention immediately after assault
• Contact **Women's Helpline: 0800 222 555** (24/7, free, anonymous)
• Document evidence when possible (texts, emails, witnesses)
• Consider counseling services for emotional support

**Domestic Violence:**
Domestic violence includes physical, emotional, sexual, and economic abuse:
• **Immediate danger:** Call **133** (police) or **144** (emergency services)
• **Safety planning:** Prepare escape routes and important documents
• **Protection orders:** Courts can issue restraining orders against abusers
• **Shelter services:** Safe houses provide temporary accommodation
• **Support networks:** Family, friends, and professionals can help
• Contact **Domestic Violence Helpline: 0800 800 810**

**Child Abuse Prevention:**
Children have the right to protection from all forms of abuse:
• Teach children about appropriate vs. inappropriate touching
• Create open communication so children feel safe reporting concerns
• Watch for signs of abuse: behavioral changes, fear, injuries
• Report suspected abuse to **Child Protection Services: 147** (Rat auf Draht)
• Emergency situations: Call **133** immediately
• Support organizations provide counseling for child victims and families

**Getting Help:**
Austria has extensive support systems for violence victims. Services include counseling, legal aid, shelter, and medical care. Don't hesitate to seek help - it's confidential and professional.`,
      de: `Persönliche Sicherheit umfasst den Schutz vor verschiedenen Formen von Gewalt und das Wissen, wie man in gefährlichen Situationen reagiert. Dieser Leitfaden bietet wesentliche Informationen für Ihre Sicherheit.

**Allgemeine Sicherheitstipps:**
• Vertrauen Sie Ihren Instinkten - wenn sich etwas falsch anfühlt, verlassen Sie die Situation
• Bleiben Sie aufmerksam, besonders in unbekannten Gebieten
• Halten Sie Notfallkontakte auf Ihrem Telefon leicht zugänglich
• Informieren Sie vertrauenswürdige Personen über Ihren Aufenthaltsort
• Vermeiden Sie isolierte Bereiche, besonders nachts
• Halten Sie Türen und Fenster zu Hause verschlossen
• Seien Sie vorsichtig beim Teilen persönlicher Informationen mit Fremden

**Selbstverteidigung Grundlagen:**
Selbstverteidigung ist Ihr gesetzliches Recht, sich vor Schäden zu schützen:
• **Verhältnismäßige Reaktion:** Verwenden Sie nur die notwendige Gewalt, um der Gefahr zu entkommen
• **Unmittelbare Bedrohung:** Selbstverteidigung gilt bei unmittelbarer Gefahr
• **Flucht zuerst:** Versuchen Sie immer, die Situation sicher zu verlassen
• **Rechtliche Grenzen:** Übermäßige Gewalt kann rechtliche Konsequenzen haben
• Erwägen Sie Selbstverteidigungskurse für Vertrauen und Fähigkeiten

**Sexuelle Belästigung und Übergriffe:**
Sexuelle Belästigung und Übergriffe sind schwere Verbrechen. Wichtige Informationen:
• **Einverständnis** ist für alle sexuellen Aktivitäten erforderlich - kann jederzeit zurückgezogen werden
• Melden Sie Vorfälle der Polizei (rufen Sie **133** für Notfälle)
• Suchen Sie sofort nach einem Übergriff medizinische Hilfe
• Kontaktieren Sie die **Frauenhelpline: 0800 222 555** (24/7, kostenlos, anonym)
• Dokumentieren Sie Beweise wenn möglich (Nachrichten, E-Mails, Zeugen)
• Erwägen Sie Beratungsdienste für emotionale Unterstützung

**Häusliche Gewalt:**
Häusliche Gewalt umfasst körperliche, emotionale, sexuelle und wirtschaftliche Misshandlung:
• **Unmittelbare Gefahr:** Rufen Sie **133** (Polizei) oder **144** (Rettungsdienste)
• **Sicherheitsplanung:** Bereiten Sie Fluchtwege und wichtige Dokumente vor
• **Schutzanordnungen:** Gerichte können Schutzanordnungen gegen Täter erlassen
• **Frauenhäuser:** Sichere Häuser bieten vorübergehende Unterkunft
• **Unterstützungsnetzwerke:** Familie, Freunde und Fachkräfte können helfen
• Kontaktieren Sie die **Helpline gegen Gewalt: 0800 800 810**

**Kindesmissbrauch-Prävention:**
Kinder haben das Recht auf Schutz vor allen Formen des Missbrauchs:
• Bringen Sie Kindern bei, zwischen angemessenen und unangemessenen Berührungen zu unterscheiden
• Schaffen Sie offene Kommunikation, damit sich Kinder sicher fühlen, Bedenken zu melden
• Achten Sie auf Anzeichen von Missbrauch: Verhaltensänderungen, Angst, Verletzungen
• Melden Sie vermuteten Missbrauch dem **Kinderschutz: 147** (Rat auf Draht)
• Notfälle: Rufen Sie sofort **133**
• Unterstützungsorganisationen bieten Beratung für Kinderopfer und Familien

**Hilfe bekommen:**
Österreich hat umfassende Unterstützungssysteme für Gewaltopfer. Services umfassen Beratung, Rechtshilfe, Schutz und medizinische Versorgung. Zögern Sie nicht, Hilfe zu suchen - sie ist vertraulich und professionell.`
    },
    links: [
      {
        title: { en: 'Women\'s Helpline Austria', de: 'Frauenhelpline Österreich' },
        url: 'https://www.frauenhelpline.at'
      },
      {
        title: { en: 'Domestic Violence Prevention', de: 'Gewaltschutz' },
        url: 'https://www.gewaltschutzzentrum.at'
      },
      {
        title: { en: 'Child Protection Services', de: 'Kinderschutz' },
        url: 'https://www.rataufdraht.at'
      },
      {
        title: { en: 'Crisis Support Centers', de: 'Kriseninterventionszentren' },
        url: 'https://www.kriseninterventionszentrum.at'
      }
    ],
    videoTitle: {
      en: 'Personal Safety in Austria',
      de: 'Persönliche Sicherheit in Österreich'
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          {language.code === 'de' ? content.title.de : content.title.en}
        </Text>
        
        <Text style={styles.subtitle}>
          {language.code === 'de' ? content.subtitle.de : content.subtitle.en}
        </Text>
        
        {/* Parse text to make **text** bold */}
        <Text style={styles.text}>
          {(language.code === 'de' ? content.text.de : content.text.en)
            .split(/(\*\*[^*]+\*\*)/)
            .map((part, index) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <Text key={index} style={styles.boldText}>
                    {part.slice(2, -2)}
                  </Text>
                );
              }
              return part;
            })}
        </Text>
        
        <View style={styles.linksSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Nützliche Links' : 'Useful Links'}
          </Text>
          
          {content.links.map((link, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.linkItem}
              onPress={() => handleLinkPress(link.url)}
            >
              <MaterialIcons name="link" size={20} color="#3B82F6" />
              <Text style={styles.linkText}>
                {language.code === 'de' ? link.title.de : link.title.en}
              </Text>
              <MaterialIcons name="open-in-new" size={16} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.videoSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Video' : 'Video'}
          </Text>
          
          <TouchableOpacity style={styles.videoCard} onPress={handleVideoPress}>
            <View style={styles.videoThumbnail}>
              <MaterialIcons name="play-circle-filled" size={48} color="#fff" />
            </View>
            <Text style={styles.videoTitle}>
              {language.code === 'de' ? content.videoTitle.de : content.videoTitle.en}
            </Text>
          </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 32,
  },
  boldText: {
    fontWeight: 'bold',
  },
  linksSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    color: '#3B82F6',
    marginLeft: 12,
    fontWeight: '500',
  },
  videoSection: {
    marginBottom: 32,
  },
  videoCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 24,
  },
  videoThumbnail: {
    width: 120,
    height: 120,
    backgroundColor: '#374151',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

export default SecuritySafetyPage;