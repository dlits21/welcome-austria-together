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
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import PageNavigation from "./PageNavigation";
import TutorialModal from "./TutorialModal";
import LanguageModal from "./LanguageModal";
import VirtualAssistantModal from "./VirtualAssistantModal";

interface DocumentItem {
  id: string;
  title: string;
  note?: string;
  required?: boolean;
}

interface Props {
  translationNamespace: string;
  title: string;
  required: DocumentItem[];
  optional?: DocumentItem[];
  disclaimer?: string;
}

export default function DocumentChecklistTemplate({
  translationNamespace,
  title,
  required,
  optional,
  disclaimer,
}: Props) {
  const { t } = useTranslation(translationNamespace);
  const [checked, setChecked] = useState<string[]>([]);
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const toggle = (id: string) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const pickImage = async (id: string) => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhotos((prev) => ({ ...prev, [id]: uri }));
      Alert.alert(t("photo_saved", { defaultValue: "Photo saved locally" }));
    }
  };

  const renderItem = (item: DocumentItem) => (
    <View
      key={item.id}
      style={[
        styles.item,
        checked.includes(item.id) && styles.itemChecked,
      ]}
    >
      <Pressable style={{ flex: 1 }} onPress={() => toggle(item.id)}>
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
        style={styles.cameraButton}
        onPress={() => pickImage(item.id)}
      >
        <Text style={styles.cameraIcon}>📸</Text>
      </Pressable>

      {photos[item.id] && (
        <Image source={{ uri: photos[item.id] }} style={styles.thumbnail} />
      )}

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
    flexWrap: "wrap",
  },
  itemChecked: { backgroundColor: "#e0f7fa" },
  itemTitle: { fontSize: 16, fontWeight: "600" },
  itemNote: { fontSize: 13, color: "#666" },
  checkbox: { fontSize: 20, marginLeft: 8 },
  cameraButton: {
    marginLeft: 8,
    backgroundColor: "#2563EB",
    borderRadius: 8,
    padding: 6,
  },
  cameraIcon: { fontSize: 18, color: "#fff" },
  thumbnail: {
    width: 40,
    height: 40,
    marginLeft: 8,
    borderRadius: 4,
  },
  warningBox: {
    marginTop: 20,
    padding: 14,
    backgroundColor: "#fff3cd",
    borderRadius: 10,
  },
  warningText: { color: "#856404", fontSize: 14 },
});
