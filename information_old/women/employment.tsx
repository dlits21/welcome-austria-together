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

const WomensEmploymentPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const definitions = {
    'equal pay': {
      en: 'Receiving the same wage as others for doing the same work, regardless of gender',
      de: 'Den gleichen Lohn wie andere für die gleiche Arbeit erhalten, unabhängig vom Geschlecht'
    },
    'workplace harassment': {
      en: 'Unwanted behavior at work that makes someone feel uncomfortable, threatened, or discriminated against',
      de: 'Unerwünschtes Verhalten am Arbeitsplatz, das jemanden unwohl, bedroht oder diskriminiert fühlen lässt'
    },
    'maternity leave': {
      en: 'Time off work for mothers before and after childbirth, with job protection and financial support',
      de: 'Arbeitsfreistellung für Mütter vor und nach der Geburt mit Arbeitsplatzschutz und finanzieller Unterstützung'
    },
    'work permit': {
      en: 'Legal authorization that allows non-citizens to work in a country',
      de: 'Rechtliche Genehmigung, die Nicht-Bürgern erlaubt, in einem Land zu arbeiten'
    },
    'vocational training': {
      en: 'Education and skills training for specific jobs or careers',
      de: 'Bildung und Kompetenzschulung für bestimmte Berufe oder Karrieren'
    },
    'collective bargaining': {
      en: 'Negotiations between workers and employers about wages, working conditions, and benefits',
      de: 'Verhandlungen zwischen Arbeitnehmern und Arbeitgebern über Löhne, Arbeitsbedingungen und Leistungen'
    },
    'anti-discrimination laws': {
      en: 'Laws that protect people from unfair treatment based on characteristics like gender, race, or age',
      de: 'Gesetze, die Menschen vor unfairer Behandlung aufgrund von Merkmalen wie Geschlecht, Rasse oder Alter schützen'
    }
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const content = {
    title: {
      en: 'Women\'s Employment Rights',
      de: 'Beschäftigungsrechte für Frauen'
    },
    subtitle: {
      en: 'Your path to economic independence and empowerment',
      de: 'Ihr Weg zur wirtschaftlichen Unabhängigkeit und Stärkung'
    },
    text: {
      en: `As a woman in Austria, you have strong legal protection at work. **Anti-discrimination laws** ensure you cannot be treated unfairly because of your gender, and you have the right to **equal pay** and safe working conditions.

Your Rights at Work:

**Equal pay** and Opportunities: You have the right to equal pay for equal work. Employers cannot pay you less because you are a woman. You also have equal rights to promotions, training, and career advancement.

Safe Working Environment: You have the right to work in an environment free from **workplace harassment**, including sexual harassment, discrimination, and bullying. Employers must provide a safe workplace.

**Maternity leave** and Family Rights: You have the right to maternity leave (8 weeks before and after birth), job protection during pregnancy, and the right to breastfeeding breaks at work.

Working Time and Rest: You have the right to reasonable working hours, breaks, vacation time, and overtime pay. Night work and dangerous work have special protections for pregnant women.

Finding Work:

1. Check Your **Work permit**: Make sure you have the right to work in Austria. EU citizens can work freely, while others may need a work permit. Asylum seekers can work after 3 months with permission.

2. Prepare Your Application: Create a CV (Lebenslauf) and cover letter (Bewerbungsschreiben). Many employment centers offer free help with applications in multiple languages.

3. Search for Jobs: Use the AMS (Public Employment Service), online job portals, and networking. Don't let anyone discourage you from applying for jobs because of your gender or background.

4. Know Your Worth: Research typical salaries for your role and negotiate confidently. You deserve fair compensation for your skills and experience.

Skills Development and Training:

**Vocational training** programs are available in many fields, from healthcare to technology. Many programs offer special support for women entering male-dominated fields.

Language Skills: German language skills open more job opportunities. Many training programs combine language learning with job skills training.

Digital Skills: Computer and digital skills are increasingly important. Free courses are available to help you learn these skills at your own pace.

Entrepreneurship Support: If you want to start your own business, special programs support women entrepreneurs with training, mentoring, and sometimes funding.

What to Do if You Face Discrimination:
• Document incidents (dates, witnesses, evidence)
• Talk to HR or your supervisor
• Contact the Equal Treatment Ombudsperson
• Seek support from women's organizations

Balancing Work and Family:
• Use flexible working arrangements when available
• Access childcare support and family benefits
• Connect with other working mothers for support
• Know your rights to parental leave and part-time work

Building Confidence:
• Join professional networks and women's groups
• Seek mentorship opportunities
• Attend workshops and training sessions
• Celebrate your achievements and progress

Austria has strong **collective bargaining** agreements that set minimum wages for most industries. You can find salary information for your profession online to ensure you're paid fairly.

Support Contacts:
• Equal Treatment Hotline: +43 1 532 46 88
• AMS Service Line: 0810 600 672
• Women's Helpline: 0800 222 555

You have the skills, strength, and right to pursue any career you choose. Economic independence gives you freedom and security. Don't let anyone tell you what you can or cannot achieve.`,
      de: `Als Frau in Österreich haben Sie starken rechtlichen Schutz am Arbeitsplatz. **Anti-Diskriminierungsgesetze** stellen sicher, dass Sie nicht unfair behandelt werden können aufgrund Ihres Geschlechts, und Sie haben das Recht auf **gleichen Lohn** und sichere Arbeitsbedingungen.

Ihre Rechte am Arbeitsplatz:

**Gleicher Lohn** und Chancen: Sie haben das Recht auf gleichen Lohn für gleiche Arbeit. Arbeitgeber können Sie nicht weniger bezahlen, weil Sie eine Frau sind. Sie haben auch gleiche Rechte auf Beförderungen, Schulungen und Karriereentwicklung.

Sichere Arbeitsumgebung: Sie haben das Recht, in einer Umgebung frei von **Arbeitsplatz-Belästigung** zu arbeiten, einschließlich sexueller Belästigung, Diskriminierung und Mobbing. Arbeitgeber müssen einen sicheren Arbeitsplatz bieten.

**Mutterschaftsurlaub** und Familienrechte: Sie haben das Recht auf Mutterschaftsurlaub (8 Wochen vor und nach der Geburt), Arbeitsplatzschutz während der Schwangerschaft und das Recht auf Stillpausen bei der Arbeit.

Arbeitszeit und Ruhe: Sie haben das Recht auf angemessene Arbeitszeiten, Pausen, Urlaubszeit und Überstundenvergütung. Nachtarbeit und gefährliche Arbeit haben besonderen Schutz für schwangere Frauen.

Arbeit finden:

1. **Arbeitserlaubnis** prüfen: Stellen Sie sicher, dass Sie das Recht haben, in Österreich zu arbeiten. EU-Bürger können frei arbeiten, während andere möglicherweise eine Arbeitserlaubnis benötigen. Asylsuchende können nach 3 Monaten mit Genehmigung arbeiten.

2. Bewerbung vorbereiten: Erstellen Sie einen Lebenslauf und ein Bewerbungsschreiben. Viele Arbeitsvermittlungszentren bieten kostenlose Hilfe bei Bewerbungen in mehreren Sprachen.

3. Nach Jobs suchen: Nutzen Sie das AMS (Arbeitsmarktservice), Online-Jobportale und Networking. Lassen Sie sich von niemandem davon abhalten, sich für Jobs zu bewerben aufgrund Ihres Geschlechts oder Hintergrunds.

4. Kennen Sie Ihren Wert: Recherchieren Sie typische Gehälter für Ihre Position und verhandeln Sie selbstbewusst. Sie verdienen faire Entlohnung für Ihre Fähigkeiten und Erfahrung.

Kompetenzentwicklung und Ausbildung:

**Berufsbildungsprogramme** sind in vielen Bereichen verfügbar, von Gesundheitswesen bis Technologie. Viele Programme bieten spezielle Unterstützung für Frauen, die in männerdominierte Bereiche eintreten.

Sprachkenntnisse: Deutsche Sprachkenntnisse eröffnen mehr Jobmöglichkeiten. Viele Ausbildungsprogramme kombinieren Sprachenlernen mit Berufsfähigkeiten.

Digitale Fähigkeiten: Computer- und digitale Fähigkeiten sind zunehmend wichtig. Kostenlose Kurse sind verfügbar, um Ihnen zu helfen, diese Fähigkeiten in Ihrem eigenen Tempo zu lernen.

Unternehmertum-Unterstützung: Wenn Sie Ihr eigenes Unternehmen gründen möchten, unterstützen spezielle Programme Unternehmerinnen mit Ausbildung, Mentoring und manchmal Finanzierung.

Was tun bei Diskriminierung:
• Vorfälle dokumentieren (Daten, Zeugen, Beweise)
• Mit HR oder Ihrem Vorgesetzten sprechen
• Gleichbehandlungsanwaltschaft kontaktieren
• Unterstützung von Frauenorganisationen suchen

Arbeit und Familie vereinbaren:
• Flexible Arbeitsregelungen nutzen, wenn verfügbar
• Kinderbetreuungsunterstützung und Familienleistungen in Anspruch nehmen
• Mit anderen berufstätigen Müttern vernetzen
• Ihre Rechte auf Elternurlaub und Teilzeitarbeit kennen

Selbstvertrauen aufbauen:
• Beruflichen Netzwerken und Frauengruppen beitreten
• Mentoring-Möglichkeiten suchen
• Workshops und Schulungen besuchen
• Ihre Erfolge und Fortschritte feiern

Österreich hat starke **Kollektivvertragsabkommen**, die Mindestlöhne für die meisten Branchen festlegen. Sie können Gehaltsinformationen für Ihren Beruf online finden, um sicherzustellen, dass Sie fair bezahlt werden.

Unterstützungskontakte:
• Gleichbehandlungs-Hotline: +43 1 532 46 88
• AMS Service Line: 0810 600 672
• Frauen-Helpline: 0800 222 555

Sie haben die Fähigkeiten, Stärke und das Recht, jede Karriere zu verfolgen, die Sie wählen. Wirtschaftliche Unabhängigkeit gibt Ihnen Freiheit und Sicherheit. Lassen Sie sich von niemandem sagen, was Sie erreichen können oder nicht.`
    },
    links: [
      {
        title: { en: 'AMS Public Employment Service', de: 'AMS Arbeitsmarktservice' },
        url: 'https://www.ams.at/'
      },
      {
        title: { en: 'Equal Treatment Ombudsperson', de: 'Gleichbehandlungsanwaltschaft' },
        url: 'https://www.gleichbehandlungsanwaltschaft.gv.at/'
      },
      {
        title: { en: 'ABZ Austria Career Training', de: 'ABZ Austria Berufsausbildung' },
        url: 'https://www.abz-austria.at/'
      },
      {
        title: { en: 'Women and Work Counseling', de: 'Frau und Arbeit Beratung' },
        url: 'https://www.frau-und-arbeit.at/'
      },
      {
        title: { en: 'Orient Express Job Support', de: 'Orient Express Arbeitshilfe' },
        url: 'https://www.orientexpress-wien.com/'
      },
      {
        title: { en: 'Sprungbrett Girls & Technology', de: 'Sprungbrett Mädchen & Technik' },
        url: 'https://www.sprungbrett.or.at/'
      },
      {
        title: { en: 'Salary Compass Austria', de: 'Gehaltskompass Österreich' },
        url: 'https://www.gehaltskompass.at/'
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
          <MaterialIcons name="work" size={40} color="#E91E63" />
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
            {language.code === 'de' ? 'Unterstützungsorganisationen' : 'Support Organizations'}
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
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  rightItem: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
  },
  rightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  rightText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 8,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    width: 30,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1976D2',
  },
  stepText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1565C0',
  },
  trainingItem: {
    backgroundColor: '#E8F5E8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  trainingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2E7D32',
  },
  trainingText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#388E3C',
  },
  challengeItem: {
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#E65100',
  },
  challengeText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#E65100',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E91E63',
  },
  linkText: {
    fontSize: 16,
    color: '#E91E63',
    marginLeft: 12,
    flex: 1,
  },
  salarySection: {
    backgroundColor: '#F3E5F5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  salaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#7B1FA2',
  },
  motivationSection: {
    flexDirection: 'row',
    backgroundColor: '#FFEBEE',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  motivationText: {
    fontSize: 16,
    color: '#C62828',
    marginLeft: 12,
    flex: 1,
    lineHeight: 24,
    fontWeight: '500',
  },
  emergencySection: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#6C757D',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#495057',
  },
  emergencyText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default WomensEmploymentPage;