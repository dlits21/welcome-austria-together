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

const TaxesPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const definitions = {
    'income tax': {
      en: 'Tax paid on your salary and other income, calculated as a percentage of your earnings.',
      de: 'Steuer auf Ihr Gehalt und andere Einkünfte, berechnet als Prozentsatz Ihrer Einkünfte.',
      terms: {
        en: ['Lohnsteuer', 'Einkommensteuer'],
        de: ['Lohnsteuer', 'Einkommensteuer']
      }
    },
    'VAT': {
      en: 'Value Added Tax - a consumption tax added to most goods and services in Austria (20% standard rate).',
      de: 'Mehrwertsteuer - eine Verbrauchssteuer, die auf die meisten Waren und Dienstleistungen in Österreich erhoben wird (20% Standardsatz).',
      terms: {
        en: ['value added tax', 'sales tax'],
        de: ['Mehrwertsteuer', 'MwSt', 'Umsatzsteuer']
      }
    },
    'tax return': {
      en: 'Annual declaration of income and expenses to potentially receive a tax refund or pay additional taxes.',
      de: 'Jährliche Erklärung von Einkommen und Ausgaben, um möglicherweise eine Steuererstattung zu erhalten oder zusätzliche Steuern zu zahlen.',
      terms: {
        en: ['Arbeitnehmerveranlagung'],
        de: ['Arbeitnehmerveranlagung', 'Steuererklärung']
      }
    },
    'deductible expenses': {
      en: 'Costs that can be subtracted from your taxable income to reduce the amount of tax you owe.',
      de: 'Kosten, die von Ihrem steuerpflichtigen Einkommen abgezogen werden können, um die Höhe der geschuldeten Steuer zu reduzieren.',
      terms: {
        en: ['tax deductions'],
        de: ['absetzbare Ausgaben', 'Steuerabzüge', 'Werbungskosten']
      }
    }
  };

  const content = {
    title: {
      en: 'Finance - Taxes',
      de: 'Finanzen - Steuern'
    },
    subtitle: {
      en: 'Understanding Austrian Tax System',
      de: 'Das österreichische Steuersystem verstehen'
    },
    text: {
      en: `The Austrian tax system affects everyone living and working in Austria. Understanding your tax obligations helps you manage finances and potentially save money.

Types of Taxes in Austria:

Income Tax (Lohnsteuer/Einkommensteuer):
• Progressive rates: 0% up to €11,000, then 20%, 32.5%, 42%, 48%, 50%
• Automatically deducted from your salary by your employer
• Additional taxes may apply for high earners

Value Added Tax (Mehrwertsteuer - MwSt):
• Standard rate: 20% on most goods and services  
• Reduced rate: 10% on food, books, cultural events
• Reduced rate: 13% on accommodation, certain services
• Included in the price you see in stores

Other Common Taxes:
• Property Tax (Grundsteuer): For property owners
• Broadcasting Fee (GIS): €25.75/month for TV/radio
• Motor Vehicle Tax: For car ownership
• Capital Gains Tax: On investment profits

Tax Returns (Arbeitnehmerveranlagung):
You should file a tax return if you:
• Had multiple employers during the year
• Have deductible work expenses over €132
• Want to claim special expenses or extraordinary burdens
• Received unemployment benefits

Common Deductible Expenses:
• Work-related costs (travel, equipment, training)
• Home office expenses (if applicable)
• Professional clothing and safety equipment
• Union fees and professional memberships
• Commuting costs (public transport passes)
• Work-related meals and accommodation

Special Deductions:
• Charitable donations
• Church contributions  
• Extraordinary expenses (medical costs over 6% of income)
• Childcare costs
• Home renovation for accessibility

Tax Return Deadlines:
• Online filing: June 30th
• Paper filing: April 30th
• With tax advisor: December 31st

Tax refunds typically take 6-8 weeks to process and are automatically transferred to your bank account.`,
      de: `Das österreichische Steuersystem betrifft alle, die in Österreich leben und arbeiten. Das Verständnis Ihrer Steuerpflichten hilft Ihnen bei der Finanzverwaltung und kann Ihnen möglicherweise Geld sparen.

Steuerarten in Österreich:

Lohnsteuer/Einkommensteuer:
• Progressive Sätze: 0% bis €11.000, dann 20%, 32,5%, 42%, 48%, 50%
• Automatisch vom Gehalt durch den Arbeitgeber abgezogen
• Zusätzliche Steuern können für Hochverdiener gelten

Mehrwertsteuer (MwSt):
• Normalsatz: 20% auf die meisten Waren und Dienstleistungen
• Ermäßigter Satz: 10% auf Lebensmittel, Bücher, Kulturveranstaltungen
• Ermäßigter Satz: 13% auf Übernachtung, bestimmte Dienstleistungen
• Im Preis enthalten, den Sie in Geschäften sehen

Andere häufige Steuern:
• Grundsteuer: Für Immobilieneigentümer
• Rundfunkgebühr (GIS): €25,75/Monat für TV/Radio
• Kraftfahrzeugsteuer: Für Autobesitz
• Kapitalertragssteuer: Auf Investitionsgewinne

Steuererklärung (Arbeitnehmerveranlagung):
Sie sollten eine Steuererklärung abgeben, wenn Sie:
• Mehrere Arbeitgeber während des Jahres hatten
• Absetzbare Arbeitsausgaben über €132 haben
• Sonderausgaben oder außergewöhnliche Belastungen geltend machen möchten
• Arbeitslosengeld erhalten haben

Häufige absetzbare Ausgaben:
• Arbeitsbezogene Kosten (Reisen, Ausrüstung, Schulungen)
• Homeoffice-Ausgaben (falls zutreffend)
• Berufskleidung und Sicherheitsausrüstung
• Gewerkschaftsbeiträge und Berufsmitgliedschaften
• Fahrtkosten (Öffi-Jahrestickets)
• Arbeitsbezogene Mahlzeiten und Übernachtungen

Sonderabsetzungen:
• Spenden für wohltätige Zwecke
• Kirchenbeiträge
• Außergewöhnliche Ausgaben (Arztkosten über 6% des Einkommens)
• Kinderbetreuungskosten
• Wohnraumsanierung für Barrierefreiheit

Fristen für Steuererklärung:
• Online-Einreichung: 30. Juni
• Papiereinreichung: 30. April
• Mit Steuerberater: 31. Dezember

Steuererstattungen dauern normalerweise 6-8 Wochen und werden automatisch auf Ihr Bankkonto überwiesen.`
    },
    links: [
      {
        title: { en: 'Austrian Tax Office', de: 'Österreichisches Finanzamt' },
        url: 'https://www.bmf.gv.at'
      },
      {
        title: { en: 'Online Tax Filing', de: 'Online Steuererklärung' },
        url: 'https://finanzonline.bmf.gv.at'
      },
      {
        title: { en: 'Tax Calculator', de: 'Steuerrechner' },
        url: 'https://bruttonetto-rechner.at'
      },
      {
        title: { en: 'Chamber of Labor Tax Guide', de: 'AK Steuerratgeber' },
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

export default TaxesPage;