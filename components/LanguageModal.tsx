import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Speech from 'expo-speech';
import {
  GermanFlag,
  GBFlag,
  RussianFlag,
  AfghaniFlag,
  IranianFlag,
  SyrianFlag,
  SomaliFlag,
  GeorgianFlag,
  AlbanianFlag
} from '../components/Flags';

interface LanguageOption {
  code: string;
  name: string;
  flag: any;
}

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
}

const languages: LanguageOption[] = [
  { code: 'de', name: 'Deutsch', flag: GermanFlag },
  { code: 'en', name: 'English', flag: GBFlag },
  { code: 'ru', name: 'Русский', flag: RussianFlag },
  { code: 'ce', name: 'Нохчийн', flag: RussianFlag },
  { code: 'prs', name: 'دری', flag: AfghaniFlag },
  { code: 'ps', name: 'پښتو', flag: AfghaniFlag },
  { code: 'fa', name: 'فارسی', flag: IranianFlag },
  { code: 'ar', name: 'العربية', flag: SyrianFlag },
  { code: 'ku', name: 'Kurdî', flag: SyrianFlag },
  { code: 'so', name: 'Soomaali', flag: SomaliFlag },
  { code: 'ka', name: 'ქართული', flag: GeorgianFlag },
  { code: 'sq', name: 'Shqip', flag: AlbanianFlag },
];

const LanguageModal: React.FC<LanguageModalProps> = ({ visible, onClose }) => {
  const { t, i18n } = useTranslation('common');
  const { width } = useWindowDimensions();
  const [tempLanguage, setTempLanguage] = useState(i18n.language);

  const numColumns = width > 500 ? 4 : 3;
  const modalWidth = width > 660 ? 600 : 350;
  const languageFontSize = width > 500 ? 24 : 14;

  const speak = (text: string) => {
    if (text) Speech.speak(text, { language: 'de-DE' });
  };

  const handleTilePress = (lang: LanguageOption) => {
    setTempLanguage(lang.code);
    i18n.changeLanguage(lang.code); // temporarily switch for immediate UI feedback
  };

  const handleConfirm = () => {
    // Keep the temporary selection as main language
    i18n.changeLanguage(tempLanguage);
    onClose();
  };

  const handleCancel = () => {
    // Revert to original language
    i18n.changeLanguage(i18n.language);
    setTempLanguage(i18n.language);
    onClose();
  };

  const renderItem = ({ item }: { item: LanguageOption }) => {
    const isCurrent = item.code === i18n.language;
    const isSelected = item.code === tempLanguage;

    return (
      <Pressable
        style={[styles.tile, isSelected && styles.selectedTile, isCurrent && styles.currentTile]}
        onPress={() => handleTilePress(item)}
        onLongPress={() => speak(`${item.name}. ${t('language_selected')}`)}
      >
        <View style={styles.flagContainer}>
          <item.flag width={64} height={48} />
        </View>
        <Text style={[styles.languageText, {fontSize: languageFontSize}]}>
          {t(`languages.${item.code}`, { defaultValue: item.name})}
        </Text>
      </Pressable>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header with X button */}
          <View style={styles.header}>
            <Text style={styles.title}>{t('choose_language')}</Text>
            <Pressable style={styles.closeX} onPress={onClose}>
              <Text style={styles.closeXText}>✕</Text>
            </Pressable>
          </View>

          <FlatList
            data={languages}
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
  grid: { width: '100%', gap: 16 },
  tile: { flex: 1, margin: 8, paddingVertical: 24, paddingHorizontal: 16, backgroundColor: '#E5E7EB', borderRadius: 12, alignItems: 'center', justifyContent: 'center', minWidth: 100 },
  currentTile: { borderWidth: 2, borderColor: '#3B82F6' },
  selectedTile: { backgroundColor: '#3B82F6' },
  flagContainer: { width: 64, height: 48, alignItems: 'center', justifyContent: 'center' },
  languageText: { marginTop: 12, textAlign: 'center', color: '#111'},
  footer: { flexDirection: 'row', marginTop: 16, justifyContent: 'space-between', width: '100%' },
  cancelButton: { flex: 1, marginRight: 8, paddingVertical: 14, backgroundColor: '#9CA3AF', borderRadius: 8, alignItems: 'center' },
  confirmButton: { flex: 1, marginLeft: 8, paddingVertical: 14, backgroundColor: '#10B981', borderRadius: 8, alignItems: 'center' },
  footerText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default LanguageModal;
