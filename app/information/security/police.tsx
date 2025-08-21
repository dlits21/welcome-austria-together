import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const SecurityPolicePage: React.FC = () => {
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
      en: 'Police and Law Enforcement',
      de: 'Polizei und Strafverfolgung'
    },
    subtitle: {
      en: 'Understanding police interactions and your rights in Austria',
      de: 'Polizeikontakte verstehen und Ihre Rechte in Österreich'
    },
    text: {
      en: `Understanding when and how to interact with police in Austria is important for your safety and legal protection. This guide covers your rights and responsibilities.

**When to Contact Police:**
Call **133** for police emergencies or **059133** for non-emergencies when you need to:
• Report crimes (theft, assault, fraud, vandalism)
• Deal with traffic accidents
• Report domestic violence or threats
• Handle disputes that cannot be resolved peacefully
• Report missing persons
• Get help with harassment or stalking

**What Police Are Allowed to Do:**
Austrian police have specific powers within legal boundaries:
• Request identification documents during routine checks
• Search individuals with reasonable suspicion
• Make arrests when crimes are committed
• Issue fines for traffic violations and minor offenses
• Enter premises with a warrant or in emergency situations
• Use reasonable force when necessary for public safety

**Your Rights During Police Contact:**
You have fundamental rights that must be respected:
• Right to remain silent (except providing identification)
• Right to legal representation during questioning
• Right to interpreter services if needed
• Right to be treated with dignity and without discrimination
• Right to file complaints about police misconduct
• Right to medical attention if injured during arrest

**Discrimination and Police Misconduct:**
If you experience discrimination or misconduct by police officers:
• Document the incident (names, badge numbers, witnesses)
• File a complaint with the police department
• Contact the **Ombudsman Board** (Volksanwaltschaft)
• Seek legal assistance for serious violations
• Report to human rights organizations if needed

**Legal Support Resources:**
Free legal aid is available for those who cannot afford representation. Contact legal aid societies or public defenders for assistance with police-related legal issues.`,
      de: `Das Verständnis, wann und wie man mit der Polizei in Österreich interagiert, ist wichtig für Ihre Sicherheit und Ihren Rechtsschutz. Dieser Leitfaden deckt Ihre Rechte und Pflichten ab.

**Wann die Polizei kontaktieren:**
Rufen Sie **133** für Polizei-Notfälle oder **059133** für Nicht-Notfälle an, wenn Sie:
• Verbrechen melden müssen (Diebstahl, Körperverletzung, Betrug, Vandalismus)
• Verkehrsunfälle abwickeln
• Häusliche Gewalt oder Bedrohungen melden
• Streitigkeiten handhaben, die nicht friedlich gelöst werden können
• Vermisste Personen melden
• Hilfe bei Belästigung oder Stalking benötigen

**Was die Polizei darf:**
Die österreichische Polizei hat spezifische Befugnisse innerhalb rechtlicher Grenzen:
• Ausweisdokumente bei Routinekontrollen verlangen
• Personen bei begründetem Verdacht durchsuchen
• Verhaftungen bei begangenen Straftaten durchführen
• Strafen für Verkehrsverstöße und kleinere Vergehen verhängen
• Räumlichkeiten mit Durchsuchungsbefehl oder in Notfällen betreten
• Angemessene Gewalt für die öffentliche Sicherheit anwenden

**Ihre Rechte bei Polizeikontakt:**
Sie haben Grundrechte, die respektiert werden müssen:
• Recht zu schweigen (außer Identitätsnachweis)
• Recht auf rechtliche Vertretung bei Vernehmungen
• Recht auf Dolmetscherdienste bei Bedarf
• Recht auf würdevolle Behandlung ohne Diskriminierung
• Recht, Beschwerden über Polizeifehlverhalten einzureichen
• Recht auf medizinische Versorgung bei Verletzungen während der Verhaftung

**Diskriminierung und Polizeifehlverhalten:**
Wenn Sie Diskriminierung oder Fehlverhalten durch Polizeibeamte erleben:
• Dokumentieren Sie den Vorfall (Namen, Dienstnummern, Zeugen)
• Reichen Sie eine Beschwerde bei der Polizeidienststelle ein
• Kontaktieren Sie die **Volksanwaltschaft**
• Suchen Sie rechtliche Hilfe bei schweren Verstößen
• Melden Sie sich bei Menschenrechtsorganisationen bei Bedarf

**Rechtshilfe-Ressourcen:**
Kostenlose Rechtshilfe ist für diejenigen verfügbar, die sich keine Vertretung leisten können. Kontaktieren Sie Rechtshilfevereine oder Pflichtverteidiger für Hilfe bei polizeirechtlichen Angelegenheiten.`
    },
    links: [
      {
        title: { en: 'Austrian Police Official Site', de: 'Offizielle Website der österreichischen Polizei' },
        url: 'https://www.polizei.gv.at'
      },
      {
        title: { en: 'Ombudsman Board Austria', de: 'Volksanwaltschaft Österreich' },
        url: 'https://volksanwaltschaft.gv.at'
      },
      {
        title: { en: 'Legal Aid Austria', de: 'Rechtshilfe Österreich' },
        url: 'https://www.verfahrenshilfe.at'
      },
      {
        title: { en: 'Human Rights Organization', de: 'Menschenrechtsorganisation' },
        url: 'https://www.liga.or.at'
      }
    ],
    videoTitle: {
      en: 'Your Rights with Police in Austria',
      de: 'Ihre Rechte bei der Polizei in Österreich'
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

export default SecurityPolicePage;