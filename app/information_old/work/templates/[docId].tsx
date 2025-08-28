import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { languages } from '../../../../data/language/common';
import PageNavigation from '../../../../components/PageNavigation';
import LanguageModal from '../../../../components/LanguageModal';
import VirtualAssistantModal from '../../../../components/VirtualAssistantModal';
import TutorialModal from '../../../../components/TutorialModal';
import { Picker } from '@react-native-picker/picker';
// import PDFLib from 'react-native-pdf-lib'; // TODO: Implement PDF generation
import templatesData from '../../../../data/information/work/templates.json';

type TemplateKey = keyof typeof templatesData;

const TemplateDetailPage: React.FC = () => {
  const { docId } = useLocalSearchParams();
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const language = languages.find(l => l.code === currentLanguage) || languages[1];

  const id = Array.isArray(docId) ? docId[0] : docId;
  const data = id && (templatesData as any)[id as TemplateKey];

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [downloadLanguage, setDownloadLanguage] = useState(currentLanguage);
  const [downloadFormat, setDownloadFormat] = useState('pdf');

  const updateFormData = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const generatePDF = async () => {
    // TODO: Implement PDF generation using react-native-pdf-lib
    // This function should:
    // 1. Create a new PDF document
    // 2. Add formatted content based on formData and selected template
    // 3. Apply proper styling and layout
    // 4. Save and share the PDF file
    
    const templateTitle = data.title[downloadLanguage === 'de' ? 'de' : 'en'];
    Alert.alert(
      language.code === 'de' ? 'PDF Generierung' : 'PDF Generation',
      language.code === 'de' 
        ? `PDF-Generierung für ${templateTitle} ist noch nicht implementiert. Diese Funktion wird bald verfügbar sein.`
        : `PDF generation for ${templateTitle} is not yet implemented. This feature will be available soon.`
    );
  };

  const generateWordDocument = async () => {
    // TODO: Implement Word document generation
    // This function should:
    // 1. Create a new .docx document using a library like docx
    // 2. Add formatted content based on formData and selected template
    // 3. Apply proper styling, headers, and layout
    // 4. Save and share the Word file
    
    const templateTitle = data.title[downloadLanguage === 'de' ? 'de' : 'en'];
    Alert.alert(
      language.code === 'de' ? 'Word Generierung' : 'Word Generation',
      language.code === 'de' 
        ? `Word-Generierung für ${templateTitle} ist noch nicht implementiert. Diese Funktion wird bald verfügbar sein.`
        : `Word generation for ${templateTitle} is not yet implemented. This feature will be available soon.`
    );
  };

  const generateODTDocument = async () => {
    // TODO: Implement OpenOffice document generation
    // This function should:
    // 1. Create a new .odt document using a library like odt-writer or similar
    // 2. Add formatted content based on formData and selected template
    // 3. Apply proper styling and layout compatible with OpenOffice/LibreOffice
    // 4. Save and share the ODT file
    
    const templateTitle = data.title[downloadLanguage === 'de' ? 'de' : 'en'];
    Alert.alert(
      language.code === 'de' ? 'ODT Generierung' : 'ODT Generation',
      language.code === 'de' 
        ? `ODT-Generierung für ${templateTitle} ist noch nicht implementiert. Diese Funktion wird bald verfügbar sein.`
        : `ODT generation for ${templateTitle} is not yet implemented. This feature will be available soon.`
    );
  };

  const handleDownload = async () => {
    const requiredFields = fields.filter(field => field.required);
    const missingRequiredFields = requiredFields.filter(field => !formData[field.key] || formData[field.key].trim() === '');
    
    if (missingRequiredFields.length > 0) {
      Alert.alert(
        language.code === 'de' ? 'Pflichtfelder ausfüllen' : 'Fill Required Fields',
        language.code === 'de' 
          ? `Bitte füllen Sie alle Pflichtfelder aus: ${missingRequiredFields.map(f => f.label).join(', ')}`
          : `Please fill in all required fields: ${missingRequiredFields.map(f => f.label).join(', ')}`
      );
      return;
    }

    if (downloadFormat === 'pdf') {
      await generatePDF();
    } else if (downloadFormat === 'word') {
      await generateWordDocument();
    } else if (downloadFormat === 'openoffice') {
      await generateODTDocument();
    }
  };

  if (!id || !data) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <Text style={styles.title}>Not found</Text>
          <Text style={styles.subtitle}>Template "{id}" does not exist.</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>{language.code === 'de' ? 'Zurück' : 'Back'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const fields = language.code === 'de' ? data.fields.de : data.fields.en;

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
      />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{language.code === 'de' ? data.title.de : data.title.en}</Text>

        <Text style={styles.subtitle}>
          {language.code === 'de' ? data.subtitle?.de : data.subtitle?.en}
        </Text>

        <Text style={styles.lead}>
          {language.code === 'de' ? data.description?.de : data.description?.en}
        </Text>

        <Text style={styles.instructions}>
          {language.code === 'de'
            ? 'Füllen Sie die Felder aus um Ihr personalisiertes Dokument zu erstellen. Felder mit * sind Pflichtfelder.'
            : 'Fill in the fields to create your personalized document. Fields marked with * are required.'}
        </Text>

        <View style={styles.formSection}>
          {fields.map((field, idx) => (
            <View key={idx} style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>
                {field.label}{field.required ? ' *' : ''}
              </Text>
              {field.type === 'multiline' ? (
                <TextInput
                  style={[styles.textInput, styles.multilineInput]}
                  placeholder={field.placeholder}
                  value={formData[field.key] || ''}
                  onChangeText={(value) => updateFormData(field.key, value)}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              ) : (
                <TextInput
                  style={styles.textInput}
                  placeholder={field.placeholder}
                  value={formData[field.key] || ''}
                  onChangeText={(value) => updateFormData(field.key, value)}
                  keyboardType={field.type === 'email' ? 'email-address' : 'default'}
                />
              )}
            </View>
          ))}
        </View>

        <View style={styles.downloadSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Download-Optionen' : 'Download Options'}
          </Text>
          
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>
              {language.code === 'de' ? 'Sprache:' : 'Language:'}
            </Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={downloadLanguage}
                onValueChange={setDownloadLanguage}
                style={styles.picker}
              >
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Deutsch" value="de" />
              </Picker>
            </View>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>
              {language.code === 'de' ? 'Format:' : 'Format:'}
            </Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={downloadFormat}
                onValueChange={setDownloadFormat}
                style={styles.picker}
              >
                <Picker.Item label="PDF" value="pdf" />
                <Picker.Item label="Word (.docx)" value="word" />
                <Picker.Item label="OpenOffice (.odt)" value="openoffice" />
              </Picker>
            </View>
          </View>

          <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
            <Text style={styles.downloadButtonText}>
              {language.code === 'de' ? 'Dokument herunterladen' : 'Download Document'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linksSection}>
          <Text style={styles.sectionTitle}>{language.code === 'de' ? 'Nützliche Links' : 'Useful Links'}</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://europa.eu/europass/en/create-europass-cv')} style={styles.linkItem}>
            <Text style={styles.linkText}>Europass CV</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.karriere.at/lebenslauf')} style={styles.linkItem}>
            <Text style={styles.linkText}>karriere.at CV Tools</Text>
          </TouchableOpacity>
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

export default TemplateDetailPage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 16, paddingBottom: 100 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, color: '#1f2937' },
  subtitle: { fontSize: 18, color: '#4b5563', marginBottom: 12, fontWeight: '500' },
  lead: { fontSize: 16, color: '#374151', lineHeight: 24, marginBottom: 16 },
  instructions: { fontSize: 14, color: '#6b7280', marginBottom: 24, fontStyle: 'italic' },
  formSection: { marginBottom: 32 },
  fieldContainer: { marginBottom: 20 },
  fieldLabel: { fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 8 },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#1f2937'
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top'
  },
  downloadSection: {
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24
  },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#1f2937', marginBottom: 16 },
  pickerContainer: { marginBottom: 16 },
  pickerLabel: { fontSize: 16, fontWeight: '500', color: '#374151', marginBottom: 8 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  picker: { height: 50 },
  downloadButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  backBtn: { marginTop: 8, paddingVertical: 10 },
  backBtnText: { color: '#3B82F6', fontSize: 16 },
  linksSection: { marginTop: 16 },
  linkItem: { paddingVertical: 8 },
  linkText: { color: '#3B82F6', fontSize: 16 },
});
