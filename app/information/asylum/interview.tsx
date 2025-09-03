import React, { useState } from "react";
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
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import PageNavigation from "../../../components/PageNavigation";
import TutorialModal from '../../../components/TutorialModal';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import { ContactButton } from "../../../components/ContactButton";

interface QuestionItemProps {
  question: string;
  answer: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, answer, isExpanded, onToggle }) => {
  return (
    <View style={styles.questionContainer}>
      <Pressable style={styles.questionHeader} onPress={onToggle}>
        <Text style={styles.questionText}>{question}</Text>
        <MaterialIcons 
          name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={24} 
          color="#2563EB" 
        />
      </Pressable>
      {isExpanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

interface DosDontsItemProps {
  icon: string;
  text: string;
  type: 'do' | 'dont';
}

const DosDontsItem: React.FC<DosDontsItemProps> = ({ icon, text, type }) => {
  const iconName = icon === 'check-circle' ? 'check-circle' : 'cancel';
  const iconColor = type === 'do' ? '#059669' : '#DC2626';
  
  return (
    <View style={styles.dosDontsItem}>
      <MaterialIcons name={iconName} size={20} color={iconColor} style={styles.dosDontsIcon} />
      <Text style={styles.dosDontsText}>{text}</Text>
    </View>
  );
};

export default function InterviewPrep() {
  const { t } = useTranslation("interviewPrep");
  const router = useRouter();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const { width } = useWindowDimensions();

  // Tiles for navigation
  const tiles = [
    {
      key: "preparation",
      icon: "📋",
      title: t("tiles.preparation_title"),
      sub: t("tiles.preparation_sub"),
      onPress: () => router.push("/information/asylum/interview/preparation"),
    },
    {
      key: "documents",
      icon: "📄",
      title: t("tiles.documents_title"),
      sub: t("tiles.documents_sub"),
      onPress: () => router.push("/information/asylum/interview/documents"),
    },
    {
      key: "rights",
      icon: "⚖️",
      title: t("tiles.rights_title"),
      sub: t("tiles.rights_sub"),
      onPress: () => router.push("/information/asylum/interview/rights"),
    },
    {
      key: "process",
      icon: "🔄",
      title: t("tiles.process_title"),
      sub: t("tiles.process_sub"),
      onPress: () => router.push("/information/asylum/interview/process"),
    },
    {
      key: "testimony",
      icon: "💬",
      title: t("tiles.testimony_title"),
      sub: t("tiles.testimony_sub"),
      onPress: () => router.push("/information/asylum/interview/testimony"),
    },
    {
      key: "translator",
      icon: "🌐",
      title: t("tiles.translator_title"),
      sub: t("tiles.translator_sub"),
      onPress: () => router.push("/information/asylum/interview/translator"),
    },
  ];

  // Questions data
  const questions = t("questions", { returnObjects: true }) as Array<{question: string, answer: string}>;
  const dos = t("dos", { returnObjects: true }) as Array<{icon: string, text: string}>;
  const donts = t("donts", { returnObjects: true }) as Array<{icon: string, text: string}>;

  // Contacts
  const contacts = [
    {
      name: t("trusted.legal_aid_name"),
      phone: t("trusted.legal_aid_phone"),
      url: t("trusted.legal_aid_url"),
      subtitle: t("trusted.legal_aid_sub"),
    },
    {
      name: t("trusted.caritas_name"),
      phone: t("trusted.caritas_phone"),
      url: t("trusted.caritas_url"),
      subtitle: t("trusted.caritas_sub"),
    },
    {
      name: t("trusted.refugee_name"),
      phone: t("trusted.refugee_phone"),
      url: t("trusted.refugee_url"),
      subtitle: t("trusted.refugee_sub"),
    },
    {
      name: t("trusted.women_name"),
      phone: t("trusted.women_phone"),
      subtitle: t("trusted.women_sub"),
    },
  ];

  // Layout columns for responsiveness
  const columns = width < 600 ? 2 : width < 900 ? 3 : 4;
  const tileBasis = `${100 / columns}%`;

  return (
    <SafeAreaView style={styles.safe}>
      <PageNavigation
        title={t("pageTitle")}
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
        showBackButton={true}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Intro */}
        <Text style={styles.title}>{t("pageTitle")}</Text>
        <Text style={styles.lead}>{t("pageIntro")}</Text>

        {/* Quick access tiles */}
        <View style={styles.grid}>
          {tiles.map((tile) => (
            <View key={tile.key} style={[styles.gridItem, { flexBasis: tileBasis, maxWidth: tileBasis }]}>
              <Pressable
                onPress={tile.onPress}
                style={({ pressed }) => [styles.tile, pressed && styles.tilePressed]}
              >
                <Text style={styles.tileIcon}>{tile.icon}</Text>
                <Text style={styles.tileTitle} numberOfLines={2}>
                  {tile.title}
                </Text>
                <Text style={styles.tileSubtitle} numberOfLines={2}>
                  {tile.sub}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>

        {/* Do's and Don'ts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("sections.dos_title")}</Text>
          {dos.map((item, index) => (
            <DosDontsItem key={index} icon={item.icon} text={item.text} type="do" />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("sections.donts_title")}</Text>
          {donts.map((item, index) => (
            <DosDontsItem key={index} icon={item.icon} text={item.text} type="dont" />
          ))}
        </View>

        {/* Common Questions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("sections.questions_title")}</Text>
          {questions.map((item, index) => (
            <QuestionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isExpanded={expandedQuestion === index}
              onToggle={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
            />
          ))}
        </View>

        {/* Confidentiality Assurance */}
        <View style={styles.confidentialityBox}>
          <Text style={styles.confidentialityTitle}>{t("confidentiality.title")}</Text>
          <Text style={styles.confidentialityText}>{t("confidentiality.text")}</Text>
        </View>

        {/* Trusted NGO References */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("trustedTitle")}</Text>
          {contacts.map((contact, index) => (
            <ContactButton
              key={index}
              name={contact.name}
              phone={contact.phone}
              url={contact.url}
              subtitle={contact.subtitle}
            />
          ))}
          
          <Pressable 
            style={styles.moreContactsButton} 
            onPress={() => router.push("/information/contacts")}
          >
            <Text style={styles.moreContactsText}>{t("moreContacts")}</Text>
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
        tutorialData="asylum"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { paddingHorizontal: 16, paddingBottom: 48, paddingTop: 12 },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 6 },
  lead: { fontSize: 15, textAlign: "center", color: "#444", marginBottom: 20 },

  section: { marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },

  grid: { marginTop: 16, flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" },
  gridItem: { paddingHorizontal: 6, marginVertical: 8 },

  tile: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  tilePressed: { opacity: 0.9 },
  tileIcon: { fontSize: 28, marginBottom: 8 },
  tileTitle: { fontSize: 16, fontWeight: "700", textAlign: "center", color: "#111" },
  tileSubtitle: { fontSize: 13, textAlign: "center", color: "#6b7280", marginTop: 6 },

  dosDontsItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  dosDontsIcon: {
    marginTop: 2,
    marginRight: 12,
  },
  dosDontsText: {
    fontSize: 15,
    color: "#374151",
    flex: 1,
    lineHeight: 22,
  },

  questionContainer: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 8,
    overflow: "hidden",
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    marginRight: 8,
  },
  answerContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
  },
  answerText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },

  confidentialityBox: {
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#bbf7d0",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  confidentialityTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#059669",
    marginBottom: 8,
  },
  confidentialityText: {
    fontSize: 14,
    color: "#065f46",
    lineHeight: 20,
  },

  moreContactsButton: {
    backgroundColor: "#059669",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  moreContactsText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});