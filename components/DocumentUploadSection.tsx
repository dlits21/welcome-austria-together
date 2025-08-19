import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

interface DocumentUploadSectionProps {
  languageCode: string;
  onDocumentUploaded: (uri: string, type: 'document' | 'image') => void;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  languageCode,
  onDocumentUploaded
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const content = {
    en: {
      title: "Upload Document",
      description: "Select a document or image to translate",
      uploadDocument: "Choose Document",
      uploadImage: "Take/Choose Photo",
      supportedFormats: "Supported: PDF, DOC, DOCX, TXT, JPG, PNG",
      uploading: "Processing..."
    },
    de: {
      title: "Dokument hochladen", 
      description: "Wählen Sie ein Dokument oder Bild zum Übersetzen",
      uploadDocument: "Dokument wählen",
      uploadImage: "Foto aufnehmen/wählen",
      supportedFormats: "Unterstützt: PDF, DOC, DOCX, TXT, JPG, PNG",
      uploading: "Verarbeitung..."
    }
  };

  const currentContent = content[languageCode as keyof typeof content] || content.en;

  const pickDocument = async () => {
    try {
      setIsUploading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
        copyToCacheDirectory: true
      });

      if (!result.canceled && result.assets[0]) {
        // TODO: Implement actual document translation via OCR/API
        setTimeout(() => {
          onDocumentUploaded(result.assets[0].uri, 'document');
          setIsUploading(false);
        }, 2000);
      } else {
        setIsUploading(false);
      }
    } catch (error) {
      setIsUploading(false);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const pickImage = async () => {
    try {
      setIsUploading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        // TODO: Implement actual image OCR and translation
        setTimeout(() => {
          onDocumentUploaded(result.assets[0].uri, 'image');
          setIsUploading(false);
        }, 2000);
      } else {
        setIsUploading(false);
      }
    } catch (error) {
      setIsUploading(false);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  if (isUploading) {
    return (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.uploadingText}>{currentContent.uploading}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentContent.title}</Text>
      <Text style={styles.description}>{currentContent.description}</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <MaterialIcons name="description" size={24} color="#fff" />
          <Text style={styles.buttonText}>{currentContent.uploadDocument}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <MaterialIcons name="photo-camera" size={24} color="#fff" />
          <Text style={styles.buttonText}>{currentContent.uploadImage}</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.supportedText}>{currentContent.supportedFormats}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 12,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  uploadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  supportedText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  uploadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  uploadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
});

export default DocumentUploadSection;