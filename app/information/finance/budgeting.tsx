import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import VirtualAssistantModal from '../../../components/VirtualAssistantModal';
import TutorialModal from '../../../components/TutorialModal';
import HighlightedText from '../../../components/HighlightedText';

const BudgetingPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const definitions = {
    'budget': {
      en: 'A plan for how to spend your money over a specific period, typically monthly or yearly.',
      de: 'Ein Plan für die Ausgabe Ihres Geldes über einen bestimmten Zeitraum, normalerweise monatlich oder jährlich.',
      terms: {
        en: ['budgeting', 'financial planning'],
        de: ['Budgetplanung', 'Haushaltsplan', 'Finanzplanung']
      }
    },
    'fixed costs': {
      en: 'Regular expenses that remain the same each month, such as rent, insurance, and loan payments.',
      de: 'Regelmäßige Ausgaben, die jeden Monat gleich bleiben, wie Miete, Versicherung und Kreditzahlungen.',
      terms: {
        en: ['fixed expenses'],
        de: ['Fixkosten', 'feste Kosten']
      }
    },
    'variable costs': {
      en: 'Expenses that change from month to month, such as groceries, entertainment, and utilities.',
      de: 'Ausgaben, die von Monat zu Monat variieren, wie Lebensmittel, Unterhaltung und Nebenkosten.',
      terms: {
        en: ['variable expenses'],
        de: ['variable Kosten', 'veränderliche Kosten']
      }
    },
    'Wohnbeihilfe': {
      en: 'Housing assistance provided by the Austrian government to help with rent costs for those who qualify.',
      de: 'Wohnunterstützung der österreichischen Regierung zur Unterstützung bei Mietkosten für Berechtigte.',
      terms: {
        en: ['housing benefit', 'rent assistance'],
        de: ['Wohnhilfe', 'Mietbeihilfe']
      }
    }
  };

  const content = {
    title: {
      en: 'Finance - Budgeting',
      de: 'Finanzen - Budgetplanung'
    },
    subtitle: {
      en: 'Managing Your Money in Austria',
      de: 'Ihr Geld in Österreich verwalten'
    },
    text: {
      en: `Creating a budget is essential for financial stability in Austria. Understanding typical expenses and available support can help you manage your finances effectively.

Typical Major Expenses in Austria:
• Rent (Miete): Usually 25-40% of income
• Utilities (Nebenkosten): €100-200 per month
• Health Insurance: Mandatory, usually deducted from salary
• Food and groceries: €200-400 per month per person
• Transportation: €50-150 per month
• Phone and internet: €30-60 per month

Housing is often the largest expense. If you struggle with rent costs, you may qualify for Wohnbeihilfe (housing assistance) from your state government. Requirements vary by state but typically consider income and family size.

Money-Saving Tips:
• Compare energy providers annually - switching can save €100-300 per year
• Use public transportation annual passes for better rates
• Shop at discount supermarkets like Hofer, Lidl, or Penny
• Take advantage of student discounts if eligible
• Consider shared accommodation to reduce housing costs
• Use apps like "Zu gut für die Tonne" for discounted food

Emergency Fund:
Aim to save 3-6 months of expenses for emergencies. Start small - even €10 per month helps build the habit.

Banking for Budgeting:
Most Austrian banks offer budgeting tools and automatic savings plans. Many also provide free financial consultations for account holders.`,
      de: `Ein Budget zu erstellen ist für finanzielle Stabilität in Österreich unerlässlich. Das Verständnis typischer Ausgaben und verfügbarer Unterstützung kann Ihnen helfen, Ihre Finanzen effektiv zu verwalten.

Typische große Ausgaben in Österreich:
• Miete: Normalerweise 25-40% des Einkommens
• Nebenkosten: €100-200 pro Monat
• Krankenversicherung: Pflicht, meist vom Gehalt abgezogen
• Essen und Lebensmittel: €200-400 pro Monat pro Person
• Transport: €50-150 pro Monat
• Telefon und Internet: €30-60 pro Monat

Wohnen ist oft die größte Ausgabe. Wenn Sie Probleme mit Mietkosten haben, könnten Sie Anspruch auf Wohnbeihilfe von Ihrer Landesregierung haben. Die Anforderungen variieren je Bundesland, berücksichtigen aber typischerweise Einkommen und Familiengröße.

Geld-Spar-Tipps:
• Energieanbieter jährlich vergleichen - Wechseln kann €100-300 pro Jahr sparen
• Öffentliche Verkehrsmittel-Jahresabos für bessere Tarife nutzen
• In Diskontsupermärkten wie Hofer, Lidl oder Penny einkaufen
• Studentenrabatte nutzen, falls berechtigt
• Wohngemeinschaften erwägen, um Wohnkosten zu reduzieren
• Apps wie "Zu gut für die Tonne" für reduzierte Lebensmittel nutzen

Notgroschen:
Ziel ist es, 3-6 Monate an Ausgaben für Notfälle zu sparen. Klein anfangen - auch €10 pro Monat helfen beim Aufbau der Gewohnheit.

Banking für Budgetplanung:
Die meisten österreichischen Banken bieten Budgetierungs-Tools und automatische Sparpläne. Viele bieten auch kostenlose Finanzberatungen für Kontoinhaber.`
    },
    links: [
      {
        title: { en: 'Housing Assistance Austria', de: 'Wohnbeihilfe Österreich' },
        url: 'https://www.oesterreich.gv.at/themen/bauen_wohnen_und_umwelt/wohnen/4/Seite.120810.html'
      },
      {
        title: { en: 'Energy Price Comparison', de: 'Energiepreisvergleich' },
        url: 'https://www.e-control.at'
      },
      {
        title: { en: 'Consumer Protection Austria', de: 'Konsumentenschutz Österreich' },
        url: 'https://www.konsument.at'
      },
      {
        title: { en: 'Financial Education Platform', de: 'Finanzbildungsplattform' },
        url: 'https://www.fit4internet.at'
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
        
        <View style={styles.linksSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Nützliche Links' : 'Useful Links'}
          </Text>
          
          {content.links.map((link, index) => (
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
  linksSection: {
    marginTop: 32,
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

export default BudgetingPage;