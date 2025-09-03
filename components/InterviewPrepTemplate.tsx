import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

import PageNavigation from "./PageNavigation";
import LanguageModal from "./LanguageModal";
import TutorialModal from "./TutorialModal";
import VirtualAssistantModal from "./VirtualAssistantModal";

interface Step {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Slide {
  id: string;
  icon: string;
  title: string;
  text: string;
}

interface ChecklistItem {
  id: string;
  icon: string;
  title: string;
  note?: string;
}

interface RoleplayQuestion {
  id: string;
  question: string;
  answer?: string;
}

interface TrustedNGO {
  id: string;
  name: string;
  phone: string;
  url?: string;
  description: string;
}

interface Props {
  translationNamespace: string;
  steps: Step[];
  slides: Slide[];
  checklist: ChecklistItem[];
  roleplay: RoleplayQuestion[];
  trustedNGOs: TrustedNGO[];
}

export default function InterviewPrepTemplate({
  translationNamespace,
  steps,
  slides,
  checklist,
  roleplay,
  trustedNGOs,
}: Props) {
  const { t } = useTranslation(translationNamespace);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  const toggleCheck = (id: string) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };


  return (
    <SafeAreaView style={styles.safe}>
      <PageNavigation
        title={t("pageTitle", { defaultValue: "Interview Preparation" })}
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
        showBackButton
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Steps */}
        <Text style={styles.sectionTitle}>{t("sections.steps")}</Text>
        {steps.map((s) => (
          <View key={s.id} style={styles.card}>
            <View style={styles.cardIcon}>{s.icon}</View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{s.title}</Text>
              <Text style={styles.cardText}>{s.description}</Text>
            </View>
          </View>
        ))}

        {/* Do's & Don'ts (Slides) */}
        <Text style={styles.sectionTitle}>{t("sections.slides")}</Text>
        {slides.map((sl) => (
          <View key={sl.id} style={styles.card}>
            <View style={styles.slideHeader}>
              <Text style={styles.slideIcon}>{sl.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{sl.title}</Text>
                <Text style={styles.cardText}>{sl.text}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Checklist */}
        <Text style={styles.sectionTitle}>{t("sections.checklist")}</Text>
        {checklist.map((item) => (
          <Pressable
            key={item.id}
            style={[
              styles.item,
              checked.includes(item.id) && styles.itemChecked,
            ]}
            onPress={() => toggleCheck(item.id)}
          >
            <Text style={styles.itemIcon}>{item.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              {item.note && <Text style={styles.itemNote}>{item.note}</Text>}
            </View>
            <Text style={styles.checkbox}>
              {checked.includes(item.id) ? "✅" : "⬜️"}
            </Text>
          </Pressable>
        ))}

        {/* Questions & Answers */}
        <Text style={styles.sectionTitle}>{t("sections.roleplay")}</Text>
        {roleplay.map((q) => (
          <View key={q.id} style={styles.card}>
            <Pressable
              style={styles.questionHeader}
              onPress={() => toggleQuestion(q.id)}
            >
              <Text style={styles.cardTitle}>{q.question}</Text>
              <MaterialIcons
                name={expandedQuestions.includes(q.id) ? "expand-less" : "expand-more"}
                size={24}
                color="#666"
              />
            </Pressable>
            {expandedQuestions.includes(q.id) && q.answer && (
              <View style={styles.answerSection}>
                <Text style={styles.answerText}>{q.answer}</Text>
              </View>
            )}
          </View>
        ))}

        {/* Trusted NGOs */}
        <Text style={styles.sectionTitle}>{t("sections.trustedNGOs")}</Text>
        {trustedNGOs.map((ngo) => (
          <View key={ngo.id} style={styles.ngoCard}>
            <View style={styles.ngoHeader}>
              <MaterialIcons name="support-agent" size={24} color="#2563EB" />
              <Text style={styles.ngoName}>{ngo.name}</Text>
            </View>
            <Text style={styles.ngoDescription}>{ngo.description}</Text>
            <View style={styles.ngoContact}>
              <MaterialIcons name="phone" size={18} color="#059669" />
              <Text style={styles.ngoPhone}>{ngo.phone}</Text>
            </View>
            {ngo.url && (
              <View style={styles.ngoContact}>
                <MaterialIcons name="language" size={18} color="#059669" />
                <Text style={styles.ngoUrl}>{ngo.url}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <LanguageModal visible={showLanguageModal} onClose={() => setShowLanguageModal(false)} />
      <VirtualAssistantModal visible={showVirtualAssistant} onClose={() => setShowVirtualAssistant(false)} />
      <TutorialModal visible={showTutorial} onClose={() => setShowTutorial(false)} tutorialData="interview" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginTop: 20, marginBottom: 10 },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardIcon: { marginBottom: 6 },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  cardText: { fontSize: 14, color: "#555" },
  slideHeader: { flexDirection: "row", alignItems: "flex-start" },
  slideIcon: { fontSize: 26, marginRight: 12, marginTop: 2 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  itemChecked: { backgroundColor: "#e0f7fa" },
  itemIcon: { fontSize: 22, marginRight: 12 },
  itemTitle: { fontSize: 16, fontWeight: "600" },
  itemNote: { fontSize: 13, color: "#666" },
  checkbox: { fontSize: 20, marginLeft: 8 },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  answerSection: { 
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  answerText: { fontSize: 14, color: "#555", lineHeight: 20 },
  ngoCard: {
    backgroundColor: "#f0f9ff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  ngoHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  ngoName: { fontSize: 16, fontWeight: "700", marginLeft: 8 },
  ngoDescription: { fontSize: 14, color: "#374151", marginBottom: 8 },
  ngoContact: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  ngoPhone: { fontSize: 14, color: "#059669", marginLeft: 4, fontWeight: "600" },
  ngoUrl: { fontSize: 12, color: "#059669", marginLeft: 4 },
});
