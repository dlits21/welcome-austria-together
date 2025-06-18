
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface VirtualAssistantAvatarProps {
  languageCode: string;
  isWideScreen: boolean;
}

const VirtualAssistantAvatar: React.FC<VirtualAssistantAvatarProps> = ({
  languageCode,
  isWideScreen,
}) => {
  if (isWideScreen) {
    return (
      <View style={styles.avatarContainer}>
        <View style={styles.largeAvatarContainer}>
          <Image
            source={require('../assets/images/assistant.jpg')}
            style={styles.assistantImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.avatarTitle}>
          {languageCode === 'de' ? 'Virtueller Assistent' : 'Virtual Assistant'}
        </Text>
        <Text style={styles.avatarSubtitle}>
          {languageCode === 'de'
            ? 'Ich bin hier, um Ihnen zu helfen!'
            : 'I\'m here to help you!'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.mobileTopSection}>
      <View style={styles.mobileAssistantContainer}>
        <Image
          source={require('../assets/images/assistant.jpg')}
          style={styles.mobileAssistantImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.mobileRightSection}>
        <Text style={styles.mobileTitle}>
          {languageCode === 'de' ? 'Virtueller Assistent' : 'Virtual Assistant'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  largeAvatarContainer: {
    width: 300,
    height: 300,
    marginBottom: 24,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  assistantImage: {
    width: '100%',
    height: '100%',
  },
  avatarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  avatarSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  mobileTopSection: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  mobileAssistantContainer: {
    marginRight: 16,
  },
  mobileAssistantImage: {
    width: 100,
    height: 100,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  mobileRightSection: {
    flex: 1,
  },
  mobileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
});

export default VirtualAssistantAvatar;
