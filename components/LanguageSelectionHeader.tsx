
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface LanguageSelectionHeaderProps {
  currentWelcomeMessage: string;
  setShowInfo: (show: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const LanguageSelectionHeader: React.FC<LanguageSelectionHeaderProps> = ({
  currentWelcomeMessage,
  setShowInfo,
  soundEnabled,
  setSoundEnabled
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{currentWelcomeMessage}</Text>
      <Text style={styles.subtitle}>Please choose your preferred language</Text>
      
      {/* Top right buttons */}
      <View style={styles.topRightButtons}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => setShowInfo(true)}
        >
          <MaterialIcons name="help" size={Dimensions.get('window').width / 25} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => setSoundEnabled(!soundEnabled)}
        >
          <MaterialIcons 
            name={soundEnabled ? "volume-up" : "volume-off"} 
            size={Dimensions.get('window').width / 25}
            color="#333" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: "center",
    position: "relative",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    width: "60%"
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  topRightButtons: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
  },
  iconButton: {
    padding: 10,
    marginLeft: 10,
  },
});

export default LanguageSelectionHeader;
