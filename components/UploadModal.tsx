
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAssistantText } from '../utils/languageUtils';

interface UploadModalProps {
  visible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onChooseFromGallery: () => void;
  onUploadDocument: () => void;
  languageCode: string;
}

const UploadModal: React.FC<UploadModalProps> = ({
  visible,
  onClose,
  onTakePhoto,
  onChooseFromGallery,
  onUploadDocument,
  languageCode,
}) => {
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
                onPress={() => {
                  onTakePhoto();
                  onClose();
                }}
              >
                <MaterialIcons name="camera-alt" size={24} color="#3B82F6" />
                <Text style={styles.optionText}>
                  {getAssistantText('takePhoto', languageCode)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  onChooseFromGallery();
                  onClose();
                }}
              >
                <MaterialIcons name="photo-library" size={24} color="#3B82F6" />
                <Text style={styles.optionText}>
                  {getAssistantText('chooseFromGallery', languageCode)}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  onUploadDocument();
                  onClose();
                }}
              >
                <MaterialIcons name="insert-drive-file" size={24} color="#3B82F6" />
                <Text style={styles.optionText}>
                  {getAssistantText('uploadDocument', languageCode)}
                </Text>
              </TouchableOpacity>
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
});

export default UploadModal;
