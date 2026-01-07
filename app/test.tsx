import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import IconTitleSubtitleCard from '../components/IconTitleSubtitleCard';
import { GermanFlag } from '../components/SVG/Flags';
import PageNavigation from '../components/PageNavigation';
import Menu from '../components/Menu';

const TestPage = () => {
  const router = useRouter();
  const isWeb = Platform.OS === 'web';

  const handleShowLanguage = () => {
    // No-op for test page
  };

  const handleShowTutorial = () => {
    // No-op for test page
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguage={handleShowLanguage}
        showTutorial={handleShowTutorial}
        showBackButton={true}
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>IconTitleSubtitleCard Test</Text>

        <Text style={styles.sectionTitle}>1. With PNG Image (require)</Text>
        <IconTitleSubtitleCard
          icon={require('../assets/images/fatima.png')}
          title="Dr. Fatima Al-Sayed"
          subtitle="Allgemeinmedizin - Spricht Arabisch & Deutsch"
        />

        <View style={styles.spacer} />

        <Text style={styles.sectionTitle}>2. With SVG Component</Text>
        <IconTitleSubtitleCard
          icon={<GermanFlag width={32} height={32} />}
          title="German Language Support"
          subtitle="Native speakers available 24/7"
        />
        
        <View style={styles.spacer} />

        <Text style={styles.sectionTitle}>3. Long Text Wrap Test</Text>
        <IconTitleSubtitleCard
          icon={require('../assets/images/hamdi.jpeg')}
          title="This is a very long title that should wrap to the next line if the screen is narrow enough"
          subtitle="And this is an equally long subtitle to demonstrate the responsive layout capabilities of this component on smaller devices."
        />

        <Text style={styles.sectionTitle}>4. Custom Style Test</Text>
        <IconTitleSubtitleCard
          icon={<GermanFlag width={32} height={32} />}
          title="Custom Styled Card"
          subtitle="This card has custom styles applied to it."
          style={{ backgroundColor: '#f0f0f0', padding: 16, borderRadius: 8 }}
        />

        <Text style={styles.sectionTitle}>5. Multiple Cards</Text>
        {[1, 2, 3].map((num) => (
          <IconTitleSubtitleCard
            key={num}
            icon={require('../assets/images/fatima.png')}
            title={`Card Title ${num}`}
            subtitle={`This is the subtitle for card number ${num}.`}
            style={{ marginBottom: 12 }}
          />
        ))}

        <Text style={styles.sectionTitle}>6. Multiple Cards Horizontally next to each other</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <IconTitleSubtitleCard
              key={num}
              icon={require('../assets/images/fatima.png')}
              title={`Card Title ${num}`}
              subtitle={`This is the subtitle for card number ${num}.`}
              style={{ marginRight: 12, marginBottom: 12, minWidth: 250 }}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>7. No picture or SVG icon provided       </Text>
        <IconTitleSubtitleCard
          title="No Icon"
          subtitle="This card has no icon or image. Bla bla bla. Testing how it looks. It should align properly. And also handle long text without any issues because it wraps correctly."
        />

        <Text style={styles.sectionTitle}>8. No picture and Multiple Cards Horizontally next to each other</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <IconTitleSubtitleCard
              key={num}
              title={`Card Title ${num}`}
              subtitle={`This is the subtitle for card number ${num}.`}
              style={{ marginRight: 12, marginBottom: 12, minWidth: 250 }}
            />
          ))}
        </View>

      </ScrollView>

      {!isWeb && <Menu />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    paddingBottom: 100, // Space for menu
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
    color: '#666',
  },
  spacer: {
    height: 24,
  }
});

export default TestPage;
