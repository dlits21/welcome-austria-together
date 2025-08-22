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

const FamilySupportPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const definitions = {
    'familienbeihilfe': {
      en: 'Monthly financial allowance provided by the Austrian government to families with children to help with child-rearing costs.',
      de: 'Monatliche finanzielle Unterstützung der österreichischen Regierung für Familien mit Kindern zur Hilfe bei Kinderbetreuungskosten.',
      terms: {
        en: ['family allowance', 'child benefit'],
        de: ['Familienbeihilfe', 'Kindergeld']
      }
    },
    'kinderbetreuungsgeld': {
      en: 'Childcare benefit paid to parents who take time off work to care for their newborn or adopted child.',
      de: 'Kinderbetreuungsgeld, das an Eltern gezahlt wird, die sich eine Auszeit von der Arbeit nehmen, um ihr Neugeborenes oder adoptiertes Kind zu betreuen.',
      terms: {
        en: ['parental leave benefit', 'childcare allowance'],
        de: ['Kinderbetreuungsgeld', 'Karenzgeld']
      }
    },
    'familienzentrum': {
      en: 'Community centers that offer support, education, and activities for families, including parenting classes and social services.',
      de: 'Gemeindezentren, die Unterstützung, Bildung und Aktivitäten für Familien anbieten, einschließlich Elternkurse und Sozialdienste.',
      terms: {
        en: ['family center', 'parent-child center'],
        de: ['Familienzentrum', 'Eltern-Kind-Zentrum']
      }
    },
    'sozialarbeiter': {
      en: 'Professional who provides support and assistance to individuals and families facing social, emotional, or economic challenges.',
      de: 'Fachkraft, die Unterstützung und Hilfe für Einzelpersonen und Familien bietet, die mit sozialen, emotionalen oder wirtschaftlichen Herausforderungen konfrontiert sind.',
      terms: {
        en: ['social worker', 'family counselor'],
        de: ['Sozialarbeiter', 'Sozialarbeiterin', 'Familienberater']
      }
    },
    'elternberatung': {
      en: 'Professional guidance and support offered to parents to help them navigate parenting challenges and child development.',
      de: 'Professionelle Anleitung und Unterstützung für Eltern, um ihnen bei Erziehungsherausforderungen und der Kindesentwicklung zu helfen.',
      terms: {
        en: ['parenting counseling', 'parent guidance'],
        de: ['Elternberatung', 'Erziehungsberatung']
      }
    }
  };

  const content = {
    title: {
      en: "Family Support Services in Austria",
      de: 'Familienunterstützung in Österreich'
    },
    subtitle: {
      en: 'Resources and Services to Support Families',
      de: 'Ressourcen und Dienstleistungen zur Unterstützung von Familien'
    },
    text: {
      en: `Austria offers comprehensive support services for families, especially those with children. These services range from financial assistance to counseling and community programs designed to strengthen family relationships and well-being.

**Financial Support for Families:**

**Familienbeihilfe (Family Allowance)**:
- Monthly payment for all children living in Austria
- Amount varies by age: €119.60 (0-3 years), €127.90 (3-10 years), €148.30 (10-19 years)
- Additional €20.60 for third child, €32.70 for fourth child and beyond
- Automatic annual increase for inflation
- No income limits - available to all families

**Kinderbetreuungsgeld (Childcare Benefit)**:
- Paid during parental leave after birth or adoption
- Multiple options: from €436/month for 30 months to €2,000/month for 12 months
- Can be shared between parents
- Additional month bonus if both parents take leave

**Other Financial Support**:
- School textbook allowance
- School transport assistance  
- Free school meals for low-income families
- Housing subsidies for families
- Emergency financial assistance

**Parenting Support and Counseling:**

**Elternberatung (Parent Counseling)**:
- Free counseling services available in all regions
- Help with parenting challenges, discipline, communication
- Support for single parents
- Multilingual services available in many areas
- Group workshops and individual sessions

**Services include**:
- Child development guidance
- Behavior management strategies
- Family conflict resolution
- Co-parenting support after divorce/separation
- Crisis intervention and emergency support

**Familienzentrum (Family Centers)**:

Family centers provide a wide range of services for families:

**Activities offered**:
- Parent-child playgroups (0-3 years)
- Parenting classes and workshops
- Social activities and community events
- Support groups for specific situations
- Information sessions on child development
- Language courses for migrant families

**Special programs**:
- Single parent support groups
- Multicultural family programs
- Teen parent support
- Grandparent involvement programs
- Family mediation services

**Professional Support Services:**

**Sozialarbeiter (Social Workers)**:
- Available through municipal social services
- Help with accessing benefits and services
- Family crisis intervention
- Child welfare assessments when needed
- Advocacy and support navigation

**Community Programs**:
- Neighborhood family networks
- Volunteer family support programs
- Peer mentoring for new parents
- Cultural integration activities
- Holiday and summer programs for children

**Support for Special Situations:**

**Single Parents**:
- Additional financial support available
- Specialized counseling services
- Childcare priority placement
- Legal assistance for custody/support issues
- Single parent social groups and networks

**Migrant and Refugee Families**:
- Integration support services
- Language classes for the whole family
- Cultural orientation programs
- Assistance with document translation
- Connection to ethnic community organizations

**Families with Special Needs Children**:
- Specialized family support workers
- Respite care services
- Equipment and therapy funding
- Support group connections
- Advocacy assistance

**How to Access Support:**

1. **Contact your local municipality** - They can direct you to available services
2. **Visit family centers** - Most communities have at least one
3. **Call national helplines** - Many offer 24/7 support
4. **Speak with your child's school** - They often have social worker connections
5. **Contact NGOs** - Many offer specialized family support

**Regional Differences:**

Support services may vary by state (Bundesland):
- Vienna has the most comprehensive urban programs
- Rural areas may have mobile services
- Some regions have specialized migrant family services
- Mountain regions may have adapted programs for geographic challenges

**Getting Help in Crisis:**

If your family is in crisis:
- Emergency social services: Available 24/7 in most regions
- Crisis hotlines: Free and confidential
- Emergency housing: Available for families at risk
- Food banks and emergency supplies
- Legal aid for family law issues

**Building Community Networks:**

Austria encourages community involvement:
- Neighborhood associations often have family activities
- Religious organizations provide support regardless of faith
- Sports clubs and hobby groups welcome families
- Volunteer opportunities help build connections
- Community gardens and shared spaces promote interaction`,
      de: `Österreich bietet umfassende Unterstützungsdienste für Familien, insbesondere für solche mit Kindern. Diese Dienste reichen von finanzieller Unterstützung bis hin zu Beratung und Gemeindeprogrammen, die darauf ausgelegt sind, Familienbeziehungen und Wohlbefinden zu stärken.

**Finanzielle Unterstützung für Familien:**

**Familienbeihilfe**:
- Monatliche Zahlung für alle in Österreich lebenden Kinder
- Betrag variiert nach Alter: €119,60 (0-3 Jahre), €127,90 (3-10 Jahre), €148,30 (10-19 Jahre)
- Zusätzlich €20,60 für das dritte Kind, €32,70 für das vierte Kind und weitere
- Automatische jährliche Erhöhung entsprechend der Inflation
- Keine Einkommensgrenzen - für alle Familien verfügbar

**Kinderbetreuungsgeld**:
- Während der Karenz nach Geburt oder Adoption bezahlt
- Mehrere Optionen: von €436/Monat für 30 Monate bis €2.000/Monat für 12 Monate
- Kann zwischen Eltern geteilt werden
- Zusätzlicher Monatsbonus, wenn beide Eltern Karenz nehmen

**Andere finanzielle Unterstützung**:
- Schulbuchbeihilfe
- Schultransportunterstützung
- Kostenloses Schulessen für Familien mit niedrigem Einkommen
- Wohnungsbeihilfe für Familien
- Notfallfinanzielle Unterstützung

**Elternunterstützung und Beratung:**

**Elternberatung**:
- Kostenlose Beratungsdienste in allen Regionen verfügbar
- Hilfe bei Erziehungsherausforderungen, Disziplin, Kommunikation
- Unterstützung für Alleinerziehende
- Mehrsprachige Dienste in vielen Gebieten verfügbar
- Gruppenworkshops und Einzelsitzungen

**Dienstleistungen umfassen**:
- Anleitung zur Kindesentwicklung
- Verhaltensmanagement-Strategien
- Familienkonflikte lösen
- Co-Parenting-Unterstützung nach Scheidung/Trennung
- Krisenintervention und Notfallunterstützung

**Familienzentrum**:

Familienzentren bieten eine breite Palette von Dienstleistungen für Familien:

**Angebotene Aktivitäten**:
- Eltern-Kind-Spielgruppen (0-3 Jahre)
- Elternkurse und Workshops
- Soziale Aktivitäten und Gemeindeveranstaltungen
- Unterstützungsgruppen für spezielle Situationen
- Informationsveranstaltungen zur Kindesentwicklung
- Sprachkurse für Migrantenfamilien

**Spezielle Programme**:
- Unterstützungsgruppen für Alleinerziehende
- Multikulturelle Familienprogramme
- Unterstützung für jugendliche Eltern
- Programme für Großeltern
- Familienmediation

**Professionelle Unterstützungsdienste:**

**Sozialarbeiter**:
- Verfügbar über kommunale Sozialdienste
- Hilfe beim Zugang zu Leistungen und Diensten
- Familienkrisenintervention
- Kindeswohlprüfungen bei Bedarf
- Interessenvertretung und Unterstützung bei der Navigation

**Gemeindeprogramme**:
- Nachbarschaftliche Familiennetzwerke
- Freiwillige Familienunterstützungsprogramme
- Peer-Mentoring für neue Eltern
- Kulturelle Integrationsaktivitäten
- Ferienprogramme für Kinder

**Unterstützung für besondere Situationen:**

**Alleinerziehende**:
- Zusätzliche finanzielle Unterstützung verfügbar
- Spezialisierte Beratungsdienste
- Prioritätsplatz in der Kinderbetreuung
- Rechtshilfe bei Sorgerechts-/Unterhaltsfragen
- Soziale Gruppen und Netzwerke für Alleinerziehende

**Migranten- und Flüchtlingsfamilien**:
- Integrationsunterstützungsdienste
- Sprachkurse für die ganze Familie
- Kulturelle Orientierungsprogramme
- Hilfe bei der Dokumentenübersetzung
- Verbindung zu ethnischen Gemeinschaftsorganisationen

**Familien mit Kindern mit besonderen Bedürfnissen**:
- Spezialisierte Familienunterstützung
- Entlastungsdienste
- Ausrüstungs- und Therapiefinanzierung
- Verbindung zu Unterstützungsgruppen
- Advocacy-Unterstützung

**Wie man Unterstützung erhält:**

1. **Wenden Sie sich an Ihre örtliche Gemeinde** - Sie können Sie zu verfügbaren Diensten weiterleiten
2. **Besuchen Sie Familienzentren** - Die meisten Gemeinden haben mindestens eines
3. **Rufen Sie nationale Helplines an** - Viele bieten 24/7-Unterstützung
4. **Sprechen Sie mit der Schule Ihres Kindes** - Sie haben oft Sozialarbeiter-Verbindungen
5. **Kontaktieren Sie NGOs** - Viele bieten spezialisierte Familienunterstützung

**Regionale Unterschiede:**

Unterstützungsdienste können je nach Bundesland variieren:
- Wien hat die umfassendsten städtischen Programme
- Ländliche Gebiete können mobile Dienste haben
- Einige Regionen haben spezialisierte Migrantenfamiliendienste
- Bergregionen können angepasste Programme für geografische Herausforderungen haben

**Hilfe in der Krise:**

Wenn Ihre Familie in einer Krise ist:
- Notfall-Sozialdienste: In den meisten Regionen 24/7 verfügbar
- Krisen-Hotlines: Kostenlos und vertraulich
- Notunterkunft: Verfügbar für gefährdete Familien
- Lebensmittelbanken und Notversorgung
- Rechtshilfe für Familienrechtsangelegenheiten

**Aufbau von Gemeindennetzwerken:**

Österreich fördert die Beteiligung der Gemeinde:
- Nachbarschaftsvereine haben oft Familienaktivitäten
- Religiöse Organisationen bieten Unterstützung unabhängig vom Glauben
- Sportvereine und Hobbygruppen heißen Familien willkommen
- Freiwilligenmöglichkeiten helfen beim Aufbau von Verbindungen
- Gemeinschaftsgärten und geteilte Räume fördern Interaktion`
    },
    links: [
      {
        title: { en: 'Family Allowance Information', de: 'Familienbeihilfe Informationen' },
        url: 'https://www.help.gv.at/Portal.Node/hlpd/public/content/8/Seite.080200.html'
      },
      {
        title: { en: 'Childcare Benefit Overview', de: 'Kinderbetreuungsgeld Überblick' },
        url: 'https://www.help.gv.at/Portal.Node/hlpd/public/content/8/Seite.080400.html'
      },
      {
        title: { en: 'Family Centers Austria', de: 'Familienzentren Österreich' },
        url: 'https://www.familienzentren.at/'
      },
      {
        title: { en: 'Parenting Counseling Services', de: 'Elternberatung Dienste' },
        url: 'https://www.familienberatung.gv.at/'
      },
      {
        title: { en: 'Caritas Family Support', de: 'Caritas Familienunterstützung' },
        url: 'https://www.caritas.at/hilfe-angebote/familien-kinder-jugendliche/'
      },
      {
        title: { en: 'Integration Fund Family Services', de: 'Integrationsfonds Familiendienste' },
        url: 'https://www.integrationsfonds.at/themen/leben-in-oesterreich/familie/'
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

export default FamilySupportPage;