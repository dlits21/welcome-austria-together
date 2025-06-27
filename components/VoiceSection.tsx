import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAssistantText } from '../utils/languageUtils';

interface VoiceSectionProps {
  isListening: boolean;
  onToggleVoice: () => void;
  languageCode: string;
  isWideScreen: boolean;
}

const VoiceSection: React.FC<VoiceSectionProps> = ({
  isListening,
  onToggleVoice,
  languageCode,
  isWideScreen,
}) => {
  if (isWideScreen) {
    return (
      <View style={styles.webVoiceContainer}>
        <TouchableOpacity
          style={[styles.webVoiceButton, isListening && styles.webVoiceButtonActive]}
          onPress={onToggleVoice}
        >
          <MaterialIcons
            name={isListening ? "mic" : "mic-none"}
            size={24}
            color="#fff"
          />
          <Text style={styles.webVoiceButtonText}>
            {isListening
              ? getAssistantText('listening', languageCode)
              : getAssistantText('pressToTalk', languageCode)
            }
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.voiceSection}>
      <TouchableOpacity
        style={[styles.mobileVoiceButton, isListening && styles.mobileVoiceButtonActive]}
        onPress={onToggleVoice}
      >
        <MaterialIcons
          name={isListening ? "mic" : "mic-none"}
          size={32}
          color="#fff"
        />
      </TouchableOpacity>
      <Text style={styles.voiceInstructions}>
        {isListening
          ? getAssistantText('listening', languageCode)
          : getAssistantText('tapToTalk', languageCode)
        }
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  webVoiceContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webVoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
  },
  webVoiceButtonActive: {
    backgroundColor: '#EF4444',
  },
  webVoiceButtonText: {
    color: '#fff',
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
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

export default VoiceSection;
