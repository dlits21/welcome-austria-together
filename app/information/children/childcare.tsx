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

const ChildcarePage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVirtualAssistant, setShowVirtualAssistant] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const definitions = {
    'kindergarten': {
      en: 'Austrian term for daycare centers and preschools for children aged 3-6 years, often subsidized by the government.',
      de: 'Österreichischer Begriff für Kindertagesstätten und Vorschulen für Kinder im Alter von 3-6 Jahren, oft staatlich gefördert.',
      terms: {
        en: ['daycare', 'preschool'],
        de: ['Kindergarten', 'Kindertagesstätte']
      }
    },
    'hort': {
      en: 'After-school care program for school-age children, providing supervision, homework help, and activities.',
      de: 'Nachmittagsbetreuung für Schulkinder, die Aufsicht, Hausaufgabenhilfe und Aktivitäten bietet.',
      terms: {
        en: ['after-school care', 'after-school program'],
        de: ['Hort', 'Nachmittagsbetreuung', 'Ganztagesschule']
      }
    },
    'tagesmutter': {
      en: 'Licensed childcare provider who cares for children in their own home or the child\'s home.',
      de: 'Lizenzierte Kinderbetreuerin, die Kinder in ihrem eigenen Zuhause oder im Zuhause des Kindes betreut.',
      terms: {
        en: ['childminder', 'family daycare'],
        de: ['Tagesmutter', 'Tagesvater', 'Tagespflegeperson']
      }
    },
    'kinderkrippe': {
      en: 'Nursery for very young children, typically from 6 months to 3 years old.',
      de: 'Krippe für sehr kleine Kinder, normalerweise von 6 Monaten bis 3 Jahren.',
      terms: {
        en: ['nursery', 'infant care'],
        de: ['Kinderkrippe', 'Krippe']
      }
    },
    'subsidies': {
      en: 'Financial assistance provided by the government to help reduce the cost of childcare services.',
      de: 'Finanzielle Unterstützung der Regierung zur Reduzierung der Kosten für Kinderbetreuung.',
      terms: {
        en: ['financial assistance', 'government support'],
        de: ['Förderungen', 'Beihilfen', 'Unterstützung']
      }
    }
  };

  const content = {
    title: {
      en: "Childcare in Austria",
      de: 'Kinderbetreuung in Österreich'
    },
    subtitle: {
      en: 'Understanding Childcare Options and How to Access Them',
      de: 'Kinderbetreuungsmöglichkeiten verstehen und nutzen'
    },
    text: {
      en: `Austria offers various childcare options to support working families and promote children's development. Here's a comprehensive guide to help you navigate the Austrian childcare system.

**Types of Childcare in Austria:**

• **Kinderkrippe (Nursery)**: For children aged 6 months to 3 years. These facilities provide care for very young children while parents work or study.

• **Kindergarten**: For children aged 3-6 years. The final year is often free and focuses on school preparation. Many kindergartens offer extended hours and meals.

• **Hort (After-school care)**: For school-age children (6-14 years). Provides supervision, homework help, and activities after school hours and during holidays.

• **Tagesmutter/Tagesvater (Childminder)**: Licensed individuals who provide childcare in a home setting. Good option for flexible schedules or younger children.

• **Private childcare**: Nannies, au pairs, or private daycare centers. More expensive but offers flexibility and individual attention.

**Registration Process:**

1. **Research options**: Visit local facilities, check waiting lists, and compare services
2. **Apply early**: Some kindergartens have long waiting lists, especially in cities
3. **Required documents**: 
   - Birth certificate of the child
   - Proof of residence
   - Health records and vaccination certificate
   - Employment confirmation (for subsidized spots)
   - Income documentation

4. **Visit and interview**: Most facilities require a visit before enrollment
5. **Integration support**: Many facilities offer German language support for migrant children

**Costs and Financial Support:**

**Kindergarten costs** vary by state and municipality:
- Vienna: Free for children 2.5+ years, meals extra
- Lower Austria: €100-200/month + meals
- Upper Austria: Free for final year, others €100-150/month
- Salzburg: Free for 20 hours/week, full-time costs extra

**Subsidies are available** based on family income. Single parents and low-income families often receive significant reductions or free childcare.

**Financial support includes**:
- Reduced fees based on income
- Free meals for low-income families  
- Transportation assistance
- Equipment and materials support

**Daily Schedule (typical kindergarten)**:
- 7:00-9:00: Arrival and free play
- 9:00-10:00: Morning snack and group activities
- 10:00-12:00: Educational activities, outdoor play
- 12:00-13:00: Lunch
- 13:00-14:00: Rest time
- 14:00-16:00: Afternoon activities
- 16:00-17:00: Pick-up time

**Tips for Migrant and Refugee Families:**

• **Language support**: Many facilities offer German language programs for children and parents
• **Integration programs**: Special activities to help children adapt to Austrian culture
• **Multicultural approach**: Many kindergartens celebrate different cultures and languages
• **Parent involvement**: Participate in parent evenings and school events to build community
• **Communication**: Don't hesitate to ask questions - staff are usually very helpful

**Special Considerations:**

**For children with special needs**:
- Integration kindergartens with specialized staff
- Individual support plans
- Therapy services within some facilities
- Reduced group sizes for better attention

**Holiday care** is available during:
- Summer holidays (partial weeks)
- Christmas break
- Easter holidays
- Some facilities offer year-round care

**Quality indicators to look for**:
- Qualified, trained staff
- Small group sizes (max 25 children per group in kindergarten)
- Clean, safe facilities with outdoor space
- Structured daily program with learning activities
- Healthy meal options
- Good communication with parents`,
      de: `Österreich bietet verschiedene Kinderbetreuungsmöglichkeiten, um berufstätige Familien zu unterstützen und die Entwicklung von Kindern zu fördern. Hier ist ein umfassender Leitfaden für das österreichische Kinderbetreuungssystem.

**Arten der Kinderbetreuung in Österreich:**

• **Kinderkrippe**: Für Kinder von 6 Monaten bis 3 Jahren. Diese Einrichtungen betreuen sehr kleine Kinder, während Eltern arbeiten oder studieren.

• **Kindergarten**: Für Kinder von 3-6 Jahren. Das letzte Jahr ist oft kostenlos und konzentriert sich auf die Schulvorbereitung. Viele Kindergärten bieten erweiterte Öffnungszeiten und Mahlzeiten.

• **Hort (Nachmittagsbetreuung)**: Für Schulkinder (6-14 Jahre). Bietet Aufsicht, Hausaufgabenhilfe und Aktivitäten nach der Schule und in den Ferien.

• **Tagesmutter/Tagesvater**: Lizenzierte Personen, die Kinderbetreuung in einem häuslichen Umfeld anbieten. Gute Option für flexible Zeiten oder jüngere Kinder.

• **Private Kinderbetreuung**: Babysitter, Au-pairs oder private Kindergärten. Teurer, aber bietet Flexibilität und individuelle Betreuung.

**Anmeldeprozess:**

1. **Optionen recherchieren**: Besuchen Sie örtliche Einrichtungen, prüfen Sie Wartelisten und vergleichen Sie Angebote
2. **Früh anmelden**: Manche Kindergärten haben lange Wartelisten, besonders in Städten
3. **Erforderliche Dokumente**: 
   - Geburtsurkunde des Kindes
   - Meldezettel
   - Gesundheitsakte und Impfpass
   - Arbeitsbestätigung (für geförderte Plätze)
   - Einkommensnachweis

4. **Besichtigung und Gespräch**: Die meisten Einrichtungen verlangen einen Besuch vor der Anmeldung
5. **Integrationshilfe**: Viele Einrichtungen bieten deutsche Sprachförderung für Migrantenkinder

**Kosten und finanzielle Unterstützung:**

**Kindergartenkosten** variieren je nach Bundesland und Gemeinde:
- Wien: Kostenlos für Kinder ab 2,5 Jahren, Essen extra
- Niederösterreich: €100-200/Monat + Essen
- Oberösterreich: Letztes Jahr kostenlos, andere €100-150/Monat
- Salzburg: 20 Stunden/Woche kostenlos, Vollzeit kostet extra

**Förderungen sind verfügbar** basierend auf dem Familieneinkommen. Alleinerziehende und Familien mit niedrigem Einkommen erhalten oft erhebliche Ermäßigungen oder kostenlose Betreuung.

**Finanzielle Unterstützung umfasst**:
- Ermäßigte Gebühren basierend auf Einkommen
- Kostenloses Essen für Familien mit niedrigem Einkommen
- Transportunterstützung
- Unterstützung für Ausrüstung und Materialien

**Tagesablauf (typischer Kindergarten)**:
- 7:00-9:00: Ankunft und freies Spiel
- 9:00-10:00: Morgenjause und Gruppenaktivitäten
- 10:00-12:00: Bildungsaktivitäten, Spiel im Freien
- 12:00-13:00: Mittagessen
- 13:00-14:00: Ruhezeit
- 14:00-16:00: Nachmittagsaktivitäten
- 16:00-17:00: Abholzeit

**Tipps für Migranten- und Flüchtlingsfamilien:**

• **Sprachförderung**: Viele Einrichtungen bieten deutsche Sprachprogramme für Kinder und Eltern
• **Integrationsprogramme**: Spezielle Aktivitäten helfen Kindern, sich an die österreichische Kultur anzupassen
• **Multikultureller Ansatz**: Viele Kindergärten feiern verschiedene Kulturen und Sprachen
• **Elternbeteiligung**: Nehmen Sie an Elternabenden und Schulfesten teil, um Gemeinschaft aufzubauen
• **Kommunikation**: Zögern Sie nicht zu fragen - das Personal ist normalerweise sehr hilfsbereit

**Besondere Überlegungen:**

**Für Kinder mit besonderen Bedürfnissen**:
- Integrationskindergärten mit spezialisiertem Personal
- Individuelle Förderpläne
- Therapiedienste in manchen Einrichtungen
- Kleinere Gruppengrößen für bessere Betreuung

**Ferienbetreuung** ist verfügbar während:
- Sommerferien (teilweise Wochen)
- Weihnachtsferien
- Osterferien
- Manche Einrichtungen bieten ganzjährige Betreuung

**Qualitätsindikatoren, auf die Sie achten sollten**:
- Qualifiziertes, ausgebildetes Personal
- Kleine Gruppengrößen (max 25 Kinder pro Gruppe im Kindergarten)
- Saubere, sichere Einrichtungen mit Außenbereich
- Strukturiertes Tagesprogramm mit Lernaktivitäten
- Gesunde Essensoptionen
- Gute Kommunikation mit Eltern`
    },
    links: [
      {
        title: { en: 'Ministry of Education - Kindergarten Info', de: 'Bildungsministerium - Kindergarten Info' },
        url: 'https://www.bmbwf.gv.at/Themen/eb/eb_beruf_erwachsene/kindergaerten.html'
      },
      {
        title: { en: 'Vienna Kindergarten Application', de: 'Wien Kindergarten Anmeldung' },
        url: 'https://www.wien.gv.at/bildung/kindergarten/anmeldung/'
      },
      {
        title: { en: 'Childcare Subsidies Information', de: 'Informationen zu Kinderbetreuungsförderung' },
        url: 'https://www.help.gv.at/Portal.Node/hlpd/public/content/8/Seite.080701.html'
      },
      {
        title: { en: 'Integration Fund - Childcare', de: 'Integrationsfonds - Kinderbetreuung' },
        url: 'https://www.integrationsfonds.at/themen/leben-in-oesterreich/kinderbetreuung/'
      },
      {
        title: { en: 'Caritas Family Services', de: 'Caritas Familienhilfe' },
        url: 'https://www.caritas.at/hilfe-angebote/familien-kinder-jugendliche/'
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

export default ChildcarePage;