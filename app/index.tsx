// app/data/index.tsx
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Text,
  Platform,
  I18nManager,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useTranslation } from "react-i18next";
import i18n from "./i18n"; // adjust path if your i18n export is elsewhere
import { useLanguage } from "../contexts/LanguageContext";
import {
  GermanFlag,
  GBFlag,
  RussianFlag,
  AfghaniFlag,
  IranianFlag,
  SyrianFlag,
  SomaliFlag,
  GeorgianFlag,
  AlbanianFlag,
} from "../components/Flags";

// Minimal Language type
interface Language {
  code: string;
  name: string;
  flag: any;
  ttsLocale?: string;
}

/** --- LANGUAGES: add/remove as needed --- **/
const LANGUAGES: Language[] = [
  { code: "de", name: "Deutsch", flag: GermanFlag, ttsLocale: "de-DE" },
  { code: "en", name: "English", flag: GBFlag, ttsLocale: "en-US" },
  { code: "ru", name: "Русский", flag: RussianFlag, ttsLocale: "ru-RU" },
  { code: "ce", name: "Нохчийн", flag: RussianFlag, ttsLocale: "ru-RU" },
  { code: "prs", name: "دری", flag: AfghaniFlag, ttsLocale: "fa-AF" },
  { code: "ps", name: "پښتو", flag: AfghaniFlag, ttsLocale: "ps-AF" },
  { code: "fa", name: "فارسی", flag: IranianFlag, ttsLocale: "fa-IR" },
  { code: "ar", name: "العربية", flag: SyrianFlag, ttsLocale: "ar-SA" },
  { code: "ku", name: "کوردی", flag: SyrianFlag, ttsLocale: "ar-SA" },
  { code: "so", name: "Soomaali", flag: SomaliFlag, ttsLocale: "so-SO" },
  { code: "ka", name: "ქართული", flag: GeorgianFlag, ttsLocale: "ka-GE" },
  { code: "sq", name: "Shqip", flag: AlbanianFlag, ttsLocale: "sq-AL" },
];

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const { setSelectedLanguage, currentLanguage } = useLanguage();
  const { t } = useTranslation(); // default app language translations
  const { width } = useWindowDimensions();

  // Ensure German default; if context already has a language, respect it
  const defaultLangCode = "de";
  const initialSelectedCode = currentLanguage || defaultLangCode;
  const initialSelected = LANGUAGES.find((l) => l.code === initialSelectedCode) || LANGUAGES[0];

  const [selected, setSelected] = useState<Language | null>(initialSelected);

  // If no currentLanguage in context, set German globally on mount
  useEffect(() => {
    if (!currentLanguage) {
      setSelectedLanguage(defaultLangCode);
      i18n.changeLanguage(defaultLangCode).catch(() => {});
    } else {
      // ensure i18n and selected reflect context
      i18n.changeLanguage(currentLanguage).catch(() => {});
      const match = LANGUAGES.find((l) => l.code === currentLanguage);
      if (match) setSelected(match);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Determine columns: web uses 4 by default and uses full width; otherwise responsive
  const getColumns = () => {
    if (width < 450) return 2;
    if (width < 600) return 3;
    if (width < 900) return 3;
    return 4;
  };
  const columns = getColumns();
  const tileBasisPercent = `${(90)/ columns}%`;

  const isRTL = I18nManager.isRTL;

  // Use translator fixed to selected language (to show UI text in that language)
  const tSelected = (langCode?: string) =>
    langCode ? i18n.getFixedT(langCode, "index") : i18n.getFixedT(i18n.language, "index");

  // Speak short confirmation / announcement in selected language
  const speakSelection = (lang: Language) => {
    const msg =
      tSelected(lang.code)("confirmShort") ||
      fallbackConfirmText(lang.code, lang.name);
    const options: Speech.SpeechOptions = {
      language: lang.ttsLocale ?? mapCodeToLocale(lang.code),
      pitch: 1,
      rate: 1,
    };
    try {
      Speech.stop();
      Speech.speak(msg, options);
    } catch (e) {
      console.warn("TTS failed:", e);
    }
  };

  // Selecting tile => immediately switch app language
  const onSelectLanguage = (lang: Language) => {
    setSelected(lang);
    // persist via context + change i18n immediately
    setSelectedLanguage(lang.code);
    i18n.changeLanguage(lang.code).catch(() => {});
    speakSelection(lang);
  };

  const onContinue = () => {
    router.push("/home");
  };

  const onEmergency = () => {
    router.push("/ask/emergency"); // ensure route exists or adjust accordingly
  };

  // Welcome text renders using current i18n language (which is set to selected on selection)
  const welcomeText = t("index:welcomeTitle", "Welcome");

  // Footer button labels — prefer selected language keys if present
  const confirmLabel = selected ? tSelected(selected.code)("buttons.confirm") || t("buttons.continue", "Continue") : t("buttons.continue", "Continue");
  const emergencyLabel = selected ? tSelected(selected.code)("buttons.help") || t("buttons.help", "Help / Emergency") : t("buttons.help", "Help / Emergency");

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text
            selectable={false}
            accessibilityRole="header"
            accessibilityLabel={welcomeText}
            style={[styles.welcomeTitle, { textAlign: isRTL ? "right" : "center" }]}
          >
            {welcomeText}
          </Text>

          <TouchableOpacity
            style={styles.emergencyBtn}
            onPress={onEmergency}
            accessibilityRole="button"
            accessibilityLabel={emergencyLabel}
          >
            <Text style={styles.emergencyText}>{emergencyLabel}</Text>
          </TouchableOpacity>
        </View>

        {/* Short instruction */}
        <View style={styles.instruction}>
          <Text
            style={[styles.instructionText, { textAlign: isRTL ? "right" : "center" }]}
            accessibilityLabel={t("index:chooseLanguageInstruction", "Choose your language")}
          >
            {t("index:chooseLanguageInstruction", "Choose your language")}
          </Text>
        </View>

        {/* Language grid */}
        <ScrollView contentContainerStyle={[styles.grid, { paddingBottom: 120 }]} keyboardShouldPersistTaps="handled">
          <View style={styles.gridInner}>
            {LANGUAGES.map((lang) => {
              const isSelected = selected?.code === lang.code;
              return (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => onSelectLanguage(lang)}
                  accessibilityRole="button"
                  accessibilityLabel={tSelected(lang.code)("index:switchTo", { nativeName: lang.name })}
                  // use flexBasis and maxWidth percent — prevents leftover gap on wide screens
                  style={[
                    styles.tile,
                    {
                      flexBasis: tileBasisPercent,
                      maxWidth: tileBasisPercent,
                      backgroundColor: isSelected ? "#eaf7ea" : "#f7f7f7",
                      borderColor: isSelected ? "#2b8a3e" : "#e6e6e6",
                      borderWidth: isSelected ? 2 : 1,
                    },
                  ]}
                >
                  <View style={styles.flagWrap} accessible accessibilityLabel={`${lang.name} flag`}>
                    {typeof lang.flag === "function" ? (
                      // @ts-ignore render component flags
                      <lang.flag width={64} height={64} />
                    ) : (
                      <Image source={lang.flag} style={styles.flagImage} />
                    )}
                  </View>

                  <Text style={styles.langName} numberOfLines={1}>
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Footer with Emergency / Continue */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={onEmergency}
            style={[styles.footerBtn, styles.cancelFooterBtn]}
            accessibilityRole="button"
            accessibilityLabel={emergencyLabel}
          >
            <Text style={styles.cancelFooterText}>{emergencyLabel}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onContinue}
            disabled={!selected}
            style={[
              styles.footerBtn,
              styles.confirmFooterBtn,
              !selected && styles.footerBtnDisabled,
            ]}
            accessibilityRole="button"
            accessibilityLabel={confirmLabel}
          >
            <Text style={styles.confirmFooterText}>{confirmLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

/** Helpers **/
function fallbackConfirmText(code: string, nativeName: string) {
  return `Do you understand ${nativeName}? This app will switch to ${nativeName}.`;
}

function mapCodeToLocale(code?: string) {
  switch (code) {
    case "de":
      return "de-DE";
    case "en":
      return "en-US";
    case "ru":
      return "ru-RU";
    case "ar":
      return "ar-SA";
    case "fa":
    case "prs":
      return "fa-IR";
    case "ps":
      return "ps-AF";
    case "so":
      return "so-SO";
    case "ka":
      return "ka-GE";
    case "sq":
      return "sq-AL";
    default:
      return undefined;
  }
}

/** Styles **/
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  header: { alignItems: "center", marginBottom: 8 },
  welcomeTitle: { fontSize: 26, fontWeight: "700", color: "#222", marginBottom: 8 },
  emergencyBtn: {
    marginTop: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "#D9534F",
  },
  emergencyText: { color: "#fff", fontWeight: "700" },
  instruction: { marginVertical: 10, alignItems: "center" },
  instructionText: { fontSize: 16, color: "#333" },
  grid: { paddingVertical: 8,
      paddingHorizontal: 16,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center"},
  gridInner: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  tile: {
    paddingHorizontal: 8,
    paddingVertical: 14,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 6
  },
  flagWrap: { marginBottom: 10, width: 72, height: 72, alignItems: "center", justifyContent: "center" },
  flagImage: { width: 72, height: 72, resizeMode: "contain" },
  langName: { fontSize: 18, fontWeight: "600", color: "#111" },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 92,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerBtn: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelFooterBtn: {
    backgroundColor: "#f1f3f5",
  },
  confirmFooterBtn: {
    backgroundColor: "#218838",
  },
  footerBtnDisabled: {
    opacity: 0.5,
  },
  cancelFooterText: { color: "#333", fontWeight: "700" },
  confirmFooterText: { color: "#fff", fontWeight: "700" },

});
