import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Linking
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';
import DocumentUploadSection from '../../../components/DocumentUploadSection';

const TranslateDocumentPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('de');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const router = useRouter();
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const supportedLanguages = [
    { code: 'de', name: 'German / Deutsch' },
    { code: 'en', name: 'English / Englisch' },
    { code: 'ar', name: 'Arabic / العربية' },
    { code: 'fa', name: 'Persian / فارسی' },
    { code: 'ru', name: 'Russian / Русский' },
    { code: 'tr', name: 'Turkish / Türkçe' },
    { code: 'fr', name: 'French / Français' },
    { code: 'es', name: 'Spanish / Español' },
    { code: 'it', name: 'Italian / Italiano' },
  ];

  const content = {
    en: {
      title: "Translate a Document",
      subtitle: "AI-Powered Document Translation",
      description: "Upload your document or image for quick translation using advanced OCR and AI technology.",
      sourceLabel: "From Language:",
      targetLabel: "To Language:",
      limitations: [
        "• Works best with clear, high-quality scans",
        "• Currently supports typed text (handwriting support coming soon)",
        "• Supports common European and Middle Eastern languages",
        "• For official documents, always use certified translation services"
      ],
      externalTools: "Professional Online Translation Tools:",
      disclaimer: "⚠️ This tool is for quick reference only. For official documents, always use certified translation services.",
      translationResult: "Translation Result:",
      noTranslation: "Upload a document to see translation results here."
    },
    de: {
      title: "Ein Dokument übersetzen",
      subtitle: "KI-gestützte Dokumentenübersetzung",
      description: "Laden Sie Ihr Dokument oder Bild für eine schnelle Übersetzung mit fortschrittlicher OCR- und KI-Technologie hoch.",
      sourceLabel: "Von Sprache:",
      targetLabel: "Zu Sprache:",
      limitations: [
        "• Funktioniert am besten mit klaren, hochwertigen Scans",
        "• Unterstützt derzeit getippten Text (Handschriftunterstützung kommt bald)",
        "• Unterstützt gängige europäische und nahöstliche Sprachen",
        "• Für offizielle Übersetzungen verwenden Sie immer zertifizierte Übersetzungsdienste"
      ],
      externalTools: "Professionelle Online-Übersetzungstools:",
      disclaimer: "⚠️ Dieses Tool dient nur als schnelle Referenz. Für offizielle Dokumente verwenden Sie immer zertifizierte Übersetzungsdienste.",
      translationResult: "Übersetzungsergebnis:",
      noTranslation: "Laden Sie ein Dokument hoch, um hier Übersetzungsergebnisse zu sehen."
    }
  };

  const currentContent = content[language.code as keyof typeof content] || content.en;

  const externalTools = [
    {
      name: "Google Translate",
      url: "https://translate.google.com",
      description: "Free online translator with document upload support"
    },
    {
      name: "DeepL", 
      url: "https://www.deepl.com/translator",
      description: "High-quality translations with document support"
    },
    {
      name: "Microsoft Translator",
      url: "https://www.bing.com/translator", 
      description: "Document translation with image support"
    }
  ];

  const handleDocumentUploaded = (uri: string, type: 'document' | 'image') => {
    // TODO: Implement actual OCR and translation logic
    // This would typically involve:
    // 1. OCR processing to extract text from image/document
    // 2. Language detection if source language not specified
    // 3. Translation API call (Google Translate, Azure Translator, etc.)
    // 4. Display translated result
    
    const mockTranslation = language.code === 'de' 
      ? "Dies ist eine Beispielübersetzung. In der echten Implementierung würde hier der übersetzte Text aus Ihrem hochgeladenen Dokument erscheinen."
      : "This is a sample translation. In the real implementation, the translated text from your uploaded document would appear here.";
    
    setTranslatedText(mockTranslation);
  };

  const openExternalTool = (url: string) => {
    Linking.openURL(url);
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
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
      />
      
      <ScrollView style={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← {language.code === 'de' ? 'Zurück' : 'Back'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{currentContent.title}</Text>
        
        <Text style={styles.subtitle}>{currentContent.subtitle}</Text>
        
        <Text style={styles.description}>{parseMarkdownText(currentContent.description)}</Text>

        {/* Language Selection */}
        <View style={styles.languageSection}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>{currentContent.sourceLabel}</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={sourceLanguage}
                onValueChange={(itemValue) => setSourceLanguage(itemValue)}
                style={styles.picker}
              >
                {supportedLanguages.map((lang) => (
                  <Picker.Item key={lang.code} label={lang.name} value={lang.code} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>{currentContent.targetLabel}</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={targetLanguage}
                onValueChange={(itemValue) => setTargetLanguage(itemValue)}
                style={styles.picker}
              >
                {supportedLanguages.map((lang) => (
                  <Picker.Item key={lang.code} label={lang.name} value={lang.code} />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        {/* Document Upload Section */}
        <DocumentUploadSection 
          languageCode={language.code}
          onDocumentUploaded={handleDocumentUploaded}
        />

        {/* Translation Result */}
        {translatedText && (
          <View style={styles.resultSection}>
            <Text style={styles.resultTitle}>{currentContent.translationResult}</Text>
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{translatedText}</Text>
            </View>
          </View>
        )}

        {!translatedText && (
          <View style={styles.placeholderSection}>
            <MaterialIcons name="translate" size={48} color="#D1D5DB" />
            <Text style={styles.placeholderText}>{currentContent.noTranslation}</Text>
          </View>
        )}

        {/* Limitations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Hinweise:' : 'Important Notes:'}
          </Text>
          {currentContent.limitations.map((limitation, index) => (
            <Text key={index} style={styles.limitationText}>{limitation}</Text>
          ))}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>{currentContent.disclaimer}</Text>
        </View>

        {/* External Tools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{currentContent.externalTools}</Text>
          {externalTools.map((tool, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.toolButton}
              onPress={() => openExternalTool(tool.url)}
            >
              <View style={styles.toolContent}>
                <Text style={styles.toolName}>{tool.name}</Text>
                <Text style={styles.toolDescription}>{tool.description}</Text>
              </View>
              <MaterialIcons name="open-in-new" size={20} color="#3B82F6" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      <LanguageModal 
        visible={showLanguageModal} 
        onClose={() => setShowLanguageModal(false)} 
        languageCode={language.code}
      />
      
      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
        languageCode={language.code}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={language.code}
        tutorialData="translation"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: '#3B82F6',
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
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6B7280',
    marginBottom: 24,
  },
  languageSection: {
    marginVertical: 16,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  resultSection: {
    marginVertical: 24,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  resultContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  placeholderSection: {
    alignItems: 'center',
    padding: 40,
    marginVertical: 24,
  },
  placeholderText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1f2937',
  },
  limitationText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    marginBottom: 8,
  },
  disclaimerContainer: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  disclaimerText: {
    fontSize: 14,
    color: '#92400E',
    fontWeight: '500',
  },
  toolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  toolContent: {
    flex: 1,
  },
  toolName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 14,
  color: '#6B7280',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
});

export default TranslateDocumentPage;