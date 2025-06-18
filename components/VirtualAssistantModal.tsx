
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface VirtualAssistantModalProps {
  visible: boolean;
  onClose: () => void;
  languageCode: string;
}

const VirtualAssistantModal: React.FC<VirtualAssistantModalProps> = ({
  visible,
  onClose,
  languageCode,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: languageCode === 'de' 
        ? 'Hallo! Ich bin dein virtueller Assistent. Wie kann ich dir helfen?' 
        : 'Hello! I\'m your virtual assistant. How can I help you?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newMessage]);
      setInputText('');

      // Simulate assistant response (void logic for now)
      setTimeout(() => {
        const assistantResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: languageCode === 'de' 
            ? 'Das ist eine interessante Frage! Ich arbeite noch daran, dir besser helfen zu können.' 
            : 'That\'s an interesting question! I\'m still learning to help you better.',
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantResponse]);
      }, 1000);
    }
  };

  const ChatBubble = ({ message }: { message: Message }) => (
    <View style={[
      styles.messageContainer,
      message.isUser ? styles.userMessageContainer : styles.assistantMessageContainer
    ]}>
      {!message.isUser && (
        <View style={styles.characterAvatar}>
          <Text style={styles.characterEmoji}>🤖</Text>
        </View>
      )}
      
      <View style={[
        styles.messageBubble,
        message.isUser ? styles.userBubble : styles.assistantBubble
      ]}>
        <Text style={[
          styles.messageText,
          message.isUser ? styles.userMessageText : styles.assistantMessageText
        ]}>
          {message.text}
        </Text>
      </View>
      
      {message.isUser && (
        <View style={styles.userAvatar}>
          <MaterialIcons name="person" size={20} color="#fff" />
        </View>
      )}
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#333" />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <View style={styles.headerAvatar}>
              <Text style={styles.headerEmoji}>🤖</Text>
            </View>
            <Text style={styles.headerTitle}>
              {languageCode === 'de' ? 'Virtueller Assistent' : 'Virtual Assistant'}
            </Text>
          </View>
          
          <View style={styles.placeholder} />
        </View>

        {/* Chat Area */}
        <KeyboardAvoidingView 
          style={styles.chatContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView 
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
          </ScrollView>

          {/* Input Area */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder={
                languageCode === 'de' 
                  ? 'Schreibe eine Nachricht...' 
                  : 'Type a message...'
              }
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !inputText.trim() && styles.sendButtonDisabled
              ]}
              onPress={sendMessage}
              disabled={!inputText.trim()}
            >
              <MaterialIcons 
                name="send" 
                size={20} 
                color={inputText.trim() ? "#fff" : "#ccc"} 
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  closeButton: {
    padding: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerEmoji: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  assistantMessageContainer: {
    justifyContent: 'flex-start',
  },
  characterAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  characterEmoji: {
    fontSize: 16,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
  },
  assistantMessageText: {
    color: '#333',
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

export default VirtualAssistantModal;
