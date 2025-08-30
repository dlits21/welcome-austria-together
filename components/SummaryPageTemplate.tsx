import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  useWindowDimensions,
  Linking,
  Alert,
  Platform,
  Dimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import * as Speech from "expo-speech";
import { useRouter } from "expo-router";
import PageNavigation from "./PageNavigation";
import TutorialModal from './TutorialModal';
import LanguageModal from './LanguageModal';
import VirtualAssistantModal from './VirtualAssistantModal';
import YoutubePlayer from "react-native-youtube-iframe";

interface InfoTileData {
  key: string;
  icon: string;
  title: string;
  sub: string;
  onPress: () => void;
}

interface ContactData {
  name: string;
  phone?: string;
  url?: string;
  subtitle?: string;
  onCall?: () => void;
}

interface HealthPageTemplateProps {
  translationNamespace: string;
  videoId?: string;
  tiles: InfoTileData[];
  contacts: ContactData[];
  emergencyRoute?: string;
}

const InfoTile: React.FC<{
  title: string;
  subtitle?: string;
  icon?: string;
  onPress?: () => void;
  onLongPress?: () => void;
}> = ({ title, subtitle, icon = "💬", onPress, onLongPress }) => {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.tile, pressed && styles.tilePressed]}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${subtitle ?? ""}`}
    >
      <Text style={styles.tileIcon}>{icon}</Text>
      <Text style={styles.tileTitle} numberOfLines={2}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={styles.tileSubtitle} numberOfLines={2}>
          {subtitle}
        </Text>
      ) : null}
    </Pressable>
  );
};

const ContactCard: React.FC<{
  name: string;
  phone?: string;
  url?: string;
  subtitle?: string;
  onCall?: () => void;
}> = ({ name, phone, url, subtitle, onCall }) => {
  const openUrl = () => {
    if (url) Linking.openURL(url).catch(() => Alert.alert("Cannot open link"));
  };
  const call = () => {
    if (phone) {
      const tel = Platform.OS === "android" ? `tel:${phone}` : `telprompt:${phone}`;
      Linking.openURL(tel).catch(() => Alert.alert("Cannot open dialer"));
    } else if (onCall) onCall();
  };

  return (
    <View style={styles.contactCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.contactName}>{name}</Text>
        {subtitle ? <Text style={styles.contactSub}>{subtitle}</Text> : null}
      </View>

      <View style={styles.contactActions}>
        {phone ? (
          <Pressable style={styles.contactButton} onPress={call}>
            <Text style={styles.contactButtonText}>📞</Text>
          </Pressable>
        ) : null}
        {url ? (
          <Pressable style={styles.contactButton} onPress={openUrl}>
            <Text style={styles.contactButtonText}>🔗</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const VideoEmbed: React.FC<{ videoId: string }> = ({ videoId }) => {
  const width = Math.min(Dimensions.get("window").width * 0.9, 840);
  const height = Math.floor(width * (9 / 16));
  const [playing, setPlaying] = useState(false);
  const onStateChange = (state: string) => {
    // you can react to "playing", "paused", "ended" events if needed
  };
  return (
    <View style={styles.videoWrap}>
      <YoutubePlayer width={width} height={height} play={playing} videoId={videoId} onChangeState={onStateChange} />
    </View>
  );
};

export default function HealthPageTemplate({
  translationNamespace,
  videoId,
  tiles,
  contacts,
  emergencyRoute
}: HealthPageTemplateProps) {
  const { t, i18n } = useTranslation(translationNamespace);
  const router = useRouter();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const { width } = useWindowDimensions();

  // Short helper to speak text using the currently selected language TTS.
  const speak = useCallback(
    (text: string) => {
      if (!text) return;
      const ttsLang = t("tts_lang", { defaultValue: "de-DE" });
      try {
        Speech.stop();
        Speech.speak(text, { language: ttsLang });
      } catch (e) {
        console.warn("TTS error", e);
      }
    },
    [t]
  );

  // Play short tips sequentially
  const playAllTips = () => {
    const ttsLang = t("tts_lang", { defaultValue: "de-DE" });
    Speech.stop();
    const lines = [
      t("tips.intro", { defaultValue: "Here are quick tips." }),
      t("tips.1", { defaultValue: "If you feel in danger, call emergency services." }),
      t("tips.2", { defaultValue: "Talk to someone you trust." }),
      t("tips.3", { defaultValue: "If feeling worse, seek a doctor or mental health worker." }),
    ];
    let delay = 0;
    lines.forEach((line) => {
      setTimeout(() => {
        Speech.speak(line, { language: ttsLang });
      }, delay);
      delay += 1600;
    });
  };

  // Quick actions
  const callEmergency = () => {
    const emergencyNumber = t("emergency_number", { defaultValue: "112" });
    const tel = Platform.OS === "android" ? `tel:${emergencyNumber}` : `telprompt:${emergencyNumber}`;
    Linking.openURL(tel).catch(() => {
      Alert.alert(t("cannot_call", { defaultValue: "Cannot open phone dialer" }));
    });
  };

  const openContacts = () => {
    router.push("/information/contacts");
  };

  // layout columns for responsiveness
  const columns = width < 600 ? 2 : width < 900 ? 3 : 4;
  const tileBasis = `${100 / columns}%`;

  return (
    <SafeAreaView style={styles.safe}>
      <PageNavigation
        title={t("pageTitle", { defaultValue: "Health Information" })}
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
        showBackButton={true}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Intro */}
        <Text style={styles.title}>{t("pageTitle", { defaultValue: "Health Information" })}</Text>
        <Text style={styles.lead}>{t("pageIntro", { defaultValue: "Important health information and resources." })}</Text>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <Pressable style={styles.primaryBtn} onPress={playAllTips}>
            <Text style={styles.primaryBtnText}>{t("playTips", { defaultValue: "Listen to tips" })}</Text>
          </Pressable>

          <Pressable style={styles.ghostBtn} onPress={callEmergency}>
            <Text style={styles.ghostBtnText}>{t("emergency", { defaultValue: "Emergency" })}</Text>
          </Pressable>
        </View>

        {/* Visual video (optional) */}
        {videoId && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("videoTitle", { defaultValue: "Short explainer" })}</Text>
            <VideoEmbed videoId={videoId} />
          </View>
        )}

        {/* Tiles grid (short, visual) */}
        <View style={styles.grid}>
          {tiles.map((tile) => (
            <View key={tile.key} style={[styles.gridItem, { flexBasis: tileBasis, maxWidth: tileBasis }]}>
              <InfoTile
                icon={tile.icon}
                title={tile.title}
                subtitle={tile.sub}
                onPress={tile.onPress}
                onLongPress={() => speak(`${tile.title}. ${tile.sub}`)}
              />
            </View>
          ))}
        </View>

        {/* Contacts block */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("trustedTitle", { defaultValue: "Trusted support" })}</Text>

          {contacts.map((contact, index) => (
            <ContactCard
              key={index}
              name={contact.name}
              phone={contact.phone}
              url={contact.url}
              subtitle={contact.subtitle}
              onCall={contact.onCall}
            />
          ))}

          <View style={{ height: 12 }} />
          <Pressable style={styles.contactsButton} onPress={openContacts}>
            <Text style={styles.contactsButtonText}>{t("moreContacts", { defaultValue: "More contacts" })}</Text>
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
        tutorialData="home"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { paddingHorizontal: 16, paddingBottom: 48, paddingTop: 12 },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 6 },
  lead: { fontSize: 15, textAlign: "center", color: "#444", marginBottom: 12 },

  actionsRow: { flexDirection: "row", justifyContent: "center", gap: 12, marginVertical: 10 },
  primaryBtn: { flex: 1, backgroundColor: "#2563EB", paddingVertical: 12, borderRadius: 8, alignItems: "center", marginRight: 8 },
  primaryBtnText: { color: "#fff", fontWeight: "700" },
  ghostBtn: { flex: 1, backgroundColor: "#ef4444", paddingVertical: 12, borderRadius: 8, alignItems: "center", marginLeft: 8 },
  ghostBtnText: { color: "#fff", fontWeight: "700" },

  section: { marginTop: 18 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },

  videoWrap: { alignItems: "center", marginBottom: 12 },

  grid: { marginTop: 12, flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start" },
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

  contactCard: { flexDirection: "row", alignItems: "center", padding: 12, borderWidth: 1, borderColor: "#e6e6e6", borderRadius: 10, marginBottom: 10 },
  contactName: { fontSize: 15, fontWeight: "700", color: "#111" },
  contactSub: { fontSize: 13, color: "#6b7280", marginTop: 2 },
  contactActions: { flexDirection: "row", marginLeft: 12 },
  contactButton: { backgroundColor: "#2563EB", padding: 10, borderRadius: 8, marginLeft: 6 },
  contactButtonText: { color: "#fff", fontWeight: "700" },

  contactsButton: { backgroundColor: "#059669", paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  contactsButtonText: { color: "#fff", fontWeight: "700" },
});