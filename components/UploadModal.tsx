import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { getAssistantText } from '../utils/languageUtils';

interface UploadModalProps {
  visible: boolean;
  onClose: () => void;
  languageCode: string;
  onImagePicked: (uri: string) => void;
  onDocumentPicked: (uri: string) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
  visible,
  onClose,
  languageCode,
  onImagePicked,
  onDocumentPicked,
}) => {
  const [loading, setLoading] = useState(false);

  // Request permissions for camera and gallery
  useEffect(() => {
    const requestPermissions = async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== 'granted') {
        console.warn('Camera permission not granted');
      }
      if (libraryStatus !== 'granted') {
        console.warn('Gallery permission not granted');
      }
    };

    if (visible) {
      requestPermissions();
    }
  }, [visible]);

  const handleTakePhoto = async () => {
    try {
      setLoading(true);
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.8,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        onImagePicked(result.assets[0].uri);
        onClose();
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    } finally {
      setLoading(false);
    }
  };

  const handleChooseFromGallery = async () => {
    try {
      setLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        onImagePicked(result.assets[0].uri);
        onClose();
      }
    } catch (error) {
      console.error('Error choosing from gallery:', error);
      Alert.alert('Error', 'Failed to select image');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadDocument = async () => {
    try {
      setLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        onDocumentPicked(result.assets[0].uri);
        onClose();
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <Text style={styles.title}>
                {getAssistantText('uploadOptions', languageCode)}
              </Text>
              <TouchableOpacity onPress={onClose}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.options}>
              <TouchableOpacity
                style={styles.option}
                onPress={handleTakePhoto}
                disabled={loading}
              >
                <MaterialIcons name="camera-alt" size={24} color="#3B82F6" />
                <Text style={styles.optionText}>
                  {getAssistantText('takePhoto', languageCode)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.option}
                onPress={handleChooseFromGallery}
                disabled={loading}
              >
                <MaterialIcons name="photo-library" size={24} color="#3B82F6" />
                <Text style={styles.optionText}>
                  {getAssistantText('chooseFromGallery', languageCode)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.option}
                onPress={handleUploadDocument}
                disabled={loading}
              >
                <MaterialIcons name="insert-drive-file" size={24} color="#3B82F6" />
                <Text style={styles.optionText}>
                  {getAssistantText('uploadDocument', languageCode)}
                </Text>
              </TouchableOpacity>

              {loading && (
                <Text style={styles.loadingText}>
                  {getAssistantText('loading', languageCode)}
                </Text>
              )}
            </View>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  options: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
  },
  loadingText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default UploadModal;
