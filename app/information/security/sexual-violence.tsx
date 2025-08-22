import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const SexualViolencePage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleEmergencyCall = () => {
    Alert.alert(
      language.code === 'de' ? 'Notruf 133' : 'Emergency Call 133',
      language.code === 'de' 
        ? 'Möchten Sie die Polizei anrufen? (133)'
        : 'Do you want to call the police? (133)',
      [
        {
          text: language.code === 'de' ? 'Abbrechen' : 'Cancel',
          style: 'cancel',
        },
        {
          text: language.code === 'de' ? 'Anrufen' : 'Call',
          onPress: () => Linking.openURL('tel:133'),
        },
      ]
    );
  };

  const handleHelplineCall = () => {
    Alert.alert(
      language.code === 'de' ? 'Vergewaltigungs-Notruf' : 'Rape Crisis Hotline',
      language.code === 'de' 
        ? 'Möchten Sie den Vergewaltigungs-Notruf anrufen? (01 523 22 22)'
        : 'Do you want to call the Rape Crisis Hotline? (01 523 22 22)',
      [
        {
          text: language.code === 'de' ? 'Abbrechen' : 'Cancel',
          style: 'cancel',
        },
        {
          text: language.code === 'de' ? 'Anrufen' : 'Call',
          onPress: () => Linking.openURL('tel:015232222'),
        },
      ]
    );
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const content = {
    title: {
      en: 'Sexual Violence Support',
      de: 'Hilfe bei sexueller Gewalt'
    },
    subtitle: {
      en: 'Understanding sexual violence and finding specialized support',
      de: 'Sexuelle Gewalt verstehen und spezialisierte Hilfe finden'
    },
    text: {
      en: `Sexual violence is a serious crime that affects people of all ages and genders. Understanding what constitutes sexual violence and knowing where to get specialized help is crucial for survivors and their support networks.

**What Constitutes Sexual Violence:**
Sexual violence includes any sexual activity that occurs without clear, ongoing consent:

• **Rape:** Any form of sexual penetration without consent, including within relationships or marriage
• **Sexual Assault:** Unwanted sexual touching, groping, or forced sexual contact
• **Sexual Coercion:** Using threats, manipulation, or pressure to obtain sexual activity
• **Sexual Exploitation:** Taking advantage of someone's vulnerability for sexual purposes
• **Child Sexual Abuse:** Any sexual activity involving a person under 18 years of age
• **Sexual Trafficking:** Forcing or coercing someone into commercial sexual activity
• **Non-consensual Intimate Images:** Sharing sexual images without the person's consent

**Sexual Violence Against Children:**
Children cannot consent to sexual activity. Any sexual contact with a child is abuse:
• **Physical abuse:** Touching, penetration, or exposure to sexual acts
• **Non-contact abuse:** Showing sexual materials, inappropriate photography, or sexual conversations
• **Online abuse:** Grooming, requesting sexual images, or exposing children to sexual content
• **Commercial exploitation:** Using children for pornography or prostitution

**Important Facts:**
• **Sexual violence can happen to anyone** - regardless of age, gender, sexual orientation, or relationship status
• **Most perpetrators are known to the victim** - family members, partners, friends, or acquaintances
• **Consent can be withdrawn at any time** - even during sexual activity
• **Survivors are never at fault** - clothing, behavior, or location never justify sexual violence
• **Trauma responses vary** - there's no "right" way to react to sexual violence

**Immediate Support:**
If you or someone you know has experienced sexual violence:
• **Seek medical attention** if injured or for evidence collection
• **Consider reporting** to police, but know this is your choice
• **Contact a crisis center** for emotional support and guidance
• **Reach out to trusted friends or family** for support
• **Document everything** - save messages, take photos of injuries

**Long-term Support:**
Recovery from sexual violence is a process that may include:
• **Counseling and therapy** - specialized trauma therapy
• **Legal support** - understanding your rights and options
• **Medical care** - ongoing health monitoring and treatment
• **Support groups** - connecting with other survivors
• **Safety planning** - if the perpetrator is known to you`,
      de: `Sexuelle Gewalt ist ein schweres Verbrechen, das Menschen jeden Alters und Geschlechts betrifft. Zu verstehen, was sexuelle Gewalt ausmacht und zu wissen, wo man spezialisierte Hilfe bekommt, ist für Überlebende und ihre Unterstützungsnetzwerke von entscheidender Bedeutung.

**Was sexuelle Gewalt ausmacht:**
Sexuelle Gewalt umfasst jede sexuelle Aktivität, die ohne klare, andauernde Zustimmung stattfindet:

• **Vergewaltigung:** Jede Form sexueller Penetration ohne Zustimmung, auch innerhalb von Beziehungen oder der Ehe
• **Sexueller Übergriff:** Unerwünschte sexuelle Berührungen, Betastungen oder erzwungener sexueller Kontakt
• **Sexuelle Nötigung:** Verwendung von Drohungen, Manipulation oder Druck zur Erlangung sexueller Aktivität
• **Sexuelle Ausbeutung:** Ausnutzung der Verletzlichkeit einer Person für sexuelle Zwecke
• **Sexueller Kindesmissbrauch:** Jede sexuelle Aktivität mit einer Person unter 18 Jahren
• **Sexueller Menschenhandel:** Zwang oder Nötigung zur kommerziellen sexuellen Aktivität
• **Nicht-einvernehmliche intime Bilder:** Teilen sexueller Bilder ohne Zustimmung der Person

**Sexuelle Gewalt gegen Kinder:**
Kinder können nicht zu sexueller Aktivität einwilligen. Jeder sexuelle Kontakt mit einem Kind ist Missbrauch:
• **Körperlicher Missbrauch:** Berührungen, Penetration oder Exposition gegenüber sexuellen Handlungen
• **Berührungsloser Missbrauch:** Zeigen sexueller Materialien, unangemessene Fotografie oder sexuelle Gespräche
• **Online-Missbrauch:** Grooming, Anfrage nach sexuellen Bildern oder Exposition von Kindern gegenüber sexuellem Inhalt
• **Kommerzielle Ausbeutung:** Verwendung von Kindern für Pornografie oder Prostitution

**Wichtige Fakten:**
• **Sexuelle Gewalt kann jedem passieren** - unabhängig von Alter, Geschlecht, sexueller Orientierung oder Beziehungsstatus
• **Die meisten Täter sind dem Opfer bekannt** - Familienmitglieder, Partner, Freunde oder Bekannte
• **Zustimmung kann jederzeit widerrufen werden** - auch während sexueller Aktivität
• **Überlebende sind niemals schuld** - Kleidung, Verhalten oder Ort rechtfertigen niemals sexuelle Gewalt
• **Trauma-Reaktionen variieren** - es gibt keinen "richtigen" Weg, auf sexuelle Gewalt zu reagieren

**Sofortige Unterstützung:**
Wenn Sie oder jemand, den Sie kennen, sexuelle Gewalt erfahren hat:
• **Medizinische Hilfe suchen** bei Verletzungen oder zur Beweissicherung
• **Anzeige erwägen** bei der Polizei, aber wissen Sie, dass dies Ihre Wahl ist
• **Krisenzentrum kontaktieren** für emotionale Unterstützung und Beratung
• **Vertrauenswürdige Freunde oder Familie kontaktieren** für Unterstützung
• **Alles dokumentieren** - Nachrichten speichern, Fotos von Verletzungen machen

**Langfristige Unterstützung:**
Die Genesung von sexueller Gewalt ist ein Prozess, der umfassen kann:
• **Beratung und Therapie** - spezialisierte Trauma-Therapie
• **Rechtsbeistand** - Verständnis Ihrer Rechte und Optionen
• **Medizinische Versorgung** - laufende Gesundheitsüberwachung und -behandlung
• **Selbsthilfegruppen** - Verbindung mit anderen Überlebenden
• **Sicherheitsplanung** - wenn der Täter Ihnen bekannt ist`
    },
    emergencyContacts: [
      {
        name: { en: 'Police Emergency', de: 'Polizei Notruf' },
        number: '133',
        description: { 
          en: 'Immediate danger or crime in progress',
          de: 'Unmittelbare Gefahr oder laufendes Verbrechen'
        },
        color: '#EF4444'
      },
      {
        name: { en: 'Rape Crisis Hotline Vienna', de: 'Vergewaltigungs-Notruf Wien' },
        number: '01 523 22 22',
        description: { 
          en: '24/7 crisis support and counseling',
          de: '24/7 Krisenhilfe und Beratung'
        },
        color: '#EC4899'
      }
    ],
    supportOrganizations: [
      {
        name: { en: 'Rape Crisis Center Vienna', de: 'Vergewaltigungs-Beratungsstelle Wien' },
        description: { 
          en: 'Specialized counseling and support for sexual violence survivors',
          de: 'Spezialisierte Beratung und Unterstützung für Überlebende sexueller Gewalt'
        },
        website: 'https://www.frauenberatung.at',
        type: { en: 'Crisis Center', de: 'Krisenzentrum' }
      },
      {
        name: { en: 'Women\'s Shelters Austria', de: 'Frauenhäuser Österreich' },
        description: { 
          en: 'Safe housing and comprehensive support services',
          de: 'Sichere Unterbringung und umfassende Unterstützungsdienste'
        },
        website: 'https://www.aoef.at',
        type: { en: 'Emergency Housing', de: 'Notunterkunft' }
      },
      {
        name: { en: 'Child Protection Center', de: 'Kinderschutzzentrum' },
        description: { 
          en: 'Specialized support for children and adolescents',
          de: 'Spezialisierte Unterstützung für Kinder und Jugendliche'
        },
        website: 'https://www.kinderschutz-zentrum.at',
        type: { en: 'Child Protection', de: 'Kinderschutz' }
      },
      {
        name: { en: 'Counseling Center for Women', de: 'Beratungsstelle für Frauen' },
        description: { 
          en: 'Long-term counseling and therapy services',
          de: 'Langfristige Beratungs- und Therapiedienste'
        },
        website: 'https://www.frauenberatung.at',
        type: { en: 'Counseling', de: 'Beratung' }
      }
    ],
    links: [
      {
        title: { en: 'Sexual Violence Laws Austria', de: 'Sexualstrafrecht Österreich' },
        url: 'https://www.justiz.gv.at'
      },
      {
        title: { en: 'Victim Rights Information', de: 'Opferrechte Information' },
        url: 'https://www.opfer-notruf.at'
      }
    ]
  };

  const parseMarkdownText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <Text key={index} style={styles.boldText}>
            {part.slice(2, -2)}
          </Text>
        );
      }
      return part;
    });
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
        
        {/* Emergency Contacts */}
        <View style={styles.emergencySection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Notfall-Kontakte' : 'Emergency Contacts'}
          </Text>
          
          {content.emergencyContacts.map((contact, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.emergencyCard, { borderLeftColor: contact.color }]}
              onPress={index === 0 ? handleEmergencyCall : handleHelplineCall}
            >
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>
                  {language.code === 'de' ? contact.name.de : contact.name.en}
                </Text>
                <Text style={[styles.contactNumber, { color: contact.color }]}>
                  {contact.number}
                </Text>
                <Text style={styles.contactDescription}>
                  {language.code === 'de' ? contact.description.de : contact.description.en}
                </Text>
              </View>
              <MaterialIcons name="phone" size={24} color={contact.color} />
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={styles.text}>
          {parseMarkdownText(language.code === 'de' ? content.text.de : content.text.en)}
        </Text>
        
        {/* Support Organizations */}
        <View style={styles.organizationsSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Spezialisierte Hilfsorganisationen' : 'Specialized Support Organizations'}
          </Text>
          
          {content.supportOrganizations.map((org, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.organizationCard}
              onPress={() => handleLinkPress(org.website)}
            >
              <View style={styles.orgInfo}>
                <Text style={styles.orgName}>
                  {language.code === 'de' ? org.name.de : org.name.en}
                </Text>
                <Text style={styles.orgType}>
                  {language.code === 'de' ? org.type.de : org.type.en}
                </Text>
                <Text style={styles.orgDescription}>
                  {language.code === 'de' ? org.description.de : org.description.en}
                </Text>
              </View>
              <MaterialIcons name="open-in-new" size={20} color="#EC4899" />
            </TouchableOpacity>
          ))}
        </View>
        
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
  emergencySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderLeftWidth: 4,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 14,
    color: '#6b7280',
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
  organizationsSection: {
    marginBottom: 32,
  },
  organizationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  orgInfo: {
    flex: 1,
  },
  orgName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  orgType: {
    fontSize: 12,
    color: '#EC4899',
    fontWeight: '500',
    marginBottom: 4,
  },
  orgDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  linksSection: {
    marginBottom: 32,
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
});

export default SexualViolencePage;