
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ChatBubble from './ChatBubble';
import VoiceSection from './VoiceSection';
import { getAssistantText } from '../utils/languageUtils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
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
}) => {
  const handleFileUpload = () => {
    Alert.alert(
      getAssistantText('uploadOptions', languageCode),
      '',
      [
        {
          text: getAssistantText('camera', languageCode),
          onPress: () => {
            // TODO: Implement camera functionality
            console.log('Camera selected');
          }
        },
        {
          text: getAssistantText('gallery', languageCode),
          onPress: () => {
            // TODO: Implement gallery functionality
            console.log('Gallery selected');
          }
        },
        {
          text: getAssistantText('cancel', languageCode),
          style: 'cancel'
        }
      ]
    );
  };

  if (chatMode === 'voice') {
    return (
      <VoiceSection
        isListening={isListening}
        onToggleVoice={onToggleVoice}
        languageCode={languageCode}
        isWideScreen={isWideScreen}
      />
    );
  }

  return (
    <View style={[styles.chatContainer, isWideScreen && styles.chatContainerWide]}>
      <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.fileButton} onPress={handleFileUpload}>
          <MaterialIcons name="more-horiz" size={24} color="#666" />
        </TouchableOpacity>
        
        <TextInput
          style={[styles.textInput, isWideScreen && styles.textInputWide]}
          value={inputText}
          onChangeText={onInputChange}
          placeholder={getAssistantText('typeMessage', languageCode)}
          multiline
          maxLength={500}
        />
        
        <TouchableOpacity 
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]} 
          onPress={onSendMessage}
          disabled={!inputText.trim()}
        >
          <MaterialIcons name="send" size={24} color={inputText.trim() ? '#3B82F6' : '#ccc'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainerWide: {
    flex: 2,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  fileButton: {
    padding: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  textInputWide: {
    fontSize: 14,
  },
  sendButton: {
    padding: 8,
    marginBottom: 4,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default ChatSection;
