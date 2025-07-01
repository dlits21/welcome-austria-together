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
import LanguageModal from './LanguageModal';
import { getAssistantText } from '../utils/languageUtils';
import { languages } from '../data/languages/common';

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

interface AssistantData {
  name: string;
  firstLine: string;
  imagePath: string;
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
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [assistantData, setAssistantData] = useState<AssistantData | null>(null);
  const [assistantGender, setAssistantGender] = useState<'male' | 'female'>('female');

  const { width } = Dimensions.get('window');
  const isWideScreen = width >= 768;

  // Load assistant data based on language and gender
  const loadAssistantData = useCallback(async (lang: string, gender: 'male' | 'female') => {
    try {
      const response = await fetch(`/data/virtualAssistant/${lang}/${gender}.json`);
      if (response.ok) {
        const data = await response.json();
        setAssistantData(data);
      } else {
        // Fallback to English if language not found
        const fallbackResponse = await fetch(`/data/virtualAssistant/en/${gender}.json`);
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          setAssistantData(fallbackData);
        }
      }
    } catch (error) {
      console.error('Failed to load assistant data:', error);
      // Use default data
      setAssistantData({
        name: 'Assistant',
        firstLine: getAssistantText('greeting', lang),
        imagePath: 'assistant.jpg'
      });
    }
  }, []);

  useEffect(() => {
    if (visible) {
      loadAssistantData(languageCode, assistantGender);
    }
  }, [visible, languageCode, assistantGender, loadAssistantData]);

  useEffect(() => {
    if (visible && assistantData) {
      setChatMode(defaultMode);
      console.log('Rendering');
      const welcomeMessage: Message = {
        id: '1',
        text: assistantData.firstLine,
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
          text: getAssistantText('searchResponse', languageCode).replace('{query}', initialMessage),
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
  }, [visible, initialMessage, languageCode, defaultMode, assistantData]);

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
          text: getAssistantText('interestingQuestion', languageCode),
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

  // Get current language flag
  const currentLanguage = languages.find(lang => lang.code === languageCode);
  const languageFlag = currentLanguage?.flag || '🌐';

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
                  source={assistantData ? 
                    { uri: `/assets/images/${assistantData.imagePath}` } : 
                    require('../assets/images/assistant.jpg')
                  }
                  style={styles.headerAvatarImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.headerTitle}>
                {assistantData?.name || getAssistantText('virtualAssistant', languageCode)}
              </Text>
            </View>
          )}

          <TouchableOpacity 
            style={styles.languageButton} 
            onPress={() => setShowLanguageModal(true)}
          >
            <Text style={styles.languageFlag}>{languageFlag}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.mainContent, isWideScreen && styles.mainContentWide]}>
          {isWideScreen ? (
            <>
              <View style={styles.assistantSection}>
                <VirtualAssistantAvatar 
                  languageCode={languageCode}
                  isWideScreen={isWideScreen}
                  assistantData={assistantData}
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
                  assistantData={assistantData}
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

      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        languageCode={languageCode}
      />
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
  languageButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  languageFlag: {
    fontSize: 20,
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
