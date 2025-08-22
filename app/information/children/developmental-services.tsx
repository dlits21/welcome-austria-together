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

const DevelopmentalServicesPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const definitions = {
    'frühförderung': {
      en: 'Early intervention services designed to support children with developmental delays or disabilities in their first years of life.',
      de: 'Frühinterventionsdienste, die darauf ausgelegt sind, Kinder mit Entwicklungsverzögerungen oder Behinderungen in ihren ersten Lebensjahren zu unterstützen.',
      terms: {
        en: ['early intervention', 'early childhood development'],
        de: ['Frühförderung', 'Frühe Hilfen']
      }
    },
    'logopädie': {
      en: 'Speech and language therapy to help children develop communication skills, treat speech disorders, and improve language development.',
      de: 'Sprach- und Sprechtherapie, um Kindern bei der Entwicklung von Kommunikationsfähigkeiten zu helfen, Sprechstörungen zu behandeln und die Sprachentwicklung zu fördern.',
      terms: {
        en: ['speech therapy', 'language therapy'],
        de: ['Logopädie', 'Sprachtherapie']
      }
    },
    'ergotherapie': {
      en: 'Occupational therapy that helps children develop fine motor skills, sensory processing, and daily living skills.',
      de: 'Ergotherapie, die Kindern hilft, Feinmotorik, sensorische Verarbeitung und Fähigkeiten des täglichen Lebens zu entwickeln.',
      terms: {
        en: ['occupational therapy', 'motor skills therapy'],
        de: ['Ergotherapie', 'Beschäftigungstherapie']
      }
    },
    'sonderpädagogik': {
      en: 'Special education services for children with learning difficulties, disabilities, or special educational needs.',
      de: 'Sonderpädagogische Dienste für Kinder mit Lernschwierigkeiten, Behinderungen oder besonderen Bildungsbedürfnissen.',
      terms: {
        en: ['special education', 'special needs support'],
        de: ['Sonderpädagogik', 'Heilpädagogik']
      }
    },
    'spielgruppe': {
      en: 'Structured play groups for young children that promote social interaction, learning, and development through play.',
      de: 'Strukturierte Spielgruppen für kleine Kinder, die soziale Interaktion, Lernen und Entwicklung durch Spiel fördern.',
      terms: {
        en: ['playgroup', 'play-based learning'],
        de: ['Spielgruppe', 'Eltern-Kind-Gruppe']
      }
    }
  };

  const content = {
    title: {
      en: "Developmental Services for Children",
      de: 'Entwicklungsdienste für Kinder'
    },
    subtitle: {
      en: 'Supporting Your Child\'s Growth and Development',
      de: 'Die Entwicklung und das Wachstum Ihres Kindes unterstützen'
    },
    text: {
      en: `Austria provides comprehensive developmental services to ensure all children reach their full potential. These services support physical, cognitive, emotional, and social development from birth through school age.

**Early Childhood Development (0-3 years):**

**Frühförderung (Early Intervention)**:
- Available for children with developmental delays or disabilities
- Services include physical therapy, occupational therapy, and special education
- Home-based and center-based programs available
- Free services through provincial health systems
- Multidisciplinary teams including doctors, therapists, and educators

**Frühe Hilfen (Early Support)**:
- Prevention and early intervention for at-risk families
- Support for parents in understanding child development
- Regular developmental screenings and assessments
- Connection to appropriate services and resources
- Focus on building strong parent-child relationships

**Language and Communication Development:**

**Logopädie (Speech Therapy)**:
- Available for children with speech and language delays
- Treatment for pronunciation difficulties, stuttering, language disorders
- Both individual and group therapy sessions
- Integration support for multilingual children
- Parent training and home practice programs

**Multilingual support**:
- Recognition that multilingualism is beneficial for development
- Support for maintaining heritage languages
- German language development programs for migrant children
- Guidance for parents on bilingual child-rearing

**Motor Skills and Physical Development:**

**Ergotherapie (Occupational Therapy)**:
- Fine motor skills development (writing, drawing, manipulation)
- Gross motor skills and coordination
- Sensory integration therapy
- Support for daily living skills
- Adaptive equipment and techniques for children with disabilities

**Physical therapy** services include:
- Treatment for movement disorders or delays
- Support for children with cerebral palsy or muscular conditions
- Balance and coordination training
- Post-injury rehabilitation

**Social and Emotional Development:**

**Spielgruppe (Playgroups)**:
- Structured play sessions for children aged 1-4 years
- Social skill development through play
- Parent participation encouraged
- Cultural integration opportunities
- Often available in multiple languages

**Social skills programs** include:
- Interaction and communication skills
- Emotional regulation techniques
- Conflict resolution for young children
- Friendship building activities
- Cultural awareness and acceptance

**Educational Development Services:**

**Sonderpädagogik (Special Education)**:
- Individual education plans for children with special needs
- Integration support in regular kindergartens and schools
- Specialized teaching methods and materials
- Assistive technology support
- Transition planning for school entry

**Learning support** includes:
- Cognitive development programs
- Pre-literacy and pre-numeracy skills
- Memory and attention training
- Problem-solving skill development
- School readiness programs

**Programs for Specific Needs:**

**Autism Spectrum Support**:
- Specialized intervention programs
- Applied Behavior Analysis (ABA) therapy
- Social skills training
- Communication development (including alternative methods)
- Family support and training

**Intellectual Disability Services**:
- Individualized development plans
- Life skills training
- Adaptive behavior support
- Family respite services
- Long-term planning and support

**Sensory Impairment Support**:
- Services for children with hearing or vision impairments
- Specialized equipment and technology
- Communication method training (sign language, Braille)
- Mobility training and orientation
- Integration support in mainstream programs

**How to Access Services:**

**Assessment Process**:
1. **Referral**: From pediatrician, kindergarten, or parent request
2. **Evaluation**: Comprehensive developmental assessment
3. **Team meeting**: Discussion of results and recommendations
4. **Service planning**: Individual plan developed
5. **Implementation**: Services begin with regular monitoring

**Who can refer**:
- Pediatricians and family doctors
- Kindergarten teachers
- Parents or family members
- Public health nurses
- Social workers

**Costs and Funding**:
- Most developmental services are covered by public health insurance
- Some private services available with additional costs
- Financial assistance available for low-income families
- Transportation support may be available

**Parent and Family Support:**

**Education and Training**:
- Parenting classes focused on child development
- Workshops on supporting children with special needs
- Training on therapeutic techniques for home use
- Information sessions on child development milestones
- Support groups for parents

**Cultural Considerations**:
- Services provided in multiple languages when possible
- Cultural sensitivity in assessment and treatment
- Integration of family cultural practices
- Support for maintaining cultural identity
- Connection to cultural community resources

**Community Programs:**

**Recreational Activities**:
- Adaptive sports programs
- Arts and crafts activities
- Music and movement programs
- Outdoor adventure activities (adapted as needed)
- Community integration events

**Summer and Holiday Programs**:
- Specialized summer camps
- Respite care during school holidays
- Continued therapy services
- Social activities and outings
- Skill-building camps

**Transition Services:**

**School Readiness**:
- Assessment of school readiness skills
- Preparation programs for kindergarten entry
- Communication with future teachers
- Equipment and accommodation planning
- Gradual transition plans

**Supporting Your Child at Home:**

**Daily Activities**:
- Incorporate learning into everyday routines
- Create structured but flexible schedules
- Encourage independence in age-appropriate tasks
- Provide plenty of opportunities for play and exploration
- Read together daily and engage in conversations

**Environmental Supports**:
- Create safe spaces for exploration
- Organize toys and materials for easy access
- Reduce overstimulation when needed
- Provide quiet spaces for rest and calm activities
- Display visual schedules or reminders when helpful`,
      de: `Österreich bietet umfassende Entwicklungsdienste, um sicherzustellen, dass alle Kinder ihr volles Potenzial erreichen. Diese Dienste unterstützen die körperliche, kognitive, emotionale und soziale Entwicklung von der Geburt bis zum Schulalter.

**Frühkindliche Entwicklung (0-3 Jahre):**

**Frühförderung**:
- Verfügbar für Kinder mit Entwicklungsverzögerungen oder Behinderungen
- Dienste umfassen Physiotherapie, Ergotherapie und Sonderpädagogik
- Haus- und zentrumbasierte Programme verfügbar
- Kostenlose Dienste durch die Landessysteme
- Multidisziplinäre Teams mit Ärzten, Therapeuten und Pädagogen

**Frühe Hilfen**:
- Prävention und Frühintervention für gefährdete Familien
- Unterstützung für Eltern beim Verständnis der Kindesentwicklung
- Regelmäßige Entwicklungsuntersuchungen und -bewertungen
- Verbindung zu geeigneten Diensten und Ressourcen
- Fokus auf den Aufbau starker Eltern-Kind-Beziehungen

**Sprach- und Kommunikationsentwicklung:**

**Logopädie**:
- Verfügbar für Kinder mit Sprach- und Sprechverzögerungen
- Behandlung von Ausspracheschwierigkeiten, Stottern, Sprachstörungen
- Sowohl Einzel- als auch Gruppentherapiesitzungen
- Integrationsunterstützung für mehrsprachige Kinder
- Elterntraining und häusliche Übungsprogramme

**Mehrsprachige Unterstützung**:
- Anerkennung, dass Mehrsprachigkeit vorteilhaft für die Entwicklung ist
- Unterstützung beim Erhalt der Herkunftssprachen
- Deutsche Sprachentwicklungsprogramme für Migrantenkinder
- Anleitung für Eltern zur zweisprachigen Kindererziehung

**Motorische Fähigkeiten und körperliche Entwicklung:**

**Ergotherapie**:
- Entwicklung der Feinmotorik (Schreiben, Zeichnen, Manipulation)
- Grobmotorik und Koordination
- Sensorische Integrationstherapie
- Unterstützung für Fertigkeiten des täglichen Lebens
- Adaptive Ausrüstung und Techniken für Kinder mit Behinderungen

**Physiotherapie-Dienste** umfassen:
- Behandlung von Bewegungsstörungen oder -verzögerungen
- Unterstützung für Kinder mit Zerebralparese oder Muskelerkrankungen
- Balance- und Koordinationstraining
- Rehabilitation nach Verletzungen

**Soziale und emotionale Entwicklung:**

**Spielgruppe**:
- Strukturierte Spielsitzungen für Kinder im Alter von 1-4 Jahren
- Entwicklung sozialer Fähigkeiten durch Spiel
- Elternbeteiligung erwünscht
- Kulturelle Integrationsmöglichkeiten
- Oft in mehreren Sprachen verfügbar

**Soziale Fähigkeitsprogramme** umfassen:
- Interaktions- und Kommunikationsfähigkeiten
- Techniken zur emotionalen Regulation
- Konfliktlösung für kleine Kinder
- Freundschaftsaufbau-Aktivitäten
- Kulturelles Bewusstsein und Akzeptanz

**Bildungsentwicklungsdienste:**

**Sonderpädagogik**:
- Individuelle Bildungspläne für Kinder mit besonderen Bedürfnissen
- Integrationsunterstützung in regulären Kindergärten und Schulen
- Spezialisierte Lehrmethoden und -materialien
- Unterstützung mit Hilfstechnologien
- Übergangsplanung für den Schuleintritt

**Lernunterstützung** umfasst:
- Kognitive Entwicklungsprogramme
- Vor-Lese- und Vor-Rechenfähigkeiten
- Gedächtnis- und Aufmerksamkeitstraining
- Entwicklung von Problemlösungsfähigkeiten
- Schulbereitschaftsprogramme

**Programme für spezielle Bedürfnisse:**

**Unterstützung für Autismus-Spektrum**:
- Spezialisierte Interventionsprogramme
- Angewandte Verhaltensanalyse (ABA) Therapie
- Training sozialer Fähigkeiten
- Kommunikationsentwicklung (einschließlich alternativer Methoden)
- Familienunterstützung und -training

**Dienste für intellektuelle Behinderung**:
- Individualisierte Entwicklungspläne
- Lebensfähigkeitstraining
- Unterstützung für adaptives Verhalten
- Familienentlastungsdienste
- Langfristige Planung und Unterstützung

**Unterstützung für sensorische Beeinträchtigung**:
- Dienste für Kinder mit Hör- oder Sehbeeinträchtigungen
- Spezialisierte Ausrüstung und Technologie
- Training von Kommunikationsmethoden (Gebärdensprache, Braille)
- Mobilitätstraining und Orientierung
- Integrationsunterstützung in Mainstream-Programmen

**Wie man Zugang zu Diensten erhält:**

**Bewertungsprozess**:
1. **Überweisung**: Vom Kinderarzt, Kindergarten oder Elternantrag
2. **Evaluation**: Umfassende Entwicklungsbewertung
3. **Teambesprechung**: Diskussion der Ergebnisse und Empfehlungen
4. **Serviceplanung**: Individueller Plan entwickelt
5. **Implementierung**: Dienste beginnen mit regelmäßiger Überwachung

**Wer kann überweisen**:
- Kinderärzte und Hausärzte
- Kindergartenlehrer
- Eltern oder Familienmitglieder
- Gesundheitsschwestern
- Sozialarbeiter

**Kosten und Finanzierung**:
- Die meisten Entwicklungsdienste sind durch die öffentliche Krankenversicherung abgedeckt
- Einige private Dienste mit zusätzlichen Kosten verfügbar
- Finanzielle Unterstützung für Familien mit niedrigem Einkommen verfügbar
- Transportunterstützung kann verfügbar sein

**Eltern- und Familienunterstützung:**

**Bildung und Training**:
- Elternkurse mit Fokus auf Kindesentwicklung
- Workshops zur Unterstützung von Kindern mit besonderen Bedürfnissen
- Training therapeutischer Techniken für den Hausgebrauch
- Informationsveranstaltungen zu Entwicklungsmeilensteinen
- Unterstützungsgruppen für Eltern

**Kulturelle Überlegungen**:
- Dienste in mehreren Sprachen, wenn möglich
- Kulturelle Sensibilität bei Bewertung und Behandlung
- Integration familiärer kultureller Praktiken
- Unterstützung beim Erhalt der kulturellen Identität
- Verbindung zu kulturellen Gemeinschaftsressourcen

**Gemeindeprogramme:**

**Freizeitaktivitäten**:
- Adaptive Sportprogramme
- Kunst- und Bastelaktivitäten
- Musik- und Bewegungsprogramme
- Outdoor-Abenteueraktivitäten (bei Bedarf angepasst)
- Gemeinschaftsintegrationsereignisse

**Sommer- und Ferienprogramme**:
- Spezialisierte Sommerlager
- Entlastungspflege während der Schulferien
- Fortgesetzte Therapiedienste
- Soziale Aktivitäten und Ausflüge
- Fähigkeitenaufbau-Camps

**Übergangsdienste:**

**Schulbereitschaft**:
- Bewertung der Schulbereitschaftsfähigkeiten
- Vorbereitungsprogramme für den Kindergarteneintritt
- Kommunikation mit zukünftigen Lehrern
- Ausrüstungs- und Anpassungsplanung
- Schrittweise Übergangspläne

**Ihr Kind zu Hause unterstützen:**

**Tägliche Aktivitäten**:
- Lernen in alltägliche Routinen einbauen
- Strukturierte aber flexible Zeitpläne erstellen
- Unabhängigkeit bei altersgerechten Aufgaben fördern
- Viele Gelegenheiten zum Spielen und Erkunden bieten
- Täglich zusammen lesen und Gespräche führen

**Umgebungsunterstützungen**:
- Sichere Räume für Erkundung schaffen
- Spielzeug und Materialien für einfachen Zugang organisieren
- Überreizung bei Bedarf reduzieren
- Ruhige Räume für Ruhe und ruhige Aktivitäten bieten
- Visuelle Zeitpläne oder Erinnerungen bei Bedarf anzeigen`
    },
    links: [
      {
        title: { en: 'Early Intervention Austria', de: 'Frühförderung Österreich' },
        url: 'https://www.fruehehilfen.at/'
      },
      {
        title: { en: 'Speech Therapy Services', de: 'Logopädie Dienste' },
        url: 'https://www.logopaedieaustria.at/'
      },
      {
        title: { en: 'Occupational Therapy Austria', de: 'Ergotherapie Österreich' },
        url: 'https://www.ergotherapie.at/'
      },
      {
        title: { en: 'Special Education Support', de: 'Sonderpädagogik Unterstützung' },
        url: 'https://www.bmbwf.gv.at/Themen/schule/schulpraxis/sp.html'
      },
      {
        title: { en: 'Family Centers - Child Development', de: 'Familienzentren - Kindesentwicklung' },
        url: 'https://www.familienzentren.at/angebote/kinder-entwicklung'
      },
      {
        title: { en: 'Autism Support Austria', de: 'Autismus Hilfe Österreich' },
        url: 'https://www.autistenhilfe.at/'
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
});

export default DevelopmentalServicesPage;