// app/information/health.tsx
import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  useWindowDimensions,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import * as Speech from "expo-speech";
import { useRouter } from "expo-router";
import PageNavigation from '../../components/PageNavigation';
import LanguageModal from '../../components/LanguageModal';
import VirtualAssistantModal from '../../components/VirtualAssistantModal';
import TutorialModal from '../../components/TutorialModal';
import CategoryCard from "../../components/CategoryCard";

// Prominent health topics - visually emphasized
const PROMINENT_TOPICS = [
  { key: "emergency", icon: "local-hospital", color: "#DC2626", route: "/ask/emergency" },
  { key: "findDoctor", icon: "medical-services", color: "#3B82F6", route: "/information/health/find-doctor" },
  { key: "mentalHealth", icon: "psychology", color: "#8B5CF6", route: "/information/health/mental-health" },
  { key: "children", icon: "child-care", color: "#F59E0B", route: "/information/health/children" },
  { key: "trustedContacts", icon: "contact-phone", color: "#059669", route: "/information/health/contacts" },
];

// Secondary health topics
const SECONDARY_TOPICS = [
  { key: "healthSystem", icon: "local-hospital", color: "#6B7280", route: "/information/health/system" },
  { key: "physicalHealth", icon: "fitness-center", color: "#10B981", route: "/information/health/physical" },
  { key: "wantToTalk", icon: "chat", color: "#EC4899", route: "/information/health/talk" },
  { key: "urgentHelp", icon: "emergency", color: "#EF4444", route: "/ask/emergency" },
  { key: "crisisSupport", icon: "support", color: "#7C3AED", route: "/information/health/crisis" },
  { key: "prescriptions", icon: "local-pharmacy", color: "#0891B2", route: "/information/health/pharmacy" },
  { key: "vaccinations", icon: "vaccines", color: "#22C55E", route: "/information/health/vaccinations" },
  { key: "reproductive", icon: "pregnant-woman", color: "#F97316", route: "/information/health/reproductive" },
  { key: "genderViolence", icon: "shield", color: "#BE185D", route: "/information/health/violence-support" },
  { key: "chronicCare", icon: "monitor-heart", color: "#65A30D", route: "/information/health/chronic" },
  { key: "dental", icon: "medical-services", color: "#0284C7", route: "/information/health/dental" },
  { key: "addiction", icon: "healing", color: "#7C2D12", route: "/information/health/addiction" },
  { key: "disability", icon: "accessible", color: "#374151", route: "/information/health/disability" },
  { key: "healthRights", icon: "gavel", color: "#1F2937", route: "/information/health/rights" },
  { key: "logistics", icon: "directions", color: "#475569", route: "/information/health/logistics" },
  { key: "publicHealth", icon: "public", color: "#166534", route: "/information/health/public-alerts" },
];

export default function Health() {
  const { t, i18n } = useTranslation("health");
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // Responsive columns: mobile 2, tablet 3, web 4
  const columns = width < 600 ? 2 : width < 900 ? 3 : 4;
  const padding = 24;
  // percentage for each tile to avoid leftovers
  const cardWidth = (width - padding*columns) / columns;

  // Play single tip via TTS (long-press usage)
  const speak = useCallback(
    (text: string) => {
      if (!text) return;
      const ttsLang = t("tts_lang", { defaultValue: "en-US" });
      try {
        Speech.stop();
        Speech.speak(text, { language: ttsLang });
      } catch (e) {
        console.warn("TTS error", e);
      }
    },
    [t]
  );

  // Play short top tips for all topics (one after another)
  const speakAllTips = async () => {
    const ttsLang = t("tts_lang", { defaultValue: "en-US" });
    try {
      // speak short intro
      Speech.stop();
      Speech.speak(t("tts_intro"), { language: ttsLang });
      // then speak each short tip (space out by callback)
      // simple sequential approach: speak with a small timeout
      [...PROMINENT_TOPICS, ...SECONDARY_TOPICS].forEach((topic, i) => {
        const text = `${t(`topics.${topic.key}.title`)}. ${t(`topics.${topic.key}.tip`)}`;
        setTimeout(() => {
          Speech.speak(text, { language: ttsLang });
        }, 1500 * (i + 1)); // 1.5s gap between items (tweak as needed)
      });
    } catch (e) {
      console.warn("TTS all tips failed", e);
    }
  };

  const renderTopic = (topic: any, isProminent = false) => {
    const title = t(`topics.${topic.key}.title`);
    const subtitle = t(`topics.${topic.key}.subtitle`);
    return (
      <Pressable
        key={topic.key}
        onPress={() => router.push(topic.route)}
        onLongPress={() => speak(`${title}. ${subtitle}`)}
        style={[
          styles.tile, 
          { flexBasis: cardWidth, maxWidth: cardWidth },
          isProminent && styles.prominentTile
        ]}
        accessibilityRole="button"
        accessibilityLabel={`${title}. ${subtitle}`}
      >
        <CategoryCard
          title={title}
          subtitle={subtitle}
          icon={topic.icon}
          color={topic.color}
          onPress={() => router.push(topic.route)}
          onLongPress={() => speak(`${title}. ${subtitle}`)}
          padding={padding}
          width={width - padding}
          columns={columns}
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <PageNavigation
         showLanguageModal={() => setShowLanguageModal(true)}
         showVirtualAssistant={() => setShowVirtualAssistant(true)}
         showTutorial={() => setShowTutorial(true)}
         showBackButton={true}
         title={t("pageTitle")}
       />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.intro}>{t("introShort")}</Text>

        {/* Action row: Play audio tips + quick emergency button */}
        <View style={styles.actionsRow}>
          <Pressable style={styles.audioBtn} onPress={speakAllTips}>
            <Text style={styles.audioBtnText}>{t("playTips")}</Text>
          </Pressable>

          <Pressable
            style={styles.emergencyBtn}
            onPress={() => router.push("/ask/emergency")}
          >
            <Text style={styles.emergencyBtnText}>{t("emergency")}</Text>
          </Pressable>
        </View>

        {/* Prominent health topics */}
        <Text style={styles.sectionTitle}>{t("essentialHealth")}</Text>
        <View style={styles.grid}>
          {PROMINENT_TOPICS.map((topic) => renderTopic(topic, true))}
        </View>

        {/* Secondary health topics */}
        <Text style={styles.sectionTitle}>{t("additionalServices")}</Text>
        <View style={styles.grid}>
          {SECONDARY_TOPICS.map((topic) => renderTopic(topic, false))}
        </View>

        {/* Footer with emergency help quick link */}
        <View style={styles.footer}>
          <Pressable style={styles.helpBtn} onPress={() => router.push("/ask/emergency")}>
            <Text style={styles.helpBtnText}>{t("quickHelp")}</Text>
          </Pressable>
        </View>
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
        tutorialData="health"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { paddingHorizontal: 16, paddingBottom: 48, paddingTop: 12 },
  intro: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 12,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  audioBtn: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#2563EB",
    alignItems: "center",
  },
  audioBtnText: { color: "#fff", fontWeight: "700" },
  emergencyBtn: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#DC2626",
    alignItems: "center",
  },
  emergencyBtnText: { color: "#fff", fontWeight: "700" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
    color: "#1F2937",
  },

  grid: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },

  tile: {
    paddingHorizontal: 8,
    marginVertical: 8,
  },

  prominentTile: {
    borderWidth: 2,
    borderColor: "#3B82F6",
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
  },

  footer: { marginTop: 24, alignItems: "center" },
  helpBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#DC2626",
    borderRadius: 8,
  },
  helpBtnText: { color: "#fff", fontWeight: "700" },
});