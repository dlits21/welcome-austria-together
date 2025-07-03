
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
import AvatarSelectionModal from './AvatarSelectionModal';
import { getAssistantText } from '../utils/languageUtils';
import { getCharacterImage } from '../utils/assistantUtils';
import { languages } from '../data/languages/common';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  fileUri?: string;
  fileType?: 'image' | 'document';
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
  languages: string;
  background: string;
}

const fileMap = {
    'de': require('../data/virtualAssistant/fatima.json'), // Abdul (native German speaker)
    'en': require('../data/virtualAssistant/maryam.json'), // Maryam (native English speaker)
    'ru': require('../data/virtualAssistant/nino.json'), // Julia (native Russian speaker)
    'ce': require('../data/virtualAssistant/fatima.json'), // Fatima (native Chechen speaker)
    'fa': require('../data/virtualAssistant/rustam.json'), // Rustam (native Persian speaker)
    'prs': require('../data/virtualAssistant/leila.json'), // Leila (native Pashto speaker)
    'ps': require('../data/virtualAssistant/leila.json'), // Leila (native Pashto speaker)
    'ar': require('../data/virtualAssistant/omar.json'), // Omar (native Arabic speaker)
    'ku': require('../data/virtualAssistant/zainab.json'), // Zainab (native Kurdish speaker)
    'so': require('../data/virtualAssistant/amina.json'), // Amina (native Somali speaker)
    'ka': require('../data/virtualAssistant/nino.json'), // Nino (native Georgian speaker)
    'sq': require('../data/virtualAssistant/arlinda.json'), // Sara (native Albanian speaker)
  };

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
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [assistantData, setAssistantData] = useState<AssistantData | null>(null);

  const { width } = Dimensions.get('window');
  const isWideScreen = width >= 768;

  const loadAssistantData = useCallback(async (lang: string, gender: 'male' | 'female') => {
    try {

      // Try to load the assistant data based on language and gender
      const data = fileMap[lang];

      if (data) {
        console.log('Loaded assistant data:', data);
        setAssistantData(data);
      } else {
        // Fallback to Fatima's data if nothing else is found
        const fallbackData = require('../data/virtualAssistant/fatima.json');
        console.log('Loaded fallback data:', fallbackData);
        setAssistantData(fallbackData);
      }

      console.log('Successfully loaded assistant data:', assistantData);
    } catch (error) {
      console.error('Failed to load assistant data:', error, lang, gender);

      // In case of an error, fall back to Fatima's data
      setAssistantData({
        name: 'Fatima',
        firstLine: 'Hallo! Ich bin Fatima, Ihre virtuelle Assistentin. Womit kann ich Ihnen behilflich sein?',
        imagePath: 'fatima.png',
        languages: 'Chechen, Russian, German',
        background: 'Fatima is from Chechnya and came to Austria as a child. She now works as a healthcare assistant in a Viennese hospital.',
      });
    }
  }, []);

  useEffect(() => {
    if (visible) {
      loadAssistantData(languageCode, 'female');
    }
  }, [visible, languageCode, loadAssistantData]);

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

  const sendMessage = useCallback((message?: Message) => {
    console.log('Rendering3');
    if (message) {
      // Handle file attachment message
      setMessages(prevMessages => [...prevMessages, message]);
      
      setTimeout(() => {
        const assistantResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: message.fileType === 'image' 
            ? getAssistantText('imageReceived', languageCode)
            : getAssistantText('documentReceived', languageCode),
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantResponse]);
      }, 1000);
    } else if (inputText.trim()) {
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

  const handleSelectAssistant = useCallback((assistant: AssistantData) => {
    setAssistantData(assistant);
    // Reset messages with new assistant's welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: assistant.firstLine,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
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
                  source={getCharacterImage(assistantData?.name || 'default')}
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
            style={styles.avatarButton} 
            onPress={() => setShowAvatarModal(true)}
          >
            <MaterialIcons name="people" size={24} color="#333" />
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
                avatar={assistantData?.name || 'fatima'}
              />
            </>
          ) : (
            <View style={styles.mobileLayout}>
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
                avatar={assistantData?.name || 'fatima'}
                showModeToggle={true}
                onModeChange={handleModeChange}
              />
            </View>
          )}
        </View>
      </SafeAreaView>

      <AvatarSelectionModal
        visible={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        onSelectAssistant={handleSelectAssistant}
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
  avatarButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
});

export default VirtualAssistantModal;
