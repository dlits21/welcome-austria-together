import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Pressable, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import PageNavigation from "./PageNavigation";
import TutorialModal from './TutorialModal';
import LanguageModal from './LanguageModal';
import VirtualAssistantModal from './VirtualAssistantModal';

interface Slide {
  key: string;
  icon: string;
  title: string;
  subtitle?: string;
  options?: { text: string; nextKey?: string; highlight?: "emergency" | "gp" | "self" }[];
}

interface Props {
  slides: Slide[];
  startKey: string;
  extraInfo?: { title: string; sections: { icon: string; heading: string; text: string }[] };
}

export default function DecisionTemplate({ slides, startKey, extraInfo }: Props) {
  const { t } = useTranslation("healthcare");
  const [currentKey, setCurrentKey] = useState(startKey);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const slide = slides.find((s) => s.key === currentKey);

  const handleOption = (nextKey?: string) => {
    if (nextKey) setCurrentKey(nextKey);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <PageNavigation
        title={t("gp.whenToSee", { defaultValue: "When to See a GP" })}
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
        showBackButton={true}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Quiz section */}
        {slide ? (
          <View style={styles.slide}>
            <Text style={styles.icon}>{slide.icon}</Text>
            <Text style={styles.title}>{slide.title}</Text>
            {slide.subtitle ? <Text style={styles.subtitle}>{slide.subtitle}</Text> : null}

            <View style={styles.options}>
              {slide.options?.map((opt, i) => (
                <Pressable
                  key={i}
                  style={[
                    styles.option,
                    opt.highlight === "emergency" && styles.emergency,
                    opt.highlight === "gp" && styles.gp,
                    opt.highlight === "self" && styles.self,
                  ]}
                  onPress={() => handleOption(opt.nextKey)}
                >
                  <Text style={styles.optionText}>{opt.text}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : (
          <Text style={styles.title}>{t("gp.end", { defaultValue: "That’s all!" })}</Text>
        )}

        {/* Extra information (long text) */}
        {extraInfo && (
          <View style={styles.extra}>
            <Text style={styles.extraTitle}>{extraInfo.title}</Text>
            {extraInfo.sections.map((section, idx) => (
              <View key={idx} style={styles.extraSection}>
                <Text style={styles.extraIcon}>{section.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.extraHeading}>{section.heading}</Text>
                  <Text style={styles.extraText}>{section.text}</Text>
                </View>
              </View>
            ))}
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
  container: { flexGrow: 1, alignItems: "center", justifyContent: "flex-start", padding: 16 },
  slide: { alignItems: "center", maxWidth: 400, marginBottom: 30 },
  icon: { fontSize: 60, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 16, textAlign: "center", color: "#555", marginBottom: 20 },
  options: { width: "100%", gap: 12 },
  option: { padding: 14, borderRadius: 10, backgroundColor: "#eee", alignItems: "center" },
  optionText: { fontSize: 16, fontWeight: "600", textAlign: "center" },
  emergency: { backgroundColor: "#DC2626" },
  gp: { backgroundColor: "#2563EB" },
  self: { backgroundColor: "#10B981" },

  extra: { marginTop: 30, paddingTop: 10, borderTopWidth: 1, borderColor: "#ddd", width: "100%" },
  extraTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  extraSection: { flexDirection: "row", marginBottom: 16 },
  extraIcon: { fontSize: 24, marginRight: 10 },
  extraHeading: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  extraText: { fontSize: 14, color: "#444" },
});
