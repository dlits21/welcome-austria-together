import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  Modal,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
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
    } from "../components/Flags"

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

// Welcome messages in each language
const welcomeMessages: Record<string, string> = {
  de: "Willkommen! Schön dass du da bist",
  en: "Welcome! Nice to have you here",
  ru: "Добро пожаловать! Приятно видеть вас здесь",
  ce: "Марша вогӏийла! Хьо кхуза веана хазахета",
  prs: "خوش آمدید! خوشحالیم که اینجا هستید",
  ps: "ښه راغلاست! ستاسو دلته شتون مو خوښ دی",
  fa: "خوش آمدید! خوشحالیم که اینجا هستید",
  ar: "مرحبًا! سعيد بوجودك هنا",
  ku: "Bi xêr hatî! Keyfxweş im ku hûn li vir in",
  so: "Soo dhawow! Ku faraxsan inaad halkan joogto",
  ka: "კეთილი იყოს თქვენი მობრძანება! კარგია რომ აქა ხართ",
  sq: "Mirësevini! Është kënaqësi t'ju kemi këtu",
};

// Confirmation messages in each language
const confirmationMessages: Record<string, string> = {
  de: "Verstehst du Deutsch?\nDiese App wird ab jetzt auf Deutsch sein.\n Du kannst das später ändern.",
  en: "Do you understand English?\n This app will be in English from now on.\n You can change this later.",
  ru: "Вы понимаете русский?\n Это приложение теперь будет на русском языке.\n Вы можете изменить это позже.",
  ce: "Хьуна нохчийн мотт хаъий?\n Хӏара приложение хӏинца дуьйна нохчийн маттахь хир ю.\n Хьо и тӏаьхьо хийца йиш ю.",
  prs: "آیا دری را میفهمید؟ این برنامه از این به بعد به زبان دری خواهد بود. شما می‌توانید بعداً این را تغییر دهید.",
  ps: "ایا تاسو پښتو پوهیږئ؟ دا اپلیکیشن به له دې وروسته په پښتو وي. تاسو کولی شئ دا وروسته بدل کړئ.",
  fa: "آیا فارسی را میفهمید؟ این برنامه از این به بعد به زبان فارسی خواهد بود. شما می‌توانید بعداً ا��ن را تغییر دهید.",
  ar: "هل تفهم العربية؟ سيكون هذا التطبيق باللغة العربية من الآن فصاعدًا. يمكنك تغيير ذلك لاحقًا.",
  ku: "Tu Kurdî fêm dikî?\n Ev sepan ji niha û pê ve bi Kurdî be.\n Tu dikarî vê paşê biguherînî.",
  so: "Ma fahmaysaa Soomaali?\n Abkan wuxuu noqon doonaa Soomaali hadda.\n Waxaad bedeli kartaa mar dambe.",
  ka: "გესმით ქართული?\n ეს აპლიკაცია ამიერიდან ქართულ ენაზე იქნება.\n შეგიძლიათ ეს შეცვალოთ მოგვიანებით.",
  sq: "A e kuptoni shqip?\n Ky aplikacion do të jetë në shqip nga tani e tutje.\n Mund ta ndryshoni këtë më vonë.",
};

// Hover messages in each language
const hoverMessages: Record<string, string> = {
  de: "Bitte wählen Sie, wenn Deutsch Ihre Muttersprache ist",
  en: "Please select if English is your mother tongue",
  ru: "Пожалуйста, выберите, если русский - ваш родной язык",
  ce: "Дехар до, нохчийн мотт хьан ненан мотт белахь, харжа",
  prs: "لطفاً انتخاب کنید اگر دری زبان مادری شماست",
  ps: "مهرباني وکړئ غوره کړئ که پښتو ستاسو مورنۍ ژبه وي",
  fa: "لطفاً انتخاب کنید اگر فارسی زبان مادری شماست",
  ar: "الرجاء التحديد إذا كانت العربية هي لغتك الأم",
  ku: "Eger Kurdî zimanê dayîka we ye, ji kerema xwe hilbijêre",
  so: "Fadlan dooro haddii Soomaali ay tahay afkaaga hooyo",
  ka: "გთხოვთ აირჩიოთ, თუ ქართული თქვენი მშობლიური ენაა",
  sq: "Ju lutemi zgjidhni nëse shqipja është gjuha juaj amtare",
};

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const [currentWelcomeIndex, setCurrentWelcomeIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [hoverLanguage, setHoverLanguage] = useState<Language | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  
  const animatedScale = useRef(new Animated.Value(1)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const countdownProgress = useRef(new Animated.Value(1)).current;
  const countdownTimer = useRef<NodeJS.Timeout | null>(null);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // Rotate through welcome messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWelcomeIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle language selection
  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    
    // Animate scaling - reduced scale value from 1.5 to 1.2 for smaller dialog
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
      setSelectedLanguage(null);
      countdownProgress.setValue(1);
      if (countdownTimer.current) {
        clearTimeout(countdownTimer.current);
      }
    });
  };

  // Confirm language selection
  const confirmLanguage = (code: string) => {
    console.log(`Confirmed language: ${code}`);
    if (countdownTimer.current) {
      clearTimeout(countdownTimer.current);
    }
    // Navigate to homepage
    router.push('/home');
  };

  // Handle hover effect (simulated for touch devices)
  const handlePressIn = (language: Language, event: any) => {
    setHoverLanguage(language);
    // Get touch position
    setHoverPosition({
      x: event.nativeEvent.locationX + 50,
      y: event.nativeEvent.locationY,
    });
  };

  const handlePressOut = () => {
    setHoverLanguage(null);
  };

  // Get current welcome message based on index
  const currentWelcomeCode = languages[currentWelcomeIndex]?.code;
  const currentWelcomeMessage = currentWelcomeCode ? welcomeMessages[currentWelcomeCode] : welcomeMessages.en;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{currentWelcomeMessage}</Text>
        <Text style={styles.subtitle}>Please choose your preferred language</Text>
        
        {/* Top right buttons */}
        <View style={styles.topRightButtons}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => setShowInfo(true)}
          >
            <MaterialIcons name="help" size={Dimensions.get('window').width / 25} color="#333" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => setSoundEnabled(!soundEnabled)}
          >
            <MaterialIcons 
              name={soundEnabled ? "volume-up" : "volume-off"} 
              size={Dimensions.get('window').width / 25}
              color="#333" 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Language Grid */}
      <ScrollView contentContainerStyle={styles.languageGrid}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={styles.languageItem}
            onPress={() => handleLanguageSelect(language)}
            onPressIn={(e) => handlePressIn(language, e)}
            onPressOut={handlePressOut}
          >
          <View style={{ width: '60%', aspectRatio:1 }}>
            <language.flag style={styles.languageFlag}></language.flag>
           </View>
           <Text style={styles.languageName}>{language.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Hover tooltip (simulated) */}
      {hoverLanguage && (
        <View 
          style={[
            styles.hoverTooltip,
            {
              left: hoverPosition.x,
              top: hoverPosition.y,
            }
          ]}
        >
          <Text style={styles.hoverText}>
            {hoverMessages[hoverLanguage.code] || hoverMessages.en}
          </Text>
        </View>
      )}
      
      {/* Language Detail Modal */}
      <Modal
        visible={selectedLanguage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={closeLanguageDetail}
      >
        <Pressable style={styles.modalOverlay} onPress={closeLanguageDetail}>
          <View style={styles.centeredView}>
            <Animated.View 
              style={[
                styles.modalView,
                {
                  transform: [{ scale: animatedScale }],
                }
              ]}
            >
              <TouchableOpacity 
                style={styles.backButton}
                onPress={closeLanguageDetail}
              >
                <MaterialIcons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              
              {selectedLanguage && (
                <View style={styles.languageDetail}>
                  <View style={{ width: '30%', aspectRatio:1, marginBottom: 10 }}>
                    <selectedLanguage.flag props={styles.languageFlag}/>
                  </View>
                  <Text style={styles.detailText}>
                    {confirmationMessages[selectedLanguage.code] || confirmationMessages.en}
                  </Text>
                  
                  {/* Yes/No Buttons */}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.noButton}
                      onPress={closeLanguageDetail}
                    >
                      <Text style={styles.noButtonText}>
                        {selectedLanguage.code === "en" ? "No" : "Nein"}
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.yesButton}
                      onPress={() => confirmLanguage(selectedLanguage.code)}
                    >
                      <Text style={styles.yesButtonText}>
                        {selectedLanguage.code === "en" ? "Yes" : "Ja"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  
                  {/* Countdown bar */}
                  <View style={styles.countdownContainer}>
                    <Animated.View 
                      style={[
                        styles.countdownBar,
                        {
                          width: countdownProgress.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%'],
                          }),
                        }
                      ]}
                    />
                  </View>
                </View>
              )}
            </Animated.View>
          </View>
        </Pressable>
      </Modal>
      
      {/* Info Modal */}
      <Modal
        visible={showInfo}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowInfo(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.infoModalView}>
            <Text style={styles.infoTitle}>Language Selection</Text>
            <Text style={styles.infoText}>
              Please select your preferred language. This app supports 12 languages
              to help you navigate easily in your native language. You can always
              change the language later from the settings menu.
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowInfo(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    alignItems: "center",
    position: "relative",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    width: "60%"
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  topRightButtons: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
  },
  iconButton: {
    padding: 10,
    marginLeft: 10,
  },
  languageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },
  languageItem: {
    width: "30%",
    aspectRatio: 1,
    margin: "1.5%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 10,
    // Removed shadow properties
  },
  languageFlag: {
    width: "10%",
    height: "10%",
    marginBottom: 10,
    borderRadius: 30,
  },
  languageName: {
    fontSize: Dimensions.get('window').width / 25,
    textAlign: "center",
  },
  hoverTooltip: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 5,
    maxWidth: 200,
    zIndex: 1000,
  },
  hoverText: {
    color: "#fff",
    fontSize: 12,
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
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: '70%', // Reduced from 80% to make it smaller
    maxHeight: '50%', // Reduced from 60% to make it smaller
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    // Removed shadow properties
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  languageDetail: {
    width: "100%",
    alignItems: "center",
  },
  detailFlag: {
    width: Dimensions.get('window').height * .1,
    height: Dimensions.get('window').height * .1,
    marginBottom: 20,
    borderRadius: 50,
  },
  detailText: {
    fontSize: 14, // Reduced from 16 to accommodate smaller modal
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 15,
  },
  yesButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  yesButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  noButton: {
    backgroundColor: "#f44336",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  noButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  countdownContainer: {
    width: "100%",
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    marginTop: 10,
    overflow: "hidden",
  },
  countdownBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  infoModalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: "80%",
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoText: {
    marginBottom: 15,
    textAlign: "center",
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
