import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';
import HighlightedText from '../../../components/HighlightedText';

const ResourcesPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const definitions = {
    'Schuldnerberatung': {
      en: 'Debt counseling services that provide free advice for people with financial difficulties.',
      de: 'Schuldnerberatungsdienste, die kostenlose Beratung für Menschen mit finanziellen Schwierigkeiten bieten.',
      terms: {
        en: ['debt counseling', 'debt advice'],
        de: ['Schuldenberatung']
      }
    },
    'Budgetberatung': {
      en: 'Financial planning and budgeting advice to help manage household finances effectively.',
      de: 'Finanzplanung und Budgetberatung zur effektiven Verwaltung der Haushaltsfinanzen.',
      terms: {
        en: ['budget counseling', 'financial planning'],
        de: ['Haushaltsplanung']
      }
    },
    'Verbraucherberatung': {
      en: 'Consumer advice services protecting consumer rights and providing guidance on purchases and contracts.',
      de: 'Verbraucherberatungsdienste zum Schutz der Verbraucherrechte und Beratung bei Käufen und Verträgen.',
      terms: {
        en: ['consumer advice', 'consumer protection'],
        de: ['Konsumentenberatung', 'Konsumentenschutz']
      }
    },
    'Steuererklärung': {
      en: 'Annual tax return that must be filed with Austrian tax authorities to declare income and claim deductions.',
      de: 'Jährliche Steuererklärung, die bei den österreichischen Steuerbehörden eingereicht werden muss, um Einkommen zu erklären und Abzüge geltend zu machen.',
      terms: {
        en: ['tax return', 'tax declaration'],
        de: ['Steuerausgleich']
      }
    }
  };

  const content = {
    title: {
      en: 'Financial Resources for Immigrants',
      de: 'Finanzielle Ressourcen für Einwanderer'
    },
    subtitle: {
      en: 'Helpful Resources and Support Services',
      de: 'Hilfreiche Ressourcen und Unterstützungsdienste'
    },
    text: {
      en: `Managing finances in a new country can be challenging. Austria offers numerous resources, support services, and helpful tools to assist immigrants and refugees with their financial needs and integration.

**Financial Education and Counseling:**
Free financial literacy programs are available through various organizations. These cover basic banking, insurance, taxes, and budgeting. Many programs are offered in multiple languages to support non-German speakers.

**Debt and Budget Counseling:**
Schuldnerberatung (debt counseling) services provide free, confidential advice for anyone experiencing financial difficulties. They help with debt management, budget planning, and negotiating with creditors.

**Consumer Protection:**
Verbraucherberatung services protect your rights as a consumer. They provide advice on contracts, warranties, dispute resolution, and help you understand your rights when making purchases or dealing with service providers.

**Tax Assistance:**
Help with Steuererklärung (tax returns) is available through various organizations. Many offer free or low-cost assistance specifically for immigrants who are filing Austrian taxes for the first time.

**Legal Aid for Financial Matters:**
Free legal consultation is available for financial and contractual issues. This includes help with understanding loan agreements, rental contracts, insurance policies, and employment contracts.

**Integration Support:**
Special programs exist to help immigrants understand the Austrian financial system, open bank accounts, and access credit. These programs often include language support and cultural orientation.`,
      de: `Die Verwaltung der Finanzen in einem neuen Land kann herausfordernd sein. Österreich bietet zahlreiche Ressourcen, Unterstützungsdienste und hilfreiche Tools, um Einwanderern und Flüchtlingen bei ihren finanziellen Bedürfnissen und der Integration zu helfen.

**Finanzbildung und Beratung:**
Kostenlose Programme zur Finanzbildung sind über verschiedene Organisationen verfügbar. Diese behandeln grundlegendes Banking, Versicherungen, Steuern und Budgetplanung. Viele Programme werden in mehreren Sprachen angeboten, um Nicht-Deutschsprachige zu unterstützen.

**Schulden- und Budgetberatung:**
Schuldnerberatungsdienste bieten kostenlose, vertrauliche Beratung für alle, die finanzielle Schwierigkeiten haben. Sie helfen bei der Schuldenverwaltung, Budgetplanung und Verhandlungen mit Gläubigern.

**Verbraucherschutz:**
Verbraucherberatungsdienste schützen Ihre Rechte als Verbraucher. Sie bieten Beratung zu Verträgen, Garantien, Streitbeilegung und helfen Ihnen, Ihre Rechte beim Kauf oder Umgang mit Dienstleistern zu verstehen.

**Steuerhilfe:**
Hilfe bei der Steuererklärung ist über verschiedene Organisationen verfügbar. Viele bieten kostenlose oder kostengünstige Unterstützung speziell für Einwanderer, die zum ersten Mal österreichische Steuern einreichen.

**Rechtshilfe für finanzielle Angelegenheiten:**
Kostenlose Rechtsberatung ist für finanzielle und vertragliche Angelegenheiten verfügbar. Dies umfasst Hilfe beim Verständnis von Darlehensverträgen, Mietverträgen, Versicherungspolicen und Arbeitsverträgen.

**Integrationshilfe:**
Spezielle Programme helfen Einwanderern, das österreichische Finanzsystem zu verstehen, Bankkonten zu eröffnen und Kredite zu erhalten. Diese Programme beinhalten oft Sprachunterstützung und kulturelle Orientierung.`
    },
    resourceCategories: [
      {
        title: { en: 'Financial Counseling', de: 'Finanzberatung' },
        resources: [
          {
            name: { en: 'ASB Debt Counseling', de: 'ASB Schuldnerberatung' },
            description: { en: 'Free debt and budget counseling nationwide', de: 'Kostenlose Schulden- und Budgetberatung österreichweit' },
            website: 'https://www.schuldenberatung.at'
          },
          {
            name: { en: 'Caritas Budget Counseling', de: 'Caritas Budgetberatung' },
            description: { en: 'Budget planning and financial education', de: 'Budgetplanung und Finanzbildung' },
            website: 'https://www.caritas.at'
          }
        ]
      },
      {
        title: { en: 'Consumer Protection', de: 'Konsumentenschutz' },
        resources: [
          {
            name: { en: 'AK Consumer Protection', de: 'AK Konsumentenschutz' },
            description: { en: 'Consumer rights and contract advice', de: 'Verbraucherrechte und Vertragsberatung' },
            website: 'https://www.arbeiterkammer.at'
          },
          {
            name: { en: 'VKI Consumer Magazine', de: 'VKI Konsument Magazin' },
            description: { en: 'Product tests and consumer information', de: 'Produkttests und Verbraucherinformationen' },
            website: 'https://www.konsument.at'
          }
        ]
      },
      {
        title: { en: 'Tax Support', de: 'Steuerhilfe' },
        resources: [
          {
            name: { en: 'Tax Advice Centers', de: 'Steuerberatungsstellen' },
            description: { en: 'Free tax return assistance', de: 'Kostenlose Steuererklärungshilfe' },
            website: 'https://www.bmf.gv.at'
          },
          {
            name: { en: 'AK Tax Calculator', de: 'AK Steuerrechner' },
            description: { en: 'Online tax calculation tools', de: 'Online Steuerberechnungstools' },
            website: 'https://www.arbeiterkammer.at'
          }
        ]
      },
      {
        title: { en: 'Integration Support', de: 'Integrationshilfe' },
        resources: [
          {
            name: { en: 'ÖIF Integration Centers', de: 'ÖIF Integrationszentren' },
            description: { en: 'Financial integration programs', de: 'Finanzielle Integrationsprogramme' },
            website: 'https://www.integrationsfonds.at'
          },
          {
            name: { en: 'MigrantInnenberatung', de: 'MigrantInnenberatung' },
            description: { en: 'Comprehensive integration counseling', de: 'Umfassende Integrationsberatung' },
            website: 'https://www.migrant.at'
          }
        ]
      }
    ],
    importantLinks: [
      {
        title: { en: 'Official Austrian Financial Guide', de: 'Offizieller österreichischer Finanzleitfaden' },
        url: 'https://www.help.gv.at'
      },
      {
        title: { en: 'Financial Market Authority', de: 'Finanzmarktaufsicht' },
        url: 'https://www.fma.gv.at'
      },
      {
        title: { en: 'Social Ministry Resources', de: 'Sozialministerium Ressourcen' },
        url: 'https://www.sozialministerium.at'
      },
      {
        title: { en: 'Chamber of Labor Guide', de: 'Arbeiterkammer Leitfaden' },
        url: 'https://www.arbeiterkammer.at'
      }
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation
        showLanguageModal={() => setShowLanguageModal(true)}
        showVirtualAssistant={() => setShowVirtualAssistant(true)}
        showTutorial={() => setShowTutorial(true)}
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          {language.code === 'de' ? content.title.de : content.title.en}
        </Text>
        
        <Text style={styles.subtitle}>
          {language.code === 'de' ? content.subtitle.de : content.subtitle.en}
        </Text>
        
        <HighlightedText 
          definitions={definitions}
          language={language.code}
        >
          {language.code === 'de' ? content.text.de : content.text.en}
        </HighlightedText>
        
        {content.resourceCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>
              {language.code === 'de' ? category.title.de : category.title.en}
            </Text>
            
            {category.resources.map((resource, resourceIndex) => (
              <View key={resourceIndex} style={styles.resourceCard}>
                <Text style={styles.resourceName}>
                  {language.code === 'de' ? resource.name.de : resource.name.en}
                </Text>
                <Text style={styles.resourceDescription}>
                  {language.code === 'de' ? resource.description.de : resource.description.en}
                </Text>
                <TouchableOpacity 
                  style={styles.websiteButton}
                  onPress={() => handleLinkPress(resource.website)}
                >
                  <MaterialIcons name="link" size={16} color="#3B82F6" />
                  <Text style={styles.websiteText}>
                    {language.code === 'de' ? 'Website besuchen' : 'Visit Website'}
                  </Text>
                  <MaterialIcons name="open-in-new" size={14} color="#3B82F6" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
        
        <View style={styles.linksSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Wichtige Links' : 'Important Links'}
          </Text>
          
          {content.importantLinks.map((link, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.linkItem}
              onPress={() => handleLinkPress(link.url)}
            >
              <MaterialIcons name="link" size={20} color="#3B82F6" />
              <Text style={styles.linkText}>
                {language.code === 'de' ? link.title.de : link.title.en}
              </Text>
              <MaterialIcons name="open-in-new" size={16} color="#666" />
            </TouchableOpacity>
          ))}
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
        tutorialData="finance"
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
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 32,
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 8,
  },
  resourceCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  resourceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  resourceDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  websiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  websiteText: {
    fontSize: 14,
    color: '#3B82F6',
    marginLeft: 4,
    marginRight: 4,
    fontWeight: '500',
  },
  linksSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    color: '#3B82F6',
    marginLeft: 12,
    fontWeight: '500',
  },
});

export default ResourcesPage;