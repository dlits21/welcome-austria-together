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

const MentalHealthPage: React.FC = () => {
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
    'psychologist': {
      en: 'A mental health professional who studies behavior and mental processes and provides therapy.',
      de: 'Ein Fachmann für psychische Gesundheit, der Verhalten und geistige Prozesse studiert und Therapie anbietet.',
      terms: {
        en: ['therapist'],
        de: ['Psychologe', 'Therapeut']
      }
    },
    'counseling': {
      en: 'Professional guidance and support to help people deal with personal, social, or psychological problems.',
      de: 'Professionelle Anleitung und Unterstützung, um Menschen bei persönlichen, sozialen oder psychologischen Problemen zu helfen.',
      terms: {
        en: ['therapy', 'counselling'],
        de: ['Beratung', 'Therapie']
      }
    },
    'trauma': {
      en: 'Psychological and emotional response to an extremely stressful or disturbing event.',
      de: 'Psychologische und emotionale Reaktion auf ein extrem stressiges oder verstörendes Ereignis.',
      terms: {
        en: ['psychological trauma'],
        de: ['Trauma', 'psychisches Trauma']
      }
    },
    'anxiety': {
      en: 'A feeling of worry, nervousness, or unease about something with an uncertain outcome.',
      de: 'Ein Gefühl von Sorge, Nervosität oder Unbehagen über etwas mit ungewissem Ausgang.',
      terms: {
        en: ['anxiety disorder'],
        de: ['Angst', 'Angststörung']
      }
    },
    'depression': {
      en: 'A mental health condition characterized by persistent sadness and loss of interest in activities.',
      de: 'Eine psychische Erkrankung, die durch anhaltende Traurigkeit und Interessenverlust an Aktivitäten gekennzeichnet ist.',
      terms: {
        en: ['depressive disorder'],
        de: ['Depression', 'depressive Störung']
      }
    }
  };

  const content = {
    title: {
      en: "Children's Mental Health",
      de: 'Psychische Gesundheit von Kindern'
    },
    subtitle: {
      en: 'Supporting Your Child\'s Emotional Well-being',
      de: 'Das emotionale Wohlbefinden Ihres Kindes unterstützen'
    },
    text: {
      en: `Mental health is just as important as physical health for children. Understanding signs of emotional distress and knowing where to get help is crucial for every parent, especially those adjusting to life in a new country.

**Understanding Children's Mental Health:**

Mental health affects how children think, feel, and behave. Good mental health helps children:
• Develop emotionally and socially
• Learn effectively at school  
• Build healthy relationships
• Cope with challenges and stress
• Express their feelings appropriately

**Common Mental Health Challenges for Migrant Children:**

**1. Adjustment and Integration Stress:**
• Difficulty adapting to new culture and environment
• Language barriers affecting communication
• Missing family and friends from home country
• Uncertainty about future and legal status

**2. trauma-Related Issues:**
• Experiences before, during, or after migration
• Witnessing violence or persecution
• Family separation or loss
• Dangerous journeys or displacement

**3. School and Social Challenges:**
• Bullying or discrimination
• Academic pressure and language difficulties
• Social isolation or difficulty making friends
• Cultural conflicts between home and school

**4. Family Stress Impact:**
• Parental stress affecting the whole family
• Economic difficulties and housing instability
• Changes in family roles and dynamics
• Intergenerational conflicts over cultural values

**Warning Signs to Watch For:**

**Emotional Signs:**
• Persistent sadness, anxiety, or mood swings
• Excessive fears or worries
• Frequent crying or emotional outbursts
• Loss of interest in activities they used to enjoy
• Feelings of hopelessness or worthlessness

**Behavioral Changes:**
• Changes in eating or sleeping patterns
• Decline in school performance
• Aggressive or defiant behavior
• Withdrawal from family and friends
• Regression to younger behaviors

**Physical Symptoms:**
• Frequent headaches or stomach aches with no medical cause
• Fatigue or lack of energy
• Changes in appetite
• Difficulty concentrating

**Professional Mental Health Support:**

**Types of Mental Health Professionals:**

• **psychologist**: Provides therapy and counseling services
• **Psychiatrist**: Medical doctor who can prescribe medications
• **School counselor**: Supports students with academic and emotional issues
• **Social Worker**: Helps families access services and support
• **Cultural Mediator**: Bridges cultural gaps in treatment

**Types of Treatment Available:**

• **Individual counseling**: One-on-one therapy sessions
• **Family therapy**: Working with the whole family
• **Group therapy**: Support groups with other children
• **Play therapy**: Using games and activities for younger children
• **Art or music therapy**: Creative expression for healing
• **Cultural therapy**: Incorporating cultural background into treatment

**How to Access Mental Health Services:**

**Step 1: Talk to Your Pediatrician**
• Discuss concerns about your child's behavior or mood
• Ask for referral to mental health specialist
• Get information about available services

**Step 2: Contact Mental Health Services**
• Child and adolescent psychiatry departments in hospitals
• Community mental health centers
• Private practitioners
• NGO counseling services

**Step 3: School Resources**
• Speak with school counselors or psychologists
• Request evaluation for learning or behavioral issues
• Ask about support programs for immigrant children

**Supporting Your Child at Home:**

**Create a Safe Environment:**
• Listen without judgment when your child wants to talk
• Validate their feelings and experiences
• Maintain consistent routines and boundaries
• Show physical affection and emotional support

**Encourage Healthy Habits:**
• Regular sleep schedule and healthy meals
• Physical activity and outdoor time
• Limit screen time and social media
• Encourage creative expression and hobbies

**Cultural Connection:**
• Maintain connections to your home culture
• Celebrate cultural holidays and traditions
• Speak your native language at home
• Connect with other families from your community

**Communication Strategies:**
• Use age-appropriate language to explain situations
• Be honest about challenges while remaining hopeful
• Encourage questions and provide reassurance
• Teach coping strategies and problem-solving skills

**Crisis Support and Hotlines:**

**Immediate Help Available 24/7:**
• Emergency: 144 (if child is in immediate danger)
• Crisis Helpline: 142 (Telefonseelsorge)
• Children and Youth Emergency: 147 (Rat auf Draht)
• Violence Prevention: 0800 222 555

**When to Seek Immediate Help:**
• Thoughts of self-harm or suicide
• Severe behavioral changes
• Refusing to eat or drink
• Complete withdrawal from all activities
• Violent behavior toward self or others

**Long-term Support Services:**

**Community Resources:**
• Migrant support organizations offering counseling
• Cultural community centers with family programs
• Religious organizations providing spiritual support
• Peer support groups for refugee families

**Educational Support:**
• Special education services if needed
• Language support programs
• Anti-bullying interventions
• Academic accommodations

**Financial Assistance:**
• Many mental health services are covered by health insurance
• Sliding scale fees based on family income
• Free services through NGOs and community organizations
• Emergency financial help for crisis situations

**Building Resilience:**

Help your child develop resilience by:
• Teaching coping strategies for difficult situations
• Encouraging problem-solving skills
• Building self-confidence through achievements
• Fostering social connections and friendships
• Maintaining hope and positive outlook for the future
• Celebrating cultural identity while embracing new opportunities

Remember: Seeking help for mental health is a sign of strength, not weakness. Early intervention can make a significant difference in your child's well-being and future success.`,
      de: `Psychische Gesundheit ist für Kinder genauso wichtig wie körperliche Gesundheit. Das Verstehen von Anzeichen emotionaler Belastung und zu wissen, wo man Hilfe bekommt, ist für jeden Elternteil entscheidend, besonders für diejenigen, die sich an das Leben in einem neuen Land anpassen.

**Psychische Gesundheit von Kindern verstehen:**

Psychische Gesundheit beeinflusst, wie Kinder denken, fühlen und sich verhalten. Gute psychische Gesundheit hilft Kindern:
• Emotionale und soziale Entwicklung
• Effektives Lernen in der Schule
• Aufbau gesunder Beziehungen
• Bewältigung von Herausforderungen und Stress
• Angemessener Ausdruck ihrer Gefühle

**Häufige psychische Herausforderungen für Migrantenkinder:**

**1. Anpassungs- und Integrationsstress:**
• Schwierigkeiten bei der Anpassung an neue Kultur und Umgebung
• Sprachbarrieren, die die Kommunikation beeinträchtigen
• Vermissen von Familie und Freunden aus dem Heimatland
• Ungewissheit über Zukunft und rechtlichen Status

**2. Trauma-bedingte Probleme:**
• Erfahrungen vor, während oder nach der Migration
• Zeuge von Gewalt oder Verfolgung
• Familientrennung oder Verlust
• Gefährliche Reisen oder Vertreibung

**3. Schul- und soziale Herausforderungen:**
• Mobbing oder Diskriminierung
• Akademischer Druck und Sprachschwierigkeiten
• Soziale Isolation oder Schwierigkeiten beim Freunde finden
• Kulturelle Konflikte zwischen Zuhause und Schule

**4. Auswirkungen von Familienstress:**
• Elternstress, der die ganze Familie betrifft
• Wirtschaftliche Schwierigkeiten und Wohnungsinstabilität
• Veränderungen in Familienrollen und -dynamik
• Generationenkonflikte über kulturelle Werte

**Warnzeichen, auf die Sie achten sollten:**

**Emotionale Zeichen:**
• Anhaltende Traurigkeit, Angst oder Stimmungsschwankungen
• Übermäßige Ängste oder Sorgen
• Häufiges Weinen oder emotionale Ausbrüche
• Interessenverlust an Aktivitäten, die sie früher genossen
• Gefühle von Hoffnungslosigkeit oder Wertlosigkeit

**Verhaltensänderungen:**
• Veränderungen in Ess- oder Schlafgewohnheiten
• Rückgang der Schulleistungen
• Aggressives oder trotziges Verhalten
• Rückzug von Familie und Freunden
• Regression zu jüngerem Verhalten

**Körperliche Symptome:**
• Häufige Kopf- oder Bauchschmerzen ohne medizinische Ursache
• Müdigkeit oder Energiemangel
• Appetitveränderungen
• Konzentrationsschwierigkeiten

**Professionelle psychische Gesundheitsunterstützung:**

**Arten von Fachkräften für psychische Gesundheit:**

• **Psychologe**: Bietet Therapie- und Beratungsdienste an
• **Psychiater**: Arzt, der Medikamente verschreiben kann
• **Schulberater**: Unterstützt Schüler bei akademischen und emotionalen Problemen
• **Sozialarbeiter**: Hilft Familien beim Zugang zu Dienstleistungen und Unterstützung
• **Kulturvermittler**: Überbrückt kulturelle Lücken in der Behandlung

**Verfügbare Behandlungsarten:**

• **Einzelberatung**: Einzeltherapiesitzungen
• **Familientherapie**: Arbeit mit der ganzen Familie
• **Gruppentherapie**: Selbsthilfegruppen mit anderen Kindern
• **Spieltherapie**: Verwendung von Spielen und Aktivitäten für jüngere Kinder
• **Kunst- oder Musiktherapie**: Kreativer Ausdruck zur Heilung
• **Kulturtherapie**: Einbeziehung des kulturellen Hintergrunds in die Behandlung

**Zugang zu psychischen Gesundheitsdiensten:**

**Schritt 1: Mit Ihrem Kinderarzt sprechen**
• Bedenken über das Verhalten oder die Stimmung Ihres Kindes besprechen
• Nach Überweisung an Spezialisten für psychische Gesundheit fragen
• Informationen über verfügbare Dienste erhalten

**Schritt 2: Kontakt zu psychischen Gesundheitsdiensten**
• Kinder- und Jugendpsychiatrie-Abteilungen in Krankenhäusern
• Gemeindezentren für psychische Gesundheit
• Privatpraktiker
• NGO-Beratungsdienste

**Schritt 3: Schulressourcen**
• Mit Schulberatern oder Psychologen sprechen
• Bewertung für Lern- oder Verhaltensprobleme anfordern
• Nach Unterstützungsprogrammen für Migrantenkinder fragen

**Ihr Kind zu Hause unterstützen:**

**Sichere Umgebung schaffen:**
• Ohne Urteil zuhören, wenn Ihr Kind sprechen möchte
• Ihre Gefühle und Erfahrungen validieren
• Konsistente Routinen und Grenzen aufrechterhalten
• Körperliche Zuneigung und emotionale Unterstützung zeigen

**Gesunde Gewohnheiten fördern:**
• Regelmäßiger Schlafplan und gesunde Mahlzeiten
• Körperliche Aktivität und Zeit im Freien
• Bildschirmzeit und soziale Medien begrenzen
• Kreativen Ausdruck und Hobbys fördern

**Kulturelle Verbindung:**
• Verbindungen zu Ihrer Heimatkultur aufrechterhalten
• Kulturelle Feiertage und Traditionen feiern
• Ihre Muttersprache zu Hause sprechen
• Mit anderen Familien aus Ihrer Gemeinschaft in Verbindung treten

**Kommunikationsstrategien:**
• Altersgerechte Sprache zur Erklärung von Situationen verwenden
• Ehrlich über Herausforderungen sein, dabei hoffnungsvoll bleiben
• Fragen fördern und Beruhigung geben
• Bewältigungsstrategien und Problemlösungsfähigkeiten lehren

**Krisenunterstützung und Hotlines:**

**Sofortige Hilfe 24/7 verfügbar:**
• Notfall: 144 (wenn Kind in unmittelbarer Gefahr ist)
• Krisenhotline: 142 (Telefonseelsorge)
• Kinder- und Jugendnotfall: 147 (Rat auf Draht)
• Gewaltprävention: 0800 222 555

**Wann sofortige Hilfe zu suchen:**
• Gedanken an Selbstverletzung oder Suizid
• Schwere Verhaltensänderungen
• Verweigerung zu essen oder trinken
• Vollständiger Rückzug von allen Aktivitäten
• Gewalttätiges Verhalten gegen sich selbst oder andere

**Langfristige Unterstützungsdienste:**

**Gemeinschaftsressourcen:**
• Migrantenunterstützungsorganisationen mit Beratung
• Kulturelle Gemeindezentren mit Familienprogrammen
• Religiöse Organisationen mit spiritueller Unterstützung
• Selbsthilfegruppen für Flüchtlingsfamilien

**Bildungsunterstützung:**
• Sonderpädagogische Dienste bei Bedarf
• Sprachunterstützungsprogramme
• Anti-Mobbing-Interventionen
• Akademische Anpassungen

**Finanzielle Unterstützung:**
• Viele psychische Gesundheitsdienste sind von der Krankenversicherung abgedeckt
• Gestaffelte Gebühren basierend auf Familieneinkommen
• Kostenlose Dienste durch NGOs und Gemeinschaftsorganisationen
• Notfinanzielle Hilfe für Krisensituationen

**Resilienz aufbauen:**

Helfen Sie Ihrem Kind, Resilienz zu entwickeln durch:
• Lehren von Bewältigungsstrategien für schwierige Situationen
• Fördern von Problemlösungsfähigkeiten
• Aufbau von Selbstvertrauen durch Erfolge
• Förderung sozialer Verbindungen und Freundschaften
• Hoffnung und positive Zukunftsaussichten aufrechterhalten
• Feiern der kulturellen Identität bei gleichzeitiger Annahme neuer Möglichkeiten

Denken Sie daran: Hilfe für psychische Gesundheit zu suchen ist ein Zeichen von Stärke, nicht von Schwäche. Frühzeitige Intervention kann einen erheblichen Unterschied im Wohlbefinden und zukünftigen Erfolg Ihres Kindes machen.`
    },
    links: [
      {
        title: { en: 'Children Emergency Hotline', de: 'Kinder-Notruf' },
        url: 'https://www.rataufdraht.at'
      },
      {
        title: { en: 'Child Psychology Services', de: 'Kinderpsychologie-Dienste' },
        url: 'https://www.gesundheit.gv.at/leben/psyche/psychisch-kranke-kinder'
      },
      {
        title: { en: 'Crisis Counseling Austria', de: 'Krisenberatung Österreich' },
        url: 'https://www.telefonseelsorge.at'
      },
      {
        title: { en: 'Support for Refugee Families', de: 'Unterstützung für Flüchtlingsfamilien' },
        url: 'https://www.hemayat.org'
      },
      {
        title: { en: 'Mental Health Information', de: 'Informationen zur psychischen Gesundheit' },
        url: 'https://www.gesundheit.gv.at/leben/psyche'
      }
    ],
    videoTitle: {
      en: 'Supporting Child Mental Health',
      de: 'Unterstützung der psychischen Gesundheit von Kindern'
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

export default MentalHealthPage;