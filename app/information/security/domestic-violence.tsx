import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../../contexts/LanguageContext';
import { languages } from '../../../data/language/common';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';

const DomesticViolencePage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleHotlineCall = () => {
    Alert.alert(
      language.code === 'de' ? 'Frauenhelpline anrufen' : 'Call Women\'s Helpline',
      language.code === 'de' 
        ? 'Möchten Sie die kostenlose Frauenhelpline anrufen? (0800 222 555)'
        : 'Do you want to call the free Women\'s Helpline? (0800 222 555)',
      [
        {
          text: language.code === 'de' ? 'Abbrechen' : 'Cancel',
          style: 'cancel',
        },
        {
          text: language.code === 'de' ? 'Anrufen' : 'Call',
          onPress: () => Linking.openURL('tel:0800222555'),
        },
      ]
    );
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const content = {
    title: {
      en: 'Domestic Violence Support',
      de: 'Hilfe bei häuslicher Gewalt'
    },
    subtitle: {
      en: 'Understanding domestic violence and getting help',
      de: 'Häusliche Gewalt verstehen und Hilfe bekommen'
    },
    text: {
      en: `Domestic violence affects people of all backgrounds, ages, and genders. Understanding what constitutes domestic violence and knowing where to get help can save lives.

**What Constitutes Domestic Violence:**
Domestic violence includes any pattern of behavior used to gain or maintain power and control over an intimate partner, family member, or household member:

• **Physical Violence:** Hitting, slapping, punching, kicking, choking, or using weapons
• **Sexual Violence:** Forced sexual activity, sexual coercion, or sexual assault
• **Emotional/Psychological Abuse:** Threats, intimidation, isolation, humiliation, or controlling behavior
• **Economic Abuse:** Controlling finances, preventing work, or stealing money/documents
• **Digital Abuse:** Monitoring online activity, stealing passwords, or sharing intimate images without consent

**What Constitutes Rape:**
• Any sexual activity without clear, ongoing consent
• Sex when someone is intoxicated, asleep, or otherwise unable to consent
• Forced sex within marriage or relationships (marital rape is illegal in Austria)
• Sexual coercion through threats, manipulation, or abuse of power

**What Constitutes Sexual Harassment:**
• Unwanted sexual advances, requests for sexual favors, or other sexual conduct
• Creating a hostile environment through sexual comments, jokes, or images
• Unwanted touching, groping, or sexual gestures
• Sexual comments about appearance, clothing, or body
• Sharing sexual images or content without consent

**Important Information:**
• **All information shared with helplines is confidential and respectful**
• **You will not be judged for your situation**
• **Help is available regardless of your immigration status**
• **Men can also be victims of domestic violence and deserve support**
• **LGBTQ+ individuals face unique challenges and deserve specialized support**

**Safety Planning:**
If you're in an abusive relationship, consider creating a safety plan:
• Keep important documents (ID, passport, money) in a safe place
• Identify trusted friends or family who can help
• Know the fastest route out of your home
• Keep emergency numbers saved discreetly in your phone
• Consider staying with friends or family if it's safe to do so`,
      de: `Häusliche Gewalt betrifft Menschen aller Hintergründe, Altersgruppen und Geschlechter. Zu verstehen, was häusliche Gewalt ausmacht und zu wissen, wo man Hilfe bekommt, kann Leben retten.

**Was häusliche Gewalt ausmacht:**
Häusliche Gewalt umfasst jedes Verhaltensmuster, das verwendet wird, um Macht und Kontrolle über einen intimen Partner, ein Familienmitglied oder Haushaltsmitglied zu gewinnen oder aufrechtzuerhalten:

• **Körperliche Gewalt:** Schlagen, Ohrfeigen, Boxen, Treten, Würgen oder Waffengebrauch
• **Sexuelle Gewalt:** Erzwungene sexuelle Aktivität, sexuelle Nötigung oder sexuelle Übergriffe
• **Emotionaler/Psychologischer Missbrauch:** Drohungen, Einschüchterung, Isolation, Demütigung oder kontrollierendes Verhalten
• **Wirtschaftlicher Missbrauch:** Kontrolle der Finanzen, Arbeitsverhinderung oder Diebstahl von Geld/Dokumenten
• **Digitaler Missbrauch:** Online-Aktivitäten überwachen, Passwörter stehlen oder intime Bilder ohne Zustimmung teilen

**Was Vergewaltigung ausmacht:**
• Jede sexuelle Aktivität ohne klare, andauernde Zustimmung
• Sex, wenn jemand betrunken, schlafend oder anderweitig nicht zustimmungsfähig ist
• Erzwungener Sex innerhalb der Ehe oder Beziehungen (Vergewaltigung in der Ehe ist in Österreich illegal)
• Sexuelle Nötigung durch Drohungen, Manipulation oder Machtmissbrauch

**Was sexuelle Belästigung ausmacht:**
• Unerwünschte sexuelle Annäherungsversuche, Bitten um sexuelle Gefälligkeiten oder anderes sexuelles Verhalten
• Schaffung einer feindlichen Umgebung durch sexuelle Kommentare, Witze oder Bilder
• Unerwünschte Berührungen, Betasten oder sexuelle Gesten
• Sexuelle Kommentare über Aussehen, Kleidung oder Körper
• Teilen sexueller Bilder oder Inhalte ohne Zustimmung

**Wichtige Informationen:**
• **Alle Informationen, die mit Helplines geteilt werden, sind vertraulich und respektvoll**
• **Sie werden nicht für Ihre Situation verurteilt**
• **Hilfe ist unabhängig von Ihrem Einwanderungsstatus verfügbar**
• **Männer können auch Opfer häuslicher Gewalt sein und verdienen Unterstützung**
• **LGBTQ+ Personen stehen vor einzigartigen Herausforderungen und verdienen spezialisierte Unterstützung**

**Sicherheitsplanung:**
Wenn Sie in einer missbräuchlichen Beziehung sind, erwägen Sie einen Sicherheitsplan:
• Bewahren Sie wichtige Dokumente (Ausweis, Pass, Geld) an einem sicheren Ort auf
• Identifizieren Sie vertrauenswürdige Freunde oder Familie, die helfen können
• Kennen Sie den schnellsten Weg aus Ihrem Zuhause
• Bewahren Sie Notfallnummern diskret in Ihrem Telefon auf
• Erwägen Sie, bei Freunden oder Familie zu bleiben, wenn es sicher ist`
    },
    helpResources: {
      women: [
        {
          name: { en: 'Women\'s Helpline Austria', de: 'Frauenhelpline Österreich' },
          number: '0800 222 555',
          description: { 
            en: '24/7 free hotline for women experiencing violence',
            de: '24/7 kostenlose Hotline für Frauen, die Gewalt erleben'
          },
          website: 'https://www.frauenhelpline.at'
        },
        {
          name: { en: 'Women\'s Shelter Network', de: 'Frauenhäuser Österreich' },
          description: { 
            en: 'Safe housing and support for women and children',
            de: 'Sichere Unterbringung und Unterstützung für Frauen und Kinder'
          },
          website: 'https://www.aoef.at'
        },
        {
          name: { en: 'Intervention Centers', de: 'Interventionsstellen' },
          description: { 
            en: 'Legal support and counseling after police intervention',
            de: 'Rechtsbeistand und Beratung nach Polizeieinsatz'
          },
          website: 'https://www.interventionsstelle-wien.at'
        }
      ],
      men: [
        {
          name: { en: 'Men\'s Information Center', de: 'Männerberatung Wien' },
          description: { 
            en: 'Counseling and support for men experiencing violence',
            de: 'Beratung und Unterstützung für Männer, die Gewalt erleben'
          },
          website: 'https://www.maenner.at'
        },
        {
          name: { en: 'Men Against Violence', de: 'Männer gegen Gewalt' },
          description: { 
            en: 'Support groups and counseling for male victims',
            de: 'Selbsthilfegruppen und Beratung für männliche Opfer'
          },
          website: 'https://www.gewaltinfo.at'
        }
      ]
    },
    links: [
      {
        title: { en: 'Violence Protection Act Info', de: 'Gewaltschutzgesetz Info' },
        url: 'https://www.justiz.gv.at'
      },
      {
        title: { en: 'Emergency Numbers Guide', de: 'Notruf-Leitfaden' },
        url: 'https://www.help.gv.at'
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
        
        {/* Emergency Hotline */}
        <View style={styles.emergencySection}>
          <TouchableOpacity style={styles.hotlineButton} onPress={handleHotlineCall}>
            <MaterialIcons name="phone" size={24} color="#fff" />
            <View style={styles.hotlineInfo}>
              <Text style={styles.hotlineTitle}>
                {language.code === 'de' ? 'Frauenhelpline' : 'Women\'s Helpline'}
              </Text>
              <Text style={styles.hotlineNumber}>0800 222 555</Text>
              <Text style={styles.hotlineDescription}>
                {language.code === 'de' ? '24/7 kostenlos & vertraulich' : '24/7 free & confidential'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.text}>
          {parseMarkdownText(language.code === 'de' ? content.text.de : content.text.en)}
        </Text>
        
        {/* Women's Support Resources */}
        <View style={styles.resourcesSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Unterstützung für Frauen' : 'Support for Women'}
          </Text>
          
          {content.helpResources.women.map((resource, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.resourceCard}
              onPress={() => handleLinkPress(resource.website)}
            >
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceName}>
                  {language.code === 'de' ? resource.name.de : resource.name.en}
                </Text>
                {resource.number && (
                  <Text style={styles.resourceNumber}>{resource.number}</Text>
                )}
                <Text style={styles.resourceDescription}>
                  {language.code === 'de' ? resource.description.de : resource.description.en}
                </Text>
              </View>
              <MaterialIcons name="open-in-new" size={20} color="#EC4899" />
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Men's Support Resources */}
        <View style={styles.resourcesSection}>
          <Text style={styles.sectionTitle}>
            {language.code === 'de' ? 'Unterstützung für Männer' : 'Support for Men'}
          </Text>
          
          {content.helpResources.men.map((resource, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.resourceCard}
              onPress={() => handleLinkPress(resource.website)}
            >
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceName}>
                  {language.code === 'de' ? resource.name.de : resource.name.en}
                </Text>
                <Text style={styles.resourceDescription}>
                  {language.code === 'de' ? resource.description.de : resource.description.en}
                </Text>
              </View>
              <MaterialIcons name="open-in-new" size={20} color="#3B82F6" />
            </TouchableOpacity>
          ))}
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
  emergencySection: {
    marginBottom: 24,
  },
  hotlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  hotlineInfo: {
    marginLeft: 12,
  },
  hotlineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  hotlineNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 2,
  },
  hotlineDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
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
  resourcesSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  resourceInfo: {
    flex: 1,
  },
  resourceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  resourceNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  linksSection: {
    marginBottom: 32,
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

export default DomesticViolencePage;