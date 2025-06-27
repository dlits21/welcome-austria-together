
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface PageNavigationProps {
  toggleSound: () => void;
  soundEnabled: boolean;
  showLanguageModal: () => void;
  showHelpModal: () => void;
  showVirtualAssistant: () => void;
  showTutorial?: () => void;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  toggleSound,
  soundEnabled,
  showLanguageModal,
  showHelpModal,
  showVirtualAssistant,
  showTutorial
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleSound} style={styles.button}>
        <MaterialIcons 
          name={soundEnabled ? 'volume-up' : 'volume-off'} 
          size={24} 
          color="#333" 
        />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={showLanguageModal} style={styles.button}>
        <MaterialIcons name="language" size={24} color="#333" />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={showHelpModal} style={styles.button}>
        <MaterialIcons name="help" size={24} color="#333" />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={showVirtualAssistant} style={styles.button}>
        <MaterialIcons name="smart-toy" size={24} color="#333" />
      </TouchableOpacity>

      {showTutorial && (
        <TouchableOpacity onPress={showTutorial} style={styles.button}>
          <MaterialIcons name="school" size={24} color="#333" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  button: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default PageNavigation;
