
import React, { useRef } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ChatBubble from './ChatBubble';
import VoiceSection from './VoiceSection';

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
  const textInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

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
          <ChatBubble key={message.id} message={message} />
        ))}
      </ScrollView>

      {isWideScreen ? (
        <View style={styles.inputContainer}>
          {chatMode === 'text' ? (
            <>
              <TextInput
                ref={textInputRef}
                style={styles.textInput}
                value={inputText}
                onChangeText={onInputChange}
                placeholder={
                  languageCode === 'de'
                    ? 'Schreibe eine Nachricht...'
                    : 'Type a message...'
                }
                maxLength={500}
                returnKeyType="send"
                onSubmitEditing={onSendMessage}
                blurOnSubmit={false}
                autoCorrect={false}
                autoCapitalize="sentences"
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !inputText.trim() && styles.sendButtonDisabled
                ]}
                onPress={onSendMessage}
                disabled={!inputText.trim()}
              >
                <MaterialIcons
                  name="send"
                  size={20}
                  color={inputText.trim() ? "#fff" : "#ccc"}
                />
              </TouchableOpacity>
            </>
          ) : (
            <VoiceSection
              isListening={isListening}
              onToggleVoice={onToggleVoice}
              languageCode={languageCode}
              isWideScreen={isWideScreen}
            />
          )}
        </View>
      ) : (
        <>
          {chatMode === 'text' && (
            <View style={[styles.inputContainer, styles.mobileInputContainer]}>
              <TextInput
                ref={textInputRef}
                style={styles.textInput}
                value={inputText}
                onChangeText={onInputChange}
                placeholder={
                  languageCode === 'de'
                    ? 'Schreibe eine Nachricht...'
                    : 'Type a message...'
                }
                maxLength={500}
                returnKeyType="send"
                onSubmitEditing={onSendMessage}
                blurOnSubmit={false}
                autoCorrect={false}
                autoCapitalize="sentences"
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !inputText.trim() && styles.sendButtonDisabled
                ]}
                onPress={onSendMessage}
                disabled={!inputText.trim()}
              >
                <MaterialIcons
                  name="send"
                  size={20}
                  color={inputText.trim() ? "#fff" : "#ccc"}
                />
              </TouchableOpacity>
            </View>
          )}
          {chatMode === 'voice' && (
            <VoiceSection
              isListening={isListening}
              onToggleVoice={onToggleVoice}
              languageCode={languageCode}
              isWideScreen={isWideScreen}
            />
          )}
        </>
      )}
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
  mobileInputContainer: {
    paddingBottom: 30,
    marginBottom: 10,
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
