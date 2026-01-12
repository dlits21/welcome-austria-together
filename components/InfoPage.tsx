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
import { useRouter } from "expo-router";
import PageNavigation from "./PageNavigation";
import TutorialModal from './TutorialModal';
import LanguageModal from './LanguageModal';
import CategoryCard from './CategoryCard';
import ContactCard from './ContactCard';
import EmbeddedVideo from './EmbeddedVideo';
import AccordionItem from './AccordionItem'

interface ContactData {
  name: string;
  subtitle?: string;
  languages: string[];
  phone?: string;
  email?: string;
  url?: string;
  onCall?: () => void;
}

interface TileData {
  key: string;
  title: string;
  subtitle: string;
  content: TilesContent;
  icon: string;
  color: string;
  cardHeight: number;
  onPress: () => void;
}

interface InfoPageProps {
  title: string;
  videoId?: string;
  tiles?: TileData[];
  contacts?: ContactData[];
  tutorialData?: string;
  translationNamespace?: string;
}

const InfoPage: React.FC<InfoPageProps> = ({
  title,
  videoId,
  tiles,
  contacts,
  tutorialData,
  translationNamespace,
}) => {
  const { t, i18n } = useTranslation(translationNamespace);
  const router = useRouter();
  const [showLanguage, setShowLanguage] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const { width } = useWindowDimensions();

  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // layout columns for responsiveness
  const columns = width < 600 ? 2 : width < 900 ? 3 : 4;
  const tileBasis = `${100 / columns}%`;

  const openContact = (path: string) => {
    router.push(`/information/contacts`);
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <PageNavigation
        showLanguage={() => setShowLanguage(true)}
        showTutorial={() => setShowTutorial(true)}
        showBackButton={true}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Intro */}
        <Text style={styles.title}>{t(title)}</Text>

        {/* Visual video (optional) */}
        {videoId && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("summary")}</Text>
            <EmbeddedVideo videoId={videoId} />
          </View>
        )}

        {/* Tiles grid (short, visual) */}
        <View style={styles.grid}>
          {tiles.map((tile) => (
            <View key={tile.key}>
              <AccordionItem
                title={t(tile.title)}
                subtitle={t(tile.subtitle)}
                icon={tile.icon}
                iconColor={tile.color}
                expanded={expandedSection === tile.key}
                onPress={() => toggleSection(tile.key)}
                content={tile.content.map(c => ({
                  ...c,
                  title: t(c.title),
                  subtitle: c.subtitle ? t(c.subtitle) : ''
                }))}
              >
              </AccordionItem>
            </View>
          ))}
        </View>

        {/* Contacts block */}
        {contacts.length >= 1 && (<View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("trustedTitle", { defaultValue: "Trusted support" })}</Text>
          {contacts.map((contact, index) => (
            <ContactCard
              key={contact.key}
              name={contact.name}
              phone={contact.phone}
              email={contact.email}
              url={contact.url}
              subtitle={contact.subtitle}
              languages={contact.languages}
            />
          ))}
        </View>)}
      </ScrollView>

      <LanguageModal
        visible={showLanguage}
        onClose={() => setShowLanguage(false)}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        tutorialData={tutorialData}
      />
    </SafeAreaView>
  );
}
export default InfoPage;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { paddingHorizontal: 16, paddingBottom: 48, paddingTop: 12 },
  title: { fontSize: 18, fontWeight: "700", textAlign: "center", marginBottom: 6 },

  section: { marginTop: 18 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8, textAlign: "center"},

  grid: { marginTop: 12, },
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

  contactsButton: { backgroundColor: "#A60B33", paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  contactsButtonText: { color: "#fff", fontWeight: "700" },
});