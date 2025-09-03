import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import PageNavigation from "./PageNavigation";
import TutorialModal from './TutorialModal';
import LanguageModal from './LanguageModal';
import VirtualAssistantModal from './VirtualAssistantModal';
import YoutubePlayer from "react-native-youtube-iframe";

interface Step {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  deadlineDate?: string; // optional: ISO string for countdown
}

interface Props {
  translationNamespace: string;
  steps: Step[];
  videoId?: string;
  checklist?: string[];
}

export default function StepPageTemplate({
    translationNamespace,
    steps,
    videoId,
    checklist }: Props) {
  const { t } = useTranslation(translationNamespace);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <PageNavigation
        title={t("stepPage.title", { defaultValue: "How to Register" })}
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
        showBackButton={true}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Video intro */}
        {videoId && (
          <View style={styles.videoWrap}>
            <YoutubePlayer height={220} play={false} videoId={videoId} />
          </View>
        )}

        {/* Steps */}
        {steps.map((step) => (
          <Pressable
            key={step.number}
            style={styles.stepCard}
            onPress={() => setExpanded(expanded === step.number ? null : step.number)}
          >
            <View style={styles.stepHeader}>
              <Text style={styles.stepNumber}>{step.number}</Text>
              <Text style={styles.stepIcon}>{step.icon}</Text>
              <Text style={styles.stepTitle}>{step.title}</Text>
            </View>
            {expanded === step.number && (
              <Text style={styles.stepText}>{step.description}</Text>
            )}
          </Pressable>
        ))}

        {/* Checklist */}
        {checklist && (
          <View style={styles.checklist}>
            <Text style={styles.checklistTitle}>
              {t("stepPage.checklist", { defaultValue: "Checklist before registering:" })}
            </Text>
            {checklist.map((item, i) => (
              <Text key={i} style={styles.checkItem}>✅ {item}</Text>
            ))}
          </View>
        )}
      </ScrollView>

      <LanguageModal visible={showLanguageModal} onClose={() => setShowLanguageModal(false)} />
      <VirtualAssistantModal visible={showVirtualAssistant} onClose={() => setShowVirtualAssistant(false)} />
      <TutorialModal visible={showTutorial} onClose={() => setShowTutorial(false)} tutorialData="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 16 },
  videoWrap: { alignItems: "center", marginBottom: 20 },
  stepCard: {
    backgroundColor: "#f9f9f9",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  stepHeader: { flexDirection: "row", alignItems: "center" },
  stepNumber: {
    fontSize: 18,
    fontWeight: "700",
    marginRight: 8,
    color: "#2563EB",
  },
  stepIcon: { fontSize: 22, marginRight: 8 },
  stepTitle: { fontSize: 16, fontWeight: "600" },
  stepText: { marginTop: 8, fontSize: 14, color: "#555" },

  checklist: {
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#f0f4f8",
  },
  checklistTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  checkItem: { fontSize: 14, marginBottom: 4 },
});
