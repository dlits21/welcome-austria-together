import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';

const WorkPermitsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => Linking.openURL(url);

  const content = {
    title: { en: 'Work Permits in Austria', de: 'Arbeitsgenehmigungen in Österreich' },
    subtitle: { en: 'Types, requirements, and where to get help', de: 'Arten, Anforderungen und wo Sie Hilfe erhalten' },
    text: {
      en: `Austria has several types of work permits depending on your situation:
• Red-White-Red Card (skilled workers)
• EU Blue Card (highly qualified)
• Work permit for students and graduates
• Seasonal work permits

Requirements usually include a job offer, qualifications, and sometimes a labor market check. Rules depend on nationality and residence status.`,
      de: `In Österreich gibt es verschiedene Arten von Arbeitsgenehmigungen je nach Situation:
• Rot-Weiß-Rot Karte (Fachkräfte)
• EU Blue Card (Hochqualifizierte)
• Beschäftigung für Studierende und Absolvent:innen
• Saisonbeschäftigung

Voraussetzungen sind meist ein Jobangebot, Qualifikationen und teilweise eine Arbeitsmarktprüfung. Die Regeln hängen von Staatsangehörigkeit und Aufenthaltsstatus ab.`
    },
    links: [
      { title: { en: 'Official Migration Portal', de: 'Offizielles Migrationsportal' }, url: 'https://www.migration.gv.at' },
      { title: { en: 'oesterreich.gv.at – Work & Residence', de: 'oesterreich.gv.at – Arbeit & Aufenthalt' }, url: 'https://www.oesterreich.gv.at/themen/arbeit_und_pension.html' },
      { title: { en: 'AMS – Employment Service Austria', de: 'AMS – Arbeitsmarktservice' }, url: 'https://www.ams.at' },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
      />

        <ScrollView style={styles.content}>
          <Text style={styles.title}>{language.code === 'de' ? content.title.de : content.title.en}</Text>
          <Text style={styles.subtitle}>{language.code === 'de' ? content.subtitle.de : content.subtitle.en}</Text>
          <Text style={styles.text}>{language.code === 'de' ? content.text.de : content.text.en}</Text>

          <View style={styles.linksSection}>
            <Text style={styles.sectionTitle}>{language.code === 'de' ? 'Mehr Informationen' : 'More Information'}</Text>
            {content.links.map((link, i) => (
              <TouchableOpacity key={i} style={styles.linkItem} onPress={() => handleLinkPress(link.url)}>
                <MaterialIcons name="link" size={20} color="#3B82F6" />
                <Text style={styles.linkText}>{language.code === 'de' ? link.title.de : link.title.en}</Text>
                <MaterialIcons name="open-in-new" size={16} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

      <LanguageModal visible={showLanguageModal} onClose={() => setShowLanguageModal(false)} languageCode={language.code} />
      {/* Virtual Assistant Modal */}
      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
        languageCode={language.code}
      />

      {/* Tutorial Modal */}
      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={language.code}
        tutorialData="home"
      />
    </SafeAreaView>
  );
};

export default WorkPermitsPage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: '#1f2937' },
  subtitle: { fontSize: 18, fontWeight: '600', color: '#4b5563', marginBottom: 20 },
  text: { fontSize: 16, lineHeight: 24, color: '#374151', marginBottom: 32 },
  linksSection: { marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#1f2937', marginBottom: 16 },
  linkItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', padding: 16, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  linkText: { flex: 1, fontSize: 16, color: '#3B82F6', marginLeft: 12, fontWeight: '500' },
});
