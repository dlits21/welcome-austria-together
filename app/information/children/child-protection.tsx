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

const ChildProtectionPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const definitions = {
    'jugendwohlfahrt': {
      en: 'Child and Youth Welfare Services - the official government agency responsible for protecting children and supporting families in Austria.',
      de: 'Kinder- und Jugendhilfe - die offizielle Regierungsbehörde, die für den Schutz von Kindern und die Unterstützung von Familien in Österreich zuständig ist.',
      terms: {
        en: ['child welfare services', 'youth services'],
        de: ['Jugendwohlfahrt', 'Kinder- und Jugendhilfe', 'Jugendamt']
      }
    },
    'kindesmisshandlung': {
      en: 'Child abuse - any form of physical, emotional, sexual abuse or neglect that causes harm to a child.',
      de: 'Kindesmisshandlung - jede Form körperlicher, emotionaler, sexueller Gewalt oder Vernachlässigung, die einem Kind schadet.',
      terms: {
        en: ['child abuse', 'child maltreatment'],
        de: ['Kindesmisshandlung', 'Kindeswohlgefährdung']
      }
    },
    'meldepflicht': {
      en: 'Mandatory reporting obligation for professionals who work with children to report suspected child abuse to authorities.',
      de: 'Verpflichtung für Fachkräfte, die mit Kindern arbeiten, vermutete Kindesmisshandlung an Behörden zu melden.',
      terms: {
        en: ['reporting obligation', 'duty to report'],
        de: ['Meldepflicht', 'Anzeigepflicht']
      }
    },
    'kindesanwaltschaft': {
      en: 'Children\'s advocacy service that represents the interests and rights of children in legal proceedings.',
      de: 'Kinderanwaltschaftsdienst, der die Interessen und Rechte von Kindern in Gerichtsverfahren vertritt.',
      terms: {
        en: ['child advocacy', 'children\'s ombudsman'],
        de: ['Kindesanwaltschaft', 'Kinder- und Jugendanwaltschaft']
      }
    },
    'gefährdungsabklärung': {
      en: 'Risk assessment process conducted by child welfare services to evaluate the safety and well-being of a child.',
      de: 'Risikobeurteilungsprozess der Kinder- und Jugendhilfe zur Bewertung der Sicherheit und des Wohlbefindens eines Kindes.',
      terms: {
        en: ['risk assessment', 'safety evaluation'],
        de: ['Gefährdungsabklärung', 'Risikoeinschätzung']
      }
    }
  };

  const content = {
    title: {
      en: "Child Protection in Austria",
      de: 'Kinderschutz in Österreich'
    },
    subtitle: {
      en: 'Keeping Children Safe - Laws, Services, and How to Get Help',
      de: 'Kinder schützen - Gesetze, Dienste und Hilfe bekommen'
    },
    text: {
      en: `Austria has comprehensive child protection laws and services designed to keep all children safe from harm. Every child has the right to live free from abuse, neglect, and exploitation.

**Understanding Child Protection Laws:**

**Legal Framework**:
- Austrian Child and Youth Welfare Act (Bundes-Kinder- und Jugendhilfegesetz)
- UN Convention on the Rights of the Child (ratified by Austria)
- Federal Constitutional Law on the Rights of Children
- Criminal Code provisions protecting children

**What constitutes child abuse**:
- **Physical abuse**: Hitting, shaking, burning, or causing physical harm
- **Emotional abuse**: Constant criticism, threats, rejection, or psychological harm
- **Sexual abuse**: Any sexual contact or exploitation of a child
- **Neglect**: Failure to provide basic needs like food, shelter, medical care, or supervision
- **Witnessing domestic violence**: Exposure to violence between adults in the home

**Child Protection System:**

**Jugendwohlfahrt (Child and Youth Welfare Services)**:
- Primary government agency for child protection
- Available in every district and municipality
- Operates 24/7 emergency services
- Conducts Gefährdungsabklärung (risk assessments) when concerns are reported
- Provides support services to families to prevent removal of children

**Key responsibilities**:
- Investigate reports of suspected child abuse or neglect
- Assess family situations and child safety
- Provide support services to strengthen families
- Remove children from dangerous situations when necessary
- Place children in foster care or residential care when needed
- Work toward family reunification when safe and possible

**How to Report Concerns:**

**Who must report** (Meldepflicht):
- Teachers and school staff
- Doctors, nurses, and healthcare workers
- Social workers and psychologists
- Childcare providers
- Police officers

**Anyone can report** concerns about a child's safety:
- Family members, neighbors, community members
- The child themselves
- Anonymous reports are accepted

**How to report**:
- Call local Jugendwohlfahrt office
- Contact police emergency line: 133
- Call national child protection helpline: 147 (Rat auf Draht)
- Visit local government offices in person
- Report online through official websites

**Emergency Situations:**

**Immediate danger signs**:
- Child shows signs of serious physical injury
- Child reports sexual abuse
- Child is abandoned or left unsupervised for extended periods
- Child is involved in dangerous situations (substance abuse, criminal activity)
- Child expresses thoughts of self-harm or suicide

**Emergency contacts**:
- Police: 133 (immediate danger)
- Crisis helpline: 142 (psychological emergencies)
- Children's helpline: 147 (24/7 counseling for children and teens)
- Emergency services: 144 (medical emergencies)

**Support Services Available:**

**For children who have experienced abuse**:
- Specialized therapy and counseling services
- Medical treatment and care
- Legal representation through Kindesanwaltschaft
- Safe temporary housing in specialized facilities
- Educational support to maintain schooling
- Long-term therapeutic support

**For families in crisis**:
- Parenting support and education
- Family therapy and counseling
- Home-based support services
- Financial assistance for basic needs
- Respite care for overwhelmed parents
- Substance abuse treatment programs

**Protective Measures:**

**Court orders available**:
- Restraining orders against abusive individuals
- Supervised visitation arrangements
- Removal of children from dangerous situations
- Custody modifications to protect children
- No-contact orders between children and perpetrators

**Foster care and residential care**:
- Temporary or long-term placement options
- Specialized care for children with trauma
- Therapeutic foster homes
- Group homes for older children
- Independent living programs for teenagers

**Prevention and Education:**

**Community prevention programs**:
- Parenting education classes
- Early childhood intervention programs
- School-based prevention education
- Community awareness campaigns
- Support groups for at-risk families

**Teaching children about safety**:
- Age-appropriate information about body safety
- Teaching children to recognize unsafe situations
- Encouraging open communication with trusted adults
- Building children's confidence to speak up
- Creating safety plans with children

**Rights of Children in Protection Proceedings:**

**Children have the right to**:
- Be heard in court proceedings affecting them
- Have their wishes and feelings considered
- Legal representation through Kindesanwaltschaft
- Maintain relationships with family when safe
- Receive services in their preferred language
- Cultural and religious considerations in care

**Special Considerations for Migrant and Refugee Children:**

**Additional protections**:
- Interpretation services for all proceedings
- Cultural sensitivity in assessments and services
- Specialized services for unaccompanied minors
- Trauma-informed care for refugee children
- Connection to ethnic community support

**Challenges faced**:
- Language barriers in reporting and accessing services
- Cultural differences in child-rearing practices
- Fear of authorities due to immigration status
- Lack of knowledge about Austrian child protection laws
- Isolation from extended family support systems

**What Parents Need to Know:**

**Your rights as a parent**:
- Right to be informed about investigations
- Right to legal representation
- Right to interpreter services
- Right to appeal decisions
- Right to participate in service planning

**Your responsibilities**:
- Protect your children from harm
- Report suspected abuse of any child
- Cooperate with child protection investigations
- Follow court orders and service plans
- Seek help when struggling with parenting challenges

**Getting Help and Support:**

**If you're struggling as a parent**:
- Contact family support services before problems escalate
- Seek parenting education and support groups
- Access mental health services if needed
- Get help with substance abuse or domestic violence
- Use respite care services when overwhelmed

**If you're concerned about a child**:
- Don't hesitate to report concerns - it's better to be safe
- Provide as much specific information as possible
- Follow up if you don't see improvement
- Support the child by listening and believing them
- Help connect families to appropriate services

**Building Safe Communities:**

**Everyone can help protect children**:
- Learn the signs of child abuse and neglect
- Support families in your community
- Volunteer with child-focused organizations
- Advocate for child protection resources
- Create safe spaces where children feel comfortable seeking help

Austria's child protection system is designed to support families while prioritizing child safety. The goal is always to strengthen families when possible, but child safety comes first in all decisions.`,
      de: `Österreich hat umfassende Kinderschutzgesetze und -dienste, die darauf ausgelegt sind, alle Kinder vor Schäden zu schützen. Jedes Kind hat das Recht, frei von Missbrauch, Vernachlässigung und Ausbeutung zu leben.

**Verstehen der Kinderschutzgesetze:**

**Rechtlicher Rahmen**:
- Österreichisches Bundes-Kinder- und Jugendhilfegesetz
- UN-Kinderrechtskonvention (von Österreich ratifiziert)
- Bundesverfassungsgesetz über die Rechte von Kindern
- Strafgesetzbuch-Bestimmungen zum Schutz von Kindern

**Was Kindesmisshandlung ausmacht**:
- **Körperliche Gewalt**: Schlagen, Schütteln, Verbrennen oder körperliche Schäden verursachen
- **Emotionale Gewalt**: Ständige Kritik, Drohungen, Ablehnung oder psychische Schäden
- **Sexuelle Gewalt**: Jeglicher sexuelle Kontakt oder Ausbeutung eines Kindes
- **Vernachlässigung**: Versäumnis, Grundbedürfnisse wie Nahrung, Unterkunft, medizinische Versorgung oder Aufsicht zu erfüllen
- **Miterleben häuslicher Gewalt**: Exposition gegenüber Gewalt zwischen Erwachsenen im Haushalt

**Kinderschutzsystem:**

**Jugendwohlfahrt (Kinder- und Jugendhilfe)**:
- Hauptregierungsbehörde für Kinderschutz
- In jedem Bezirk und jeder Gemeinde verfügbar
- Betreibt 24/7-Notdienste
- Führt Gefährdungsabklärungen durch, wenn Bedenken gemeldet werden
- Bietet Unterstützungsdienste für Familien, um die Entfernung von Kindern zu verhindern

**Hauptverantwortlichkeiten**:
- Untersuchung von Meldungen über vermutete Kindesmisshandlung oder -vernachlässigung
- Bewertung von Familiensituationen und Kindersicherheit
- Bereitstellung von Unterstützungsdiensten zur Stärkung von Familien
- Entfernung von Kindern aus gefährlichen Situationen bei Bedarf
- Unterbringung von Kindern in Pflegefamilien oder Wohneinrichtungen bei Bedarf
- Arbeit an Familienzusammenführung, wenn sicher und möglich

**Wie man Bedenken meldet:**

**Wer melden muss** (Meldepflicht):
- Lehrer und Schulpersonal
- Ärzte, Krankenschwestern und Gesundheitspersonal
- Sozialarbeiter und Psychologen
- Kinderbetreuungspersonal
- Polizisten

**Jeder kann** Bedenken über die Sicherheit eines Kindes melden:
- Familienmitglieder, Nachbarn, Gemeindemitglieder
- Das Kind selbst
- Anonyme Meldungen werden akzeptiert

**Wie man meldet**:
- Örtliches Jugendwohlfahrtsbüro anrufen
- Polizei-Notfallnummer kontaktieren: 133
- Nationale Kinderschutz-Helpline anrufen: 147 (Rat auf Draht)
- Örtliche Regierungsbüros persönlich besuchen
- Online über offizielle Websites melden

**Notsituationen:**

**Zeichen unmittelbarer Gefahr**:
- Kind zeigt Anzeichen schwerer körperlicher Verletzung
- Kind meldet sexuellen Missbrauch
- Kind wird verlassen oder für längere Zeit unbeaufsichtigt gelassen
- Kind ist in gefährliche Situationen verwickelt (Substanzmissbrauch, kriminelle Aktivität)
- Kind äußert Gedanken an Selbstverletzung oder Selbstmord

**Notfallkontakte**:
- Polizei: 133 (unmittelbare Gefahr)
- Krisen-Hotline: 142 (psychologische Notfälle)
- Kinder-Helpline: 147 (24/7 Beratung für Kinder und Jugendliche)
- Rettungsdienste: 144 (medizinische Notfälle)

**Verfügbare Unterstützungsdienste:**

**Für Kinder, die Missbrauch erlebt haben**:
- Spezialisierte Therapie- und Beratungsdienste
- Medizinische Behandlung und Pflege
- Rechtsvertretung durch Kindesanwaltschaft
- Sichere Übergangsunterbringung in spezialisierten Einrichtungen
- Bildungsunterstützung zur Aufrechterhaltung der Schulbildung
- Langfristige therapeutische Unterstützung

**Für Familien in der Krise**:
- Elternunterstützung und -bildung
- Familientherapie und -beratung
- Häusliche Unterstützungsdienste
- Finanzielle Unterstützung für Grundbedürfnisse
- Entlastungspflege für überforderte Eltern
- Suchtbehandlungsprogramme

**Schutzmaßnahmen:**

**Verfügbare Gerichtsbeschlüsse**:
- Annäherungsverbote gegen gewaltätige Personen
- Überwachte Besuchsarrangements
- Entfernung von Kindern aus gefährlichen Situationen
- Sorgerechtsänderungen zum Schutz von Kindern
- Kontaktverbote zwischen Kindern und Tätern

**Pflegefamilien und Wohnbetreuung**:
- Temporäre oder langfristige Unterbringungsoptionen
- Spezialisierte Betreuung für Kinder mit Trauma
- Therapeutische Pflegefamilien
- Wohngruppen für ältere Kinder
- Betreutes Wohnen-Programme für Jugendliche

**Prävention und Bildung:**

**Gemeindepräventionsprogramme**:
- Elternbildungsklassen
- Frühkindliche Interventionsprogramme
- Schulbasierte Präventionsbildung
- Gemeinde-Bewusstseinskampagnen
- Unterstützungsgruppen für gefährdete Familien

**Kindern Sicherheit beibringen**:
- Altersgerechte Informationen über Körpersicherheit
- Kindern beibringen, unsichere Situationen zu erkennen
- Offene Kommunikation mit vertrauenswürdigen Erwachsenen fördern
- Selbstvertrauen der Kinder stärken, sich zu äußern
- Sicherheitspläne mit Kindern erstellen

**Rechte von Kindern in Schutzverfahren:**

**Kinder haben das Recht**:
- In Gerichtsverfahren, die sie betreffen, gehört zu werden
- Ihre Wünsche und Gefühle berücksichtigt zu bekommen
- Rechtsvertretung durch Kindesanwaltschaft
- Beziehungen zur Familie aufrechtzuerhalten, wenn sicher
- Dienstleistungen in ihrer bevorzugten Sprache zu erhalten
- Kulturelle und religiöse Überlegungen in der Betreuung

**Besondere Überlegungen für Migranten- und Flüchtlingskinder:**

**Zusätzliche Schutzmaßnahmen**:
- Dolmetscherdienste für alle Verfahren
- Kulturelle Sensibilität in Bewertungen und Diensten
- Spezialisierte Dienste für unbegleitete Minderjährige
- Trauma-informierte Betreuung für Flüchtlingskinder
- Verbindung zu ethnischen Gemeinschaftsunterstützungen

**Herausforderungen**:
- Sprachbarrieren bei der Meldung und beim Zugang zu Diensten
- Kulturelle Unterschiede in Kindererziehungspraktiken
- Angst vor Behörden aufgrund des Aufenthaltsstatus
- Mangelndes Wissen über österreichische Kinderschutzgesetze
- Isolation von erweiterten Familienunterstützungssystemen

**Was Eltern wissen müssen:**

**Ihre Rechte als Eltern**:
- Recht, über Untersuchungen informiert zu werden
- Recht auf Rechtsvertretung
- Recht auf Dolmetscherdienste
- Recht, Entscheidungen anzufechten
- Recht, an der Serviceplanung teilzunehmen

**Ihre Verantwortlichkeiten**:
- Ihre Kinder vor Schäden schützen
- Vermuteten Missbrauch jedes Kindes melden
- Mit Kinderschutzuntersuchungen kooperieren
- Gerichtsbeschlüsse und Servicepläne befolgen
- Hilfe suchen, wenn Sie mit Erziehungsherausforderungen kämpfen

**Hilfe und Unterstützung bekommen:**

**Wenn Sie als Eltern kämpfen**:
- Kontaktieren Sie Familienunterstützungsdienste, bevor Probleme eskalieren
- Suchen Sie Elternbildung und Unterstützungsgruppen
- Greifen Sie auf psychische Gesundheitsdienste zurück, falls nötig
- Holen Sie sich Hilfe bei Suchtproblemen oder häuslicher Gewalt
- Nutzen Sie Entlastungsdienste, wenn Sie überfordert sind

**Wenn Sie sich um ein Kind sorgen**:
- Zögern Sie nicht, Bedenken zu melden - Sicherheit geht vor
- Geben Sie so spezifische Informationen wie möglich
- Folgen Sie nach, wenn Sie keine Verbesserung sehen
- Unterstützen Sie das Kind, indem Sie zuhören und ihm glauben
- Helfen Sie dabei, Familien mit geeigneten Diensten zu verbinden

**Sichere Gemeinden aufbauen:**

**Jeder kann helfen, Kinder zu schützen**:
- Lernen Sie die Anzeichen von Kindesmissbrauch und -vernachlässigung
- Unterstützen Sie Familien in Ihrer Gemeinde
- Arbeiten Sie freiwillig bei kinderorientierten Organisationen mit
- Setzen Sie sich für Kinderschutzressourcen ein
- Schaffen Sie sichere Räume, wo Kinder sich wohlfühlen, Hilfe zu suchen

Österreichs Kinderschutzsystem ist darauf ausgelegt, Familien zu unterstützen und gleichzeitig die Kindersicherheit zu priorisieren. Das Ziel ist es immer, Familien zu stärken, wenn möglich, aber Kindersicherheit steht bei allen Entscheidungen an erster Stelle.`
    },
    links: [
      {
        title: { en: 'Child Protection Helpline (Rat auf Draht)', de: 'Kinderschutz Helpline (Rat auf Draht)' },
        url: 'https://www.rataufdraht.at/'
      },
      {
        title: { en: 'Children and Youth Advocacy', de: 'Kinder- und Jugendanwaltschaft' },
        url: 'https://www.kija.at/'
      },
      {
        title: { en: 'Child Welfare Services Information', de: 'Kinder- und Jugendhilfe Informationen' },
        url: 'https://www.sozialministerium.at/Themen/Soziales/Kinder--und-Jugendhilfe.html'
      },
      {
        title: { en: 'Safer Internet for Children', de: 'Sicheres Internet für Kinder' },
        url: 'https://www.saferinternet.at/'
      },
      {
        title: { en: 'Violence Prevention Center', de: 'Gewaltschutzzentrum' },
        url: 'https://www.gewaltschutzzentrum.at/'
      },
      {
        title: { en: 'White Ring (Crime Victims Support)', de: 'Weißer Ring (Opferhilfe)' },
        url: 'https://www.weisser-ring.at/'
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

export default ChildProtectionPage;