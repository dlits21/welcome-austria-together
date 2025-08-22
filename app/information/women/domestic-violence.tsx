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

const DomesticViolencePage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const definitions = {
    'domestic violence': {
      en: 'Physical, emotional, or sexual abuse by a partner, family member, or someone you live with',
      de: 'Körperliche, emotionale oder sexuelle Gewalt durch einen Partner, Familienmitglied oder jemanden, mit dem Sie zusammenleben'
    },
    'abuse': {
      en: 'Harmful behavior intended to control, hurt, or intimidate another person',
      de: 'Schädliches Verhalten mit der Absicht, eine andere Person zu kontrollieren, zu verletzen oder einzuschüchtern'
    },
    'safety plan': {
      en: 'A personalized plan to help you stay safe and prepare for dangerous situations',
      de: 'Ein persönlicher Plan, der Ihnen hilft, sicher zu bleiben und sich auf gefährliche Situationen vorzubereiten'
    },
    'restraining order': {
      en: 'A legal document that prohibits someone from contacting or approaching you',
      de: 'Ein rechtliches Dokument, das jemandem verbietet, Sie zu kontaktieren oder sich Ihnen zu nähern'
    },
    'emotional abuse': {
      en: 'Using words, actions, or behaviors to control, isolate, or harm someone emotionally',
      de: 'Die Verwendung von Worten, Handlungen oder Verhaltensweisen, um jemanden emotional zu kontrollieren, zu isolieren oder zu verletzen'
    },
    'financial abuse': {
      en: 'Controlling someone by limiting their access to money, work, or financial independence',
      de: 'Jemanden zu kontrollieren, indem man seinen Zugang zu Geld, Arbeit oder finanzieller Unabhängigkeit einschränkt'
    }
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const content = {
    title: {
      en: 'Domestic Violence Support',
      de: 'Unterstützung bei häuslicher Gewalt'
    },
    subtitle: {
      en: 'You are not alone. Help is available.',
      de: 'Du bist nicht allein. Hilfe ist verfügbar.'
    },
    text: {
      en: `**Remember:** Violence is never your fault. You deserve to be safe and respected. Seeking help is brave and important.

**Domestic violence** is any form of **abuse** that happens between people who live together or have a close relationship. It can happen to anyone, regardless of age, background, or education level.

Types of Domestic Violence:

Physical Violence: Hitting, pushing, slapping, choking, or any unwanted physical contact that causes pain or injury.

**Emotional abuse** includes name-calling, threats, isolation from friends and family, constant criticism, or controlling behavior.

**Financial abuse** means controlling your access to money, preventing you from working, or hiding financial information from you.

Sexual Violence: Any unwanted sexual contact or forcing someone to do sexual things against their will.

Warning Signs:
Your partner or family member may:
• Control where you go or who you see
• Check your phone, email, or social media
• Prevent you from working or studying
• Threaten to hurt you, your children, or pets
• Make you feel afraid or walk on eggshells
• Control all the money or hide financial information
• Isolate you from friends and family

How to Stay Safe:
Create a **safety plan** - A personalized plan to help you stay safe and prepare for dangerous situations. Think about safe places to go, people who can help, and important items to take if you need to leave quickly.

Keep copies of your ID, passport, bank cards, and important papers in a safe place outside your home, with a trusted friend or family member.

If possible, keep some money hidden in a safe place or with someone you trust in case you need to leave suddenly.

Trust your feelings - If you feel unsafe, trust your instincts. You know your situation best.

Legal Protection:
In Austria, you can get a **restraining order** (Betretungsverbot) to legally protect yourself. The police can remove the violent person from your home immediately, and they cannot return for a certain period.

Police can issue an immediate restraining order lasting 2 weeks. The violent person must leave the home and stay away. You can apply to court for longer protection (up to 1 year). Legal aid is available to help with costs.

Emergency Contacts:
• **Women's Helpline:** 0800 222 555 (24/7, free, multilingual)
• **Police Emergency:** 133
• **Emergency Services:** 112

These numbers are free and available 24/7. You can call even if you're not sure if it's an emergency.

You are strong and brave. Taking the first step to seek help shows incredible courage. There are people who care about you and want to help you be safe.`,
      de: `**Denken Sie daran:** Gewalt ist niemals Ihre Schuld. Sie verdienen es, sicher und respektiert zu werden. Hilfe zu suchen ist mutig und wichtig.

**Häusliche Gewalt** ist jede Form von **Missbrauch**, die zwischen Menschen geschieht, die zusammenleben oder eine enge Beziehung haben. Es kann jedem passieren, unabhängig von Alter, Hintergrund oder Bildungsniveau.

Arten häuslicher Gewalt:

Körperliche Gewalt: Schlagen, Stoßen, Ohrfeigen, Würgen oder jeglicher unerwünschte körperliche Kontakt, der Schmerzen oder Verletzungen verursacht.

**Emotionaler Missbrauch** umfasst Beschimpfungen, Drohungen, Isolation von Freunden und Familie, ständige Kritik oder kontrollierendes Verhalten.

**Finanzieller Missbrauch** bedeutet, Ihren Zugang zu Geld zu kontrollieren, Sie daran zu hindern zu arbeiten oder finanzielle Informationen vor Ihnen zu verstecken.

Sexuelle Gewalt: Jeglicher unerwünschte sexuelle Kontakt oder das Zwingen einer Person, sexuelle Handlungen gegen ihren Willen zu vollziehen.

Warnzeichen:
Ihr Partner oder Familienmitglied könnte:
• Kontrollieren, wohin Sie gehen oder wen Sie sehen
• Ihr Telefon, E-Mails oder soziale Medien überprüfen
• Sie daran hindern zu arbeiten oder zu studieren
• Drohen, Ihnen, Ihren Kindern oder Haustieren zu schaden
• Sie ängstlich oder auf Eierschalen gehend fühlen lassen
• Das ganze Geld kontrollieren oder finanzielle Informationen verstecken
• Sie von Freunden und Familie isolieren

Wie Sie sicher bleiben:
Erstellen Sie einen **Sicherheitsplan** - Ein personalisierter Plan, der Ihnen hilft, sicher zu bleiben und sich auf gefährliche Situationen vorzubereiten. Denken Sie an sichere Orte, Menschen, die helfen können, und wichtige Gegenstände, die Sie mitnehmen müssen, wenn Sie schnell gehen müssen.

Bewahren Sie Kopien Ihrer ID, Ihres Passes, Ihrer Bankkarten und wichtiger Papiere an einem sicheren Ort außerhalb Ihres Zuhauses auf, bei einem vertrauenswürdigen Freund oder Familienmitglied.

Wenn möglich, verstecken Sie etwas Geld an einem sicheren Ort oder bei jemandem, dem Sie vertrauen, falls Sie plötzlich gehen müssen.

Vertrauen Sie Ihren Gefühlen - Wenn Sie sich unsicher fühlen, vertrauen Sie Ihren Instinkten. Sie kennen Ihre Situation am besten.

Rechtlicher Schutz:
In Österreich können Sie eine **Einstweilige Verfügung** (Betretungsverbot) bekommen, um sich rechtlich zu schützen. Die Polizei kann die gewalttätige Person sofort aus Ihrem Zuhause entfernen, und sie darf für einen bestimmten Zeitraum nicht zurückkehren.

Die Polizei kann eine sofortige einstweilige Verfügung für 2 Wochen ausstellen. Die gewalttätige Person muss das Zuhause verlassen und wegbleiben. Sie können beim Gericht einen längeren Schutz beantragen (bis zu 1 Jahr). Rechtshilfe ist verfügbar, um bei den Kosten zu helfen.

Notfallkontakte:
• **Frauen-Helpline:** 0800 222 555 (24/7, kostenlos, mehrsprachig)
• **Polizei-Notruf:** 133
• **Rettungsdienste:** 112

Diese Nummern sind kostenlos und 24/7 verfügbar. Sie können anrufen, auch wenn Sie sich nicht sicher sind, ob es ein Notfall ist.

Sie sind stark und mutig. Den ersten Schritt zu machen und Hilfe zu suchen zeigt unglaublichen Mut. Es gibt Menschen, die sich um Sie sorgen und Ihnen helfen wollen, sicher zu sein.`
    },
    links: [
      {
        title: { en: 'Austrian Women\'s Shelter Network', de: 'Österreichisches Frauenhausnetzwerk' },
        url: 'https://www.aoef.at/'
      },
      {
        title: { en: 'Women\'s Helpline', de: 'Frauen-Helpline' },
        url: 'https://www.frauenhelpline.at/'
      },
      {
        title: { en: 'Intervention Center Vienna', de: 'Interventionsstelle Wien' },
        url: 'https://www.interventionsstelle-wien.at/'
      },
      {
        title: { en: 'White Ring Crime Victim Support', de: 'Weißer Ring Opferhilfe' },
        url: 'https://www.weisser-ring.at/'
      },
      {
        title: { en: 'Orient Express Support', de: 'Orient Express Unterstützung' },
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
        <View style={styles.header}>
          <MaterialIcons name="security" size={40} color="#E91E63" />
          <Text style={styles.title}>
            {language.code === 'de' ? content.title.de : content.title.en}
          </Text>
          <Text style={styles.subtitle}>
            {language.code === 'de' ? content.subtitle.de : content.subtitle.en}
          </Text>
        </View>
        
        <HighlightedText 
          definitions={definitions}
          language={language.code}
        >
          {language.code === 'de' ? content.text.de : content.text.en}
        </HighlightedText>
        
        <View style={styles.linksSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Hilfsorganisationen' : 'Support Organizations'}
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
        tutorialData="women"
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
    color: '#E91E63',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
    textAlign: 'center',
    marginTop: 8,
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

export default DomesticViolencePage;