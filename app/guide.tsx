import React, { useState } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  Pressable, 
  ScrollView,
  useWindowDimensions 
} from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import PageNavigation from "../components/PageNavigation";
import TutorialModal from '../components/TutorialModal';
import LanguageModal from '../components/LanguageModal';
import VirtualAssistantModal from '../components/VirtualAssistantModal';

type TimeframeOption = 'not_arrived' | 'one_week' | 'one_month' | 'longer';

interface GuideSection {
  icon: string;
  title: string;
  description: string;
  route: string;
}

export default function Guide() {
  const { t } = useTranslation("guide");
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeOption | null>(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const timeframeOptions: TimeframeOption[] = ['not_arrived', 'one_week', 'one_month', 'longer'];

  const getTimeframeIcon = (option: TimeframeOption): string => {
    switch (option) {
      case 'not_arrived': return '✈️';
      case 'one_week': return '🏃‍♂️';
      case 'one_month': return '🏠';
      case 'longer': return '🌱';
      default: return '📍';
    }
  };

  const getTimeframeColor = (option: TimeframeOption): string => {
    switch (option) {
      case 'not_arrived': return '#3B82F6';
      case 'one_week': return '#F59E0B';
      case 'one_month': return '#10B981';
      case 'longer': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const renderTimeframeSelection = () => {
    const columns = width < 600 ? 1 : 2;
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{t("pageTitle")}</Text>
        <Text style={styles.subtitle}>{t("pageIntro")}</Text>
        
        <Text style={styles.questionTitle}>{t("selectTimeframe")}</Text>
        
        <View style={[styles.optionsGrid, { flexDirection: columns === 1 ? 'column' : 'row' }]}>
          {timeframeOptions.map((option) => (
            <Pressable
              key={option}
              style={[
                styles.timeframeOption,
                { 
                  backgroundColor: getTimeframeColor(option),
                  flex: columns === 2 ? 1 : undefined,
                  marginHorizontal: columns === 2 ? 8 : 0
                }
              ]}
              onPress={() => setSelectedTimeframe(option)}
            >
              <Text style={styles.optionIcon}>{getTimeframeIcon(option)}</Text>
              <Text style={styles.optionTitle}>{t(`options.${option}.title`)}</Text>
              <Text style={styles.optionSubtitle}>{t(`options.${option}.subtitle`)}</Text>
            </Pressable>
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.bottomButtons}>
          <Pressable
            style={styles.navigationButton}
            onPress={() => router.push("/information/contacts")}
          >
            <MaterialIcons name="contact-support" size={24} color="#fff" />
            <Text style={styles.navigationButtonText}>
              {t("navigation.trustedNGO")}
            </Text>
          </Pressable>
          
          <Pressable
            style={[styles.navigationButton, styles.peerButton]}
            onPress={() => router.push("/ask")}
          >
            <MaterialIcons name="group" size={24} color="#fff" />
            <Text style={styles.navigationButtonText}>
              {t("navigation.peerSystem")}
            </Text>
          </Pressable>
        </View>

        {/* Extra Info */}
        <View style={styles.extraInfo}>
          <Text style={styles.extraInfoText}>{t("extraInfo")}</Text>
        </View>
      </View>
    );
  };

  const renderTimeframeContent = (timeframe: TimeframeOption) => {
    const sections: GuideSection[] = t(`content.${timeframe}.sections`, { returnObjects: true }) as GuideSection[];
    const videoUrl = t(`content.${timeframe}.videoUrl`);
    
    return (
      <View style={styles.container}>
        <Text style={styles.contentTitle}>{t(`content.${timeframe}.title`)}</Text>
        <Text style={styles.contentSubtitle}>{t(`content.${timeframe}.subtitle`)}</Text>

        {/* YouTube Video */}
        <View style={styles.videoContainer}>
          <Text style={styles.videoTitle}>{t("videoSection.title")}</Text>
          <Pressable
            style={styles.videoButton}
            onPress={() => {
              // Open YouTube video in browser
              // Note: In a real React Native app, you'd use Linking.openURL
              window.open(videoUrl, '_blank');
            }}
          >
            <MaterialIcons name="play-circle-fill" size={48} color="#FF0000" />
            <Text style={styles.videoButtonText}>{t("videoSection.watchVideo")}</Text>
          </Pressable>
        </View>

        <View style={styles.sectionsContainer}>
          {sections.map((section, index) => (
            <Pressable
              key={index}
              style={styles.sectionCard}
              onPress={() => router.push(section.route)}
            >
              <View style={styles.sectionIcon}>
                <Text style={styles.sectionIconText}>{section.icon}</Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionDescription}>{section.description}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
            </Pressable>
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.bottomButtons}>
          <Pressable
            style={styles.navigationButton}
            onPress={() => router.push("/information/contacts")}
          >
            <MaterialIcons name="contact-support" size={24} color="#fff" />
            <Text style={styles.navigationButtonText}>
              {t("navigation.trustedNGO")}
            </Text>
          </Pressable>
          
          <Pressable
            style={[styles.navigationButton, styles.peerButton]}
            onPress={() => router.push("/ask")}
          >
            <MaterialIcons name="group" size={24} color="#fff" />
            <Text style={styles.navigationButtonText}>
              {t("navigation.peerSystem")}
            </Text>
          </Pressable>
        </View>

        {/* Extra Info */}
        <View style={styles.extraInfo}>
          <Text style={styles.extraInfoText}>{t("extraInfo")}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <PageNavigation
        title={t("pageTitle")}
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
        showBackButton
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {selectedTimeframe ? renderTimeframeContent(selectedTimeframe) : renderTimeframeSelection()}
      </ScrollView>

      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />

      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        tutorialData="home"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  scrollContainer: { 
    flexGrow: 1, 
    paddingBottom: 32 
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 16, 
    paddingTop: 20 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "800", 
    textAlign: "center", 
    marginBottom: 8,
    color: "#111"
  },
  subtitle: { 
    fontSize: 16, 
    textAlign: "center", 
    color: "#6B7280", 
    marginBottom: 32,
    lineHeight: 24
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
    color: "#374151"
  },
  optionsGrid: {
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center'
  },
  timeframeOption: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    minHeight: 160,
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  optionIcon: { 
    fontSize: 48, 
    marginBottom: 12 
  },
  optionTitle: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: "#fff", 
    textAlign: "center",
    marginBottom: 8
  },
  optionSubtitle: { 
    fontSize: 14, 
    color: "#fff", 
    textAlign: "center",
    opacity: 0.9,
    lineHeight: 20
  },
  contentSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 24,
    lineHeight: 24
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
    color: "#111"
  },
  sectionsContainer: {
    gap: 12
  },
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  sectionIconText: {
    fontSize: 24
  },
  sectionContent: {
    flex: 1
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4
  },
  sectionDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20
  },
  bottomButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
    paddingHorizontal: 4,
  },
  navigationButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  peerButton: {
    backgroundColor: "#059669",
  },
  navigationButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  extraInfo: {
    backgroundColor: "#f0f9ff",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  extraInfoText: {
    fontSize: 14,
    color: "#1f2937",
    textAlign: "center",
    lineHeight: 20,
  },
  videoContainer: {
    backgroundColor: "#f8fafc",
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 16,
    textAlign: "center",
  },
  videoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  videoButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
});