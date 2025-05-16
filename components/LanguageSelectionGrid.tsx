
import React from 'react';
import { 
  StyleSheet, 
  Text,
  View, 
  TouchableOpacity, 
  ScrollView
} from 'react-native';

interface LanguageSelectionGridProps {
  languages: any[];
  handleLanguageSelect: (language: any) => void;
  handlePressIn: (language: any, event: any) => void;
  handlePressOut: () => void;
}

const LanguageSelectionGrid: React.FC<LanguageSelectionGridProps> = ({
  languages,
  handleLanguageSelect,
  handlePressIn,
  handlePressOut
}) => {
  return (
    <ScrollView contentContainerStyle={styles.languageGrid}>
      {languages.map((language) => (
        <TouchableOpacity
          key={language.code}
          style={styles.languageItem}
          onPress={() => handleLanguageSelect(language)}
          onPressIn={(e) => handlePressIn(language, e)}
          onPressOut={handlePressOut}
        >
          <View style={{ width: '60%', aspectRatio:1 }}>
            <language.flag style={styles.languageFlag}></language.flag>
          </View>
          <Text style={styles.languageName}>{language.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },
  languageItem: {
    width: "30%",
    aspectRatio: 1,
    margin: "1.5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 10,
  },
  languageFlag: {
    width: "10%",
    height: "10%",
    marginBottom: 10,
    borderRadius: 30,
  },
  languageName: {
    fontSize: 25,
    textAlign: "center",
  },
});

export default LanguageSelectionGrid;
