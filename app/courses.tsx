
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, getMainCategories } from '../data/language/common';
import PageNavigation from '../components/PageNavigation';
import LanguageModal from '../components/LanguageModal';
import HelpModal from '../components/HelpModal';

interface Course {
  id: string;
  title: {
    en: string;
    de: string;
  };
  type: 'course' | 'resource' | 'exam';
  level?: 'beginner' | 'intermediate' | 'advanced';
  location?: string;
  price?: number;
  online: boolean;
  duration?: string;
  description: {
    en: string;
    de: string;
  };
  tags: string[];
  provider: string;
}

const courseData: Course[] = [
  {
    id: 'german-a1',
    title: {
      en: 'German A1 Course',
      de: 'Deutschkurs A1'
    },
    type: 'course',
    level: 'beginner',
    location: 'Vienna',
    price: 200,
    online: false,
    duration: '8 weeks',
    description: {
      en: 'Foundation German language course for beginners',
      de: 'Grundlegender Deutschkurs für Anfänger'
    },
    tags: ['language', 'german', 'beginner'],
    provider: 'VHS Vienna'
  },
  {
    id: 'german-b1',
    title: {
      en: 'German B1 Course',
      de: 'Deutschkurs B1'
    },
    type: 'course',
    level: 'intermediate',
    location: 'Vienna',
    price: 250,
    online: false,
    duration: '10 weeks',
    description: {
      en: 'Intermediate German language course',
      de: 'Mittlerer Deutschkurs'
    },
    tags: ['language', 'german', 'intermediate'],
    provider: 'VHS Vienna'
  },
  {
    id: 'job-search',
    title: {
      en: 'Job Search Workshop',
      de: 'Workshop zur Arbeitssuche'
    },
    type: 'course',
    location: 'Graz',
    price: 0,
    online: false,
    duration: '2 days',
    description: {
      en: 'Learn how to search and apply for jobs in Austria',
      de: 'Erfahren Sie, wie Sie in Österreich nach Jobs suchen und sich bewerben können'
    },
    tags: ['employment', 'career', 'workshop'],
    provider: 'AMS Austria'
  },
  {
    id: 'german-practice',
    title: {
      en: 'German Practice Resources',
      de: 'Deutsche Übungsmaterialien'
    },
    type: 'resource',
    level: 'beginner',
    online: true,
    description: {
      en: 'Online resources to practice your German language skills',
      de: 'Online-Ressourcen zum Üben Ihrer Deutschkenntnisse'
    },
    tags: ['language', 'german', 'self-study', 'online'],
    provider: 'Integration Fund'
  },
  {
    id: 'integration-exam',
    title: {
      en: 'Integration Exam',
      de: 'Integrationsprüfung'
    },
    type: 'exam',
    location: 'Multiple Locations',
    price: 150,
    online: false,
    description: {
      en: 'Official integration exam required for residency',
      de: 'Offizielle Integrationsprüfung, die für den Aufenthalt erforderlich ist'
    },
    tags: ['exam', 'official', 'integration'],
    provider: 'ÖIF'
  },
  {
    id: 'computer-skills',
    title: {
      en: 'Basic Computer Skills',
      de: 'Grundlegende Computerkenntnisse'
    },
    type: 'course',
    level: 'beginner',
    location: 'Salzburg',
    price: 100,
    online: false,
    duration: '4 weeks',
    description: {
      en: 'Learn essential computer skills for the workplace',
      de: 'Erlernen Sie wichtige Computerkenntnisse für den Arbeitsplatz'
    },
    tags: ['technology', 'skills', 'computer'],
    provider: 'Digital Campus'
  },
];

const Courses: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [searchInput, setSearchInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courseData);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Filter states
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [onlineOnly, setOnlineOnly] = useState<boolean>(false);
  const [freeOnly, setFreeOnly] = useState<boolean>(false);
  
  const router = useRouter();
  const language = languages.find(lang => lang.code === currentLanguage) || languages[1];

  // Extract all unique locations from course data
  const locations = Array.from(new Set(courseData
    .filter(course => course.location)
    .map(course => course.location as string)));

  // Apply filters whenever they change
  useEffect(() => {
    let results = courseData;
    
    // Apply search filter
    if (searchInput.trim()) {
      const searchTerm = searchInput.toLowerCase();
      results = results.filter(course => 
        course.title[language.code === 'de' ? 'de' : 'en'].toLowerCase().includes(searchTerm) ||
        course.description[language.code === 'de' ? 'de' : 'en'].toLowerCase().includes(searchTerm) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // Apply tab filter
    if (activeTab !== 'all') {
      results = results.filter(course => {
        if (activeTab === 'courses') return course.type === 'course';
        if (activeTab === 'resources') return course.type === 'resource';
        if (activeTab === 'exams') return course.type === 'exam';
        return true;
      });
    }
    
    // Apply level filter
    if (selectedLevels.length > 0) {
      results = results.filter(course => 
        course.level ? selectedLevels.includes(course.level) : false
      );
    }
    
    // Apply location filter
    if (selectedLocations.length > 0) {
      results = results.filter(course => 
        course.location ? selectedLocations.includes(course.location) : false
      );
    }
    
    // Apply online filter
    if (onlineOnly) {
      results = results.filter(course => course.online);
    }
    
    // Apply price filter
    if (freeOnly) {
      results = results.filter(course => course.price === 0);
    }
    
    setFilteredCourses(results);
  }, [searchInput, activeTab, selectedLevels, selectedLocations, onlineOnly, freeOnly, language.code]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };
  
  const clearFilters = () => {
    setSelectedLevels([]);
    setSelectedLocations([]);
    setOnlineOnly(false);
    setFreeOnly(false);
  };

  const handleSearch = () => {
    // Search is automatically handled by the useEffect
  };

  // Tab buttons for filtering by course type
  const renderTabButtons = () => {
    const tabs = [
      { id: 'all', en: 'All', de: 'Alle' },
      { id: 'courses', en: 'Courses', de: 'Kurse' },
      { id: 'resources', en: 'Resources', de: 'Ressourcen' },
      { id: 'exams', en: 'Exams', de: 'Prüfungen' }
    ];

    return (
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activeTab === tab.id && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[
              styles.tabButtonText,
              activeTab === tab.id && styles.activeTabText
            ]}>
              {language.code === 'de' ? tab.de : tab.en}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Render a filter modal
  const renderFilterModal = () => {
    return (
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {language.code === 'de' ? 'Filter' : 'Filters'}
              </Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.filterScrollView}>
              {/* Level filters */}
              <Text style={styles.filterSectionTitle}>
                {language.code === 'de' ? 'Niveau' : 'Level'}
              </Text>
              {['beginner', 'intermediate', 'advanced'].map(level => (
                <TouchableOpacity 
                  key={level}
                  style={styles.checkboxRow} 
                  onPress={() => toggleLevel(level)}
                >
                  <View style={[
                    styles.checkbox,
                    selectedLevels.includes(level) && styles.checkboxChecked
                  ]}>
                    {selectedLevels.includes(level) && (
                      <MaterialIcons name="check" size={16} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    {level === 'beginner' && (language.code === 'de' ? 'Anfänger' : 'Beginner')}
                    {level === 'intermediate' && (language.code === 'de' ? 'Mittelstufe' : 'Intermediate')}
                    {level === 'advanced' && (language.code === 'de' ? 'Fortgeschritten' : 'Advanced')}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* Location filters */}
              <Text style={styles.filterSectionTitle}>
                {language.code === 'de' ? 'Standort' : 'Location'}
              </Text>
              {locations.map(location => (
                <TouchableOpacity 
                  key={location}
                  style={styles.checkboxRow} 
                  onPress={() => toggleLocation(location)}
                >
                  <View style={[
                    styles.checkbox,
                    selectedLocations.includes(location) && styles.checkboxChecked
                  ]}>
                    {selectedLocations.includes(location) && (
                      <MaterialIcons name="check" size={16} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>{location}</Text>
                </TouchableOpacity>
              ))}

              {/* Format filter */}
              <Text style={styles.filterSectionTitle}>
                {language.code === 'de' ? 'Format' : 'Format'}
              </Text>
              <TouchableOpacity 
                style={styles.checkboxRow} 
                onPress={() => setOnlineOnly(!onlineOnly)}
              >
                <View style={[
                  styles.checkbox,
                  onlineOnly && styles.checkboxChecked
                ]}>
                  {onlineOnly && (
                    <MaterialIcons name="check" size={16} color="#fff" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>
                  {language.code === 'de' ? 'Nur online' : 'Online only'}
                </Text>
              </TouchableOpacity>

              {/* Price filter */}
              <Text style={styles.filterSectionTitle}>
                {language.code === 'de' ? 'Preis' : 'Price'}
              </Text>
              <TouchableOpacity 
                style={styles.checkboxRow} 
                onPress={() => setFreeOnly(!freeOnly)}
              >
                <View style={[
                  styles.checkbox,
                  freeOnly && styles.checkboxChecked
                ]}>
                  {freeOnly && (
                    <MaterialIcons name="check" size={16} color="#fff" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>
                  {language.code === 'de' ? 'Nur kostenlos' : 'Free only'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={clearFilters}
              >
                <Text style={styles.clearButtonText}>
                  {language.code === 'de' ? 'Filter zurücksetzen' : 'Clear Filters'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => setShowFilterModal(false)}
              >
                <Text style={styles.applyButtonText}>
                  {language.code === 'de' ? 'Anwenden' : 'Apply'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderCourseItem = ({ item }: { item: Course }) => {
    const getBadgeColor = (type: string) => {
      switch(type) {
        case 'course': return '#3B82F6';
        case 'resource': return '#10B981';
        case 'exam': return '#F97316';
        default: return '#6B7280';
      }
    };
    
    return (
      <TouchableOpacity 
        style={styles.courseCard}
        onPress={() => console.log(`Selected course: ${item.id}`)}
      >
        <View style={styles.courseHeader}>
          <View>
            <Text style={styles.courseTitle}>
              {language.code === 'de' ? item.title.de : item.title.en}
            </Text>
            <Text style={styles.courseProvider}>{item.provider}</Text>
          </View>
          
          <View style={[
            styles.typeBadge, 
            { backgroundColor: getBadgeColor(item.type) }
          ]}>
            <Text style={styles.typeBadgeText}>
              {item.type === 'course' && (language.code === 'de' ? 'Kurs' : 'Course')}
              {item.type === 'resource' && (language.code === 'de' ? 'Ressource' : 'Resource')}
              {item.type === 'exam' && (language.code === 'de' ? 'Prüfung' : 'Exam')}
            </Text>
          </View>
        </View>
        
        <Text style={styles.courseDescription}>
          {language.code === 'de' ? item.description.de : item.description.en}
        </Text>
        
        <View style={styles.tagsContainer}>
          {item.level && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {item.level === 'beginner' && (language.code === 'de' ? 'Anfänger' : 'Beginner')}
                {item.level === 'intermediate' && (language.code === 'de' ? 'Mittelstufe' : 'Intermediate')}
                {item.level === 'advanced' && (language.code === 'de' ? 'Fortgeschritten' : 'Advanced')}
              </Text>
            </View>
          )}
          
          {item.location && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{item.location}</Text>
            </View>
          )}
          
          {item.online && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {language.code === 'de' ? 'Online' : 'Online'}
              </Text>
            </View>
          )}
          
          {item.price !== undefined && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>
                {item.price === 0 
                  ? (language.code === 'de' ? 'Kostenlos' : 'Free') 
                  : `€${item.price}`}
              </Text>
            </View>
          )}
          
          {item.duration && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{item.duration}</Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>
            {language.code === 'de' ? 'Details ansehen' : 'View Details'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageNavigation 
        toggleSound={toggleSound}
        soundEnabled={soundEnabled}
        showLanguageModal={() => setShowLanguageModal(true)}
        showHelpModal={() => setShowHelpModal(true)}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{getMainCategories(language.code, 'learn')}</Text>
        
        {/* Search and Filter Bar */}
        <View style={styles.searchFilterContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder={language.code === 'de' ? 'Was möchtest du lernen?' : 'What would you like to learn?'}
              placeholderTextColor="#999"
              value={searchInput}
              onChangeText={setSearchInput}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <MaterialIcons name="search" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <MaterialIcons name="filter-list" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        
        {/* Tab Buttons */}
        {renderTabButtons()}
        
        {/* Course List */}
        {filteredCourses.length > 0 ? (
          <FlatList
            data={filteredCourses}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.courseList}
          />
        ) : (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>
              {language.code === 'de' 
                ? 'Keine Ergebnisse gefunden. Bitte versuchen Sie es mit anderen Filtereinstellungen.' 
                : 'No results found. Please try with different filter settings.'}
            </Text>
          </View>
        )}
      </View>
      
      {/* Filter Modal */}
      {renderFilterModal()}
      
      {/* Language Modal */}
      <LanguageModal 
        visible={showLanguageModal} 
        onClose={() => setShowLanguageModal(false)} 
        languageCode={language.code}
      />
      
      {/* Help Modal */}
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
    marginBottom: 20,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  tabButtonText: {
    fontSize: 14,
    color: '#64748b',
  },
  activeTabText: {
    color: '#0f172a',
    fontWeight: '600',
  },
  courseList: {
    paddingBottom: 20,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  courseProvider: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  typeBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  courseDescription: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 12,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tagText: {
    fontSize: 12,
    color: '#64748b',
  },
  detailsButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterScrollView: {
    padding: 16,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#0f172a',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#334155',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    marginRight: 8,
  },
  clearButtonText: {
    color: '#64748b',
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Courses;
