import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';

interface TemplateItem {
  id: string;
  title: { en: string; de: string };
  icon: string;
  color: string;
}

const templates: TemplateItem[] = [
  { id: 'cv', title: { en: 'CV (Lebenslauf)', de: 'Lebenslauf (CV)' }, icon: '📄', color: '#3B82F6' },
  { id: 'cover-letter', title: { en: 'Cover Letter', de: 'Anschreiben' }, icon: '✉️', color: '#10B981' },
  { id: 'resignation-letter', title: { en: 'Resignation Letter', de: 'Kündigungsschreiben' }, icon: '📝', color: '#F59E0B' },
  { id: 'job-contract', title: { en: 'Job Contract Sample', de: 'Arbeitsvertrag Muster' }, icon: '📃', color: '#8B5CF6' },
  { id: 'reference-letter', title: { en: 'Reference Letter', de: 'Arbeitszeugnis' }, icon: '🏅', color: '#EF4444' },
  { id: 'salary-negotiation', title: { en: 'Salary Negotiation Email', de: 'Gehaltverhandlungs-E-Mail' }, icon: '💬', color: '#06B6D4' },
];

const WorkTemplatesPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const language = languages.find(l => l.code === currentLanguage) || languages[1];

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const router = useRouter();

  const renderItem = ({ item }: { item: TemplateItem }) => (
    <TouchableOpacity
      style={[styles.tile, { borderColor: item.color + '40' }]}
      onPress={() => router.push(`/information/work/templates/${item.id}`)}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <Text style={styles.tileTitle}>{language.code === 'de' ? item.title.de : item.title.en}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>{language.code === 'de' ? 'Vorlagen' : 'Templates'}</Text>
        <Text style={styles.subtitle}>
          {language.code === 'de'
            ? 'Nützliche Dokumentvorlagen rund um Arbeit und Bewerbung.'
            : 'Useful document templates related to work and applications.'}
        </Text>

        <FlatList
          data={templates}
          renderItem={renderItem}
          keyExtractor={(i) => i.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          scrollEnabled={false}
        />
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: '#1f2937' },
  subtitle: { fontSize: 16, color: '#4b5563', marginBottom: 20 },
  grid: { paddingBottom: 24 },
  tile: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    borderWidth: 2,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    minHeight: 120,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: { fontSize: 26 },
  tileTitle: { fontSize: 14, fontWeight: '500', textAlign: 'center', lineHeight: 18 },
});

export default WorkTemplatesPage;
