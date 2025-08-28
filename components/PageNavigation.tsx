import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface PageNavigationProps {
  showLanguageModal: () => void;
  showVirtualAssistant: () => void;
  showTutorial: () => void;
  showBackButton?: boolean;
  title?: string; // New optional title prop
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  showLanguageModal,
  showVirtualAssistant,
  showTutorial,
  showBackButton = true,
  title,
}) => {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Left: Back button */}
      {showBackButton ? (
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButtonPlaceholder} />
      )}

      {/* Center: Title */}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {/* Right buttons */}
      <View style={styles.rightButtons}>
        <TouchableOpacity onPress={showVirtualAssistant} style={styles.button}>
          <MaterialIcons name="record-voice-over" size={24} color="#333" />
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
    alignItems: 'center',
    justifyContent: 'space-between',
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
  backButtonPlaceholder: {
    width: 40, // same width as back button for alignment when no back button
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    paddingHorizontal: 8,
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
