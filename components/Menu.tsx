import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PageNavigation: React.FC = () => {
  const router = useRouter();

  const onSupport= () => {
    router.push("/support");
  };

  const onGuide= () => {
    router.push("/guide");
  };

  const onInfo= () => {
    router.push("/information");
  };

  const onEmergency= () => {
    router.push("/emergency");
  };

  return (
    <View style={styles.container}>

      {/* Right buttons */}
      <TouchableOpacity onPress={onSupport} style={styles.button}>
        <MaterialIcons name="groups" size={36} color="#fff"/>
      </TouchableOpacity>

      <TouchableOpacity onPress={onGuide} style={styles.button}>
        <MaterialIcons name="map" size={36} color="#fff"/>
      </TouchableOpacity>

      <TouchableOpacity onPress={onInfo} style={styles.button}>
        <MaterialIcons name="info-outline" size={36} color="#fff"/>
      </TouchableOpacity>

      <TouchableOpacity onPress={onEmergency} style={styles.button}>
        <MaterialIcons name="emergency" size={36} color="#fff"/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#A60B33',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  backButtonPlaceholder: {
    width: 40, // same width as back button for alignment when no back button
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    paddingHorizontal: 8,
  },
  button: {
    padding: 8,
    borderRadius: 20,
  },
});

export default PageNavigation;
