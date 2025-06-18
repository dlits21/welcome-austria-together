
import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import VirtualAssistantAvatar from './VirtualAssistantAvatar';
import ModeToggle from './ModeToggle';
import ChatSection from './ChatSection';

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

  const { width } = Dimensions.get('window');
  const isWideScreen = width >= 768;

  useEffect(() => {
    if (visible) {
      setChatMode(defaultMode);
      console.log('Rendering');
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
      } else {
        const newMessages = [welcomeMessage];
        setMessages(newMessages);
      }
    }
  }, [visible, initialMessage, languageCode, defaultMode]);

  const handleInputChange = useCallback((text: string) => {
    console.log('Rendering2');
    setInputText(text);
  }, []);

  const sendMessage = useCallback(() => {
    console.log('Rendering3');
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputText('');

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
  }, [inputText, languageCode]);

  const toggleVoiceMode = useCallback(() => {
    setIsListening(!isListening);
  }, [isListening]);

  const handleModeChange = useCallback((mode: 'text' | 'voice') => {
    setChatMode(mode);
  }, []);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
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

        <View style={[styles.mainContent, isWideScreen && styles.mainContentWide]}>
          {isWideScreen ? (
            <>
              <View style={styles.assistantSection}>
                <VirtualAssistantAvatar 
                  languageCode={languageCode}
                  isWideScreen={isWideScreen}
                />
                <ModeToggle
                  chatMode={chatMode}
                  onModeChange={handleModeChange}
                  languageCode={languageCode}
                  isWideScreen={isWideScreen}
                />
              </View>
              <ChatSection
                messages={messages}
                inputText={inputText}
                onInputChange={handleInputChange}
                onSendMessage={sendMessage}
                chatMode={chatMode}
                isListening={isListening}
                onToggleVoice={toggleVoiceMode}
                languageCode={languageCode}
                isWideScreen={isWideScreen}
              />
            </>
          ) : (
            <View style={styles.mobileLayout}>
              <View style={styles.mobileTopContainer}>
                <VirtualAssistantAvatar 
                  languageCode={languageCode}
                  isWideScreen={isWideScreen}
                />
                <ModeToggle
                  chatMode={chatMode}
                  onModeChange={handleModeChange}
                  languageCode={languageCode}
                  isWideScreen={isWideScreen}
                />
              </View>
              <ChatSection
                messages={messages}
                inputText={inputText}
                onInputChange={handleInputChange}
                onSendMessage={sendMessage}
                chatMode={chatMode}
                isListening={isListening}
                onToggleVoice={toggleVoiceMode}
                languageCode={languageCode}
                isWideScreen={isWideScreen}
              />
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
  mobileLayout: {
    flex: 1,
  },
  mobileTopContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default VirtualAssistantModal;
