import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { languages } from '../../../../data/languages/common';
import PageNavigation from '../../../../components/PageNavigation';
import LanguageModal from '../../../../components/LanguageModal';
import VirtualAssistantModal from '../../../../components/VirtualAssistantModal';
import TutorialModal from '../../../../components/TutorialModal';
import { Picker } from '@react-native-picker/picker';

const TEMPLATE_FIELDS = {
  'cv': {
    title: { en: 'CV (Lebenslauf)', de: 'Lebenslauf (CV)' },
    fields: {
      en: [
        { label: 'Full Name', key: 'fullName', type: 'text', placeholder: 'Enter your full name' },
        { label: 'Email Address', key: 'email', type: 'email', placeholder: 'your.email@example.com' },
        { label: 'Phone Number', key: 'phone', type: 'text', placeholder: '+43 123 456 789' },
        { label: 'Address', key: 'address', type: 'text', placeholder: 'Street, City, Postal Code' },
        { label: 'Date of Birth', key: 'dateOfBirth', type: 'text', placeholder: 'DD.MM.YYYY' },
        { label: 'Professional Summary', key: 'summary', type: 'multiline', placeholder: 'Brief professional summary (2-3 sentences)' },
        { label: 'Work Experience', key: 'workExperience', type: 'multiline', placeholder: 'Job title, company, dates, key achievements' },
        { label: 'Education', key: 'education', type: 'multiline', placeholder: 'Degree, institution, dates' },
        { label: 'Skills', key: 'skills', type: 'multiline', placeholder: 'Languages, software, technical skills' },
        { label: 'Certificates', key: 'certificates', type: 'multiline', placeholder: 'Certificates and trainings' },
        { label: 'References', key: 'references', type: 'multiline', placeholder: 'References (optional)' }
      ],
      de: [
        { label: 'Vollständiger Name', key: 'fullName', type: 'text', placeholder: 'Ihren vollständigen Namen eingeben' },
        { label: 'E-Mail-Adresse', key: 'email', type: 'email', placeholder: 'ihre.email@beispiel.com' },
        { label: 'Telefonnummer', key: 'phone', type: 'text', placeholder: '+43 123 456 789' },
        { label: 'Adresse', key: 'address', type: 'text', placeholder: 'Straße, Stadt, Postleitzahl' },
        { label: 'Geburtsdatum', key: 'dateOfBirth', type: 'text', placeholder: 'TT.MM.JJJJ' },
        { label: 'Kurzprofil', key: 'summary', type: 'multiline', placeholder: 'Kurzes berufliches Profil (2-3 Sätze)' },
        { label: 'Berufserfahrung', key: 'workExperience', type: 'multiline', placeholder: 'Position, Unternehmen, Zeitraum, Erfolge' },
        { label: 'Ausbildung', key: 'education', type: 'multiline', placeholder: 'Abschluss, Institution, Zeitraum' },
        { label: 'Fähigkeiten', key: 'skills', type: 'multiline', placeholder: 'Sprachen, Software, technische Fähigkeiten' },
        { label: 'Zertifikate', key: 'certificates', type: 'multiline', placeholder: 'Zertifikate und Schulungen' },
        { label: 'Referenzen', key: 'references', type: 'multiline', placeholder: 'Referenzen (optional)' }
      ]
    }
  },
  'cover-letter': {
    title: { en: 'Cover Letter', de: 'Anschreiben' },
    fields: {
      en: [
        { label: 'Your Name', key: 'fullName', type: 'text', placeholder: 'Enter your full name' },
        { label: 'Your Address', key: 'address', type: 'text', placeholder: 'Your address' },
        { label: 'Company Name', key: 'companyName', type: 'text', placeholder: 'Company you are applying to' },
        { label: 'Company Address', key: 'companyAddress', type: 'text', placeholder: 'Company address' },
        { label: 'Position Title', key: 'position', type: 'text', placeholder: 'Position you are applying for' },
        { label: 'Date', key: 'date', type: 'text', placeholder: 'DD.MM.YYYY' },
        { label: 'Introduction', key: 'introduction', type: 'multiline', placeholder: 'Who you are and the role you are applying for' },
        { label: 'Motivation', key: 'motivation', type: 'multiline', placeholder: 'Why you are interested in this position/company' },
        { label: 'Your Fit', key: 'fit', type: 'multiline', placeholder: 'Your relevant experience and skills' },
        { label: 'Closing', key: 'closing', type: 'multiline', placeholder: 'Availability and thanks' }
      ],
      de: [
        { label: 'Ihr Name', key: 'fullName', type: 'text', placeholder: 'Ihren vollständigen Namen eingeben' },
        { label: 'Ihre Adresse', key: 'address', type: 'text', placeholder: 'Ihre Adresse' },
        { label: 'Firmenname', key: 'companyName', type: 'text', placeholder: 'Firma, bei der Sie sich bewerben' },
        { label: 'Firmenadresse', key: 'companyAddress', type: 'text', placeholder: 'Firmenadresse' },
        { label: 'Stellenbezeichnung', key: 'position', type: 'text', placeholder: 'Position, für die Sie sich bewerben' },
        { label: 'Datum', key: 'date', type: 'text', placeholder: 'TT.MM.JJJJ' },
        { label: 'Einleitung', key: 'introduction', type: 'multiline', placeholder: 'Wer Sie sind und für welche Stelle Sie sich bewerben' },
        { label: 'Motivation', key: 'motivation', type: 'multiline', placeholder: 'Warum Sie an Position/Unternehmen interessiert sind' },
        { label: 'Eignung', key: 'fit', type: 'multiline', placeholder: 'Relevante Erfahrungen und Fähigkeiten' },
        { label: 'Schluss', key: 'closing', type: 'multiline', placeholder: 'Verfügbarkeit und Dank' }
      ]
    }
  },
  'resignation-letter': {
    title: { en: 'Resignation Letter', de: 'Kündigungsschreiben' },
    fields: {
      en: [
        { label: 'Your Name', key: 'fullName', type: 'text', placeholder: 'Enter your full name' },
        { label: 'Your Address', key: 'address', type: 'text', placeholder: 'Your address' },
        { label: 'Manager/HR Name', key: 'managerName', type: 'text', placeholder: 'Name of your manager or HR' },
        { label: 'Company Name', key: 'companyName', type: 'text', placeholder: 'Your company name' },
        { label: 'Company Address', key: 'companyAddress', type: 'text', placeholder: 'Company address' },
        { label: 'Date', key: 'date', type: 'text', placeholder: 'DD.MM.YYYY' },
        { label: 'Last Working Day', key: 'lastWorkingDay', type: 'text', placeholder: 'DD.MM.YYYY' },
        { label: 'Reason (Optional)', key: 'reason', type: 'text', placeholder: 'Brief reason for leaving (optional)' },
        { label: 'Additional Notes', key: 'notes', type: 'multiline', placeholder: 'Thanks and handover offer' }
      ],
      de: [
        { label: 'Ihr Name', key: 'fullName', type: 'text', placeholder: 'Ihren vollständigen Namen eingeben' },
        { label: 'Ihre Adresse', key: 'address', type: 'text', placeholder: 'Ihre Adresse' },
        { label: 'Vorgesetzter/HR Name', key: 'managerName', type: 'text', placeholder: 'Name Ihres Vorgesetzten oder HR' },
        { label: 'Firmenname', key: 'companyName', type: 'text', placeholder: 'Name Ihrer Firma' },
        { label: 'Firmenadresse', key: 'companyAddress', type: 'text', placeholder: 'Firmenadresse' },
        { label: 'Datum', key: 'date', type: 'text', placeholder: 'TT.MM.JJJJ' },
        { label: 'Letzter Arbeitstag', key: 'lastWorkingDay', type: 'text', placeholder: 'TT.MM.JJJJ' },
        { label: 'Grund (Optional)', key: 'reason', type: 'text', placeholder: 'Kurzer Grund für Kündigung (optional)' },
        { label: 'Zusätzliche Anmerkungen', key: 'notes', type: 'multiline', placeholder: 'Dank und Übergabeangebot' }
      ]
    }
  }
} as const;

type TemplateKey = keyof typeof TEMPLATE_FIELDS;

const TemplateDetailPage: React.FC = () => {
  const { docId } = useLocalSearchParams();
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const language = languages.find(l => l.code === currentLanguage) || languages[1];

  const id = Array.isArray(docId) ? docId[0] : docId;
  const data = id && (TEMPLATE_FIELDS as any)[id as TemplateKey];

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [downloadLanguage, setDownloadLanguage] = useState(currentLanguage);
  const [downloadFormat, setDownloadFormat] = useState('pdf');

  const updateFormData = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleDownload = () => {
    const hasRequiredFields = Object.keys(formData).length > 0;
    if (!hasRequiredFields) {
      Alert.alert(
        language.code === 'de' ? 'Felder ausfüllen' : 'Fill Fields',
        language.code === 'de' 
          ? 'Bitte füllen Sie mindestens ein Feld aus, bevor Sie herunterladen.'
          : 'Please fill in at least one field before downloading.'
      );
      return;
    }

    // Simulate download functionality
    Alert.alert(
      language.code === 'de' ? 'Download gestartet' : 'Download Started',
      language.code === 'de' 
        ? `Ihr ${data.title[downloadLanguage === 'de' ? 'de' : 'en']} wird als ${downloadFormat.toUpperCase()} heruntergeladen.`
        : `Your ${data.title[downloadLanguage === 'de' ? 'de' : 'en']} will be downloaded as ${downloadFormat.toUpperCase()}.`
    );
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

        <Text style={styles.lead}>
          {language.code === 'de'
            ? 'Füllen Sie die Felder aus um Ihr personalisiertes Dokument zu erstellen.'
            : 'Fill in the fields to create your personalized document.'}
        </Text>

        <View style={styles.formSection}>
          {fields.map((field, idx) => (
            <View key={idx} style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>{field.label}</Text>
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
  subtitle: { fontSize: 16, color: '#6b7280', marginBottom: 20 },
  lead: { fontSize: 16, color: '#374151', lineHeight: 24, marginBottom: 24 },
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
