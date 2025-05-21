
import React, { useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Animated, 
  Dimensions 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getYes, getNo } from '../data/languages/common'

interface LanguageConfirmationProps {
  selectedLanguage: any;
  closeLanguageDetail: () => void;
  confirmLanguage: (code: string) => void;
  animatedScale: Animated.Value;
  countdownProgress: Animated.Value;
  confirmationMessages: Record<string, string>;
}

const LanguageConfirmation: React.FC<LanguageConfirmationProps> = ({
  selectedLanguage,
  closeLanguageDetail,
  confirmLanguage,
  animatedScale,
  countdownProgress,
  confirmationMessages
}) => {
  if (!selectedLanguage) return null;

  return (
    <Animated.View 
      style={[
        styles.modalView,
        {
          transform: [{ scale: animatedScale }],
        }
      ]}
    >
      <TouchableOpacity 
        style={styles.backButton}
        onPress={closeLanguageDetail}
      >
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      
      <View style={styles.languageDetail}>
        <View style={{ width: '30%', aspectRatio:1, marginBottom: 10 }}>
          <selectedLanguage.flag props={styles.languageFlag}/>
        </View>
        <Text style={styles.detailText}>
          {confirmationMessages[selectedLanguage.code] || confirmationMessages.en}
        </Text>
        
        {/* Yes/No Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.noButton}
            onPress={closeLanguageDetail}
          >
            <Text style={styles.noButtonText}>
              {getNo(selectedLanguage.code)}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.yesButton}
            onPress={() => confirmLanguage(selectedLanguage.code)}
          >
            <Text style={styles.yesButtonText}>
              {getYes(selectedLanguage.code)}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Countdown bar */}
        <View style={styles.countdownContainer}>
          <Animated.View 
            style={[
              styles.countdownBar,
              {
                width: countdownProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              }
            ]}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: '70%',
    maxHeight: '70%',
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  languageDetail: {
    width: "100%",
    alignItems: "center",
  },
  languageFlag: {
    width: "10%",
    height: "10%",
    marginBottom: 10,
    borderRadius: 30,
  },
  detailText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 15,
  },
  yesButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  yesButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  noButton: {
    backgroundColor: "#f44336",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  noButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  countdownContainer: {
    width: "100%",
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    marginTop: 10,
    overflow: "hidden",
  },
  countdownBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
});

export default LanguageConfirmation;
