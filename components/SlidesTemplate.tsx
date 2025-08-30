import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Pressable, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import PageNavigation from "./PageNavigation";
import TutorialModal from './TutorialModal';
import LanguageModal from './LanguageModal';
import VirtualAssistantModal from './VirtualAssistantModal';
import YoutubePlayer from "react-native-youtube-iframe";

interface RoleCard {
  icon: string;
  title: string;
  text: string;
}

interface Props {
  roles: RoleCard[];
  videoId?: string;
}

export default function SlidesTemplate({ roles, videoId }: Props) {
  const { t } = useTranslation("healthcare");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <PageNavigation
        title={t("gp.whatTheyDo", { defaultValue: "What GPs Do" })}
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

        {/* Role cards */}
        {roles.map((role, idx) => (
          <Pressable
            key={idx}
            onPress={() => setExpanded(expanded === role.title ? null : role.title)}
            style={styles.card}
          >
            <Text style={styles.icon}>{role.icon}</Text>
            <Text style={styles.cardTitle}>{role.title}</Text>
            {expanded === role.title && (
              <Text style={styles.cardText}>{role.text}</Text>
            )}
          </Pressable>
        ))}

        {/* Quick checklist */}
        <View style={styles.checklist}>
          <Text style={styles.checklistTitle}>
            {t("gp.checklist", { defaultValue: "GPs usually do NOT…" })}
          </Text>
          <Text style={styles.checkItem}>❌ {t("gp.no_surgery", { defaultValue: "Do surgery themselves" })}</Text>
          <Text style={styles.checkItem}>❌ {t("gp.no_emergency", { defaultValue: "Handle life-threatening emergencies" })}</Text>
          <Text style={styles.checkItem}>❌ {t("gp.no_specialist", { defaultValue: "Provide specialist treatment" })}</Text>
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
        tutorialData="home"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 16 },
  videoWrap: { alignItems: "center", marginBottom: 20 },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  icon: { fontSize: 28, marginBottom: 6 },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 4, textAlign: "center" },
  cardText: { fontSize: 14, color: "#555", textAlign: "center" },
  checklist: { marginTop: 20, padding: 16, borderRadius: 10, backgroundColor: "#f0f4f8" },
  checklistTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  checkItem: { fontSize: 14, marginBottom: 4 },
});
