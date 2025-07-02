import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
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
  const [image, setImage] = useState<string | null>(null);

  // Request permissions for camera and gallery
  useEffect(() => {
    const requestPermissions = async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== 'granted') {
        alert('Camera permission is required to take photos.');
      }
      if (libraryStatus !== 'granted') {
        alert('Gallery permission is required to select photos.');
      }
    };

    requestPermissions();
  }, []);

  // Function to pick an image
  const openImagePicker = async (type: 'camera' | 'gallery') => {
    try {
      setLoading(true);
      let result;

      // Open camera or gallery based on the type passed
      if (type === 'camera') {
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,  // Correct usage
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          quality: 0,
        });
      }

      console.log(result)

      // Check if the user has selected an image and if there is a URI
      if (!result.canceled && result.assets[0].uri) {
        onImagePicked(result.assets[0].uri);
      } else {
        console.error('No image selected', result.canceled, result.assets[0].uri);
        Alert.alert('No image selected', result.canceled, result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick an image');
    } finally {
      setLoading(false);
    }
  };

  // Function to pick a document
  const openDocumentPicker = async () => {
    try {
      setLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Accept all document types
      });

      // Check if the document was successfully selected
      if (result.type === 'success' && result.uri) {
        onDocumentPicked(result.uri);
      } else {
        Alert.alert('No document selected');
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick a document');
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
                onPress={() => openImagePicker('camera')}
                disabled={loading}
              >
                <MaterialIcons name="camera-alt" size={24} color="#3B82F6" />
                <Text style={styles.optionText}>
                  {getAssistantText('takePhoto', languageCode)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.option}
                onPress={() => openImagePicker('gallery')}
                disabled={loading}
              >
                <MaterialIcons name="photo-library" size={24} color="#3B82F6" />
                <Text style={styles.optionText}>
                  {getAssistantText('chooseFromGallery', languageCode)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.option}
                onPress={openDocumentPicker}
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
