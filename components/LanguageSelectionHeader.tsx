
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface LanguageSelectionHeaderProps {
  currentWelcomeMessage: string;
  setShowInfo: (show: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  showVirtualAssistant: () => void;
  showTutorial: () => void;
}

const LanguageSelectionHeader: React.FC<LanguageSelectionHeaderProps> = ({
  currentWelcomeMessage,
  setShowInfo,
  soundEnabled,
  setSoundEnabled,
  showVirtualAssistant,
  showTutorial
}) => {
  return (
    <View style={styles.header}>
      <Image 
        source={require('../assets/images/icon simple.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      
      <View style={styles.headerButtons}>
        {/* Tutorial Button - now left-most */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={showTutorial}
        >
          <MaterialIcons 
            name="help" 
            size={24} 
            color="#333" 
          />
        </TouchableOpacity>

        {/* Virtual Assistant Toggle - now right-most */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={showVirtualAssistant}
        >
          <MaterialIcons 
            name="record-voice-over" 
            size={24} 
            color="#333" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    width: 80,
    height: 40,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
  },
});

export default LanguageSelectionHeader;
