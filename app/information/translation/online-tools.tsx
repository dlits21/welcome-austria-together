import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Linking
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';
import TranslationCard from '../../../components/TranslationCard';

const OnlineToolsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const content = {
    en: {
      title: "Online Translation Tools",
      subtitle: "Free and Paid Translation Services",
      description: "Comprehensive list of online translation tools to help you translate text, documents, and websites.",
      sections: [
        {
          title: "Free Online Translators",
          tools: [
            {
              name: "Google Translate",
              url: "https://translate.google.com",
              features: ["Text translation", "Document upload", "Image translation", "Real-time conversation", "Website translation"],
              languages: "100+ languages",
              description: "Google's powerful and widely-used translation service with support for documents, images, and real-time conversation.",
              pros: ["Free", "Many languages", "Document support", "Mobile app"],
              cons: ["Quality varies", "No human review"]
            },
            {
              name: "Microsoft Translator",
              url: "https://www.bing.com/translator",
              features: ["Text translation", "Document translation", "Conversation mode", "Offline translation"],
              languages: "70+ languages",
              description: "Microsoft's translation service with excellent offline capabilities and business integrations.",
              pros: ["Good accuracy", "Offline mode", "Business integration"],
              cons: ["Fewer languages than Google", "Limited document formats"]
            },
            {
              name: "Yandex Translate",
              url: "https://translate.yandex.com",
              features: ["Text translation", "Image translation", "Website translation"],
              languages: "90+ languages",
              description: "Russian-based translator with excellent support for Eastern European and Asian languages.",
              pros: ["Good for Russian/Eastern European", "Image translation"],
              cons: ["Limited document support", "Less accurate for some language pairs"]
            }
          ]
        },
        {
          title: "Premium Translation Services",
          tools: [
            {
              name: "DeepL",
              url: "https://www.deepl.com/translator",
              features: ["High-quality translation", "Document translation", "API access", "CAT tool integration"],
              languages: "30+ languages",
              description: "AI-powered translator known for superior quality, especially for European languages.",
              pros: ["Excellent quality", "Natural translations", "Professional features"],
              cons: ["Limited free usage", "Fewer languages", "Paid for documents"]
            },
            {
              name: "Reverso",
              url: "https://www.reverso.net/text-translation",
              features: ["Context examples", "Conjugation", "Synonyms", "Grammar check"],
              languages: "20+ languages",
              description: "Translation service with extensive context examples and language learning features.",
              pros: ["Context examples", "Learning features", "Grammar help"],
              cons: ["Limited languages", "Basic document support"]
            }
          ]
        },
        {
          title: "Specialized Translation Tools",
          tools: [
            {
              name: "Linguee",
              url: "https://www.linguee.com",
              features: ["Dictionary with examples", "Professional translations", "Context search"],
              languages: "25+ languages",
              description: "Dictionary and translation search engine with real-world usage examples from professional translations.",
              pros: ["Real examples", "Professional quality", "Context-aware"],
              cons: ["Limited to dictionary/phrases", "No document translation"]
            },
            {
              name: "Papago (Naver)",
              url: "https://papago.naver.com",
              features: ["Text translation", "Image translation", "Handwriting recognition"],
              languages: "Korean, Japanese, Chinese focus",
              description: "Naver's translation service, excellent for Asian languages, especially Korean.",
              pros: ["Excellent for Asian languages", "Handwriting support"],
              cons: ["Limited language pairs", "Korea-focused"]
            }
          ]
        }
      ],
      tips: "Translation Tips",
      tipsList: [
        "**Break down complex sentences** into simpler parts for better accuracy",
        "**Always review machine translations** - they may contain errors",
        "**Use multiple tools** to compare results and find the best translation",
        "**For important documents**, consider professional human translation",
        "**Check context** - the same word can have different meanings",
        "**Be aware of cultural nuances** that machines might miss"
      ],
      disclaimer: "**Important:** These tools are for general reference only. For official documents, legal papers, or important business communications, always use certified professional translation services."
    },
    de: {
      title: "Online-Übersetzungstools",
      subtitle: "Kostenlose und kostenpflichtige Übersetzungsdienste",
      description: "Umfassende Liste von Online-Übersetzungstools zur Übersetzung von Texten, Dokumenten und Websites.",
      sections: [
        {
          title: "Kostenlose Online-Übersetzer",
          tools: [
            {
              name: "Google Translate",
              url: "https://translate.google.com",
              features: ["Textübersetzung", "Dokument-Upload", "Bildübersetzung", "Echtzeit-Gespräche", "Website-Übersetzung"],
              languages: "100+ Sprachen",
              description: "Googles mächtiger und weit verbreiteter Übersetzungsdienst mit Unterstützung für Dokumente, Bilder und Echtzeit-Gespräche.",
              pros: ["Kostenlos", "Viele Sprachen", "Dokument-Support", "Mobile App"],
              cons: ["Qualität variiert", "Keine menschliche Überprüfung"]
            },
            {
              name: "Microsoft Translator",
              url: "https://www.bing.com/translator",
              features: ["Textübersetzung", "Dokumentübersetzung", "Gesprächsmodus", "Offline-Übersetzung"],
              languages: "70+ Sprachen",
              description: "Microsofts Übersetzungsdienst mit ausgezeichneten Offline-Funktionen und Business-Integrationen.",
              pros: ["Gute Genauigkeit", "Offline-Modus", "Business-Integration"],
              cons: ["Weniger Sprachen als Google", "Begrenzte Dokumentformate"]
            },
            {
              name: "Yandex Translate",
              url: "https://translate.yandex.com",
              features: ["Textübersetzung", "Bildübersetzung", "Website-Übersetzung"],
              languages: "90+ Sprachen",
              description: "Russischer Übersetzer mit ausgezeichneter Unterstützung für osteuropäische und asiatische Sprachen.",
              pros: ["Gut für Russisch/Osteuropäisch", "Bildübersetzung"],
              cons: ["Begrenzte Dokument-Unterstützung", "Weniger genau für manche Sprachpaare"]
            }
          ]
        },
        {
          title: "Premium-Übersetzungsdienste",
          tools: [
            {
              name: "DeepL",
              url: "https://www.deepl.com/translator",
              features: ["Hochwertige Übersetzung", "Dokumentübersetzung", "API-Zugang", "CAT-Tool-Integration"],
              languages: "30+ Sprachen",
              description: "KI-gestützter Übersetzer bekannt für überlegene Qualität, besonders für europäische Sprachen.",
              pros: ["Ausgezeichnete Qualität", "Natürliche Übersetzungen", "Professionelle Features"],
              cons: ["Begrenzte kostenlose Nutzung", "Weniger Sprachen", "Kostenpflichtig für Dokumente"]
            },
            {
              name: "Reverso",
              url: "https://www.reverso.net/text-translation",
              features: ["Kontextbeispiele", "Konjugation", "Synonyme", "Grammatikprüfung"],
              languages: "20+ Sprachen",
              description: "Übersetzungsdienst mit umfangreichen Kontextbeispielen und Sprachlernfunktionen.",
              pros: ["Kontextbeispiele", "Lernfunktionen", "Grammatikhilfe"],
              cons: ["Begrenzte Sprachen", "Grundlegende Dokument-Unterstützung"]
            }
          ]
        },
        {
          title: "Spezialisierte Übersetzungstools",
          tools: [
            {
              name: "Linguee",
              url: "https://www.linguee.com",
              features: ["Wörterbuch mit Beispielen", "Professionelle Übersetzungen", "Kontextsuche"],
              languages: "25+ Sprachen",
              description: "Wörterbuch und Übersetzungssuchmaschine mit realen Anwendungsbeispielen aus professionellen Übersetzungen.",
              pros: ["Echte Beispiele", "Professionelle Qualität", "Kontextbewusst"],
              cons: ["Begrenzt auf Wörterbuch/Phrasen", "Keine Dokumentübersetzung"]
            },
            {
              name: "Papago (Naver)",
              url: "https://papago.naver.com",
              features: ["Textübersetzung", "Bildübersetzung", "Handschrifterkennung"],
              languages: "Koreanisch, Japanisch, Chinesisch Fokus",
              description: "Navers Übersetzungsdienst, ausgezeichnet für asiatische Sprachen, besonders Koreanisch.",
              pros: ["Ausgezeichnet für asiatische Sprachen", "Handschrift-Unterstützung"],
              cons: ["Begrenzte Sprachpaare", "Korea-fokussiert"]
            }
          ]
        }
      ],
      tips: "Übersetzungstipps",
      tipsList: [
        "**Zerlegen Sie komplexe Sätze** in einfachere Teile für bessere Genauigkeit",
        "**Überprüfen Sie immer maschinelle Übersetzungen** - sie können Fehler enthalten",
        "**Verwenden Sie mehrere Tools** um Ergebnisse zu vergleichen und die beste Übersetzung zu finden",
        "**Für wichtige Dokumente** sollten Sie professionelle menschliche Übersetzung in Betracht ziehen",
        "**Prüfen Sie den Kontext** - dasselbe Wort kann verschiedene Bedeutungen haben",
        "**Beachten Sie kulturelle Nuancen**, die Maschinen übersehen könnten"
      ],
      disclaimer: "**Wichtig:** Diese Tools dienen nur zur allgemeinen Orientierung. Für offizielle Dokumente, Rechtspapiere oder wichtige Geschäftskommunikation verwenden Sie immer zertifizierte professionelle Übersetzungsdienste."
    }
  };

  const currentContent = content[language.code as keyof typeof content] || content.en;

  const openExternalTool = (url: string) => {
    Linking.openURL(url);
  };

  const renderFeatureList = (features: string[]) => (
    <View style={styles.featureList}>
      {features.map((feature, index) => (
        <View key={index} style={styles.featureItem}>
          <Text style={styles.featureBullet}>•</Text>
          <Text style={styles.featureText}>{feature}</Text>
        </View>
      ))}
    </View>
  );

  const renderProsCons = (pros: string[], cons: string[]) => (
    <View style={styles.prosConsContainer}>
      <View style={styles.prosContainer}>
        <Text style={styles.prosTitle}>✅ {language.code === 'de' ? 'Vorteile' : 'Pros'}</Text>
        {pros.map((pro, index) => (
          <Text key={index} style={styles.proText}>• {pro}</Text>
        ))}
      </View>
      <View style={styles.consContainer}>
        <Text style={styles.consTitle}>❌ {language.code === 'de' ? 'Nachteile' : 'Cons'}</Text>
        {cons.map((con, index) => (
          <Text key={index} style={styles.conText}>• {con}</Text>
        ))}
      </View>
    </View>
  );

  const parseMarkdownText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <Text key={index} style={styles.boldText}>
            {part.slice(2, -2)}
          </Text>
        );
      }
      return part;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
      />
      
      <ScrollView style={styles.content}>

        <Text style={styles.title}>{currentContent.title}</Text>
        <Text style={styles.subtitle}>{currentContent.subtitle}</Text>
        <Text style={styles.description}>{parseMarkdownText(currentContent.description)}</Text>

        {currentContent.sections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            {section.tools.map((tool, toolIndex) => (
              <View key={toolIndex} style={styles.toolCard}>
                <View style={styles.toolHeader}>
                  <Text style={styles.toolName}>{tool.name}</Text>
                  <TouchableOpacity 
                    style={styles.visitButton}
                    onPress={() => openExternalTool(tool.url)}
                  >
                    <Text style={styles.visitButtonText}>
                      {language.code === 'de' ? 'Besuchen' : 'Visit'}
                    </Text>
                    <MaterialIcons name="open-in-new" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.toolDescription}>{parseMarkdownText(tool.description)}</Text>
                
                <View style={styles.languageSupport}>
                  <MaterialIcons name="language" size={16} color="#6B7280" />
                  <Text style={styles.languageSupportText}>{tool.languages}</Text>
                </View>
                
                <Text style={styles.featuresTitle}>
                  {language.code === 'de' ? 'Funktionen:' : 'Features:'}
                </Text>
                {renderFeatureList(tool.features)}
                
                {renderProsCons(tool.pros, tool.cons)}
              </View>
            ))}
          </View>
        ))}

        {/* Tips Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{currentContent.tips}</Text>
          <View style={styles.tipsContainer}>
            {currentContent.tipsList.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Text style={styles.tipText}>{parseMarkdownText(tip)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>{parseMarkdownText(currentContent.disclaimer)}</Text>
        </View>
      </ScrollView>
      
      <LanguageModal 
        visible={showLanguageModal} 
        onClose={() => setShowLanguageModal(false)} 
        languageCode={language.code}
      />
      
      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
        languageCode={language.code}
      />

      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={language.code}
        tutorialData="translation"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: '#3B82F6',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6B7280',
    marginBottom: 24,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  toolCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  toolName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  visitButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  visitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  toolDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    marginBottom: 12,
  },
  languageSupport: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  languageSupportText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  featureList: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  featureBullet: {
    color: '#3B82F6',
    fontWeight: 'bold',
    marginRight: 8,
    marginTop: 2,
  },
  featureText: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  prosConsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prosContainer: {
    flex: 1,
    marginRight: 8,
  },
  consContainer: {
    flex: 1,
    marginLeft: 8,
  },
  prosTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 4,
  },
  consTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 4,
  },
  proText: {
    fontSize: 12,
    color: '#059669',
    marginBottom: 2,
  },
  conText: {
    fontSize: 12,
    color: '#DC2626',
    marginBottom: 2,
  },
  tipsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tipItem: {
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
  },
  disclaimerContainer: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  disclaimerText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
});

export default OnlineToolsPage;