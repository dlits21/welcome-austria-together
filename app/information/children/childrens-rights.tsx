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

const ChildrensRightsPage: React.FC = () => {
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
    'UN Convention on the Rights of the Child': {
      en: 'An international agreement that sets out the civil, political, economic, social, health and cultural rights of children.',
      de: 'Ein internationales Abkommen, das die bürgerlichen, politischen, wirtschaftlichen, sozialen, gesundheitlichen und kulturellen Rechte von Kindern festlegt.',
      terms: {
        en: ['UNCRC', 'Convention on the Rights of the Child'],
        de: ['UN-Kinderrechtskonvention', 'Kinderrechtskonvention']
      }
    },
    'ombudsman': {
      en: 'An official appointed to investigate individuals\' complaints against maladministration, especially that of public authorities.',
      de: 'Ein Beamter, der damit beauftragt ist, Beschwerden von Einzelpersonen über Missstände zu untersuchen, insbesondere von öffentlichen Behörden.',
      terms: {
        en: ['ombudsperson'],
        de: ['Ombudsman', 'Volksanwalt', 'Kinder- und Jugendanwaltschaft']
      }
    },
    'legal guardian': {
      en: 'A person legally responsible for the care and management of the person or property of another person.',
      de: 'Eine Person, die rechtlich für die Betreuung und Verwaltung der Person oder des Eigentums einer anderen Person verantwortlich ist.',
      terms: {
        en: ['guardian'],
        de: ['Vormund', 'gesetzlicher Vertreter']
      }
    },
    'child welfare': {
      en: 'The safeguarding of children from violence, exploitation, abuse and neglect.',
      de: 'Der Schutz von Kindern vor Gewalt, Ausbeutung, Missbrauch und Vernachlässigung.',
      terms: {
        en: ['child protection'],
        de: ['Kindeswohl', 'Kinderschutz']
      }
    }
  };

  const content = {
    title: {
      en: "Children's Rights in Austria",
      de: 'Kinderrechte in Österreich'
    },
    subtitle: {
      en: 'Understanding Your Child\'s Rights and Protections',
      de: 'Die Rechte und den Schutz Ihres Kindes verstehen'
    },
    text: {
      en: `Every child in Austria has fundamental rights that are protected by law. These rights apply to all children, regardless of their nationality, immigration status, or background.

**Basic Rights of Children in Austria:**

• **Right to Education**: Every child has the right to free, quality education. This includes kindergarten, primary school, and secondary education.

• **Right to Health**: All children have access to healthcare, including emergency treatment, regardless of their legal status.

• **Right to Protection**: Children must be protected from all forms of violence, abuse, neglect, and exploitation.

• **Right to Participation**: Children have the right to express their views on matters affecting them and have those views taken seriously.

• **Right to Identity**: Every child has the right to a name, nationality, and to know their parents where possible.

**International Framework:**

Austria has ratified the UN Convention on the Rights of the Child, which means the country is legally bound to protect children's rights. The Convention includes 54 articles outlining children's rights and how they should be protected.

**Austrian Child Protection System:**

The Austrian child welfare system works to ensure all children are safe and their needs are met. If a child is at risk, various support services are available:

• Youth welfare services (Kinder- und Jugendhilfe)
• Emergency placement in foster care or residential care
• Family support services
• Counseling and therapy services

**Legal Protection:**

Children in Austria are protected by several laws and institutions:

• The Austrian Youth Welfare Act (Kinder- und Jugendhilfe-Gesetz)
• The ombudsman for children and young people in each state
• Family courts that make decisions in the best interest of the child
• Child advocacy services

**What Parents Need to Know:**

As a parent or legal guardian, you have both rights and responsibilities:

• You have the right to make decisions about your child's upbringing, education, and healthcare
• You must ensure your child attends school (compulsory education from age 6-15)
• You must protect your child from harm and provide for their basic needs
• You cannot use physical punishment - this is prohibited by law

**Getting Help:**

If you need support or have concerns about your child's rights, several organizations can help:

• Local youth welfare offices (Kinder- und Jugendhilfe)
• Children's ombudsman offices
• Legal aid services
• NGOs supporting migrant and refugee families`,
      de: `Jedes Kind in Österreich hat grundlegende Rechte, die gesetzlich geschützt sind. Diese Rechte gelten für alle Kinder, unabhängig von ihrer Staatsangehörigkeit, ihrem Aufenthaltsstatus oder ihrer Herkunft.

**Grundrechte von Kindern in Österreich:**

• **Recht auf Bildung**: Jedes Kind hat das Recht auf kostenlose, hochwertige Bildung. Dies umfasst Kindergarten, Grundschule und weiterführende Bildung.

• **Recht auf Gesundheit**: Alle Kinder haben Zugang zur Gesundheitsversorgung, einschließlich Notfallbehandlung, unabhängig von ihrem rechtlichen Status.

• **Recht auf Schutz**: Kinder müssen vor allen Formen von Gewalt, Missbrauch, Vernachlässigung und Ausbeutung geschützt werden.

• **Recht auf Beteiligung**: Kinder haben das Recht, ihre Ansichten zu Angelegenheiten zu äußern, die sie betreffen, und diese Ansichten ernst genommen zu bekommen.

• **Recht auf Identität**: Jedes Kind hat das Recht auf einen Namen, eine Staatsangehörigkeit und darauf, wo möglich seine Eltern zu kennen.

**Internationaler Rahmen:**

Österreich hat die UN-Kinderrechtskonvention ratifiziert, was bedeutet, dass das Land rechtlich verpflichtet ist, die Rechte von Kindern zu schützen. Die Konvention umfasst 54 Artikel, die die Rechte der Kinder und ihren Schutz beschreiben.

**Österreichisches Kinderschutzsystem:**

Das österreichische Kindeswohl-System arbeitet daran, sicherzustellen, dass alle Kinder sicher sind und ihre Bedürfnisse erfüllt werden. Wenn ein Kind gefährdet ist, stehen verschiedene Unterstützungsdienste zur Verfügung:

• Kinder- und Jugendhilfe
• Notunterbringung in Pflegefamilien oder Wohneinrichtungen
• Familienunterstützungsdienste
• Beratungs- und Therapiedienste

**Rechtlicher Schutz:**

Kinder in Österreich sind durch verschiedene Gesetze und Institutionen geschützt:

• Das österreichische Kinder- und Jugendhilfe-Gesetz
• Die Kinder- und Jugendanwaltschaft in jedem Bundesland
• Familiengerichte, die Entscheidungen im besten Interesse des Kindes treffen
• Kindervertretungsdienste

**Was Eltern wissen müssen:**

Als Eltern oder gesetzlicher Vertreter haben Sie sowohl Rechte als auch Pflichten:

• Sie haben das Recht, Entscheidungen über die Erziehung, Bildung und Gesundheitsversorgung Ihres Kindes zu treffen
• Sie müssen sicherstellen, dass Ihr Kind die Schule besucht (Schulpflicht von 6-15 Jahren)
• Sie müssen Ihr Kind vor Schäden schützen und für seine Grundbedürfnisse sorgen
• Sie dürfen keine körperliche Bestrafung anwenden - dies ist gesetzlich verboten

**Hilfe bekommen:**

Wenn Sie Unterstützung benötigen oder Bedenken bezüglich der Rechte Ihres Kindes haben, können verschiedene Organisationen helfen:

• Örtliche Kinder- und Jugendhilfe
• Kinder- und Jugendanwaltschaften
• Rechtsberatungsdienste
• NGOs, die Migranten- und Flüchtlingsfamilien unterstützen`
    },
    links: [
      {
        title: { en: 'Austrian Children\'s Ombudsman', de: 'Österreichische Kinder- und Jugendanwaltschaft' },
        url: 'https://www.kija.at'
      },
      {
        title: { en: 'UNICEF Austria', de: 'UNICEF Österreich' },
        url: 'https://www.unicef.at'
      },
      {
        title: { en: 'Youth Welfare Services', de: 'Kinder- und Jugendhilfe' },
        url: 'https://www.sozialministerium.at/Themen/Soziales/Kinder--und-Jugendhilfe.html'
      },
      {
        title: { en: 'UN Convention on Rights of Child', de: 'UN-Kinderrechtskonvention' },
        url: 'https://www.unicef.org/child-rights-convention'
      }
    ],
    videoTitle: {
      en: 'Understanding Children\'s Rights in Austria',
      de: 'Kinderrechte in Österreich verstehen'
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

export default ChildrensRightsPage;