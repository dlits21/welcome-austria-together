import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../../contexts/LanguageContext';
import PageNavigation from '../../../components/PageNavigation';
import LanguageModal from '../../../components/LanguageModal';
import HelpModal from '../../../components/HelpModal';
import HighlightedText from '../../../components/HighlightedText';
import { languages } from '../../../data/language/common';

const WomensEmploymentPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const router = useRouter();
  
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

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
        showBackButton={true}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <MaterialIcons name="work" size={40} color="#E91E63" />
          <Text style={styles.title}>Women's Employment Rights</Text>
          <Text style={styles.subtitle}>Your path to economic independence and empowerment</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Rights at Work</Text>
          <HighlightedText definitions={definitions} language={currentLanguage}>
            As a woman in Austria, you have strong legal protection at work. **Anti-discrimination laws** ensure you cannot be treated unfairly because of your gender, and you have the right to **equal pay** and safe working conditions.
          </HighlightedText>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Employment Rights</Text>
          
          <View style={styles.rightItem}>
            <Text style={styles.rightTitle}>Equal Pay and Opportunities</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              You have the right to **equal pay** for equal work. Employers cannot pay you less because you are a woman. You also have equal rights to promotions, training, and career advancement.
            </HighlightedText>
          </View>

          <View style={styles.rightItem}>
            <Text style={styles.rightTitle}>Safe Working Environment</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              You have the right to work in an environment free from **workplace harassment**, including sexual harassment, discrimination, and bullying. Employers must provide a safe workplace.
            </HighlightedText>
          </View>

          <View style={styles.rightItem}>
            <Text style={styles.rightTitle}>Maternity and Family Rights</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              You have the right to **maternity leave** (8 weeks before and after birth), job protection during pregnancy, and the right to breastfeeding breaks at work.
            </HighlightedText>
          </View>

          <View style={styles.rightItem}>
            <Text style={styles.rightTitle}>Working Time and Rest</Text>
            <Text style={styles.rightText}>
              You have the right to reasonable working hours, breaks, vacation time, and overtime pay. Night work and dangerous work have special protections for pregnant women.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Finding Work</Text>
          
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>1.</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Check Your Work Authorization</Text>
              <HighlightedText definitions={definitions} language={currentLanguage}>
                Make sure you have the right to work in Austria. EU citizens can work freely, while others may need a **work permit**. Asylum seekers can work after 3 months with permission.
              </HighlightedText>
            </View>
          </View>

          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>2.</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Prepare Your Application</Text>
              <Text style={styles.stepText}>
                Create a CV (Lebenslauf) and cover letter (Bewerbungsschreiben). Many employment centers offer free help with applications in multiple languages.
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>3.</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Search for Jobs</Text>
              <Text style={styles.stepText}>
                Use the AMS (Public Employment Service), online job portals, and networking. Don't let anyone discourage you from applying for jobs because of your gender or background.
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>4.</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Know Your Worth</Text>
              <Text style={styles.stepText}>
                Research typical salaries for your role and negotiate confidently. You deserve fair compensation for your skills and experience.
              </Text>
            </View>
          </div>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills Development and Training</Text>
          
          <View style={styles.trainingItem}>
            <Text style={styles.trainingTitle}>Vocational Training Programs</Text>
            <HighlightedText definitions={definitions} language={currentLanguage}>
              **Vocational training** programs are available in many fields, from healthcare to technology. Many programs offer special support for women entering male-dominated fields.
            </HighlightedText>
          </View>

          <View style={styles.trainingItem}>
            <Text style={styles.trainingTitle}>Language Skills</Text>
            <Text style={styles.trainingText}>
              German language skills open more job opportunities. Many training programs combine language learning with job skills training.
            </Text>
          </View>

          <View style={styles.trainingItem}>
            <Text style={styles.trainingTitle}>Digital Skills</Text>
            <Text style={styles.trainingText}>
              Computer and digital skills are increasingly important. Free courses are available to help you learn these skills at your own pace.
            </Text>
          </View>

          <View style={styles.trainingItem}>
            <Text style={styles.trainingTitle}>Entrepreneurship Support</Text>
            <Text style={styles.trainingText}>
              If you want to start your own business, special programs support women entrepreneurs with training, mentoring, and sometimes funding.
            </Text>
          </div>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workplace Challenges and Solutions</Text>
          
          <View style={styles.challengeItem}>
            <Text style={styles.challengeTitle}>What to Do if You Face Discrimination</Text>
            <Text style={styles.challengeText}>
              • Document incidents (dates, witnesses, evidence)
              • Talk to HR or your supervisor
              • Contact the Equal Treatment Ombudsperson
              • Seek support from women's organizations
            </Text>
          </View>

          <View style={styles.challengeItem}>
            <Text style={styles.challengeTitle}>Balancing Work and Family</Text>
            <Text style={styles.challengeText}>
              • Use flexible working arrangements when available
              • Access childcare support and family benefits
              • Connect with other working mothers for support
              • Know your rights to parental leave and part-time work
            </Text>
          </View>

          <View style={styles.challengeItem}>
            <Text style={styles.challengeTitle}>Building Confidence</Text>
            <Text style={styles.challengeText}>
              • Join professional networks and women's groups
              • Seek mentorship opportunities
              • Attend workshops and training sessions
              • Celebrate your achievements and progress
            </Text>
          </div>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support Organizations</Text>
          
          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.ams.at/')}>
            <MaterialIcons name="work" size={20} color="#E91E63" />
            <Text style={styles.linkText}>AMS - Public Employment Service (job search, training, benefits)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.gleichbehandlungsanwaltschaft.gv.at/')}>
            <MaterialIcons name="balance" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Equal Treatment Ombudsperson (discrimination support)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.abz-austria.at/')}>
            <MaterialIcons name="school" size={20} color="#E91E63" />
            <Text style={styles.linkText}>ABZ Austria - Career training for women</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.frau-und-arbeit.at/')}>
            <MaterialIcons name="support" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Women and Work - Employment counseling</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.orientexpress-wien.com/')}>
            <MaterialIcons name="translate" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Orient Express - Job support for migrant women</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.sprungbrett.or.at/')}>
            <MaterialIcons name="trending-up" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Sprungbrett - Girls and technology careers</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.salarySection}>
          <Text style={styles.salaryTitle}>Know Your Rights: Salary Information</Text>
          <HighlightedText definitions={definitions} language={currentLanguage}>
            Austria has strong **collective bargaining** agreements that set minimum wages for most industries. You can find salary information for your profession online to ensure you're paid fairly.
          </HighlightedText>
          
          <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.gehaltskompass.at/')}>
            <MaterialIcons name="info" size={20} color="#E91E63" />
            <Text style={styles.linkText}>Salary Compass - Check fair wages for your profession</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.motivationSection}>
          <MaterialIcons name="star" size={24} color="#E91E63" />
          <Text style={styles.motivationText}>
            You have the skills, strength, and right to pursue any career you choose. Economic independence gives you freedom and security. Don't let anyone tell you what you can or cannot achieve.
          </Text>
        </View>

        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>Support Contacts</Text>
          <Text style={styles.emergencyText}>
            <Text style={styles.bold}>Equal Treatment Hotline:</Text> +43 1 532 46 88
          </Text>
          <Text style={styles.emergencyText}>
            <Text style={styles.bold}>AMS Service Line:</Text> 0810 600 672
          </Text>
          <Text style={styles.emergencyText}>
            <Text style={styles.bold}>Women's Helpline:</Text> 0800 222 555
          </Text>
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