import React from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";
import PageNavigation from "../../../../components/PageNavigation";
import StatusQuizBox from "../../../../components/StatusQuizBox";
import StatusComparisonChart from "../../../../components/StatusComparisonChart";
import LanguageModal from "../../../../components/LanguageModal";
import VirtualAssistantModal from "../../../../components/VirtualAssistantModal";
import TutorialModal from "../../../../components/TutorialModal";

export default function LegalQuizPage() {
  const { t } = useTranslation("asylumLegalQuiz");
  const [languageModalVisible, setLanguageModalVisible] = React.useState(false);
  const [virtualAssistantModalVisible, setVirtualAssistantModalVisible] = React.useState(false);
  const [tutorialModalVisible, setTutorialModalVisible] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <PageNavigation
        title={t("pageTitle", { defaultValue: "Find Your Status" })}
        onLanguagePress={() => setLanguageModalVisible(true)}
        onVirtualAssistantPress={() => setVirtualAssistantModalVisible(true)}
        onTutorialPress={() => setTutorialModalVisible(true)}
      />
      
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <StatusQuizBox translationNamespace="asylumLegalQuiz" />
        <StatusComparisonChart translationNamespace="asylumLegalQuiz" />
      </ScrollView>

      <LanguageModal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
      />
      <VirtualAssistantModal
        visible={virtualAssistantModalVisible}
        onClose={() => setVirtualAssistantModalVisible(false)}
      />
      <TutorialModal
        visible={tutorialModalVisible}
        onClose={() => setTutorialModalVisible(false)}
        translationNamespace="asylumLegalQuiz"
      />
    </SafeAreaView>
  );
}