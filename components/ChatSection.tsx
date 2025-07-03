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

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  fileUri?: string;
  fileType?: 'image' | 'document';
}

interface ChatSectionProps {
  messages: Message[];
  inputText: string;
  onInputChange: (text: string) => void;
  onSendMessage: (message?: Message) => void;
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
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'document' | null>(null);

  const handleImagePicked = (uri: string) => {
    setFileUri(uri);
    setFileType('image');
  };

  const handleDocumentPicked = (uri: string) => {
    setFileUri(uri);
    setFileType('document');
  };

  const handleSendMessage = () => {
    if (fileUri && fileType) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: fileType === 'image' ? 'Image attached' : 'Document attached',
        isUser: true,
        timestamp: new Date(),
        fileUri,
        fileType,
      };
      onSendMessage(newMessage);
      setFileUri(null);
      setFileType(null);
    } else if (inputText.trim()) {
      onSendMessage();
    }
  };

  const clearAttachment = () => {
    setFileUri(null);
    setFileType(null);
  };

  const renderInputSection = () => {
    if (chatMode === 'voice') {
      return (
        <View style={styles.voiceInputContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => setShowUploadModal(true)}
          >
            <MaterialIcons name="more-horiz" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.voiceButton,
              isListening && styles.voiceButtonActive
            ]}
            onPress={onToggleVoice}
          >
            <MaterialIcons
              name={isListening ? "mic" : "mic-none"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sendButton, 
              !fileUri && styles.sendButtonDisabled
            ]}
            onPress={handleSendMessage}
            disabled={!fileUri}
          >
            <MaterialIcons
              name="send"
              size={20}
              color={fileUri ? "#fff" : "#ccc"}
            />
          </TouchableOpacity>
        </View>
      );
    }

    return (
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
          style={[
            styles.sendButton, 
            (!inputText.trim() && !fileUri) && styles.sendButtonDisabled
          ]}
          onPress={handleSendMessage}
          disabled={!inputText.trim() && !fileUri}
        >
          <MaterialIcons
            name="send"
            size={20}
            color={(inputText.trim() || fileUri) ? "#fff" : "#ccc"}
          />
        </TouchableOpacity>
      </View>
    );
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
            <View style={styles.previewHeader}>
              <Text style={styles.previewText}>Preview:</Text>
              <TouchableOpacity onPress={clearAttachment} style={styles.removeButton}>
                <MaterialIcons name="close" size={16} color="#666" />
              </TouchableOpacity>
            </View>
            
            {fileType === 'image' ? (
              <Image
                source={{ uri: fileUri }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.documentPreviewContainer}>
                <MaterialIcons name="insert-drive-file" size={32} color="#666" />
                <Text style={styles.documentPreview}>Document attached</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {!isWideScreen && showModeToggle && onModeChange && (
        <ModeToggle
          chatMode={chatMode}
          onModeChange={onModeChange}
          languageCode={languageCode}
          isWideScreen={isWideScreen}
        />
      )}

      {renderInputSection()}

      <UploadModal
        visible={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onImagePicked={handleImagePicked}
        onDocumentPicked={handleDocumentPicked}
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
  previewContainer: {
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  previewText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  removeButton: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    alignSelf: 'center',
  },
  documentPreviewContainer: {
    alignItems: 'center',
    padding: 16,
  },
  documentPreview: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
  voiceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  voiceButton: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  voiceButtonActive: {
    backgroundColor: '#EF4444',
  },
});

export default ChatSection;
