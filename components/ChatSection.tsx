import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ChatBubble from './ChatBubble';
import VoiceSection from './VoiceSection';
import ModeToggle from './ModeToggle';
import UploadModal from './UploadModal';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  fileUri?: string; // Added for file preview
}

interface ChatSectionProps {
  messages: Message[];
  inputText: string;
  onInputChange: (text: string) => void;
  onSendMessage: () => void;
  chatMode: 'text' | 'voice';
  isListening: boolean;
  onToggleVoice: () => void;
  languageCode: string;
  isWideScreen: boolean;
  avatar?: string;
  showModeToggle?: boolean;
  onModeChange?: (mode: 'text' | 'voice') => void;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  messages,
  inputText,
  onInputChange,
  onSendMessage,
  chatMode,
  isListening,
  onToggleVoice,
  languageCode,
  isWideScreen,
  avatar,
  showModeToggle = false,
  onModeChange,
}) => {
  const textInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [fileUri, setFileUri] = useState<string | null>(null); // Store uploaded file URI

  // Updated handleTakePhoto with new MediaType
  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Updated usage of mediaTypes
    });

    if (!result.canceled && result.uri) {
      setFileUri(result.uri);
    } else {
      console.warn("No image selected");
    }
  };

  // Updated handleChooseFromGallery with new MediaType
  const handleChooseFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Updated usage of mediaTypes
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.uri) {
      setFileUri(result.uri);
    } else {
      console.warn("No image selected");
    }
  };

  const handleUploadDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
    });

    if (result.type === 'success' && result.uri) {
      setFileUri(result.uri);
    } else {
      console.warn("No document selected");
    }
  };

  const handleSendMessage = () => {
    if (fileUri) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: 'Uploaded file', // You can customize this based on the file type
        isUser: true,
        timestamp: new Date(),
        fileUri,
      };
      onSendMessage(newMessage);
      setFileUri(null); // Reset after sending
    } else if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };
      onSendMessage(newMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.chatSection, isWideScreen && styles.chatSectionWide]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} avatar={avatar} />
        ))}

        {fileUri && (
          <View style={styles.previewContainer}>
            <Text style={styles.previewText}>Preview:</Text>
            {fileUri.endsWith('.jpg') || fileUri.endsWith('.png') ? (
              <Image
                source={{ uri: fileUri }}
                style={styles.previewImage}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.documentPreview}>Document attached</Text>
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => setShowUploadModal(true)}
        >
          <MaterialIcons name="more-horiz" size={24} color="#666" />
        </TouchableOpacity>

        <TextInput
          ref={textInputRef}
          style={styles.textInput}
          value={inputText}
          onChangeText={onInputChange}
          placeholder={
            languageCode === 'de' ? 'Schreibe eine Nachricht...' : 'Type a message...'
          }
          maxLength={500}
          returnKeyType="send"
          onSubmitEditing={handleSendMessage}
          blurOnSubmit={false}
          autoCorrect={false}
          autoCapitalize="sentences"
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={!inputText.trim() && !fileUri}
        >
          <MaterialIcons
            name="send"
            size={20}
            color={inputText.trim() || fileUri ? "#fff" : "#ccc"}
          />
        </TouchableOpacity>
      </View>

      <UploadModal
        visible={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onTakePhoto={handleTakePhoto}
        onChooseFromGallery={handleChooseFromGallery}
        onUploadDocument={handleUploadDocument}
        languageCode={languageCode}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  chatSection: {
    flex: 1,
  },
  chatSectionWide: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  previewContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  previewText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  documentPreview: {
    fontSize: 14,
    color: '#333',
  },
  uploadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
});

export default ChatSection;
