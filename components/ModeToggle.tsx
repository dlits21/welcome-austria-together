
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAssistantText } from '../utils/languageUtils';

interface ModeToggleProps {
  chatMode: 'text' | 'voice';
  onModeChange: (mode: 'text' | 'voice') => void;
  languageCode: string;
  isWideScreen: boolean;
}

const ModeToggle: React.FC<ModeToggleProps> = ({
  chatMode,
  onModeChange,
  languageCode,
  isWideScreen,
}) => {
  const containerStyle = isWideScreen ? styles.modeToggle : styles.mobileModeToggle;
  const buttonStyle = isWideScreen ? styles.modeButton : styles.mobileModeButton;
  const activeButtonStyle = isWideScreen ? styles.activeModeButton : styles.activeMobileModeButton;
  const textStyle = isWideScreen ? styles.modeText : styles.mobileModeButtonText;
  const activeTextStyle = isWideScreen ? styles.activeModeText : styles.activeMobileModeButtonText;
  const iconSize = isWideScreen ? 20 : 16;

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={[buttonStyle, chatMode === 'text' && activeButtonStyle]}
        onPress={() => onModeChange('text')}
      >
        <MaterialIcons name="chat" size={iconSize} color={chatMode === 'text' ? '#fff' : '#666'} />
        <Text style={[textStyle, chatMode === 'text' && activeTextStyle]}>
          {getAssistantText('chat', languageCode)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[buttonStyle, chatMode === 'voice' && activeButtonStyle]}
        onPress={() => onModeChange('voice')}
      >
        <MaterialIcons name="mic" size={iconSize} color={chatMode === 'voice' ? '#fff' : '#666'} />
        <Text style={[textStyle, chatMode === 'voice' && activeTextStyle]}>
          {getAssistantText('talk', languageCode)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  mobileModeToggle: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 4,
    alignSelf: 'center',
    width: '70%',
    marginHorizontal: 16,
    marginVertical: 12,
  },
  mobileModeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  activeMobileModeButton: {
    backgroundColor: '#3B82F6',
  },
  mobileModeButtonText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeMobileModeButtonText: {
    color: '#fff',
  },
});

export default ModeToggle;
