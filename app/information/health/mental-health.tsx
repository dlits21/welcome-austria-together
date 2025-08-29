// app/information/healthcare/mental-health-basics.tsx
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
import { useTranslation, Trans } from "react-i18next";
import * as Speech from "expo-speech";
import { useRouter } from "expo-router";
import PageNavigation from "../../../components/PageNavigation";
import CategoryCard from "../../../components/CategoryCard";
import YoutubePlayer from "react-native-youtube-iframe";

/**
 * Mental Health Basics - Information page
 * - Namespace used for i18n: "healthcare"
 * - Keys referenced below (add them to assets/locales/<lang>/healthcare.json)
 *
 * Example keys:
 * healthcare: {
 *   "mentalTitle": "Mental health basics",
 *   "mentalIntro": "Short help: feelings are normal. If you are worried get help.",
 *   "playTips": "Listen to tips",
 *   "callHelp": "Call helpline",
 *   "emergency": "Emergency",
 *   "tips": {
 *      "intro": "Short tips to feel better",
 *      "1": "If you feel very unsafe call emergency services.",
 *      "2": "Talk to someone you trust — a friend or an adult.",
 *      "3": "If it is persistent, see a doctor or a mental health worker."
 *   },
 *   "tiles": {
 *      "signs_title": "Signs to watch",
 *      "signs_sub": "What to look for",
 *      "what_title": "What to do",
 *      "what_sub": "Simple actions",
 *      ... etc
 *   }
 * }
 */

// Small helper components (can be extracted to their own files)
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

export default function MentalHealthBasics() {
  const { t, i18n } = useTranslation("healthcare");
  const router = useRouter();
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

  // Tiles content (short entries)
  const tiles = [
    {
      key: "signs",
      icon: "⚠️",
      title: t("tiles.signs_title", { defaultValue: "Signs to watch" }),
      sub: t("tiles.signs_sub", { defaultValue: "Changes in sleep, eating, mood" }),
      onPress: () => router.push("/information/healthcare/mental-signs"),
    },
    {
      key: "what",
      icon: "🛠️",
      title: t("tiles.what_title", { defaultValue: "What to do" }),
      sub: t("tiles.what_sub", { defaultValue: "Simple steps to feel better" }),
      onPress: () => router.push("/information/healthcare/what-to-do"),
    },
    {
      key: "seek",
      icon: "🏥",
      title: t("tiles.seek_title", { defaultValue: "Where to get help" }),
      sub: t("tiles.seek_sub", { defaultValue: "NGOs, clinics, doctors" }),
      onPress: () => router.push("/information/healthcare/where-to-get-help"),
    },
    {
      key: "self",
      icon: "🌿",
      title: t("tiles.self_title", { defaultValue: "Small self-care" }),
      sub: t("tiles.self_sub", { defaultValue: "Breathing, short walks, routines" }),
      onPress: () => router.push("/information/healthcare/self-care"),
    },
    {
      key: "for-parents",
      icon: "👨‍👩‍👧",
      title: t("tiles.parents_title", { defaultValue: "For parents" }),
      sub: t("tiles.parents_sub", { defaultValue: "How to support your child" }),
      onPress: () => router.push("/information/healthcare/for-parents"),
    },
    {
      key: "hotlines",
      icon: "☎️",
      title: t("tiles.hotlines_title", { defaultValue: "Hotlines & immediate" }),
      sub: t("tiles.hotlines_sub", { defaultValue: "Call if someone is at risk" }),
      onPress: openContacts,
    },
  ];

  // layout columns for responsiveness
  const columns = width < 600 ? 2 : width < 900 ? 3 : 4;
  const tileBasis = `${100 / columns}%`;

  return (
    <SafeAreaView style={styles.safe}>
      <PageNavigation
        title={t("mentalTitle", { defaultValue: "Mental health basics" })}
        showBackButton
        showLanguageModal={() => {}}
        showTutorial={() => {}}
        showVirtualAssistant={() => {}}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Intro */}
        <Text style={styles.title}>{t("mentalTitle", { defaultValue: "Mental health basics" })}</Text>
        <Text style={styles.lead}>{t("mentalIntro", { defaultValue: "Feeling worried or low is common. Get help early." })}</Text>

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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("videoTitle", { defaultValue: "Short explainer" })}</Text>
          {/* Example YouTube embed — change videoId to your content */}
          <VideoEmbed videoId={t("exampleVideoId", { defaultValue: "Q607TYRBxFU" })} />
        </View>

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

        {/* Contacts block - show a few recommended trusted resources (prefer non-state NGO first if available) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("trustedTitle", { defaultValue: "Trusted support" })}</Text>

          <ContactCard
            name={t("trusted.ngo_name", { defaultValue: "Local mental health NGO" })}
            phone={t("trusted.ngo_phone", { defaultValue: "0800 111 222" })}
            url={t("trusted.ngo_url", { defaultValue: "https://example.org" })}
            subtitle={t("trusted.ngo_sub", { defaultValue: "Confidential help in multiple languages" })}
          />

          <ContactCard
            name={t("trusted.child_services", { defaultValue: "Child / youth services" })}
            phone={t("trusted.child_phone", { defaultValue: "0800 333 444" })}
            subtitle={t("trusted.child_sub", { defaultValue: "Support for children and families" })}
          />

          <ContactCard
            name={t("trusted.national_hotline", { defaultValue: "National Suicide Prevention" })}
            phone={t("trusted.national_phone", { defaultValue: "116 123" })}
            url={t("trusted.national_url", { defaultValue: "https://examplehelpline.org" })}
            subtitle={t("trusted.national_sub", { defaultValue: "24/7 hotline" })}
          />

          <View style={{ height: 12 }} />
          <Pressable style={styles.contactsButton} onPress={openContacts}>
            <Text style={styles.contactsButtonText}>{t("moreContacts", { defaultValue: "More contacts" })}</Text>
          </Pressable>
        </View>
      </ScrollView>
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

