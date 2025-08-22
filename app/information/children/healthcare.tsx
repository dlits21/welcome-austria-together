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

const HealthcarePage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const handleVideoPress = () => {
    Linking.openURL('https://youtube.com/watch?v=dQw4w9WgXcQ');
  };

  const definitions = {
    'pediatrician': {
      en: 'A medical doctor who specializes in the care of infants, children, and adolescents.',
      de: 'Ein Arzt, der sich auf die Betreuung von Säuglingen, Kindern und Jugendlichen spezialisiert hat.',
      terms: {
        en: ['child doctor'],
        de: ['Kinderarzt', 'Pädiater']
      }
    },
    'vaccination': {
      en: 'A medical procedure that helps protect against infectious diseases by building immunity.',
      de: 'Ein medizinisches Verfahren, das vor Infektionskrankheiten schützt, indem es Immunität aufbaut.',
      terms: {
        en: ['immunization', 'vaccine'],
        de: ['Impfung', 'Immunisierung']
      }
    },
    'health insurance': {
      en: 'A system that covers the cost of medical care and treatment.',
      de: 'Ein System, das die Kosten für medizinische Versorgung und Behandlung übernimmt.',
      terms: {
        en: ['medical insurance'],
        de: ['Krankenversicherung', 'Gesundheitsversicherung']
      }
    },
    'e-card': {
      en: 'The Austrian health insurance card that provides access to healthcare services.',
      de: 'Die österreichische Krankenversicherungskarte, die Zugang zu Gesundheitsdiensten ermöglicht.',
      terms: {
        en: ['electronic health card'],
        de: ['Gesundheitskarte', 'Sozialversicherungskarte']
      }
    },
    'check-up': {
      en: 'Regular medical examination to monitor health and detect potential problems early.',
      de: 'Regelmäßige ärztliche Untersuchung zur Gesundheitsüberwachung und Früherkennung möglicher Probleme.',
      terms: {
        en: ['medical examination', 'health screening'],
        de: ['Vorsorgeuntersuchung', 'Gesundheitscheck']
      }
    }
  };

  const content = {
    title: {
      en: "Children's Health Services",
      de: 'Gesundheitsdienste für Kinder'
    },
    subtitle: {
      en: 'Essential Healthcare for Your Child in Austria',
      de: 'Wesentliche Gesundheitsversorgung für Ihr Kind in Österreich'
    },
    text: {
      en: `All children in Austria have the right to healthcare, regardless of their immigration status. Understanding the system will help you access the best care for your child.

**Healthcare Access for Children:**

**Emergency Care:**
• Emergency treatment is provided immediately to all children
• No e-card required in emergencies
• Call 144 for ambulance or go directly to hospital emergency room
• Emergency rooms (Notaufnahme) available 24/7 in hospitals

**health insurance and E-Card:**
• All legally resident children are entitled to health insurance
• Asylum seekers and their children receive basic healthcare coverage
• The e-card provides access to most healthcare services
• If you don't have an e-card, emergency treatment is still provided

**Essential Health Services:**

**1. pediatrician Care:**
• Specialized doctors for children from birth to 18 years
• Regular check-up appointments recommended
• Treatment of childhood illnesses and injuries
• Growth and development monitoring
• Available in clinics, hospitals, and private practices

**2. vaccination Program:**
• Free vaccinations according to Austrian vaccination schedule
• Protection against diseases like measles, whooping cough, polio
• School entry vaccinations required
• Catch-up vaccinations available for children who missed earlier ones
• Vaccination records (Impfpass) provided and should be kept safe

**3. Dental Care:**
• Free dental check-ups and basic treatment for children
• School dental health programs
• Orthodontic care when medically necessary
• Emergency dental treatment available
• Regular cleaning and fluoride treatment recommended

**4. Mental Health Support:**
• Child psychology and psychiatry services
• Counseling for behavioral and emotional difficulties
• Support for trauma and adjustment issues
• School psychology services
• Family therapy when needed

**How to Register Your Child with Healthcare:**

**Step 1: Get Health Insurance**
• Contact local social insurance office (Sozialversicherung)
• Provide identification and residence documents
• Child will be assigned to insurance fund
• Receive e-card within 2-3 weeks

**Step 2: Find a pediatrician**
• Ask for recommendations from other parents
• Check with local health authorities for nearby doctors
• Many pediatricians speak multiple languages
• Some clinics specialize in treating migrant families

**Step 3: Schedule Initial Appointment**
• Bring all previous medical records if available
• Vaccination records are especially important
• List of current medications
• Insurance card or proof of coverage

**Regular Health Monitoring:**

**Routine check-up Schedule:**
• Newborns: Multiple visits in first year
• Toddlers: Every 6 months
• School age: Annually
• Teenagers: As needed or annually

**School Health Programs:**
• Health screenings at school entry
• Annual dental check-ups at school
• Vision and hearing tests
• vaccination status verification

**Free and Low-Cost Services:**

**Available at No Cost:**
• Emergency treatment
• Basic pediatric care with insurance
• School health screenings
• Required vaccinations
• Dental check-ups and basic treatment

**Reduced Cost Services:**
• Prescription medications (small co-payment)
• Specialized treatments with referral
• Mental health services
• Physical therapy when prescribed

**Language Support in Healthcare:**

• Many doctors speak English or other languages
• Hospital translation services available
• Medical interpreter services through NGOs
• Translated health information materials
• Cultural mediators in some clinics

**Special Health Needs:**

**For Children with Disabilities:**
• Special needs assessment and support
• Physical therapy and occupational therapy
• Speech therapy services
• Assistive devices and equipment
• Integration support in schools

**For Refugee and Trauma-Affected Children:**
• Specialized trauma therapy
• Cultural-sensitive mental health services
• Support groups for refugee families
• Medical assessment for torture survivors
• Psychological support during asylum process

**Getting Help:**

If you need assistance navigating healthcare:
• Contact local health authorities (Gesundheitsamt)
• NGOs supporting migrant families
• Social workers in hospitals and clinics
• Community health centers
• Patient advocacy organizations

**Important Phone Numbers:**
• Emergency: 144 (ambulance)
• Poison Control: 01 406 43 43
• Medical Emergency Service: 141
• Children's Emergency Hotline: 147`,
      de: `Alle Kinder in Österreich haben das Recht auf Gesundheitsversorgung, unabhängig von ihrem Aufenthaltsstatus. Das Verständnis des Systems hilft Ihnen, die beste Betreuung für Ihr Kind zu erhalten.

**Gesundheitsversorgung für Kinder:**

**Notfallversorgung:**
• Notfallbehandlung wird allen Kindern sofort gewährt
• Keine e-card in Notfällen erforderlich
• 144 für Krankenwagen rufen oder direkt zur Krankenhaus-Notaufnahme
• Notaufnahmen 24/7 in Krankenhäusern verfügbar

**Krankenversicherung und e-card:**
• Alle legal ansässigen Kinder haben Anspruch auf Krankenversicherung
• Asylsuchende und ihre Kinder erhalten grundlegende Gesundheitsversorgung
• Die e-card bietet Zugang zu den meisten Gesundheitsdiensten
• Ohne e-card wird Notfallbehandlung trotzdem gewährt

**Wesentliche Gesundheitsdienste:**

**1. Kinderarzt-Betreuung:**
• Spezialisierte Ärzte für Kinder von Geburt bis 18 Jahre
• Regelmäßige Vorsorgeuntersuchungen empfohlen
• Behandlung von Kinderkrankheiten und Verletzungen
• Wachstums- und Entwicklungsüberwachung
• Verfügbar in Kliniken, Krankenhäusern und Privatpraxen

**2. Impfprogramm:**
• Kostenlose Impfungen nach österreichischem Impfplan
• Schutz vor Krankheiten wie Masern, Keuchhusten, Polio
• Schuleingangsimpfungen erforderlich
• Nachholimpfungen für Kinder verfügbar, die frühere verpasst haben
• Impfpass wird ausgestellt und sollte sicher aufbewahrt werden

**3. Zahnpflege:**
• Kostenlose Zahnkontrollen und Grundbehandlung für Kinder
• Schulzahngesundheitsprogramme
• Kieferorthopädische Behandlung bei medizinischer Notwendigkeit
• Zahnnotfälle verfügbar
• Regelmäßige Reinigung und Fluoridbehandlung empfohlen

**4. Psychische Gesundheit:**
• Kinderpsychologie und -psychiatrie
• Beratung bei Verhaltens- und emotionalen Schwierigkeiten
• Unterstützung bei Traumata und Anpassungsproblemen
• Schulpsychologie
• Familientherapie bei Bedarf

**So registrieren Sie Ihr Kind für die Gesundheitsversorgung:**

**Schritt 1: Krankenversicherung erhalten**
• Kontakt zum örtlichen Sozialversicherungsträger
• Ausweis- und Wohnsitzdokumente vorlegen
• Kind wird Versicherungsträger zugewiesen
• e-card innerhalb 2-3 Wochen erhalten

**Schritt 2: Kinderarzt finden**
• Nach Empfehlungen von anderen Eltern fragen
• Bei örtlichen Gesundheitsbehörden nach Ärzten in der Nähe erkundigen
• Viele Kinderärzte sprechen mehrere Sprachen
• Einige Kliniken spezialisieren sich auf Migrantenfamilien

**Schritt 3: Ersttermin vereinbaren**
• Alle bisherigen Krankenakten mitbringen, falls verfügbar
• Impfpass ist besonders wichtig
• Liste aktueller Medikamente
• Versicherungskarte oder Nachweis der Abdeckung

**Regelmäßige Gesundheitsüberwachung:**

**Routine-Vorsorgeplan:**
• Neugeborene: Mehrere Besuche im ersten Jahr
• Kleinkinder: Alle 6 Monate
• Schulkinder: Jährlich
• Jugendliche: Bei Bedarf oder jährlich

**Schulgesundheitsprogramme:**
• Gesundheitsuntersuchungen bei Schuleintritt
• Jährliche Zahnkontrollen in der Schule
• Seh- und Hörtests
• Impfstatusüberprüfung

**Kostenlose und kostengünstige Dienste:**

**Kostenlos verfügbar:**
• Notfallbehandlung
• Grundlegende Kinderbetreuung mit Versicherung
• Schulgesundheitsuntersuchungen
• Erforderliche Impfungen
• Zahnkontrollen und Grundbehandlung

**Reduzierte Kosten:**
• Verschreibungspflichtige Medikamente (kleine Zuzahlung)
• Spezialisierte Behandlungen mit Überweisung
• Psychische Gesundheitsdienste
• Physiotherapie bei Verschreibung

**Sprachunterstützung im Gesundheitswesen:**

• Viele Ärzte sprechen Englisch oder andere Sprachen
• Krankenhausübersetzungsdienste verfügbar
• Medizinische Dolmetscherdienste durch NGOs
• Übersetzte Gesundheitsinformationen
• Kulturvermittler in einigen Kliniken

**Besondere Gesundheitsbedürfnisse:**

**Für Kinder mit Behinderungen:**
• Bewertung und Unterstützung besonderer Bedürfnisse
• Physiotherapie und Ergotherapie
• Sprachtherapie
• Hilfsmittel und Ausrüstung
• Integrationsunterstützung in Schulen

**Für Flüchtlings- und traumatisierte Kinder:**
• Spezialisierte Traumatherapie
• Kultursensible psychische Gesundheitsdienste
• Selbsthilfegruppen für Flüchtlingsfamilien
• Medizinische Bewertung für Folterüberlebende
• Psychologische Unterstützung während des Asylverfahrens

**Hilfe bekommen:**

Wenn Sie Hilfe bei der Gesundheitsversorgung benötigen:
• Kontakt zu örtlichen Gesundheitsbehörden (Gesundheitsamt)
• NGOs, die Migrantenfamilien unterstützen
• Sozialarbeiter in Krankenhäusern und Kliniken
• Gemeinschaftsgesundheitszentren
• Patientenvertretungsorganisationen

**Wichtige Telefonnummern:**
• Notfall: 144 (Krankenwagen)
• Vergiftungszentrale: 01 406 43 43
• Ärztenotdienst: 141
• Kinder-Notruf: 147`
    },
    links: [
      {
        title: { en: 'Austrian Health Ministry', de: 'Österreichisches Gesundheitsministerium' },
        url: 'https://www.sozialministerium.at/Themen/Gesundheit.html'
      },
      {
        title: { en: 'Social Insurance Austria', de: 'Sozialversicherung Österreich' },
        url: 'https://www.sozialversicherung.at'
      },
      {
        title: { en: 'Vaccination Information', de: 'Impfinformationen' },
        url: 'https://www.gesundheit.gv.at/leben/gesundheitsvorsorge/impfungen'
      },
      {
        title: { en: 'Child Health Services Vienna', de: 'Kindergesundheitsdienste Wien' },
        url: 'https://www.wien.gv.at/gesundheit/beratung-vorsorge/baby-kind/'
      },
      {
        title: { en: 'Emergency Numbers Austria', de: 'Notrufnummern Österreich' },
        url: 'https://www.gesundheit.gv.at/lexikon/n/notfall-notruf'
      }
    ],
    videoTitle: {
      en: 'Child Healthcare in Austria Guide',
      de: 'Kindergesundheitsversorgung in Österreich'
    }
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
        
        <View style={styles.videoSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Video' : 'Video'}
          </Text>
          
          <TouchableOpacity style={styles.videoCard} onPress={handleVideoPress}>
            <View style={styles.videoThumbnail}>
              <MaterialIcons name="play-circle-filled" size={48} color="#fff" />
            </View>
            <Text style={styles.videoTitle}>
              {language.code === 'de' ? content.videoTitle.de : content.videoTitle.en}
            </Text>
          </TouchableOpacity>
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
  videoSection: {
    marginBottom: 32,
  },
  videoCard: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 24,
  },
  videoThumbnail: {
    width: 120,
    height: 120,
    backgroundColor: '#374151',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

export default HealthcarePage;