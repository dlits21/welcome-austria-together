import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Linking,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import UploadModal from '../../../components/UploadModal';
import HighlightedText from '../../../components/HighlightedText';

const TranslateDocumentPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('de');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
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
      description: "Upload your document or image for quick translation. Please note this is a work in progress and currently only supports typed text, not handwritten content.",
      sourceLabel: "From Language:",
      targetLabel: "To Language:",
      uploadButton: "Upload Document or Image",
      limitations: [
        "• Only typed text can be translated (not handwritten)",
        "• Works best with clear, high-quality scans",
        "• Currently supports common European and Middle Eastern languages",
        "• For official translations, please use certified translation services"
      ],
      externalTools: "Professional Online Translation Tools:",
      noFileSelected: "No file selected",
      fileSelected: "File selected: ",
      disclaimer: "⚠️ This tool is for quick reference only. For official documents, always use certified translation services."
    },
    de: {
      title: "Ein Dokument übersetzen",
      description: "Laden Sie Ihr Dokument oder Bild für eine schnelle Übersetzung hoch. Bitte beachten Sie, dass dies noch in Entwicklung ist und derzeit nur getippten Text unterstützt, nicht handgeschriebenen Inhalt.",
      sourceLabel: "Von Sprache:",
      targetLabel: "Zu Sprache:",
      uploadButton: "Dokument oder Bild hochladen",
      limitations: [
        "• Nur getippter Text kann übersetzt werden (nicht handgeschrieben)",
        "• Funktioniert am besten mit klaren, hochwertigen Scans",
        "• Unterstützt derzeit gängige europäische und nahöstliche Sprachen",
        "• Für offizielle Übersetzungen verwenden Sie bitte zertifizierte Übersetzungsdienste"
      ],
      externalTools: "Professionelle Online-Übersetzungstools:",
      noFileSelected: "Keine Datei ausgewählt",
      fileSelected: "Datei ausgewählt: ",
      disclaimer: "⚠️ Dieses Tool dient nur als schnelle Referenz. Für offizielle Dokumente verwenden Sie immer zertifizierte Übersetzungsdienste."
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

  const handleImagePicked = (uri: string) => {
    setUploadedFile(uri);
    Alert.alert(
      language.code === 'de' ? 'Datei hochgeladen' : 'File Uploaded',
      language.code === 'de' ? 'Ihre Datei wurde erfolgreich hochgeladen. Die Übersetzung wird verarbeitet...' : 'Your file has been uploaded successfully. Translation is being processed...'
    );
  };

  const handleDocumentPicked = (uri: string) => {
    setUploadedFile(uri);
    Alert.alert(
      language.code === 'de' ? 'Dokument hochgeladen' : 'Document Uploaded',
      language.code === 'de' ? 'Ihr Dokument wurde erfolgreich hochgeladen. Die Übersetzung wird verarbeitet...' : 'Your document has been uploaded successfully. Translation is being processed...'
    );
  };

  const openExternalTool = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={() => setSoundEnabled(!soundEnabled)}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />
      
      <ScrollView style={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← {language.code === 'de' ? 'Zurück' : 'Back'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{currentContent.title}</Text>
        
        <Text style={styles.content}>{currentContent.description}</Text>

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

        {/* Upload Section */}
        <View style={styles.uploadSection}>
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={() => setShowUploadModal(true)}
          >
            <MaterialIcons name="cloud-upload" size={24} color="#fff" />
            <Text style={styles.uploadButtonText}>{currentContent.uploadButton}</Text>
          </TouchableOpacity>

          {uploadedFile ? (
            <View style={styles.fileStatus}>
              <MaterialIcons name="check-circle" size={20} color="#10B981" />
              <Text style={styles.fileStatusText}>
                {currentContent.fileSelected}{uploadedFile.split('/').pop()}
              </Text>
            </View>
          ) : (
            <Text style={styles.noFileText}>{currentContent.noFileSelected}</Text>
          )}
        </View>

        {/* Limitations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Einschränkungen:' : 'Limitations:'}
          </Text>
          {currentContent.limitations.map((limitation, index) => (
            <Text key={index} style={styles.content}>{limitation}</Text>
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

      <UploadModal
        visible={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        languageCode={language.code}
        onImagePicked={handleImagePicked}
        onDocumentPicked={handleDocumentPicked}
      />
      
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
    marginBottom: 16,
    color: '#1a1a1a',
  },
  languageSection: {
    marginVertical: 24,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
  },
  uploadSection: {
    marginVertical: 24,
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  fileStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  fileStatusText: {
    marginLeft: 8,
    color: '#059669',
    fontSize: 14,
  },
  noFileText: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2d2d2d',
  },
  disclaimerContainer: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  toolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  toolContent: {
    flex: 1,
  },
  toolName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#92400e',
    fontWeight: '500',
  },
});

export default TranslateDocumentPage;