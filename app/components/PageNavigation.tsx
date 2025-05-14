
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

interface PageNavigationProps {
  toggleSound: () => void;
  soundEnabled: boolean;
  showLanguageModal?: () => void;
  showHelpModal?: () => void;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  toggleSound,
  soundEnabled,
  showLanguageModal,
  showHelpModal
}) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <MaterialIcons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      
      <View style={styles.rightButtons}>
        <TouchableOpacity style={styles.iconButton} onPress={toggleSound}>
          <MaterialIcons
            name={soundEnabled ? "volume-up" : "volume-off"}
            size={24}
            color="#333"
          />
        </TouchableOpacity>
        
        {showLanguageModal && (
          <TouchableOpacity style={styles.iconButton} onPress={showLanguageModal}>
            <MaterialIcons name="language" size={24} color="#333" />
          </TouchableOpacity>
        )}
        
        {showHelpModal && (
          <TouchableOpacity style={styles.iconButton} onPress={showHelpModal}>
            <MaterialIcons name="help" size={24} color="#333" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  rightButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
});

export default PageNavigation;
