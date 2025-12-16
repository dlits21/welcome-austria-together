import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  TouchableOpacity
} from 'react-native';
import { useTranslation } from "react-i18next";
import { CircleBorder } from '../components/CircleIcon';
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
} from '../components/SVG/Flags';

interface Language {
  code: string;
  name: string;
  flag: any;
}

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
}

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

const LanguageModal: React.FC<LanguageModalProps> = ({ visible, onClose }) => {
  const { t, i18n } = useTranslation('common');
  const { width } = useWindowDimensions();

  const currentLanguage = i18n.language;
  const initialSelected = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];
  const [selected, setSelected] = useState<string>(initialSelected.code);

  // different specification for web and app
  const numColumns = width > 500 ? 4 : 3;
  const modalWidth = width > 660 ? 600 : 350;
  const languageFontSize = width > 500 ? 24 : 14;

  // Use translator fixed to selected language (to show UI text in that language)
  const tSelected = (langCode?: string) =>
    langCode ? i18n.getFixedT(langCode, "index") : i18n.getFixedT(i18n.language, "index");

  const handleTilePress = (lang: Language, isSelected: boolean) => {
    setSelected(lang.code);
    i18n.changeLanguage(lang.code); // temporarily switch for immediate UI feedback
  };

  const handleConfirm = () => {
    // Keep the temporary selection as main language
    i18n.changeLanguage(selected);
    onClose();
  };

  const handleCancel = () => {
    // Revert to original language
    i18n.changeLanguage(initialSelected.code);
    setSelected(initialSelected.code);
    onClose();
  };

  const renderItem = ({ item }: { item: Language }) => {
    const isCurrent = item.code === i18n.language;
    const isSelected = item.code === selected;

    return (
      <TouchableOpacity
        key={item.code}
        onPress={() => handleTilePress(item, isSelected)}
        accessibilityRole="button"
        accessibilityLabel={tSelected(item.code)("index:switchTo", { nativeName: item.name })}
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
        ]}
      >
        <View style={styles.tileContainer}>
        <CircleBorder
          size={70}
          borderWidth={2}
          borderColor={'#fff'}
        >
          <item.flag width={150} height={150} />
        </CircleBorder>

        <Text style={styles.languageText} numberOfLines={1}>
          {item.name}
        </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleCancel}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header with X button */}
          <View style={styles.header}>
            <Text style={styles.title}>{t('choose_language')}</Text>
            <Pressable style={styles.closeX} onPress={handleCancel}>
              <Text style={styles.closeXText}>✕</Text>
            </Pressable>
          </View>

          <FlatList
            data={LANGUAGES}
            renderItem={renderItem}
            keyExtractor={(item) => item.code}
            numColumns={numColumns}
            contentContainerStyle={[
              styles.grid,
              { width: modalWidth,
                  justifyContent: 'space-between' }
            ]}
          />

          {/* Confirm / Cancel Buttons */}
          <View style={styles.footer}>
            <Pressable style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.footerText}>{t('actions.back')}</Text>
            </Pressable>
            <Pressable style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.footerText}>{t('actions.save')}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, margin: 24, backgroundColor: '#fff', borderRadius: 12, padding: 16, alignItems: 'center', maxHeight: "90%" },
  header: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', alignItems: 'center' },
  closeX: { padding: 4 },
  closeXText: { fontSize: 22, fontWeight: 'bold' },
  grid: { width: '100%', gap: 8 },
  tile:
     { flex: 1,
      margin: 8,
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: '#E5E7EB',
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 100 },
  tileContainer: {},
  languageText: { fontSize: 18, marginTop: 12, textAlign: 'center', color: '#000'},
  footer: { flexDirection: 'row', marginTop: 12, justifyContent: 'space-between', width: '100%' },
  cancelButton: { flex: 1, marginRight: 8, paddingVertical: 14, backgroundColor: '#9CA3AF', borderRadius: 8, alignItems: 'center' },
  confirmButton: { flex: 1, marginLeft: 8, paddingVertical: 14, backgroundColor: '#10B981', borderRadius: 8, alignItems: 'center' },
  footerText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default LanguageModal;
