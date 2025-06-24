
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CategoryCard from './CategoryCard';

interface TutorialSlideContentProps {
  currentSlide: number;
  languageCode: string;
  isWideScreen: boolean;
}

const TutorialSlideContent: React.FC<TutorialSlideContentProps> = ({ 
  currentSlide, 
  languageCode, 
  isWideScreen 
}) => {
  const getSlideContent = () => {
    switch (currentSlide) {
      case 0:
        return (
          <View style={styles.slideContent}>
            <View style={styles.centerContent}>
              <MaterialIcons name="info" size={80} color="#3B82F6" />
              <Text style={styles.slideTitle}>
                {languageCode === 'de' ? 'Willkommen zur Plattform!' : 'Welcome to the Platform!'}
              </Text>
              <Text style={styles.slideText}>
                {languageCode === 'de' 
                  ? 'Diese Plattform bietet Ihnen umfassende Unterstützung für Ihr Leben in Österreich. Sie finden hier Informationen zu wichtigen Themen, können Fragen stellen, Deutsch lernen und sich mit der Community vernetzen. Navigieren Sie durch die verschiedenen Bereiche, um die Unterstützung zu finden, die Sie benötigen.'
                  : 'This platform provides comprehensive support for your life in Austria. Here you can find information on important topics, ask questions, learn German, and connect with the community. Navigate through the different sections to find the support you need.'}
              </Text>
            </View>
          </View>
        );
      case 1:
        return (
          <View style={[styles.slideContent, isWideScreen && styles.slideContentWide]}>
            <View style={[styles.tileShowcase, isWideScreen && styles.tileShowcaseWide]}>
              <CategoryCard 
                title={languageCode === 'de' ? 'Fragen' : 'Ask'}
                description={languageCode === 'de' ? 'Stellen Sie Fragen' : 'Ask questions'}
                icon="question-answer"
                color="#3B82F6"
                onPress={() => {}}
              />
            </View>
            <View style={styles.slideInfo}>
              <Text style={styles.slideTitle}>
                {languageCode === 'de' ? 'Fragen Bereich' : 'Ask Section'}
              </Text>
              <Text style={styles.slideText}>
                {languageCode === 'de' 
                  ? 'Hier erhalten Sie Unterstützung in verschiedenen Lebensbereichen: Karriereberatung und Jobsuche, kulturelle Integration und Traditionen, Dokumentenhilfe und Zertifizierungen, Finanzberatung und Bankwesen, Gesundheitswesen und medizinische Versorgung, sowie rechtliche Unterstützung und Beratung. Stellen Sie Ihre Fragen und erhalten Sie kompetente Antworten von Experten.'
                  : 'Here you get support in various life areas: career counseling and job search, cultural integration and traditions, document assistance and certifications, financial advice and banking, healthcare and medical care, as well as legal support and counseling. Ask your questions and receive expert answers from professionals.'}
              </Text>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={[styles.slideContent, isWideScreen && styles.slideContentWide]}>
            <View style={[styles.tileShowcase, isWideScreen && styles.tileShowcaseWide]}>
              <CategoryCard 
                title={languageCode === 'de' ? 'Informationen' : 'Information'}
                description={languageCode === 'de' ? 'Wichtige Informationen' : 'Important information'}
                icon="info"
                color="#10B981"
                onPress={() => {}}
              />
            </View>
            <View style={styles.slideInfo}>
              <Text style={styles.slideTitle}>
                {languageCode === 'de' ? 'Informationen Bereich' : 'Information Section'}
              </Text>
              <Text style={styles.slideText}>
                {languageCode === 'de' 
                  ? 'Umfassende Informationen zu allen wichtigen Lebensbereichen: Gesundheit und medizinische Versorgung, Bildung und Schulwesen, Finanzen und Bankdienstleistungen, Wohnen und Immobilien, Mobilität und Verkehr, Arbeit und Beschäftigung, Kultur und Freizeitaktivitäten, Sicherheit und Notfalldienste, Übersetzungsdienste, ehrenamtliche Tätigkeiten, Fördermöglichkeiten, politische Bildung und Bürgerkunde sowie spezielle Kontakte für verschiedene Anliegen.'
                  : 'Comprehensive information on all important life areas: health and medical care, education and schooling, finances and banking services, housing and real estate, mobility and transportation, work and employment, culture and leisure activities, security and emergency services, translation services, volunteer opportunities, funding possibilities, political education and civics, as well as special contacts for various concerns.'}
              </Text>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={[styles.slideContent, isWideScreen && styles.slideContentWide]}>
            <View style={[styles.tileShowcase, isWideScreen && styles.tileShowcaseWide]}>
              <CategoryCard 
                title={languageCode === 'de' ? 'Lernen' : 'Learn'}
                description={languageCode === 'de' ? 'Lernmaterialien' : 'Learning materials'}
                icon="menu-book"
                color="#8B5CF6"
                onPress={() => {}}
              />
            </View>
            <View style={styles.slideInfo}>
              <Text style={styles.slideTitle}>
                {languageCode === 'de' ? 'Lernen Bereich' : 'Learn Section'}
              </Text>
              <Text style={styles.slideText}>
                {languageCode === 'de' 
                  ? 'Vielfältige Lernmöglichkeiten für Ihre persönliche und berufliche Entwicklung: Deutschkurse für alle Niveaus von A1 bis C2, sowohl online als auch in Präsenz, Integrationskurse und kulturelle Bildung, berufliche Weiterbildung und Qualifizierung, digitale Kompetenzen und Computerkurse, sowie spezielle Programme für verschiedene Zielgruppen. Entdecken Sie passende Kurse und Bildungsangebote für Ihren individuellen Bedarf.'
                  : 'Diverse learning opportunities for your personal and professional development: German courses for all levels from A1 to C2, both online and in-person, integration courses and cultural education, professional development and qualification, digital skills and computer courses, as well as special programs for different target groups. Discover suitable courses and educational offerings for your individual needs.'}
              </Text>
            </View>
          </View>
        );
      case 4:
        return (
          <View style={[styles.slideContent, isWideScreen && styles.slideContentWide]}>
            <View style={[styles.tileShowcase, isWideScreen && styles.tileShowcaseWide]}>
              <CategoryCard 
                title={languageCode === 'de' ? 'Community' : 'Community'}
                description={languageCode === 'de' ? 'Gemeinschaftsressourcen' : 'Community resources'}
                icon="people"
                color="#F97316"
                onPress={() => {}}
              />
            </View>
            <View style={styles.slideInfo}>
              <Text style={styles.slideTitle}>
                {languageCode === 'de' ? 'Community Bereich' : 'Community Section'}
              </Text>
              <Text style={styles.slideText}>
                {languageCode === 'de' 
                  ? 'Vernetzen Sie sich mit anderen und finden Sie lokale Unterstützung: Teilen Sie Ihre Fähigkeiten und helfen Sie anderen in der Community, finden Sie Menschen, die Ihnen bei spezifischen Bedürfnissen helfen können, entdecken Sie lokale Ressourcen und Dienstleistungen auf unserer interaktiven Karte, treten Sie Interessensgruppen bei und knüpfen Sie neue Kontakte. Bauen Sie ein starkes Netzwerk auf und werden Sie Teil der Gemeinschaft.'
                  : 'Connect with others and find local support: Share your skills and help others in the community, find people who can assist you with specific needs, discover local resources and services on our interactive map, join interest groups and make new connections. Build a strong network and become part of the community.'}
              </Text>
            </View>
          </View>
        );
      case 5:
        return (
          <View style={styles.slideContent}>
            <View style={styles.centerContent}>
              <MaterialIcons name="mic" size={80} color="#10B981" />
              <Text style={styles.slideTitle}>
                {languageCode === 'de' ? 'Sprach-Assistent' : 'Voice Assistant'}
              </Text>
              <Text style={styles.slideText}>
                {languageCode === 'de' 
                  ? 'Verwenden Sie das Mikrofon-Symbol oben rechts, um mit dem intelligenten Assistenten zu sprechen. Er kann Ihnen bei der Navigation durch die Plattform helfen, Fragen beantworten und Sie zu den richtigen Ressourcen weiterleiten. Sprechen Sie einfach Ihre Frage aus, und der Assistent wird Ihnen mit personalisierten Antworten und Empfehlungen helfen.'
                  : 'Use the microphone icon in the top right to speak with the intelligent assistant. It can help you navigate through the platform, answer questions, and direct you to the right resources. Simply speak your question, and the assistant will help you with personalized answers and recommendations.'}
              </Text>
            </View>
          </View>
        );
      case 6:
        return (
          <View style={styles.slideContent}>
            <View style={styles.centerContent}>
              <MaterialIcons name="language" size={80} color="#8B5CF6" />
              <Text style={styles.slideTitle}>
                {languageCode === 'de' ? 'Sprache wechseln' : 'Change Language'}
              </Text>
              <Text style={styles.slideText}>
                {languageCode === 'de' 
                  ? 'Verwenden Sie das Sprach-Symbol oben rechts, um zwischen Deutsch und Englisch zu wechseln. Die gesamte Plattform wird in Ihrer bevorzugten Sprache angezeigt, einschließlich aller Informationen, Menüs und Hilfestellungen. Sie können die Sprache jederzeit ändern, um die Inhalte in der für Sie verständlichsten Sprache zu lesen.'
                  : 'Use the language icon in the top right to switch between German and English. The entire platform will be displayed in your preferred language, including all information, menus, and assistance. You can change the language at any time to read the content in the language that is most understandable for you.'}
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return getSlideContent();
};

const styles = StyleSheet.create({
  slideContent: {
    flex: 1,
    padding: 24,
    minHeight: 400,
  },
  slideContentWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 32,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  tileShowcase: {
    alignItems: 'center',
    marginBottom: 24,
  },
  tileShowcaseWide: {
    flex: 0.4,
    marginBottom: 0,
    maxWidth: '40%',
  },
  slideInfo: {
    flex: 0.6,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  slideText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    textAlign: 'center',
  },
});

export default TutorialSlideContent;
