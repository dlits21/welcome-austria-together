import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import * as Speech from "expo-speech";
import { useRouter } from "expo-router";
import PageNavigation from './PageNavigation';
import LanguageModal from './LanguageModal';
import VirtualAssistantModal from './VirtualAssistantModal';
import TutorialModal from './TutorialModal';
import CategoryCard from "./CategoryCard";
import SwipeableTiles from "./SwipeableTiles";

interface Topic {
  key: string;
  icon: string;
  color: string;
  route: string;
}

interface InformationPageTemplateProps {
  prominentTopics?: Topic[];
  secondaryTopics?: Topic[];
  allTopics?: Topic[];
  translationNamespace: string;
  tutorialData: string;
  emergencyRoute?: string;
  secondaryButtonRoute?: string;
  secondaryButtonKey?: string;
  secondaryButtonColor?: string;
  hideSwipeableSection?: boolean;
}

export default function InformationPageTemplate({
  prominentTopics = [],
  secondaryTopics = [],
  allTopics = [],
  translationNamespace,
  tutorialData,
  emergencyRoute = "/ask/emergency",
  secondaryButtonRoute,
  secondaryButtonKey = "emergency",
  secondaryButtonColor = "#DC2626",
  hideSwipeableSection = false
}: InformationPageTemplateProps) {
  const { t } = useTranslation(translationNamespace);
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // Use allTopics if provided, otherwise combine prominent and secondary
  const topicsToUse = allTopics.length > 0 ? allTopics : [...prominentTopics, ...secondaryTopics];

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
      topicsToUse.forEach((topic, i) => {
        const text = `${t(`topics.${topic.key}.title`)}. ${t(`topics.${topic.key}.tip`)}`;
        setTimeout(() => {
          Speech.speak(text, { language: ttsLang });
        }, 1500 * (i + 1)); // 1.5s gap between items (tweak as needed)
      });
    } catch (e) {
      console.warn("TTS all tips failed", e);
    }
  };

  const renderTopic = (topic: Topic, isProminent = false) => {
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
          height={450}
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

        {/* Action row: Play audio tips + secondary button */}
        <View style={styles.actionsRow}>
          <Pressable style={styles.audioBtn} onPress={speakAllTips}>
            <Text style={styles.audioBtnText}>{t("playTips")}</Text>
          </Pressable>

          <Pressable
            style={[styles.emergencyBtn, { backgroundColor: secondaryButtonColor }]}
            onPress={() => router.push(secondaryButtonRoute || emergencyRoute)}
          >
            <Text style={styles.emergencyBtnText}>{t(secondaryButtonKey)}</Text>
          </Pressable>
        </View>

        {/* Prominent topics - swipeable (only show if we have prominent topics) */}
        {!hideSwipeableSection && prominentTopics.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>{t("essentialHealth")}</Text>
            <SwipeableTiles
              topics={prominentTopics}
              onTilePress={(route) => router.push(route)}
              onTileLongPress={speak}
              getText={t}
              renderTile={renderTopic}
            />
          </>
        )}

        {/* All topics grid */}
        <Text style={styles.sectionTitle}>
          {prominentTopics.length > 0 ? t("additionalServices") : t("allTopics", { defaultValue: "All Topics" })}
        </Text>
        <View style={styles.grid}>
          {topicsToUse.map((topic) => renderTopic(topic, false))}
        </View>

        {/* Footer with help quick link */}
        <View style={styles.footer}>
          <Pressable style={styles.helpBtn} onPress={() => router.push(emergencyRoute)}>
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
        tutorialData={tutorialData}
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