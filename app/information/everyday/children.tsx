import React, { useCallback, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  FlatList,
  I18nManager,
  useWindowDimensions,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import PageNavigation from "../../../components/PageNavigation";
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';

// ---- Types
type Tile = {
  id: string;              // route segment
  i18nKey: string;         // tiles.<key>.* in the "children" namespace
  color: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  priority?: number;       // lower = earlier
};

// ---- Children topics (stable IDs for routes)
const TILES: Tile[] = [
  { id: "child-protection",       i18nKey: "child-protection",       color: "#F97316", icon: "report",           priority: 1 },
  { id: "childrens-rights",       i18nKey: "childrens-rights",       color: "#3B82F6", icon: "gavel",            priority: 2 },
  { id: "healthcare",             i18nKey: "healthcare",             color: "#F59E0B", icon: "medical-services", priority: 3 },
  { id: "mental-health",          i18nKey: "mental-health",          color: "#EF4444", icon: "psychology",       priority: 4 },
  { id: "education",              i18nKey: "education",              color: "#10B981", icon: "school",           priority: 5 },
  { id: "childcare",              i18nKey: "childcare",              color: "#8B5CF6", icon: "child-care",       priority: 6 },
  { id: "family-support",         i18nKey: "family-support",         color: "#06B6D4", icon: "groups",           priority: 7 },
  { id: "developmental-services", i18nKey: "developmental-services", color: "#84CC16", icon: "emoji-nature",     priority: 8 },
];

// ---- Utility
const norm = (s: string) => (s || "").toLowerCase().normalize("NFKD");

export default function ChildrenPage() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { t } = useTranslation("children");

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [q, setQ] = useState("");

  // Responsive columns similar to everyday.tsx
  const columns = width < 600 ? 2 : width < 900 ? 3 : 4;
  const gap = 12;
  const horizPad = 16;
  const cardWidth =
    (width - horizPad * 2 - gap * (columns - 1)) / columns;

  const speak = useCallback(
    (text: string) => {
      if (!text) return;
      const ttsLang = t("tts_lang", { defaultValue: "de-DE" });
      try {
        Speech.stop();
        Speech.speak(text, {
          language: ttsLang,
          rate: Platform.OS === "ios" ? 0.5 : 0.95,
          pitch: 1.0,
        });
      } catch (e) {
        console.warn("TTS error", e);
      }
    },
    [t]
  );

  // Search in localized titles + ids
  const orderedTiles = useMemo(
    () => [...TILES].sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99)),
    []
  );

  const filtered = useMemo(() => {
    const query = norm(q);
    if (!query) return orderedTiles;
    return orderedTiles.filter((tile) => {
      const title = t(`tiles.${tile.i18nKey}.title`, tile.i18nKey);
      return norm(title).includes(query) || norm(tile.id).includes(query);
    });
  }, [q, orderedTiles, t]);

  const onSubmitSearch = useCallback(() => {
    // track("children_search", { q, results: filtered.length });
    if (filtered.length === 1) {
      router.push(`/information/children/${filtered[0].id}`);
    }
  }, [filtered, q, router]);

  const handleTilePress = useCallback(
    (id: string) => {
      // track("children_tile_tap", { id });
      router.push(`/information/children/${id}`);
    },
    [router]
  );

  const renderTile = useCallback(
    ({ item }: { item: Tile }) => {
      const title = t(`tiles.${item.i18nKey}.title`, item.i18nKey);
      const subtitle = t(`tiles.${item.i18nKey}.subtitle`, "");
      const labelForA11y = subtitle ? `${title}. ${subtitle}` : title;

      return (
        <Pressable
          key={item.id}
          onPress={() => handleTilePress(item.id)}
          onLongPress={() => speak(labelForA11y)}
          style={[
            styles.tile,
            {
              flexBasis: cardWidth,
              maxWidth: cardWidth,
              borderColor: item.color + "40",
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel={labelForA11y}
          accessibilityHint={t("a11y.openDetail")}
        >
          <View
            style={[
              styles.tileIconContainer,
              { backgroundColor: item.color + "20" },
            ]}
            accessible={false}
          >
            <MaterialIcons name={item.icon} size={28} />
          </View>
          <Text style={styles.tileTitle} numberOfLines={2} allowFontScaling>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.tileSubtitle} numberOfLines={2} allowFontScaling>
              {subtitle}
            </Text>
          ) : null}
        </Pressable>
      );
    },
    [cardWidth, handleTilePress, speak, t]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <PageNavigation
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
        showBackButton={true}
        title={t("pageTitle")}
      />

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Intro + Listen */}
        <View
          style={[
            styles.headerRow,
            I18nManager.isRTL && { flexDirection: "row-reverse" },
          ]}
        >
          <Text style={styles.intro} accessibilityRole="header">
            {t("introShort")}
          </Text>
          <Pressable
            style={styles.listenBtn}
            onPress={() => speak(`${t("pageTitle")}. ${t("introShort")}`)}
            accessibilityRole="button"
            accessibilityLabel={t("a11y.listenSection")}
          >
            <MaterialIcons name="volume-up" size={22} />
          </Pressable>
        </View>

        {/* Search */}
        <View
          style={[
            styles.searchRow,
            I18nManager.isRTL && { flexDirection: "row-reverse" },
          ]}
        >
          <TextInput
            style={[
              styles.searchInput,
              I18nManager.isRTL && { textAlign: "right" },
            ]}
            placeholder={t("searchPlaceholder")}
            placeholderTextColor="#999"
            value={q}
            onChangeText={setQ}
            returnKeyType="search"
            onSubmitEditing={onSubmitSearch}
            accessibilityLabel={t("a11y.search")}
            accessibilityHint={t("a11y.searchHint")}
          />
          <Pressable
            style={styles.searchBtn}
            onPress={onSubmitSearch}
            accessibilityRole="button"
            accessibilityLabel={t("a11y.search")}
          >
            <MaterialIcons name="search" size={22} color="#fff" />
          </Pressable>
        </View>

        {/* Grid */}
        <View style={[styles.grid, { gap }]}>
          <FlatList
            data={filtered}
            renderItem={renderTile}
            keyExtractor={(i) => i.id}
            numColumns={columns}
            columnWrapperStyle={{ justifyContent: "space-between", gap }}
            scrollEnabled={false}
            initialNumToRender={8}
            windowSize={5}
            removeClippedSubviews
            accessibilityRole="grid"
          />
        </View>

        {/* Quick emergency CTA */}
        <View style={styles.footer}>
          <Pressable
            style={styles.helpBtn}
            onPress={() => router.push("/emergency")}
            accessibilityRole="button"
            accessibilityLabel={t("quickHelp")}
          >
            <Text style={styles.helpBtnText}>{t("quickHelp")}</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Modals — keep parity with Everyday */}
      {/* If these modals are in a higher layout, remove these states */}
      {/* LanguageModal / VirtualAssistantModal / TutorialModal are called from PageNavigation in your example; omit duplicate modals here to avoid double mounts */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { paddingHorizontal: 16, paddingBottom: 40, paddingTop: 12 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
    marginBottom: 8,
  },
  intro: {
    fontSize: 20,
    fontWeight: "700",
    maxWidth: "85%",
  },
  listenBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },

  searchRow: { flexDirection: "row", marginTop: 8, marginBottom: 16 },
  searchInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  searchBtn: {
    marginLeft: 8,
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
  },

  grid: { marginTop: 8 },
  tile: {
    borderWidth: 2,
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: 12,
    minHeight: 132,
  },
  tileIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  tileTitle: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 20,
  },
  tileSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },

  footer: { marginTop: 18, alignItems: "center" },
  helpBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#DC2626",
    borderRadius: 8,
  },
  helpBtnText: { color: "#fff", fontWeight: "700" },
});
