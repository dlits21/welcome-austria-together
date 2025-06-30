
import React from 'react';
import { 
  StyleSheet, 
  Text,
  View, 
  ScrollView,
  Pressable,
  useWindowDimensions,
} from 'react-native';

interface Language {
  code: string;
  name: string;
  flag: any;
}

interface LanguageSelectionGridProps {
  languages: Language[];
  handleLanguageSelect: (language: Language) => void;
  handlePressIn?: (language: Language, event: any) => void;
  handlePressOut?: () => void;
  handleMouseEnter?: (language: Language, event: any) => void;
  handleMouseLeave?: () => void;
}

const LanguageSelectionGrid: React.FC<LanguageSelectionGridProps> = ({
  languages,
  handleLanguageSelect,
  handlePressIn,
  handlePressOut,
  handleMouseEnter,
  handleMouseLeave
}) => {
  const { width } = useWindowDimensions();
  const isWideScreen = width > 768;

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.languageGrid}>
        {languages.map((language) => (
          <Pressable
            key={language.code}
            style={styles.languageButton}
            onPress={() => handleLanguageSelect(language)}
            onPressIn={handlePressIn ? (event) => handlePressIn(language, event) : undefined}
            onPressOut={handlePressOut}
            onHoverIn={handleMouseEnter ? (event) => handleMouseEnter(language, event) : undefined}
            onHoverOut={handleMouseLeave}
          >
            <View style={styles.flagContainer}>
              <language.flag style={styles.flag} />
            </View>
            <Text style={styles.languageName, isWideScreen ? styles.wideScreenFont : styles.narrowScreenFont}>{language.name}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },
  languageButton: {
    width: "30%",
    aspectRatio: 1,
    margin: "1.5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e7eb", // Lighter gray
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flagContainer: {
    width: "60%",
    aspectRatio: 1,
    marginBottom: 10,
  },
  flag: {
    width: "100%",
    height: "100%",
    marginBottom: 10,
    borderRadius: 8,
  },
  languageName: {
    textAlign: "center",
  },
  narrowScreenFont: {
    fontSize: 20,
  },
  wideScreenFont: {
    fontSize: 64,
  },
});

export default LanguageSelectionGrid;
