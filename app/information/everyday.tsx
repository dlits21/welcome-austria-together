// app/everyday.tsx
import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
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

// Topic icons come from your icon system or MaterialIcons names used by CategoryCard
const TOPICS = [
  { key: "school", icon: "school", color: "#3B82F6", route: "/information/everyday/school" },
  { key: "kids", icon: "child-care", color: "#F59E0B", route: "/information/everyday/children" },
  { key: "women", icon: "female", color: "#EC4899", route: "/information/everyday/women" },
  { key: "sim", icon: "sim-card", color: "#06B6D4", route: "/information/everyday/sim" },
  { key: "recycling", icon: "recycling", color: "#10B981", route: "/information/everyday/recycling" },
  { key: "transport", icon: "directions-bus", color: "#8B5CF6", route: "/information/everyday/transportation" },
  { key: "culture", icon: "theaters", color: "#F97316", route: "/information/everyday/culture" },
  { key: "sport", icon: "fitness-center", color: "#EF4444", route: "/information/everyday/sport" },
  { key: "political", icon: "gavel", color: "#6B7280", route: "/information/everyday/political" },
  { key: "climate", icon: "public", color: "#22C55E", route: "/information/everyday/climate" },
  { key: "volunteering", icon: "public", color: "#22C55E", route: "/information/everyday/climate" },
  { key: "finance", icon: "public", color: "#22C55E", route: "/information/everyday/climate" },
];

export default function Everyday() {
  const { t, i18n } = useTranslation("everyday");
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
      const ttsLang = t("tts_lang", { defaultValue: "de-DE" });
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
    const ttsLang = t("tts_lang", { defaultValue: "de-DE" });
    try {
      // speak short intro
      Speech.stop();
      Speech.speak(t("tts_intro"), { language: ttsLang });
      // then speak each short tip (space out by callback)
      // simple sequential approach: speak with a small timeout
      TOPICS.forEach((topic, i) => {
        const text = `${t(`topics.${topic.key}.title`)}. ${t(`topics.${topic.key}.tip`)}`;
        setTimeout(() => {
          Speech.speak(text, { language: ttsLang });
        }, 1500 * (i + 1)); // 1.5s gap between items (tweak as needed)
      });
    } catch (e) {
      console.warn("TTS all tips failed", e);
    }
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

        {/* Action row: Play audio tips + quick checklist button */}
        <View style={styles.actionsRow}>
          <Pressable style={styles.audioBtn} onPress={speakAllTips}>
            <Text style={styles.audioBtnText}>{t("playTips")}</Text>
          </Pressable>

          <Pressable
            style={styles.checkBtn}
            onPress={() => router.push("/information/everyday/guide")}
          >
            <Text style={styles.checkBtnText}>{t("myJourney")}</Text>
          </Pressable>
        </View>

        {/* Grid of topic tiles */}
        <View style={styles.grid}>
          {TOPICS.map((topic) => {
            const title = t(`topics.${topic.key}.title`);
            const subtitle = t(`topics.${topic.key}.subtitle`);
            return (
              <Pressable
                key={topic.key}
                onPress={() => router.push(topic.route)}
                onLongPress={() => speak(`${title}. ${subtitle}`)}
                style={[styles.tile, { flexBasis: cardWidth, maxWidth: cardWidth }]}
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
          })}
        </View>

        {/* Short footer with 'need immediate help' quick link */}
        <View style={styles.footer}>
          <Pressable style={styles.helpBtn} onPress={() => router.push("/emergency")}>
            <Text style={styles.helpBtnText}>{t("quickHelp")}</Text>
          </Pressable>
        </View>
      </ScrollView>
      <LanguageModal
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        languageCode={language.code}
      />

      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
        languageCode={language.code}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={language.code}
        tutorialData="home"
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
  checkBtn: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#059669",
    alignItems: "center",
  },
  checkBtnText: { color: "#fff", fontWeight: "700" },

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

  footer: { marginTop: 18, alignItems: "center" },
  helpBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#DC2626",
    borderRadius: 8,
  },
  helpBtnText: { color: "#fff", fontWeight: "700" },
});
