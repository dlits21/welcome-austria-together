
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface PageNavigationProps {
  showLanguageModal: () => void;
  showVirtualAssistant: () => void;
  showTutorial: () => void;
  showBackButton?: boolean;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  showLanguageModal,
  showVirtualAssistant,
  showTutorial,
  showBackButton = false
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      )}
      
      <View style={styles.rightButtons}>
        <TouchableOpacity onPress={showVirtualAssistant} style={styles.button}>
          <MaterialIcons name="smart-toy" size={24} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={showLanguageModal} style={styles.button}>
          <MaterialIcons name="language" size={24} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={showTutorial} style={styles.button}>
          <MaterialIcons name="help" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  rightButtons: {
    flexDirection: 'row',
  },
  button: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default PageNavigation;
