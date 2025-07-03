import React, { useRef, useState, useEffect } from 'react';
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
  attachments?: Array<{
    uri: string;
    type: 'image' | 'document';
  }>;
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
  const [attachments, setAttachments] = useState<Array<{
    uri: string;
    type: 'image' | 'document';
  }>>([]);
  const [inputHeight, setInputHeight] = useState(40);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleImagePicked = (uri: string) => {
    setAttachments(prev => [...prev, { uri, type: 'image' }]);
  };

  const handleDocumentPicked = (uri: string) => {
    setAttachments(prev => [...prev, { uri, type: 'document' }]);
  };

  const handleSendMessage = () => {
    if (attachments.length > 0 || inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim() || (attachments.length > 0 ? `${attachments.length} file(s) attached` : ''),
        isUser: true,
        timestamp: new Date(),
        attachments: attachments.length > 0 ? attachments : undefined,
      };
      onSendMessage(newMessage);
      setAttachments([]);
      onInputChange('');
      setInputHeight(40);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleContentSizeChange = (event: any) => {
    const { height } = event.nativeEvent.contentSize;
    const newHeight = Math.min(Math.max(height, 40), 100);
    setInputHeight(newHeight);
  };

  const renderInputSection = () => {
    if (chatMode === 'voice') {
      return (
        <View style={styles.inputContainer}>
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
              (attachments.length === 0) && styles.sendButtonDisabled
            ]}
            onPress={handleSendMessage}
            disabled={attachments.length === 0}
          >
            <MaterialIcons
              name="send"
              size={20}
              color={attachments.length > 0 ? "#fff" : "#ccc"}
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

        <View style={styles.textInputContainer}>
          {attachments.length > 0 && (
            <View style={styles.attachmentsContainer}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.attachmentsScrollView}
              >
                {attachments.map((attachment, index) => (
                  <View key={index} style={styles.attachmentItem}>
                    <TouchableOpacity 
                      onPress={() => removeAttachment(index)} 
                      style={styles.removeAttachmentButton}
                    >
                      <MaterialIcons name="close" size={16} color="#666" />
                    </TouchableOpacity>
                    
                    {attachment.type === 'image' ? (
                      <Image
                        source={{ uri: attachment.uri }}
                        style={styles.attachmentImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.attachmentDocument}>
                        <MaterialIcons name="insert-drive-file" size={20} color="#666" />
                        <Text style={styles.documentText}>Doc</Text>
                      </View>
                    )}
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
          
          <TextInput
            ref={textInputRef}
            style={[
              styles.textInput,
              { height: inputHeight },
              attachments.length > 0 && styles.textInputWithAttachments
            ]}
            value={inputText}
            onChangeText={onInputChange}
            onContentSizeChange={handleContentSizeChange}
            placeholder={
              languageCode === 'de' ? 'Schreibe eine Nachricht...' : 'Type a message...'
            }
            maxLength={500}
            returnKeyType="send"
            onSubmitEditing={handleSendMessage}
            blurOnSubmit={false}
            autoCorrect={false}
            autoCapitalize="sentences"
            multiline
          />
        </View>
        
        <TouchableOpacity
          style={[
            styles.sendButton, 
            (!inputText.trim() && attachments.length === 0) && styles.sendButtonDisabled
          ]}
          onPress={handleSendMessage}
          disabled={!inputText.trim() && attachments.length === 0}
        >
          <MaterialIcons
            name="send"
            size={20}
            color={(inputText.trim() || attachments.length > 0) ? "#fff" : "#ccc"}
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
        onContentSizeChange={() => {
          setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }}
      >
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} avatar={avatar} />
        ))}
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
  textInputContainer: {
    flex: 1,
    marginRight: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  textInputWithAttachments: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: 0,
  },
  attachmentsContainer: {
    backgroundColor: '#f8fafc',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#e0e0e0',
    padding: 8,
  },
  attachmentsScrollView: {
    flexDirection: 'row',
  },
  attachmentItem: {
    position: 'relative',
    marginRight: 8,
  },
  removeAttachmentButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  attachmentImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  attachmentDocument: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentText: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#f0f0f0',
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
