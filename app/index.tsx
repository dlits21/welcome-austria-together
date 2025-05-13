
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView, StatusBar } from "react-native";
import { useRouter } from "expo-router";

// Language data for our 12 language options
const languages = [
  { code: "en", name: "English", flag: require("../assets/images/icon.png") },
  { code: "de", name: "Deutsch", flag: require("../assets/images/icon.png") },
  { code: "ar", name: "العربية", flag: require("../assets/images/icon.png") },
  { code: "fa", name: "فارسی", flag: require("../assets/images/icon.png") },
  { code: "tr", name: "Türkçe", flag: require("../assets/images/icon.png") },
  { code: "ru", name: "Русский", flag: require("../assets/images/icon.png") },
  { code: "fr", name: "Français", flag: require("../assets/images/icon.png") },
  { code: "es", name: "Español", flag: require("../assets/images/icon.png") },
  { code: "uk", name: "Українська", flag: require("../assets/images/icon.png") },
  { code: "pl", name: "Polski", flag: require("../assets/images/icon.png") },
  { code: "ro", name: "Română", flag: require("../assets/images/icon.png") },
  { code: "bg", name: "Български", flag: require("../assets/images/icon.png") },
];

export default function LanguageSelectionScreen() {
  const router = useRouter();

  const handleLanguageSelect = (languageCode: string) => {
    console.log(`Selected language: ${languageCode}`);
    // In a real app, we would save the selected language and navigate to the home page
    // router.push("/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Select Your Language</Text>
        <Text style={styles.subtitle}>Please choose your preferred language</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.languageGrid}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={styles.languageItem}
            onPress={() => handleLanguageSelect(language.code)}
          >
            <Image source={language.flag} style={styles.languageFlag} />
            <Text style={styles.languageName}>{language.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  languageFlag: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 30,
  },
  languageName: {
    fontSize: 14,
    textAlign: "center",
  },
});
