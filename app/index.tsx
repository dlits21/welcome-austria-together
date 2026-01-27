// app/data/index.tsx
import React, { useState, useEffect, useRef} from "react";
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
  KurdishFlag,
  ChechenFlag
} from "../components/SVG/Flags";
import { VoiceSelection } from "../components/SVG/Icons";
import AudioPlayerFooter from '../components/AudioPlayerFooter';
import { CircleBorder } from '../components/CircleIcon';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { MaterialIcons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';

// Minimal Language type
interface Language {
  code: string;
  name: string;
  flag: any;
}


const audioFiles = {
  'de': require("../assets/audio/index/welcome_de.mp3"),
  'en': require("../assets/audio/index/welcome_en.mp3"),
  'ru': require("../assets/audio/index/welcome_ru.mp3"),
  'ce': require("../assets/audio/index/welcome_ce.mp3"),
  'prs': require("../assets/audio/index/welcome_prs.mp3"),
  'ps': require("../assets/audio/index/welcome_ps.mp3"),
  'fa': require("../assets/audio/index/welcome_fa.mp3"),
  'ar': require("../assets/audio/index/welcome_ar.mp3"),
  'ku': require("../assets/audio/index/welcome_ku.mp3"),
  'so': require("../assets/audio/index/welcome_so.mp3"),
  'ka': require("../assets/audio/index/welcome_ka.mp3"),
  'sq': require("../assets/audio/index/welcome_sq.mp3"),
};

/** --- LANGUAGES: add/remove as needed --- **/
const LANGUAGES: Language[] = [
  { code: "de", name: "Deutsch", flag: GermanFlag},
  { code: "en", name: "English", flag: GBFlag},
  { code: "ru", name: "Русский", flag: RussianFlag},
  { code: "ce", name: "Нохчийн", flag: ChechenFlag},
  { code: "prs", name: "دری", flag: AfghaniFlag},
  { code: "ps", name: "پښتو", flag: AfghaniFlag},
  { code: "fa", name: "فارسی", flag: IranianFlag},
  { code: "ar", name: "العربية", flag: SyrianFlag},
  { code: "ku", name: "کوردی", flag: KurdishFlag},
  { code: "so", name: "Soomaali", flag: SomaliFlag},
  { code: "ka", name: "ქართული", flag: GeorgianFlag},
  { code: "sq", name: "Shqip", flag: AlbanianFlag},
];

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const { setSelectedLanguage, currentLanguage } = useLanguage();
  const { t } = useTranslation('index'); // default app language translations
  const { width } = useWindowDimensions();

  // Audio player state
  const player = useAudioPlayer(audioFiles['de']);
  const status = useAudioPlayerStatus(player);

  // Ensure German default; if context already has a language, respect it
  const defaultLangCode = "de";
  const initialSelectedCode = currentLanguage || defaultLangCode;
  const initialSelected = LANGUAGES.find((l) => l.code === initialSelectedCode) || LANGUAGES[0];

  const [selected, setSelected] = useState<Language | null>(initialSelected);

  // If no currentLanguage in context, default German
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
  }, []);

  const isWeb  = Platform.OS == 'web'
  const iconSize = isWeb ? 36 : 24
  const iconContainerSize = isWeb ? 60 : 50
  const iconContainerRadius = iconContainerSize * .5

  const isRTL = I18nManager.isRTL;

  // Use translator fixed to selected language (to show UI text in that language)
  const tSelected = (langCode?: string) =>
    langCode ? i18n.getFixedT(langCode, "index") : i18n.getFixedT(i18n.language, "index");

  // Selecting tile => immediately switch app language
  const onSelectLanguage = (lang: Language, selected: boolean) => {
    if (selected) {
        onContinue()
    } else {
       setSelected(lang);
       // persist via context + change i18n immediately
       setSelectedLanguage(lang.code);
       i18n.changeLanguage(lang.code).catch(() => {});

       // automatically play audio
       player.pause();
       const old_volume = player.volume;
       player.replace(audioFiles[lang.code]);
       player.volume = old_volume;
       player.play();
    }
  };

  // switch to home page
  const onContinue = () => {
    player.pause()
    router.push("/home");
  };

  // Welcome text renders using current i18n language (which is set to selected on selection)
  const welcomeText = t("welcomeTitle", "Welcome");

  // Footer button labels — prefer selected language keys if present
  const confirmLabel = selected ? tSelected(selected.code)("buttons.confirm") || t("buttons.continue", "Weiter") : t("buttons.continue", "Weiter");
  const emergencyLabel = selected ? tSelected(selected.code)("buttons.help") || t("buttons.help", "Hilfe / Notfall") : t("buttons.help", "Hilfe / Notfall");

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

          {/* Short instruction */}
          <Text
            style={[styles.instructionText, { textAlign: isRTL ? "right" : "center" }]}
            accessibilityLabel={t("index:chooseLanguageInstruction", "Wähle deine Sprache aus")}
          >
            {t("index:chooseLanguageInstruction", "Wähle deine Sprache aus")}
          </Text>

{/*             <View style={styles.ButtonContainer}>
             <TouchableOpacity onPress={onContinue} style={styles.Button}>
               <CircleBorder
                 size={iconContainerSize}
                 borderWidth={2}
                 borderColor={'#fff'}
               >
                 <MaterialIcons name="record-voice-over" size={iconSize} color="#000" />
               </CircleBorder>
             </TouchableOpacity>

             <TouchableOpacity onPress={onContinue} style={styles.button}>
               <CircleBorder
                 size={iconContainerSize}
                 borderWidth={2}
                 borderColor={'#fff'}
               >
                 <MaterialIcons name="volume-up" size={iconSize} color="#000" />
               </CircleBorder>
             </TouchableOpacity>
             </View> */}
        </View>

        {/* Language grid */}
        {isWeb &&
        (<ScrollView contentContainerStyle={[styles.grid, { paddingBottom: 120 }]} keyboardShouldPersistTaps="handled">
          <View style={styles.gridInner}>
            {LANGUAGES.map((lang) => {
              const isSelected = selected?.code === lang.code;
              return (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => onSelectLanguage(lang, isSelected)}
                  accessibilityRole="button"
                  accessibilityLabel={tSelected(lang.code)("index:switchTo", { nativeName: lang.name })}
                  // use flexBasis and maxWidth percent — prevents leftover gap on wide screens
                  style={[
                    styles.tile,
                    {
                      flexBasis: "22.5%",
                      maxWidth: "22.5%",
                      backgroundColor: isSelected ? 'rgba(226, 7, 30, .5)' : "#f7f7f7",
                      borderColor: isSelected ? "#A60B33" : "#e6e6e6",
                      borderWidth: isSelected ? 2 : 1,
                    },
                  ]}>
                  <View style={styles.tileContainer}>
                  <CircleBorder
                    size={80}
                    borderWidth={2}
                    borderColor={'#fff'}
                  >
                    <lang.flag width={200} height={200} />
                  </CircleBorder>

                  <Text style={styles.langName} numberOfLines={1}>
                    {lang.name}
                  </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.footerConfirm}>
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
        </ScrollView>)
        }

        {!isWeb &&
        (<ScrollView contentContainerStyle={[styles.grid, { paddingBottom: 120 }]} keyboardShouldPersistTaps="handled">
          <View style={styles.gridInner}>
            {LANGUAGES.map((lang) => {
              const isSelected = selected?.code === lang.code;
              return (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => onSelectLanguage(lang, isSelected)}
                  accessibilityRole="button"
                  accessibilityLabel={tSelected(lang.code)("index:switchTo", { nativeName: lang.name })}
                  // use flexBasis and maxWidth percent — prevents leftover gap on wide screens
                  style={[
                    styles.tileMobile,
                    {
                      flexBasis: "100%",
                      maxWidth: "100%",
                      backgroundColor: isSelected ? 'rgba(226, 7, 30, .5)' : "#fff",
                      borderColor: isSelected ? "#A60B33" : "#fff",
                      borderWidth: isSelected ? 2 : 1,
                    },
                  ]}
                >
                <View style={styles.mobileTileContainer}>
                  <CircleBorder
                    size={58}
                    borderWidth={2}
                    borderColor={'#fff'}
                  >
                    <lang.flag width={80} height={80} />
                  </CircleBorder>

                    <Text style={styles.langName}>
                      {lang.name}
                    </Text>
                 </View>
                </TouchableOpacity>
              );
            })}

            <View style={styles.footerConfirmMobile}>
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
        </ScrollView>)}

        {/* Footer with AudioPlayerFooter */}
        <View>
          {/* Audio player spanning full width - outside content wrapper */}
          <AudioPlayerFooter
            player={player}
            status={status}
            usingTTS={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

/** Styles **/
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  header: {
      alignItems: "center",
      paddingTop: 9,
      paddingBottom: 9,
      gap: 10,
      },

  welcomeTitle: { fontSize: 29, fontWeight: "700", color: "#000"},
  instructionText: { fontSize: 19, color: "#000" },
  grid: { paddingVertical: 8,
      paddingHorizontal: 16,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center"},
  gridInner: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  tile: {
    paddingHorizontal: 8,
    paddingVertical: 0,
    borderRadius: 20,
    justifyContent: "center",
    marginVertical: 4,
    marginHorizontal: 4,
    gap: 8,
  },
  tileMobile: {
    paddingHorizontal: 8,
    paddingVertical: 0,
    marginVertical: 0,
    borderRadius: 10,
    justifyContent: "center",
    margin: 0
  },
  flagWrap: { marginBottom: 10, width: 72, height: 72, alignItems: "center", justifyContent: "center" },
  flagImage: { width: 72, height: 72, resizeMode: "contain" },
  langName: { fontSize: 26, fontWeight: "400", color: "rgba(13,13,13,1)" },

  footerConfirm: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 60,
    backgroundColor: "#fff",
    borderTopWidth: 0,
    borderTopColor: "#e5e7eb",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerConfirmMobile: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom:-60,
    height: 70,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderTopWidth: 0,
    borderTopColor: "#e5e7eb",
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

  confirmFooterBtn: {
    backgroundColor: "rgba(166, 11, 51, 1)",
  },
  footerBtnDisabled: {
    opacity: 0.5,
  },
  ButtonContainer: {
    justifyContent: 'between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 96,
  },
  button: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  mobileTileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 12,
    paddingVertical: 16
  },
  tileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 12,
    paddingVertical: 8
  },
  confirmFooterText: { color: "#fff", fontWeight: "700" },
});
