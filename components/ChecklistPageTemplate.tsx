import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import PageNavigation from "./PageNavigation";
import TutorialModal from './TutorialModal';
import LanguageModal from './LanguageModal';
import VirtualAssistantModal from './VirtualAssistantModal';

interface ChecklistItem {
  id: string;
  icon: string;
  title: string;
  note?: string;
}

interface Props {
  title: string;
  required: ChecklistItem[];
  optional?: ChecklistItem[];
  warningNote?: string;
}

export default function ChecklistPageTemplate({ title, required, optional, warningNote }: Props) {
  const { t } = useTranslation("healthcare");
  const [checked, setChecked] = useState<string[]>([]);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const toggle = (id: string) => {
    setChecked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const renderItem = (item: ChecklistItem) => (
    <Pressable
      key={item.id}
      style={[styles.item, checked.includes(item.id) && styles.itemChecked]}
      onPress={() => toggle(item.id)}
    >
      <Text style={styles.itemIcon}>{item.icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        {item.note && <Text style={styles.itemNote}>{item.note}</Text>}
      </View>
      <Text style={styles.checkbox}>{checked.includes(item.id) ? "✅" : "⬜️"}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <PageNavigation
        title={title}
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
        showBackButton={true}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>{t("required", { defaultValue: "Required" })}</Text>
        {required.map(renderItem)}

        {optional && (
          <>
            <Text style={styles.sectionTitle}>{t("optional", { defaultValue: "Helpful but not mandatory" })}</Text>
            {optional.map(renderItem)}
          </>
        )}

        {warningNote && (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>{warningNote}</Text>
          </View>
        )}
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
  sectionTitle: { fontSize: 18, fontWeight: "700", marginTop: 16, marginBottom: 8 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  itemChecked: { backgroundColor: "#e0f7fa" },
  itemIcon: { fontSize: 24, marginRight: 12 },
  itemTitle: { fontSize: 16, fontWeight: "600" },
  itemNote: { fontSize: 13, color: "#666" },
  checkbox: { fontSize: 20, marginLeft: 8 },
  warningBox: { marginTop: 20, padding: 14, backgroundColor: "#fff3cd", borderRadius: 10 },
  warningText: { color: "#856404", fontSize: 14 },
});
