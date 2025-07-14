import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import GenericSupportList from './GenericSupportList';
import coursesData from '../data/courses/german-learning-courses.json';
import { getGlobalText } from '../utils/languageUtils';

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
  supportTypes?: string[];
  urgency: string;
  category: string;
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
}

interface GermanLearningListProps {
  filters: Record<string, string>;
  languageCode: string;
  onResetFilters: () => void;
  getTranslation: (key: string, lang: string) => string;
}

const GermanLearningList: React.FC<GermanLearningListProps> = ({
  filters,
  languageCode,
  onResetFilters,
  getTranslation
}) => {
  const [convertedCourses, setConvertedCourses] = useState<GermanCourse[]>([]);

  useEffect(() => {
    // Convert course data to match GenericSupportList interface
    const converted: GermanCourse[] = Object.values(coursesData).map((course: any) => {
      const supportTypes: string[] = [];
      
      // Map course type to support types
      if (course.courseDetails?.type === 'course' || !course.isResource) {
        supportTypes.push('course');
      }
      if (course.isResource) {
        supportTypes.push('resource');
      }
      if (course.courseDetails?.type === 'exam') {
        supportTypes.push('exam');
      }

      // Add level as support type
      if (course.courseDetails?.level) {
        const levels = course.courseDetails.level.includes('-') 
          ? course.courseDetails.level.split('-').map((l: string) => l.trim())
          : [course.courseDetails.level];
        supportTypes.push(...levels);
      }

      // Add additional tags
      if (course.forWomen) supportTypes.push('forWomen');
      if (course.forYoungMigrants) supportTypes.push('forYoungMigrants');
      if (course.childcare) supportTypes.push('childcare');
      if (course.tags?.includes('Integration')) supportTypes.push('integrationRequirement');
      if (course.courseDetails?.location === 'Online' || course.online) supportTypes.push('onlineOnly');

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        type: course.isResource ? 'resource' : (course.courseDetails?.type === 'exam' ? 'exam' : 'course'),
        level: course.courseDetails?.level?.includes('-') 
          ? course.courseDetails.level.split('-').map((l: string) => l.trim())
          : [course.courseDetails?.level || 'A1'],
        location: course.courseDetails?.location || 'Online',
        price: course.courseDetails?.price || 'Free',
        online: course.courseDetails?.location === 'Online' || course.online || false,
        duration: course.courseDetails?.duration,
        provider: course.provider,
        forWomen: course.forWomen || false,
        forYoungMigrants: course.forYoungMigrants || false,
        childcare: course.childcare || false,
        integrationRequirement: course.tags?.includes('Integration') || false,
        supportTypes,
        urgency: 'nonUrgent', // German learning is typically non-urgent
        category: course.isResource ? 'resource' : 'course',
        contact: {
          phone: course.contact?.phone || '',
          email: course.contact?.email || '',
          website: course.contact?.website || '',
          address: course.address || course.courseDetails?.location || ''
        }
      };
    });

    setConvertedCourses(converted);
  }, []);

  const categoryConfig = {
    course: {
      icon: 'school',
      color: '#3B82F6'
    },
    resource: {
      icon: 'library-books',
      color: '#10B981'
    },
    exam: {
      icon: 'assignment',
      color: '#F59E0B'
    }
  };

  return (
    <GenericSupportList
      entities={convertedCourses}
      filters={filters}
      languageCode={languageCode}
      onResetFilters={onResetFilters}
      getTranslation={(key: string, lang: string) => getTranslation(`courseTypes.${key}`, lang) || key}
      routePrefix="/information/german-learning-pages"
      categoryConfig={categoryConfig}
      noResultsText={getTranslation('filters.noResults', languageCode)}
      resetFiltersText={getTranslation('filters.resetFilters', languageCode)}
      resultsFoundText={getTranslation('filters.resultsFound', languageCode)}
    />
  );
};

export default GermanLearningList;