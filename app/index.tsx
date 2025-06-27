import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  SafeAreaView,
  StatusBar,
  Modal,
  Animated,
  Dimensions,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
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
} from "../components/Flags";
import { getWelcomeText } from '../data/languages/common';
import { useLanguage } from '../contexts/LanguageContext';
import { getGlobalText, getIndexText } from '../utils/languageUtils';

// Import our components
import LanguageSelectionHeader from "../components/LanguageSelectionHeader";
import LanguageSelectionGrid from "../components/LanguageSelectionGrid";
import HoverTooltip from "../components/HoverTooltip";
import LanguageConfirmation from "../components/LanguageConfirmation";
import InfoModal from "../components/InfoModal";
import VirtualAssistantModal from "../components/VirtualAssistantModal";
import TutorialModal from "../components/TutorialModal";

// Language data with correct flags and languages
const languages = [
  { code: "de", name: "Deutsch", flag: GermanFlag }, // German
  { code: "en", name: "English", flag: GBFlag }, // English
  { code: "ru", name: "Русский", flag: RussianFlag }, // Russian
  { code: "ce", name: "Нохчийн", flag: RussianFlag }, // Chechen
  { code: "prs", name: "دری", flag: AfghaniFlag }, // Dari
  { code: "ps", name: "پښتو", flag: AfghaniFlag }, // Pashto
  { code: "fa", name: "فارسی", flag: IranianFlag }, // Persian
  { code: "ar", name: "العربية", flag: SyrianFlag }, // Arabic
  { code: "ku", name: "Kurdî", flag: SyrianFlag }, // Kurdish
  { code: "so", name: "Soomaali", flag: SomaliFlag }, // Somali
  { code: "ka", name: "ქართული", flag: GeorgianFlag }, // Georgian
  { code: "sq", name: "Shqip", flag: AlbanianFlag }, // Albanian
];

// Type definition for language
interface Language {
  code: string;
  name: string;
  flag: any; // Using 'any' for simplicity with require()
}

// Confirmation messages in each language
const confirmationMessages: Record<string, string> = {
  de: "Verstehst du Deutsch?\nDiese App wird ab jetzt auf Deutsch sein.\n Du kannst das später ändern.",
  en: "Do you understand English?\n This app will be in English from now on.\n You can change this later.",
  ru: "Вы понимаете русский?\n Это приложение теперь будет на русском языке.\n Вы можете изменить это позже.",
  ce: "Хьуна нохчийн мотт хаъий?\n Хӏара приложение хӏинца дуьйна нохчийн маттахь хир ю.\n Хьо и тӏаьхьо хийца йиш ю.",
  prs: "آیا دری را میفهمید؟ این برنامه از این به بعد به زبان دری خواهد بود. شما می‌توانید بعداً این را تغییر دهید.",
  ps: "ایا تاسو پښتو پوهیږئ؟ دا اپلیکیشن به له دې وروسته په پښتو وي. تاسو کولی شئ دا وروسته بدل کړئ.",
  fa: "آیا فارسی را میفهمید؟ این برنامه از این به بعد به زبان فارسی خواهد بود. شما می‌توانید ان را تغییر دهید.",
  ar: "هل تفهم العربية؟ سيكون هذا التطبيق باللغة العربية من الآن فصاعدًا. يمكنك تغيير ذلك لاحقًا.",
  ku: "Tu Kurdî fêm dikî?\n Ev sepan ji niha û pê ve bi Kurdî be.\n Tu dikarî vê paşê biguherînî.",
  so: "Ma fahmaysaa Soomaali?\n Abkan wuxuu noqon doonaa Soomaali hadda.\n Waxaad bedeli kartaa mar dambe.",
  ka: "გესმით ქართული? ეს აპლიკაცია ამიერიდან ქართულ ენაზე იქნება.\n შეგიძლიათ ეს შეცვალოთ მოგვიანებით.",
  sq: "A e kuptoni shqip?\n Ky aplikacion do të jetë në shqip nga tani e tutje.\n Mund ta ndryshoni këtë më vonë.",
};

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const { setSelectedLanguage, currentLanguage } = useLanguage();
  console.log('Current language in selection screen:', currentLanguage);
  const [currentWelcomeIndex, setCurrentWelcomeIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [selectedLanguageState, setSelectedLanguageState] = useState<Language | null>(null);
  const [hoverLanguage, setHoverLanguage] = useState<Language | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const animatedScale = useRef(new Animated.Value(1)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const countdownProgress = useRef(new Animated.Value(1)).current;
  const countdownTimer = useRef<NodeJS.Timeout | null>(null);

  // Rotate through welcome messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWelcomeIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle language selection
  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguageState(language);

    // Animate scaling
    Animated.timing(animatedScale, {
      toValue: 1.2,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Animate opacity
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Start countdown
    Animated.timing(countdownProgress, {
      toValue: 0,
      duration: 20000, // 20 seconds
      useNativeDriver: false,
    }).start();

    // Set timeout to close after 20s
    countdownTimer.current = setTimeout(() => {
      closeLanguageDetail();
    }, 20000);
  };

  // Close language detail view
  const closeLanguageDetail = () => {
    Animated.parallel([
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSelectedLanguageState(null);
      countdownProgress.setValue(1);
      if (countdownTimer.current) {
        clearTimeout(countdownTimer.current);
      }
    });
  };

  // Confirm language selection
  const confirmLanguage = (code: string) => {
    console.log(`Confirming language selection: ${code}`);
    if (countdownTimer.current) {
      clearTimeout(countdownTimer.current);
    }

    // Set the global language
    setSelectedLanguage(code);  // This will trigger the updateLanguage function
    console.log('Language set to:', code);

    closeLanguageDetail();
    // Navigate to homepage
    router.push('/home');
  };

  // Updated hover handlers - keep tooltip visible while mouse is over tile
  const handlePressIn = (language: Language, event: any) => {
    // For mobile devices, show on press
    if ('ontouchstart' in window) {
      setHoverLanguage(language);
      setHoverPosition({
        x: event.nativeEvent.pageX || event.nativeEvent.locationX + 50,
        y: event.nativeEvent.pageY || event.nativeEvent.locationY,
      });
    }
  };

  const handlePressOut = () => {
    if ('ontouchstart' in window) {
      setHoverLanguage(null);
    }
  };

  // Updated hover handlers for web - tooltip stays visible while mouse is over tile
  const handleMouseEnter = (language: Language, event: any) => {
    if (!('ontouchstart' in window)) {
      setIsHovering(true);
      setHoverLanguage(language);
      setHoverPosition({
        x: event.nativeEvent.pageX || event.nativeEvent.clientX,
        y: event.nativeEvent.pageY || event.nativeEvent.clientY,
      });
    }
  };

  const handleMouseLeave = () => {
    if (!('ontouchstart' in window)) {
      setIsHovering(false);
      setHoverLanguage(null);
    }
  };

  // Handle virtual assistant close
  const handleVirtualAssistantClose = () => {
    setShowVirtualAssistant(false);
  };

  // Handle virtual assistant from tutorial
  const handleTutorialVirtualAssistant = () => {
    setShowTutorial(false);
    setShowVirtualAssistant(true);
  };

  // Get current welcome message based on index
  const currentWelcomeCode = languages[currentWelcomeIndex]?.code;
  const currentWelcomeMessage = getWelcomeText(currentWelcomeCode);

  // Get hover messages from language file
  const hoverMessages: Record<string, string> = {};
  languages.forEach(lang => {
    hoverMessages[lang.code] = getIndexText('hoverInstructions', lang.code);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Welcome Title */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>{currentWelcomeMessage}</Text>
      </View>

      {/* Header */}
      <LanguageSelectionHeader
        currentWelcomeMessage={currentWelcomeMessage}
        setShowInfo={setShowInfo}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
      />

      {/* Language Grid with updated hover props */}
      <LanguageSelectionGrid
        languages={languages}
        handleLanguageSelect={handleLanguageSelect}
        handlePressIn={handlePressIn}
        handlePressOut={handlePressOut}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />

      {/* Hover tooltip */}
      <HoverTooltip
        hoverLanguage={hoverLanguage}
        hoverPosition={hoverPosition}
        hoverMessages={hoverMessages}
      />

      {/* Language Detail Modal */}
      <Modal
        visible={selectedLanguageState !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={closeLanguageDetail}
      >
        <Pressable style={styles.modalOverlay} onPress={closeLanguageDetail}>
          <View style={styles.centeredView}>
            <LanguageConfirmation
              selectedLanguage={selectedLanguageState}
              closeLanguageDetail={closeLanguageDetail}
              confirmLanguage={confirmLanguage}
              animatedScale={animatedScale}
              countdownProgress={countdownProgress}
              confirmationMessages={confirmationMessages}
            />
          </View>
        </Pressable>
      </Modal>

      {/* Tutorial Modal */}
      <TutorialModal 
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={currentLanguage}
        tutorialData="index"
        onVirtualAssistant={handleTutorialVirtualAssistant}
      />

      {/* Info Modal */}
      <InfoModal
        visible={showInfo}
        onClose={() => setShowInfo(false)}
      />

      {/* Virtual Assistant Modal - Default to voice mode from index */}
      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={handleVirtualAssistantClose}
        languageCode={currentLanguage}
        defaultMode="voice"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});
