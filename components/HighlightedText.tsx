import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Platform } from 'react-native';

interface DefinitionValue {
  en: string; // Explanation in English
  de: string; // Erklärung auf Deutsch
  terms?: {
    en?: string[]; // Optional additional English terms/variants to highlight
    de?: string[]; // Optionale deutsche Begriffe/Varianten zum Hervorheben
  };
}

interface HighlightedTextProps {
  children: string;
  definitions: { [key: string]: DefinitionValue };
  language: string; // 'en' | 'de'
}

const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const HighlightedText: React.FC<HighlightedTextProps> = ({ children, definitions, language }) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  // Build list of phrases to match for the current language, mapped to a canonical key
  const matchers = useMemo(() => {
    const list: { phrase: string; key: string }[] = [];
    Object.entries(definitions).forEach(([key, value]) => {
      // Always include the raw key as a possible phrase
      list.push({ phrase: key, key });
      // Include optional localized variants
      const localeTerms = value.terms?.[language as 'en' | 'de'] || [];
      localeTerms.forEach((p) => list.push({ phrase: p, key }));
    });
    // Sort by length (desc) to prefer longer phrases first
    list.sort((a, b) => b.phrase.length - a.phrase.length);
    return list;
  }, [definitions, language]);

  const phraseToKeyMap = useMemo(() => {
    const map = new Map<string, string>();
    matchers.forEach(({ phrase, key }) => {
      map.set(phrase.toLowerCase(), key);
    });
    return map;
  }, [matchers]);

  const regex = useMemo(() => {
    if (matchers.length === 0) return null;
    const escaped = matchers.map((m) => escapeRegExp(m.phrase));
    // Word boundaries around phrases to avoid partial matches
    const pattern = `\\b(${escaped.join('|')})\\b`;
    try {
      return new RegExp(pattern, 'giu');
    } catch {
      return new RegExp(pattern, 'gi');
    }
  }, [matchers]);

  const renderParagraph = (paragraph: string, pIndex: number) => {
    if (!regex) {
      return (
        <Text key={`p-${pIndex}`} style={styles.paragraph}>
          {paragraph}
        </Text>
      );
    }

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    // Reset lastIndex for global regex
    regex.lastIndex = 0;

    while ((match = regex.exec(paragraph)) !== null) {
      const matchStart = match.index;
      const matchEnd = regex.lastIndex;

      if (matchStart > lastIndex) {
        const before = paragraph.slice(lastIndex, matchStart);
        elements.push(
          <Text key={`p-${pIndex}-t-${lastIndex}`} style={styles.normalText}>
            {before}
          </Text>
        );
      }

      const found = match[0];
      const canonicalKey = phraseToKeyMap.get(found.toLowerCase());

      if (canonicalKey) {
        elements.push(
          <TouchableOpacity
            key={`p-${pIndex}-h-${matchStart}`}
            onPress={() => {
              setSelectedKey(canonicalKey);
              setSelectedLabel(found);
              setModalVisible(true);
            }}
            activeOpacity={0.7}
            style={styles.highlightWrap}
          >
            <Text style={[styles.normalText, styles.highlightedText]}>{found}</Text>
          </TouchableOpacity>
        );
      } else {
        // Fallback as normal text if no canonical key found
        elements.push(
          <Text key={`p-${pIndex}-t-${matchStart}`} style={styles.normalText}>
            {found}
          </Text>
        );
      }

      lastIndex = matchEnd;
    }

    if (lastIndex < paragraph.length) {
      const tail = paragraph.slice(lastIndex);
      elements.push(
        <Text key={`p-${pIndex}-t-end`} style={styles.normalText}>
          {tail}
        </Text>
      );
    }

    return (
      <Text key={`p-${pIndex}`} style={styles.paragraph}>
        {elements}
      </Text>
    );
  };

  const getDefinition = () => {
    if (!selectedKey) return '';
    const def = definitions[selectedKey];
    if (!def) return '';
    return language === 'de' ? def.de : def.en;
  };

  const paragraphs = useMemo(() => children.split('\n\n'), [children]);

  return (
    <View>
      <View style={styles.textContainer}>
        {paragraphs.map((p, i) => (
          <View key={`para-${i}`} style={styles.paragraphContainer}>
            {renderParagraph(p, i)}
          </View>
        ))}
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedLabel}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                {/* Using a simple × to avoid external icon deps in RN-only env */}
                <Text style={styles.closeIcon}>×</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalText}>{getDefinition()}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'column',
  },
  paragraphContainer: {
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  normalText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  highlightWrap: {
    borderBottomWidth: Platform.OS === 'android' ? 1 : 0, // Android dashed underline fallback
    borderStyle: 'dashed',
    borderColor: '#ef4444', // red-500
  },
  highlightedText: {
    fontSize: 16,
    lineHeight: 24,
    // Red dashed underline on iOS & web RN; border fallback above for Android
    textDecorationLine: 'underline',
    textDecorationStyle: 'dashed',
    textDecorationColor: '#ef4444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    maxWidth: '90%',
    width: 320,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  closeIcon: {
    fontSize: 22,
    color: '#6B7280',
    lineHeight: 22,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#374151',
  },
});

export default HighlightedText;
