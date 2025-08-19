import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';
import HighlightedText from '../../../components/HighlightedText';
import FAQItem from '../../../components/FAQItem';

const ProfessionalTranslationPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);;
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const content = {
    en: {
      title: "Professional Translation Services",
      intro: "For official purposes in Austria, you'll often need certified or sworn translations. Understanding when and where to get professional translation services is essential for legal compliance and acceptance by Austrian authorities.",
      
      sections: [
        {
          title: "When You Need Professional Translation",
          content: [
            "• **Visa and residence permit applications**",
            "• **University admission and degree recognition**",
            "• **Employment applications with foreign qualifications**",
            "• **Marriage, divorce, or civil status documents**",
            "• **Medical records for insurance or treatment**",
            "• **Legal proceedings and court documents**",
            "• **Business licenses and commercial contracts**",
            "• **Driving license conversion from foreign countries**"
          ]
        },
        {
          title: "Types of Professional Translation",
          content: [
            "• **Certified Translation (Beglaubigte Übersetzung)**: For most official purposes",
            "• **Sworn Translation (Beeidigte Übersetzung)**: Court-certified for legal proceedings",
            "• **Notarized Translation**: Certified by a notary public",
            "• **Apostille Translation**: For international document recognition under Hague Convention"
          ]
        }
      ],

      officialServices: [
        {
          name: "Ministry of Justice - Sworn Translators Registry",
          description: "Official directory of court-certified translators",
          website: "https://www.justiz.gv.at",
          type: "Government Service"
        },
        {
          name: "Austrian Association of Translators and Interpreters (UNIVERSITAS)",
          description: "Professional association with certified members",
          website: "https://www.universitas.org",
          type: "Professional Association"
        },
        {
          name: "BKS Bank Translation Service",
          description: "Certified translations for banking and official documents",
          website: "https://www.bks.at",
          type: "Banking Service"
        }
      ],

      unofficialServices: [
        {
          name: "Caritas Translation Services",
          description: "Affordable translation help for refugees and migrants",
          website: "https://www.caritas.at",
          type: "NGO Service"
        },
        {
          name: "Diakonie Document Support",
          description: "Translation assistance and guidance",
          website: "https://diakonie.at",
          type: "NGO Service"
        },
        {
          name: "Community Translation Projects",
          description: "Volunteer-based translation support in various languages",
          website: "Local community centers",
          type: "Community Service"
        }
      ],

      faqs: [
        {
          question: "What's the difference between certified and sworn translation?",
          answer: "Certified translations are done by qualified translators and accepted for most official purposes. Sworn translations are done by court-appointed translators and required for legal proceedings, court cases, and sometimes immigration matters."
        },
        {
          question: "How much do professional translations cost?",
          answer: "Certified translations typically cost €25-50 per page. Sworn translations are more expensive at €40-80 per page. Express services cost 50-100% more. Complex technical documents may cost more."
        },
        {
          question: "How long do professional translations take?",
          answer: "Standard turnaround is 5-10 business days. Express service (24-48 hours) is available for urgent needs. Complex or lengthy documents may take longer."
        },
        {
          question: "Can I get help paying for translations?",
          answer: "Some NGOs like Caritas offer subsidized translation services. Legal aid may cover translation costs for court proceedings. Check with your local integration center for available support programs."
        }
      ]
    },
    de: {
      title: "Professionelle Übersetzungsdienste",
      intro: "Für offizielle Zwecke in Österreich benötigen Sie oft beglaubigte oder beeidigte Übersetzungen. Zu verstehen, wann und wo Sie professionelle Übersetzungsdienste erhalten, ist für die Rechtskonformität und Akzeptanz durch österreichische Behörden unerlässlich.",
      
      sections: [
        {
          title: "Wann Sie professionelle Übersetzungen benötigen",
          content: [
            "• **Visa- und Aufenthaltstitelanträge**",
            "• **Universitätszulassung und Abschlusserkennung**",
            "• **Bewerbungen mit ausländischen Qualifikationen**",
            "• **Heirats-, Scheidungs- oder Personenstandsdokumente**",
            "• **Krankenakten für Versicherung oder Behandlung**",
            "• **Gerichtsverfahren und Gerichtsdokumente**",
            "• **Gewerbescheine und Handelsverträge**",
            "• **Führerscheinumwandlung aus dem Ausland**"
          ]
        },
        {
          title: "Arten professioneller Übersetzungen",
          content: [
            "• **Beglaubigte Übersetzung**: Für die meisten offiziellen Zwecke",
            "• **Beeidigte Übersetzung**: Gerichtlich zertifiziert für Gerichtsverfahren",
            "• **Notariell beglaubigte Übersetzung**: Von einem Notar beglaubigt",
            "• **Apostille-Übersetzung**: Für internationale Dokumentenanerkennung unter Haager Konvention"
          ]
        }
      ],

      officialServices: [
        {
          name: "Justizministerium - Verzeichnis beeidigter Übersetzer",
          description: "Offizielles Verzeichnis gerichtlich zertifizierter Übersetzer",
          website: "https://www.justiz.gv.at",
          type: "Behördlicher Service"
        },
        {
          name: "Österreichischer Übersetzer- und Dolmetscherverband (UNIVERSITAS)",
          description: "Berufsverband mit zertifizierten Mitgliedern",
          website: "https://www.universitas.org",
          type: "Berufsverband"
        },
        {
          name: "BKS Bank Übersetzungsservice",
          description: "Beglaubigte Übersetzungen für Bank- und Amtsdokumente",
          website: "https://www.bks.at",
          type: "Banking-Service"
        }
      ],

      unofficialServices: [
        {
          name: "Caritas Übersetzungsdienste",
          description: "Günstige Übersetzungshilfe für Flüchtlinge und Migranten",
          website: "https://www.caritas.at",
          type: "NGO-Service"
        },
        {
          name: "Diakonie Dokumentenunterstützung",
          description: "Übersetzungshilfe und Beratung",
          website: "https://diakonie.at",
          type: "NGO-Service"
        },
        {
          name: "Community-Übersetzungsprojekte",
          description: "Ehrenamtliche Übersetzungsunterstützung in verschiedenen Sprachen",
          website: "Lokale Gemeindezentren",
          type: "Gemeindedienst"
        }
      ],

      faqs: [
        {
          question: "Was ist der Unterschied zwischen beglaubigter und beeidigter Übersetzung?",
          answer: "Beglaubigte Übersetzungen werden von qualifizierten Übersetzern angefertigt und für die meisten offiziellen Zwecke akzeptiert. Beeidigte Übersetzungen werden von gerichtlich bestellten Übersetzern gemacht und sind für Gerichtsverfahren und manchmal Einwanderungsangelegenheiten erforderlich."
        },
        {
          question: "Wie viel kosten professionelle Übersetzungen?",
          answer: "Beglaubigte Übersetzungen kosten typischerweise €25-50 pro Seite. Beeidigte Übersetzungen sind teurer mit €40-80 pro Seite. Express-Services kosten 50-100% mehr. Komplexe technische Dokumente können mehr kosten."
        },
        {
          question: "Wie lange dauern professionelle Übersetzungen?",
          answer: "Standard-Bearbeitungszeit ist 5-10 Werktage. Express-Service (24-48 Stunden) ist für dringende Bedürfnisse verfügbar. Komplexe oder umfangreiche Dokumente können länger dauern."
        },
        {
          question: "Kann ich Hilfe bei der Bezahlung von Übersetzungen bekommen?",
          answer: "Einige NGOs wie Caritas bieten subventionierte Übersetzungsdienste an. Prozesskostenhilfe kann Übersetzungskosten für Gerichtsverfahren abdecken. Erkundigen Sie sich bei Ihrem lokalen Integrationszentrum nach verfügbaren Unterstützungsprogrammen."
        }
      ]
    }
  };

  const currentContent = content[language.code as keyof typeof content] || content.en;

  const openWebsite = (url: string) => {
    Linking.openURL(url);
  };

  const navigateToAskGeneral = () => {
    router.push('/ask/general');
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
        
        <Text style={styles.content}>{currentContent.intro}</Text>

        {currentContent.sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.content.map((item, itemIndex) => (
              <Text key={itemIndex} style={styles.content}>{item}</Text>
            ))}
          </View>
        ))}

        {/* Official Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Offizielle Übersetzungsdienste:' : 'Official Translation Services:'}
          </Text>
          {currentContent.officialServices.map((service, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.serviceCard}
              onPress={() => openWebsite(service.website)}
            >
              <View style={styles.serviceContent}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceType}>{service.type}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
              <MaterialIcons name="open-in-new" size={20} color="#3B82F6" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Unofficial Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Unterstützende Übersetzungsdienste:' : 'Support Translation Services:'}
          </Text>
          {currentContent.unofficialServices.map((service, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.serviceCard}
              onPress={() => service.website.startsWith('http') ? openWebsite(service.website) : null}
            >
              <View style={styles.serviceContent}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceType}>{service.type}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
              {service.website.startsWith('http') && (
                <MaterialIcons name="open-in-new" size={20} color="#3B82F6" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Community Help */}
        <View style={styles.communitySection}>
          <Text style={styles.communityTitle}>
            {language.code === 'de' ? 'Brauchen Sie Hilfe von der Community?' : 'Need Help from the Community?'}
          </Text>
          <Text style={styles.communityText}>
            {language.code === 'de' 
              ? 'Sie können auch die Community um Hilfe bei inoffiziellen Dokumentenübersetzungen bitten.'
              : 'You can also ask the community for help with unofficial document translations.'
            }
          </Text>
          <TouchableOpacity style={styles.communityButton} onPress={navigateToAskGeneral}>
            <MaterialIcons name="people" size={20} color="#fff" />
            <Text style={styles.communityButtonText}>
              {language.code === 'de' ? 'Community fragen' : 'Ask Community'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.faqTitle}>
          {language.code === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
        </Text>
        
        {currentContent.faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </ScrollView>
      
      {/* Virtual Assistant Modal */}
      <VirtualAssistantModal
        visible={showVirtualAssistant}
        onClose={() => setShowVirtualAssistant(false)}
        languageCode={language.code}
      />
      
      {/* Tutorial Modal */}
      <TutorialModal
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
        languageCode={language.code}
        tutorialData="home"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    marginBottom: 16,
    color: '#1a1a1a',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2d2d2d',
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  serviceContent: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  communitySection: {
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  communityText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 12,
  },
  communityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  communityButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  faqTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 24,
    color: '#1a1a1a',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 8,
  },
});

export default ProfessionalTranslationPage;