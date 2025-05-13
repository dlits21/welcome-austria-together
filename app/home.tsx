
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const handleSearch = () => {
    console.log(`Searching for: ${searchQuery}`);
    // In a real app, we would perform a search here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>How can I help you?</Text>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <MaterialIcons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Feature Grid */}
      <View style={styles.featureGrid}>
        <TouchableOpacity style={styles.featureItem}>
          <View style={styles.featureIconContainer}>
            <MaterialIcons name="info" size={40} color="#4CAF50" />
          </View>
          <Text style={styles.featureText}>Information</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.featureItem}>
          <View style={styles.featureIconContainer}>
            <MaterialIcons name="school" size={40} color="#2196F3" />
          </View>
          <Text style={styles.featureText}>Courses</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.featureItem}>
          <View style={styles.featureIconContainer}>
            <MaterialIcons name="people" size={40} color="#FF9800" />
          </View>
          <Text style={styles.featureText}>Community</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.featureItem}>
          <View style={styles.featureIconContainer}>
            <MaterialIcons name="help" size={40} color="#F44336" />
          </View>
          <Text style={styles.featureText}>Help</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },
  featureItem: {
    width: "45%",
    aspectRatio: 1,
    margin: "2.5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  featureText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
