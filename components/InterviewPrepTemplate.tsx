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
}

interface Props {
  translationNamespace: string;
  steps: Step[];
  slides: Slide[];
  checklist: ChecklistItem[];
  roleplay: RoleplayQuestion[];
}

export default function InterviewPrepTemplate({
  translationNamespace,
  steps,
  slides,
  checklist,
  roleplay,
}: Props) {
  const { t } = useTranslation(translationNamespace);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{ [id: string]: string }>({});

  const toggleCheck = (id: string) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const speak = (text: string) => {
    if (!text) return;
    const ttsLang = t("tts_lang", { defaultValue: "de-DE" });
    Speech.stop();
    Speech.speak(text, { language: ttsLang });
  };

  const saveAnswers = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + "interview_answers.txt";
      let content = "My Practice Answers:\n\n";
      Object.entries(answers).forEach(([q, a]) => {
        content += `${q}:\n${a}\n\n`;
      });
      await FileSystem.writeAsStringAsync(fileUri, content);
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      }
    } catch (e) {
      console.warn("Error saving answers:", e);
    }
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
            <Text style={styles.slideIcon}>{sl.icon}</Text>
            <Text style={styles.cardTitle}>{sl.title}</Text>
            <Text style={styles.cardText}>{sl.text}</Text>
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

        {/* Role-play Practice */}
        <Text style={styles.sectionTitle}>{t("sections.roleplay")}</Text>
        {roleplay.map((q) => (
          <View key={q.id} style={styles.card}>
            <Text style={styles.cardTitle}>{q.question}</Text>
            <View style={styles.roleplayActions}>
              <Pressable style={styles.ttsBtn} onPress={() => speak(q.question)}>
                <MaterialIcons name="record-voice-over" size={24} color="#fff" />
                <Text style={styles.btnText}>{t("listen")}</Text>
              </Pressable>
              <Pressable
                style={styles.answerBtn}
                onPress={() =>
                  setAnswers((prev) => ({
                    ...prev,
                    [q.question]: t("answer_placeholder"),
                  }))
                }
              >
                <MaterialIcons name="edit" size={24} color="#fff" />
                <Text style={styles.btnText}>{t("write")}</Text>
              </Pressable>
            </View>
          </View>
        ))}

        <Pressable style={styles.saveBtn} onPress={saveAnswers}>
          <Text style={styles.saveBtnText}>{t("saveAnswers")}</Text>
        </Pressable>
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
  slideIcon: { fontSize: 26, marginBottom: 6, textAlign: "center" },
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
  roleplayActions: { flexDirection: "row", marginTop: 8, gap: 10 },
  ttsBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    padding: 8,
    borderRadius: 6,
    marginRight: 6,
  },
  answerBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    padding: 8,
    borderRadius: 6,
  },
  btnText: { color: "#fff", marginLeft: 6 },
  saveBtn: {
    marginTop: 20,
    backgroundColor: "#F59E0B",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontWeight: "700" },
});
