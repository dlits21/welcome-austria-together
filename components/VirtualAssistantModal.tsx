

import React, { useState, useEffect, useRef } from 'react';
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
  Dimensions,
  Image,
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
  initialMessage?: string;
  defaultMode?: 'text' | 'voice';
}

// Global message store to persist messages across modal opens/closes
let globalMessages: Message[] = [];

const VirtualAssistantModal: React.FC<VirtualAssistantModalProps> = ({
  visible,
  onClose,
  languageCode,
  initialMessage,
  defaultMode = 'text',
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [chatMode, setChatMode] = useState<'text' | 'voice'>(defaultMode);
  const textInputRef = useRef<TextInput>(null);
  
  const { width } = Dimensions.get('window');
  const isWideScreen = width >= 768;

  // Initialize messages when modal opens
  useEffect(() => {
    if (visible) {
      // Set default mode based on prop
      setChatMode(defaultMode);
      
      // If we have persisted messages, use them
      if (globalMessages.length > 0) {
        setMessages(globalMessages);
        return;
      }

      const welcomeMessage: Message = {
        id: '1',
        text: languageCode === 'de' 
          ? 'Hallo! Ich bin dein virtueller Assistent. Wie kann ich dir helfen?' 
          : 'Hello! I\'m your virtual assistant. How can I help you?',
        isUser: false,
        timestamp: new Date(),
      };

      if (initialMessage) {
        const userMessage: Message = {
          id: '2',
          text: initialMessage,
          isUser: true,
          timestamp: new Date(),
        };
        
        const assistantResponse: Message = {
          id: '3',
          text: languageCode === 'de' 
            ? `Du hast nach "${initialMessage}" gesucht. Das ist eine interessante Frage! Ich arbeite noch daran, dir besser helfen zu können.`
            : `You searched for "${initialMessage}". That's an interesting question! I'm still learning to help you better.`,
          isUser: false,
          timestamp: new Date(),
        };

        const newMessages = [welcomeMessage, userMessage, assistantResponse];
        setMessages(newMessages);
        globalMessages = newMessages;
      } else {
        const newMessages = [welcomeMessage];
        setMessages(newMessages);
        globalMessages = newMessages;
      }
    }
  }, [visible, initialMessage, languageCode, defaultMode]);

  // Update global messages when local messages change
  useEffect(() => {
    globalMessages = messages;
  }, [messages]);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };

      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      setInputText('');

      // Simulate assistant response
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

  const toggleVoiceMode = () => {
    setIsListening(!isListening);
    // Here you would implement actual voice recognition
  };

  const VirtualAssistantAvatar = () => (
    <View style={styles.avatarContainer}>
      <View style={styles.largeAvatar}>
        <Image 
          source={require('../assets/images/assistant.jpg')}
          style={styles.assistantImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.avatarTitle}>
        {languageCode === 'de' ? 'Virtueller Assistent' : 'Virtual Assistant'}
      </Text>
      <Text style={styles.avatarSubtitle}>
        {languageCode === 'de' 
          ? 'Ich bin hier, um Ihnen zu helfen!' 
          : 'I\'m here to help you!'}
      </Text>
      
      {/* Chat/Voice Mode Toggle */}
      <View style={styles.modeToggle}>
        <TouchableOpacity
          style={[styles.modeButton, chatMode === 'text' && styles.activeModeButton]}
          onPress={() => setChatMode('text')}
        >
          <MaterialIcons name="chat" size={20} color={chatMode === 'text' ? '#fff' : '#666'} />
          <Text style={[styles.modeText, chatMode === 'text' && styles.activeModeText]}>
            {languageCode === 'de' ? 'Chat' : 'Chat'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.modeButton, chatMode === 'voice' && styles.activeModeButton]}
          onPress={() => setChatMode('voice')}
        >
          <MaterialIcons name="mic" size={20} color={chatMode === 'voice' ? '#fff' : '#666'} />
          <Text style={[styles.modeText, chatMode === 'voice' && styles.activeModeText]}>
            {languageCode === 'de' ? 'Sprechen' : 'Talk'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {chatMode === 'voice' && (
        <TouchableOpacity
          style={[styles.voiceButton, isListening && styles.voiceButtonActive]}
          onPress={toggleVoiceMode}
        >
          <MaterialIcons 
            name={isListening ? "mic" : "mic-none"} 
            size={24} 
            color="#fff" 
          />
          <Text style={styles.voiceButtonText}>
            {isListening 
              ? (languageCode === 'de' ? 'Höre zu...' : 'Listening...')
              : (languageCode === 'de' ? 'Tippen zum Sprechen' : 'Tap to Talk')
            }
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // Mobile top section with assistant image and toggle
  const MobileTopSection = () => (
    <View style={styles.mobileTopSection}>
      <View style={styles.mobileAssistantContainer}>
        <Image 
          source={require('../assets/images/assistant.jpg')}
          style={styles.mobileAssistantImage}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.mobileRightSection}>
        <Text style={styles.mobileTitle}>
          {languageCode === 'de' ? 'Virtueller Assistent' : 'Virtual Assistant'}
        </Text>
        
        {/* Mobile Mode Toggle */}
        <View style={styles.mobileModeToggle}>
          <TouchableOpacity
            style={[styles.mobileModeButton, chatMode === 'text' && styles.activeMobileModeButton]}
            onPress={() => setChatMode('text')}
          >
            <MaterialIcons name="chat" size={18} color={chatMode === 'text' ? '#fff' : '#666'} />
            <Text style={[styles.mobileModeButtonText, chatMode === 'text' && styles.activeMobileModeButtonText]}>
              {languageCode === 'de' ? 'Chat' : 'Chat'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.mobileModeButton, chatMode === 'voice' && styles.activeMobileModeButton]}
            onPress={() => setChatMode('voice')}
          >
            <MaterialIcons name="mic" size={18} color={chatMode === 'voice' ? '#fff' : '#666'} />
            <Text style={[styles.mobileModeButtonText, chatMode === 'voice' && styles.activeMobileModeButtonText]}>
              {languageCode === 'de' ? 'Sprechen' : 'Talk'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const ChatBubble = ({ message }: { message: Message }) => (
    <View style={[
      styles.messageContainer,
      message.isUser ? styles.userMessageContainer : styles.assistantMessageContainer
    ]}>
      {!message.isUser && (
        <View style={styles.characterAvatar}>
          <Image 
            source={require('../assets/images/assistant.jpg')}
            style={styles.avatarImage}
            resizeMode="cover"
          />
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

  const ChatSection = () => (
    <KeyboardAvoidingView 
      style={[styles.chatSection, isWideScreen && styles.chatSectionWide]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </ScrollView>

      {chatMode === 'text' && (
        <View style={[styles.inputContainer, !isWideScreen && styles.mobileInputContainer]}>
          <TextInput
            ref={textInputRef}
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
            returnKeyType="send"
            onSubmitEditing={sendMessage}
            blurOnSubmit={false}
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
      )}

      {chatMode === 'voice' && !isWideScreen && (
        <View style={styles.voiceSection}>
          <TouchableOpacity
            style={[styles.mobileVoiceButton, isListening && styles.mobileVoiceButtonActive]}
            onPress={toggleVoiceMode}
          >
            <MaterialIcons 
              name={isListening ? "mic" : "mic-none"} 
              size={32} 
              color="#fff" 
            />
          </TouchableOpacity>
          <Text style={styles.voiceInstructions}>
            {isListening 
              ? (languageCode === 'de' ? 'Höre zu...' : 'Listening...')
              : (languageCode === 'de' ? 'Tippen zum Sprechen' : 'Tap to Talk')
            }
          </Text>
        </View>
      )}
    </KeyboardAvoidingView>
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
          
          {!isWideScreen && (
            <View style={styles.headerContent}>
              <View style={styles.headerAvatar}>
                <Image 
                  source={require('../assets/images/assistant.jpg')}
                  style={styles.headerAvatarImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.headerTitle}>
                {languageCode === 'de' ? 'Virtueller Assistent' : 'Virtual Assistant'}
              </Text>
            </View>
          )}
          
          <View style={styles.placeholder} />
        </View>

        {/* Main Content */}
        <View style={[styles.mainContent, isWideScreen && styles.mainContentWide]}>
          {isWideScreen ? (
            <>
              <View style={styles.assistantSection}>
                <VirtualAssistantAvatar />
              </View>
              <ChatSection />
            </>
          ) : (
            <View style={styles.mobileLayout}>
              <MobileTopSection />
              <ChatSection />
            </View>
          )}
        </View>
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
    overflow: 'hidden',
  },
  headerAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  mainContent: {
    flex: 1,
  },
  mainContentWide: {
    flexDirection: 'row',
  },
  assistantSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  avatarContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  largeAvatar: {
    width: 300,
    height: 400,
    marginBottom: 24,
    borderRadius: 16,
  },
  assistantImage: {
    width: '100%',
    height: '100%',
  },
  avatarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  avatarSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 4,
    marginBottom: 24,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeModeButton: {
    backgroundColor: '#3B82F6',
  },
  modeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  activeModeText: {
    color: '#fff',
  },
  voiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  voiceButtonActive: {
    backgroundColor: '#EF4444',
  },
  voiceButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  // Mobile layout styles
  mobileLayout: {
    flex: 1,
  },
  mobileTopSection: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  mobileAssistantContainer: {
    marginRight: 16,
  },
  mobileAssistantImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  mobileRightSection: {
    flex: 1,
  },
  mobileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  mobileModeToggle: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 3,
    alignSelf: 'flex-start',
  },
  mobileModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeMobileModeButton: {
    backgroundColor: '#3B82F6',
  },
  mobileModeButtonText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  activeMobileModeButtonText: {
    color: '#fff',
  },
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
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
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
  mobileInputContainer: {
    paddingBottom: 20,
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
  voiceSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  mobileVoiceButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  mobileVoiceButtonActive: {
    backgroundColor: '#EF4444',
  },
  voiceInstructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default VirtualAssistantModal;

