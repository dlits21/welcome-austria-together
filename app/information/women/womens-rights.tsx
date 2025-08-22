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

const WomensRightsPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const definitions = {
    'gender equality': {
      en: 'Equal rights, opportunities, and treatment for all genders regardless of sex, ensuring fairness in all aspects of life.',
      de: 'Gleiche Rechte, Chancen und Behandlung für alle Geschlechter unabhängig vom Geschlecht, um Fairness in allen Lebensbereichen zu gewährleisten.',
      terms: {
        en: ['equality', 'equal rights'],
        de: ['Gleichberechtigung', 'Gleichstellung']
      }
    },
    'discrimination': {
      en: 'Unfair treatment based on characteristics like gender, race, religion, or nationality that disadvantages certain groups.',
      de: 'Ungerechte Behandlung aufgrund von Merkmalen wie Geschlecht, Rasse, Religion oder Nationalität, die bestimmte Gruppen benachteiligt.',
      terms: {
        en: ['unfair treatment', 'prejudice'],
        de: ['Diskriminierung', 'ungerechte Behandlung']
      }
    },
    'legal protection': {
      en: 'Laws, regulations, and institutional systems designed to safeguard individuals from harm, abuse, or unfair treatment.',
      de: 'Gesetze, Vorschriften und institutionelle Systeme zum Schutz von Personen vor Schäden, Missbrauch oder ungerechter Behandlung.',
      terms: {
        en: ['legal safeguards', 'protection laws'],
        de: ['Rechtsschutz', 'gesetzlicher Schutz']
      }
    },
    'equal opportunities': {
      en: 'The principle that all people should have fair and equal access to jobs, education, and services regardless of their background.',
      de: 'Das Prinzip, dass alle Menschen fairen und gleichen Zugang zu Arbeitsplätzen, Bildung und Dienstleistungen haben sollten, unabhängig von ihrer Herkunft.',
      terms: {
        en: ['equal access', 'fair opportunities'],
        de: ['Chancengleichheit', 'gleiche Möglichkeiten']
      }
    }
  };

  const content = {
    title: {
      en: "Women's Rights in Austria",
      de: 'Frauenrechte in Österreich'
    },
    subtitle: {
      en: 'Understanding Your Rights and Legal Protections',
      de: 'Ihre Rechte und rechtlichen Schutzmaßnahmen verstehen'
    },
    text: {
      en: `As a woman in Austria, you have fundamental rights that are protected by law. These rights apply to all women, regardless of nationality, immigration status, or background.

**Your Fundamental Rights:**

Austria guarantees gender equality under the law. You have the same rights as men in all areas of life. The Austrian Constitution prohibits discrimination based on gender, and you are protected by both national and international human rights laws.

**Key Rights You Have:**

• **Right to Education**: You have the right to access education at all levels, from basic schooling to university. No one can deny you education because of your gender.

• **Right to Work and Equal Pay**: You have the right to work in any profession and receive equal opportunities for employment and promotion. Equal pay for equal work is your legal right.

• **Right to Healthcare**: You have the right to access healthcare services, including reproductive health services, without discrimination or judgment.

• **Right to Protection from Violence**: You have the right to live free from violence and abuse. Austrian law provides strong legal protection against domestic violence and harassment.

• **Right to Political Participation**: You have the right to vote, run for office, and participate in political activities. Your voice matters in democracy.

**International Protection:**

Austria follows the Convention on the Elimination of All Forms of Discrimination Against Women (CEDAW), which guarantees women's rights internationally. This means your rights are protected not just by Austrian law, but by international agreements.

**What You Can Do:**

• **Know Your Rights**: Learn about your legal rights and protections. Knowledge is power, and understanding your rights helps you assert them.

• **Report Discrimination**: If you experience discrimination, you can file a complaint with the Austrian Ombudsman Board or Equal Treatment Commission.

• **Seek Support**: Connect with women's organizations and support networks. You don't have to face challenges alone.

**Emergency Contacts:**
• Women's Helpline: 0800 222 555 (24/7, free)
• Police Emergency: 133

Remember: You deserve respect, equality, and protection. These rights are not privileges – they are guaranteed by law.`,
      de: `Als Frau in Österreich haben Sie grundlegende Rechte, die gesetzlich geschützt sind. Diese Rechte gelten für alle Frauen, unabhängig von Staatsangehörigkeit, Aufenthaltsstatus oder Herkunft.

**Ihre Grundrechte:**

Österreich garantiert Gleichberechtigung unter dem Gesetz. Sie haben die gleichen Rechte wie Männer in allen Lebensbereichen. Die österreichische Verfassung verbietet Diskriminierung aufgrund des Geschlechts, und Sie sind sowohl durch nationale als auch internationale Menschenrechtsgesetze geschützt.

**Wichtige Rechte, die Sie haben:**

• **Recht auf Bildung**: Sie haben das Recht auf Zugang zu Bildung auf allen Ebenen, von der Grundschule bis zur Universität. Niemand kann Ihnen Bildung aufgrund Ihres Geschlechts verweigern.

• **Recht auf Arbeit und gleiche Bezahlung**: Sie haben das Recht, in jedem Beruf zu arbeiten und Chancengleichheit bei Beschäftigung und Beförderung zu erhalten. Gleicher Lohn für gleiche Arbeit ist Ihr gesetzliches Recht.

• **Recht auf Gesundheitsversorgung**: Sie haben das Recht auf Zugang zu Gesundheitsdiensten, einschließlich reproduktiver Gesundheitsdienste, ohne Diskriminierung oder Verurteilung.

• **Recht auf Schutz vor Gewalt**: Sie haben das Recht, frei von Gewalt und Missbrauch zu leben. Das österreichische Recht bietet starken Rechtsschutz gegen häusliche Gewalt und Belästigung.

• **Recht auf politische Teilhabe**: Sie haben das Recht zu wählen, für ein Amt zu kandidieren und an politischen Aktivitäten teilzunehmen. Ihre Stimme zählt in der Demokratie.

**Internationaler Schutz:**

Österreich folgt der Konvention zur Beseitigung jeder Form von Diskriminierung der Frau (CEDAW), die Frauenrechte international garantiert. Das bedeutet, Ihre Rechte sind nicht nur durch österreichisches Recht, sondern auch durch internationale Abkommen geschützt.

**Was Sie tun können:**

• **Kennen Sie Ihre Rechte**: Lernen Sie Ihre gesetzlichen Rechte und Schutzmaßnahmen. Wissen ist Macht, und das Verständnis Ihrer Rechte hilft Ihnen, sie durchzusetzen.

• **Diskriminierung melden**: Wenn Sie Diskriminierung erfahren, können Sie eine Beschwerde bei der österreichischen Volksanwaltschaft oder Gleichbehandlungskommission einreichen.

• **Unterstützung suchen**: Vernetzen Sie sich mit Frauenorganisationen und Unterstützungsnetzwerken. Sie müssen Herausforderungen nicht allein bewältigen.

**Notfallkontakte:**
• Frauenhelpline: 0800 222 555 (24/7, kostenlos)
• Polizei Notruf: 133

Denken Sie daran: Sie verdienen Respekt, Gleichberechtigung und Schutz. Diese Rechte sind keine Privilegien – sie sind gesetzlich garantiert.`
    },
    links: [
      {
        title: { en: 'Federal Ministry for Women, Families and Youth', de: 'Bundesministerium für Frauen, Familie und Jugend' },
        url: 'https://www.frauen-familien-jugend.bka.gv.at/'
      },
      {
        title: { en: 'Equal Treatment Ombudsperson', de: 'Gleichbehandlungsanwaltschaft' },
        url: 'https://www.gleichbehandlungsanwaltschaft.gv.at/'
      },
      {
        title: { en: 'Austrian Women\'s Counseling Network', de: 'Österreichisches Frauenberatungsnetzwerk' },
        url: 'https://www.frauenberatung.at/'
      },
      {
        title: { en: 'Austrian Women\'s Shelter Network', de: 'Österreichisches Frauenhausnetzwerk' },
        url: 'https://www.aoef.at/'
      },
      {
        title: { en: 'Orient Express - Counseling for Migrant Women', de: 'Orient Express - Beratung für Migrantinnen' },
        url: 'https://www.orientexpress-wien.com/'
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
              <MaterialIcons name="link" size={20} color="#E91E63" />
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
        tutorialData="information"
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
    color: '#E91E63',
    marginLeft: 12,
    fontWeight: '500',
  },
});

export default WomensRightsPage;