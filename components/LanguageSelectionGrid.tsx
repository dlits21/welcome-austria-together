
import React from 'react';
import { 
  StyleSheet, 
  Text,
  View, 
  TouchableOpacity, 
  ScrollView,
  Pressable
} from 'react-native';

interface LanguageSelectionGridProps {
  languages: Language[];
  handleLanguageSelect: (language: Language) => void;
  handlePressIn: (language: Language, event: any) => void;
  handlePressOut: () => void;
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
            onPressIn={(event) => handlePressIn(language, event)}
            onPressOut={handlePressOut}
            onMouseEnter={handleMouseEnter ? (event) => handleMouseEnter(language, event) : undefined}
            onMouseLeave={handleMouseLeave}
          >
            <View style={styles.flagContainer}>
              <language.flag style={styles.flag} />
            </View>
            <Text style={styles.languageName}>{language.name}</Text>
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
    backgroundColor: "#f5f5f5",
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    borderRadius: 8,
  },
  flag: {
    width: "100%",
    height: "100%",
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  languageName: {
    fontSize: 25,
    textAlign: "center",
  },
});

export default LanguageSelectionGrid;
