
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface HeaderProps {
  toggleSound: () => void;
  showLanguageModal: () => void;
  showHelpModal: () => void;
  soundEnabled: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleSound, 
  showLanguageModal, 
  showHelpModal, 
  soundEnabled 
}) => {
  return (
    <View style={styles.header}>
      <Image 
        source={require('../assets/images/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      
      <View style={styles.headerButtons}>
        {/* Sound Toggle */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={toggleSound}
        >
          <MaterialIcons 
            name={soundEnabled ? "volume-up" : "volume-off"} 
            size={24} 
            color="#333" 
          />
        </TouchableOpacity>
        
        {/* Language Button */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={showLanguageModal}
        >
          <MaterialIcons name="language" size={24} color="#333" />
        </TouchableOpacity>
        
        {/* Help Button */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={showHelpModal}
        >
          <MaterialIcons name="help" size={24} color="#333" />
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

export default Header;
