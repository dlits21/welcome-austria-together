import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { getTab, getNiveaus } from '../data/languages/learn';

interface GermanCourse {
  id: string;
  title: { en: string; de: string };
  type: 'course' | 'resource' | 'exam';
  level: string[];
  location?: string;
  price: string | number;
  online: boolean;
  duration?: string;
  description: { en: string; de: string };
  provider: string;
  forWomen?: boolean;
  forYoungMigrants?: boolean;
  childcare?: boolean;
  integrationRequirement?: boolean;
}

interface CourseListProps {
  courses: GermanCourse[];
  languageCode: string;
}

const CourseList: React.FC<CourseListProps> = ({ courses, languageCode }) => {
  const router = useRouter();

  const handleCoursePress = (courseId: string) => {
    router.push(`/information/german-learning-pages/${courseId}`);
  };

  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'course': return '#3B82F6';
      case 'resource': return '#10B981';
      case 'exam': return '#F97316';
      default: return '#6B7280';
    }
  };

  const renderCourseItem = ({ item }: { item: GermanCourse }) => (
    <TouchableOpacity 
      style={styles.courseCard}
      onPress={() => handleCoursePress(item.id)}
    >
      <View style={styles.courseHeader}>
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>
            {languageCode === 'de' ? item.title.de : item.title.en}
          </Text>
          <Text style={styles.courseProvider}>{item.provider}</Text>
        </View>
        
        <View style={[styles.typeBadge, { backgroundColor: getBadgeColor(item.type) }]}>
          <Text style={styles.typeBadgeText}>
            {getTab(item.type === 'course' ? 'courses' : item.type === 'resource' ? 'resources' : 'exams', languageCode)}
          </Text>
        </View>
      </View>
      
      <View style={styles.tagsContainer}>
        {/* Level tags - show individual boxes for each level */}
        {item.level && item.level.length > 0 && (
          <View style={styles.levelContainer}>
            {item.level.map((level, index) => (
              <View key={index} style={styles.levelTag}>
                <Text style={styles.levelTagText}>{level}</Text>
              </View>
            ))}
          </View>
        )}
        
        {/* Location tag - show "Online" if online is true, otherwise show actual location */}
        {(item.online || item.location) && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {item.online ? 'Online' : item.location}
            </Text>
          </View>
        )}
        
        {/* Price tag */}
        <View style={styles.tag}>
          <Text style={styles.tagText}>
            {typeof item.price === 'string' 
              ? item.price 
              : `€${item.price}`}
          </Text>
        </View>
        
        {/* Duration tag */}
        {item.duration && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.duration}</Text>
          </View>
        )}

        {/* Additional tags */}
        {item.forWomen && (
          <View style={[styles.tag, styles.specialTag]}>
            <Text style={[styles.tagText, styles.specialTagText]}>
              {languageCode === 'de' ? 'Für Frauen' : 'For women'}
            </Text>
          </View>
        )}

        {item.forYoungMigrants && (
          <View style={[styles.tag, styles.specialTag]}>
            <Text style={[styles.tagText, styles.specialTagText]}>
              {languageCode === 'de' ? 'Für junge Migrant:innen' : 'For young migrants'}
            </Text>
          </View>
        )}

        {item.childcare && (
          <View style={[styles.tag, styles.featureTag]}>
            <Text style={[styles.tagText, styles.featureTagText]}>
              {languageCode === 'de' ? 'Kinderbetreuung' : 'Childcare'}
            </Text>
          </View>
        )}

        {item.integrationRequirement && (
          <View style={[styles.tag, styles.integrationTag]}>
            <Text style={[styles.tagText, styles.integrationTagText]}>
              {languageCode === 'de' ? 'Erfüllt Integrationsanforderung' : 'Fulfills integration requirement'}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (courses.length === 0) {
    return (
      <View style={styles.noResults}>
        <Text style={styles.noResultsText}>
          {languageCode === 'de' 
            ? 'Keine Ergebnisse gefunden.' 
            : 'No results found.'}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={courses}
      renderItem={renderCourseItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.courseList}
    />
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 16,
  },
  courseInfo: {
    flex: 1,
    marginRight: 12,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    minWidth: 70,
    alignItems: 'center',
  },
  typeBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  levelContainer: {
    flexDirection: 'row',
    marginRight: 8,
    marginBottom: 8,
  },
  levelTag: {
    backgroundColor: '#e0f2fe',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 4,
    borderWidth: 1,
    borderColor: '#0284c7',
  },
  levelTagText: {
    fontSize: 11,
    color: '#0284c7',
    fontWeight: '600',
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
  specialTag: {
    backgroundColor: '#fdf2f8',
    borderColor: '#ec4899',
  },
  specialTagText: {
    color: '#ec4899',
    fontWeight: '500',
  },
  featureTag: {
    backgroundColor: '#f0fdf4',
    borderColor: '#22c55e',
  },
  featureTagText: {
    color: '#22c55e',
    fontWeight: '500',
  },
  integrationTag: {
    backgroundColor: '#fefce8',
    borderColor: '#eab308',
  },
  integrationTagText: {
    color: '#eab308',
    fontWeight: '500',
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
});

export default CourseList;
