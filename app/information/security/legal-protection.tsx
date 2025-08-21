import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/languages/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const LegalProtectionPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const router = useRouter();
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const navigateToLegalSupport = () => {
    router.push('/ask/legal-support');
  };

  const content = {
    title: {
      en: 'Legal Protection & Your Rights',
      de: 'Rechtsschutz & Ihre Rechte'
    },
    subtitle: {
      en: 'Understanding what police and security officers can and cannot do',
      de: 'Verstehen, was Polizei und Sicherheitsbeamte dürfen und nicht dürfen'
    },
    text: {
      en: `Understanding your legal rights and the limits of police and security authority is essential for protecting yourself and knowing when to seek legal help.

**What Police Officers Are Allowed to Do:**
• **Identity Check:** Ask for identification in public spaces during routine checks
• **Search with Warrant:** Search your home, belongings, or person with a court warrant
• **Detention:** Hold you for up to 48 hours for investigation without charges
• **Traffic Stops:** Stop vehicles for traffic violations or routine checks
• **Public Safety:** Remove you from dangerous situations for your own safety
• **Criminal Investigation:** Question you about crimes (but you have right to remain silent)

**What Police Officers Cannot Do:**
• **Search Without Cause:** Cannot search you or your belongings without reasonable suspicion or warrant
• **Discriminatory Stops:** Cannot stop you solely based on race, ethnicity, or religion
• **Force Entry:** Cannot enter your home without warrant (except immediate danger)
• **Excessive Force:** Cannot use more force than necessary for the situation
• **Deny Legal Representation:** Must allow you to contact a lawyer during questioning
• **Ignore Your Rights:** Must inform you of your rights when arrested

**Security Officers' Limitations:**
Private security officers have **much more limited** authority than police:
• **No Arrest Powers:** Can only detain you until police arrive (citizen's arrest)
• **No Search Rights:** Cannot search you or your belongings
• **Property Rights Only:** Authority limited to the property they're protecting
• **Cannot Use Force:** Except in self-defense or protecting others from immediate harm
• **No Investigation Powers:** Cannot demand identification or interrogate you

**Your Rights During Police Contact:**
• **Right to Remain Silent:** You don't have to answer questions beyond identifying yourself
• **Right to a Lawyer:** Request legal representation, especially during questioning
• **Right to Know Charges:** Police must tell you why you're being detained or arrested
• **Right to Interpreter:** Request translation services if you don't speak German fluently
• **Right to Medical Care:** Ask for medical attention if you're injured or feel unwell
• **Right to Contact Embassy:** Foreign nationals can contact their embassy or consulate

**When to Seek Legal Help:**
• You've been arrested or charged with a crime
• Police have searched your home without explaining why
• You believe your rights have been violated
• You're facing deportation or immigration issues
• You've experienced discrimination by law enforcement`,
      de: `Ihre rechtlichen Rechte und die Grenzen der Polizei- und Sicherheitsbehörden zu verstehen ist wesentlich, um sich zu schützen und zu wissen, wann Sie rechtliche Hilfe suchen sollten.

**Was Polizeibeamte dürfen:**
• **Identitätskontrolle:** Nach Ausweis fragen in öffentlichen Räumen bei Routinekontrollen
• **Durchsuchung mit Beschluss:** Durchsuchung Ihres Zuhauses, Eigentums oder Ihrer Person mit Gerichtsbeschluss
• **Festnahme:** Sie bis zu 48 Stunden zur Untersuchung ohne Anklage festhalten
• **Verkehrskontrollen:** Fahrzeuge wegen Verkehrsverstößen oder Routinekontrollen anhalten
• **Öffentliche Sicherheit:** Sie aus gefährlichen Situationen zu Ihrer eigenen Sicherheit entfernen
• **Strafuntersuchung:** Sie über Verbrechen befragen (aber Sie haben das Recht zu schweigen)

**Was Polizeibeamte nicht dürfen:**
• **Durchsuchung ohne Grund:** Können Sie oder Ihr Eigentum nicht ohne begründeten Verdacht oder Beschluss durchsuchen
• **Diskriminierende Kontrollen:** Können Sie nicht allein aufgrund von Rasse, Ethnizität oder Religion anhalten
• **Gewaltsamer Eintritt:** Können Ihr Zuhause nicht ohne Beschluss betreten (außer bei unmittelbarer Gefahr)
• **Übermäßige Gewalt:** Können nicht mehr Gewalt anwenden als für die Situation notwendig
• **Rechtsbeistand verweigern:** Müssen Ihnen erlauben, einen Anwalt während der Befragung zu kontaktieren
• **Ihre Rechte ignorieren:** Müssen Sie über Ihre Rechte bei Festnahme informieren

**Grenzen von Sicherheitsbeamten:**
Private Sicherheitsbeamte haben **viel begrenztere** Befugnisse als die Polizei:
• **Keine Festnahmebefugnisse:** Können Sie nur bis zum Eintreffen der Polizei festhalten (Bürgerfestnahme)
• **Keine Durchsuchungsrechte:** Können Sie oder Ihr Eigentum nicht durchsuchen
• **Nur Eigentumsrechte:** Befugnisse beschränkt auf das Eigentum, das sie schützen
• **Können keine Gewalt anwenden:** Außer in Notwehr oder zum Schutz anderer vor unmittelbarem Schaden
• **Keine Untersuchungsbefugnisse:** Können keine Identifikation verlangen oder Sie verhören

**Ihre Rechte bei Polizeikontakt:**
• **Recht zu schweigen:** Sie müssen keine Fragen beantworten außer sich zu identifizieren
• **Recht auf Anwalt:** Rechtsbeistand anfordern, besonders während Befragung
• **Recht auf Anklageinformation:** Polizei muss Ihnen sagen, warum Sie festgehalten oder verhaftet werden
• **Recht auf Dolmetscher:** Übersetzungsdienste anfordern, wenn Sie nicht fließend Deutsch sprechen
• **Recht auf medizinische Versorgung:** Nach medizinischer Betreuung fragen, wenn Sie verletzt sind oder sich unwohl fühlen
• **Recht auf Botschaftskontakt:** Ausländische Staatsangehörige können ihre Botschaft oder ihr Konsulat kontaktieren

**Wann rechtliche Hilfe suchen:**
• Sie wurden verhaftet oder wegen eines Verbrechens angeklagt
• Die Polizei hat Ihr Zuhause durchsucht, ohne zu erklären warum
• Sie glauben, dass Ihre Rechte verletzt wurden
• Sie stehen vor Abschiebung oder Einwanderungsproblemen
• Sie haben Diskriminierung durch Strafverfolgungsbehörden erfahren`
    },
    links: [
      {
        title: { en: 'Austrian Legal Aid', de: 'Österreichische Rechtshilfe' },
        url: 'https://www.justiz.gv.at'
      },
      {
        title: { en: 'Human Rights Organization', de: 'Menschenrechtsorganisation' },
        url: 'https://www.amnesty.at'
      },
      {
        title: { en: 'Police Complaints Office', de: 'Polizei-Beschwerdeamt' },
        url: 'https://www.bmi.gv.at'
      }
    ]
  };

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
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          {language.code === 'de' ? content.title.de : content.title.en}
        </Text>
        
        <Text style={styles.subtitle}>
          {language.code === 'de' ? content.subtitle.de : content.subtitle.en}
        </Text>
        
        <Text style={styles.text}>
          {parseMarkdownText(language.code === 'de' ? content.text.de : content.text.en)}
        </Text>
        
        {/* Legal Support Button */}
        <View style={styles.supportSection}>
          <Text style={styles.supportTitle}>
            {language.code === 'de' ? 'Brauchen Sie rechtliche Unterstützung?' : 'Need Legal Support?'}
          </Text>
          <Text style={styles.supportText}>
            {language.code === 'de' 
              ? 'Finden Sie qualifizierte Rechtsanwälte und Rechtsberatung in Ihrer Nähe.'
              : 'Find qualified lawyers and legal advice in your area.'
            }
          </Text>
          <TouchableOpacity style={styles.supportButton} onPress={navigateToLegalSupport}>
            <MaterialIcons name="gavel" size={20} color="#fff" />
            <Text style={styles.supportButtonText}>
              {language.code === 'de' ? 'Rechtsberatung finden' : 'Find Legal Support'}
            </Text>
          </TouchableOpacity>
        </View>
        
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
      
      <HelpModal
        visible={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        languageCode={language.code}
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
  boldText: {
    fontWeight: 'bold',
  },
  supportSection: {
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  supportText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 12,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
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

export default LegalProtectionPage;