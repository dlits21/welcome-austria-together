import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import GenericGermanCoursePage from '../../../components/GenericGermanCoursePage';
import coursesData from '../../../data/courses/legal-support-entities.json';

const DynamicCoursePage: React.FC = () => {
  const { courseId } = useLocalSearchParams();
  const selectedCourseId = Array.isArray(courseId) ? courseId[0] : courseId;

  if (!selectedCourseId) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Invalid course</Text>
        <Text style={styles.subtitle}>No course ID provided.</Text>
      </View>
    );
  }

  const courseData = coursesData[selectedCourseId as keyof typeof coursesData];

  if (!courseData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Course not found</Text>
        <Text style={styles.subtitle}>
          The course "{selectedCourseId}" could not be found.
        </Text>
      </View>
    );
  }

  return <GenericGermanCoursePage courseData={courseData} />;
};

export default DynamicCoursePage;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
