// components/DocumentChecklistTemplate.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";
import PageNavigation from "./PageNavigation";
import TutorialModal from "./TutorialModal";
import LanguageModal from "./LanguageModal";
import VirtualAssistantModal from "./VirtualAssistantModal";

interface DocumentItem {
  id: string;
  title: string;
  note?: string;
  required?: boolean;
  icon?: keyof typeof MaterialIcons.glyphMap;
}

interface Props {
  translationNamespace: string;
  title: string;
  required: DocumentItem[];
  optional?: DocumentItem[];
  disclaimer?: string;
  videoId?: string;
}

export default function DocumentChecklistTemplate({
  translationNamespace,
  title,
  required,
  optional,
  disclaimer,
  videoId,
}: Props) {
  const { t } = useTranslation(translationNamespace);
  const [checked, setChecked] = useState<string[]>([]);
  const [selectedInfo, setSelectedInfo] = useState<DocumentItem | null>(null);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const toggle = (id: string) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const showInfo = (item: DocumentItem) => {
    setSelectedInfo(item);
  };

  const getDocumentIcon = (id: string): keyof typeof MaterialIcons.glyphMap => {
    const iconMap: Record<string, keyof typeof MaterialIcons.glyphMap> = {
      passport: "card-membership",
      birth: "description",
      photos: "photo-camera",
      marriage: "favorite",
      medical: "medical-services",
      appeal_letter: "gavel",
      rejection_notice: "warning",
      legal_help: "balance",
      supporting_documents: "folder",
      witness_statements: "groups",
      proof_origin: "location-on",
      school_work_certificates: "school",
    };
    return iconMap[id] || "description";
  };

  const renderItem = (item: DocumentItem) => (
    <View
      key={item.id}
      style={[
        styles.item,
        checked.includes(item.id) && styles.itemChecked,
      ]}
    >
      <MaterialIcons 
        name={getDocumentIcon(item.id)} 
        size={24} 
        color="#2563EB" 
        style={styles.documentIcon}
      />
      
      <Pressable style={styles.itemContent} onPress={() => toggle(item.id)}>
        <Text style={styles.itemTitle}>
          {t(`docs.${item.id}.title`, { defaultValue: item.title })}
        </Text>
        {item.note && (
          <Text style={styles.itemNote}>
            {t(`docs.${item.id}.note`, { defaultValue: item.note })}
          </Text>
        )}
      </Pressable>

      <Pressable
        style={styles.infoButton}
        onPress={() => showInfo(item)}
      >
        <MaterialIcons name="info" size={20} color="#fff" />
      </Pressable>

      <Text style={styles.checkbox}>
        {checked.includes(item.id) ? "✅" : "⬜️"}
      </Text>
    </View>
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
        {videoId && (
          <View style={styles.videoContainer}>
            <YoutubePlayer
              height={220}
              play={false}
              videoId={videoId}
            />
          </View>
        )}

        <Text style={styles.sectionTitle}>
          {t("checklist.required", { defaultValue: "Required documents" })}
        </Text>
        {required.map(renderItem)}

        {optional && (
          <>
            <Text style={styles.sectionTitle}>
              {t("checklist.optional", {
                defaultValue: "Helpful but not mandatory",
              })}
            </Text>
            {optional.map(renderItem)}
          </>
        )}

        {disclaimer && (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              {t("disclaimer", { defaultValue: disclaimer })}
            </Text>
          </View>
        )}

        <View style={styles.navigationButtons}>
          <Pressable 
            style={styles.navButton}
            onPress={() => router.push("/information/contacts")}
          >
            <MaterialIcons name="contact-phone" size={20} color="#fff" />
            <Text style={styles.navButtonText}>
              {t("trusted_ngos", { defaultValue: "Trusted NGOs" })}
            </Text>
          </Pressable>

          <Pressable 
            style={styles.navButton}
            onPress={() => router.push("/ask")}
          >
            <MaterialIcons name="group" size={20} color="#fff" />
            <Text style={styles.navButtonText}>
              {t("peer_support", { defaultValue: "Peer Support" })}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        visible={!!selectedInfo}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedInfo(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedInfo && t(`docs.${selectedInfo.id}.info_title`, { 
                defaultValue: `About ${selectedInfo.title}` 
              })}
            </Text>
            <Text style={styles.modalText}>
              {selectedInfo && t(`docs.${selectedInfo.id}.info_text`, { 
                defaultValue: "More information about this document would be provided here." 
              })}
            </Text>
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setSelectedInfo(null)}
            >
              <Text style={styles.modalCloseText}>
                {t("close", { defaultValue: "Close" })}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
  videoContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
  },
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
  documentIcon: {
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: { fontSize: 16, fontWeight: "600" },
  itemNote: { fontSize: 13, color: "#666", marginTop: 2 },
  infoButton: {
    marginLeft: 8,
    backgroundColor: "#2563EB",
    borderRadius: 8,
    padding: 6,
  },
  checkbox: { fontSize: 20, marginLeft: 8 },
  warningBox: {
    marginTop: 20,
    padding: 14,
    backgroundColor: "#fff3cd",
    borderRadius: 10,
  },
  warningText: { color: "#856404", fontSize: 14 },
  navigationButtons: {
    flexDirection: "row",
    marginTop: 24,
    gap: 12,
  },
  navButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  navButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  modalCloseButton: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalCloseText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
