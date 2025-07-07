
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GermanFlag } from '../Flags';

interface ConfirmationSlideProps {
  slide: any;
  languageCode: string;
  isWideScreen: boolean;
}

const ConfirmationSlide: React.FC<ConfirmationSlideProps> = ({ 
  slide, 
  languageCode, 
  isWideScreen 
}) => {
  return (
    <View style={[styles.slideContent, isWideScreen && styles.slideContentWide]}>
      <View style={[styles.confirmationDemo, isWideScreen && styles.confirmationDemoWide]}>
        <View style={styles.mockConfirmationWindow}>
          <View style={styles.mockHeader}>
            <GermanFlag style={styles.mockFlag} />
            <Text style={styles.mockTitle}>Deutsch</Text>
          </View>
          <Text style={styles.mockMessage}>
            Verstehst du Deutsch?{'\n'}Diese App wird ab jetzt auf Deutsch sein.{'\n'}Du kannst das später ändern.
          </Text>
          <View style={styles.mockButtons}>
            <View style={[styles.mockButton, styles.mockDeclineButton]}>
              <Text style={styles.mockButtonText}>Nein</Text>
            </View>
            <View style={[styles.mockButton, styles.mockAcceptButton]}>
              <Text style={styles.mockButtonTextWhite}>Ja</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.slideInfo, isWideScreen && styles.slideInfoWide]}>
        <Text style={[styles.slideTitle, isWideScreen && styles.slideTitleWide]}>
          {slide.title[languageCode] || slide.title.en}
        </Text>
        <Text style={[styles.slideText, isWideScreen && styles.slideTextWide]}>
          {slide.text[languageCode] || slide.text.en}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slideContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  slideContentWide: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 0,
    minHeight: 500,
    padding: 16,
  },
  confirmationDemo: {
    alignItems: 'center',
    marginBottom: 32,
    justifyContent: 'center',
    flex: 0.6,
  },
  confirmationDemoWide: {
    flex: 1,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
    maxWidth: '50%',
  },
  mockConfirmationWindow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  mockHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  mockFlag: {
    width: 40,
    height: 24,
    borderRadius: 4,
    marginBottom: 8,
  },
  mockTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  mockMessage: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  mockButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  mockButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  mockDeclineButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  mockAcceptButton: {
    backgroundColor: '#10B981',
  },
  mockButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  mockButtonTextWhite: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  slideInfo: {
    flex: 0.4,
    justifyContent: 'center',
  },
  slideInfoWide: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
    maxWidth: '50%',
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  slideTitleWide: {
    textAlign: 'left',
    fontSize: 26,
  },
  slideText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    textAlign: 'center',
  },
  slideTextWide: {
    textAlign: 'left',
    fontSize: 17,
    lineHeight: 25,
  },
});

export default ConfirmationSlide;
