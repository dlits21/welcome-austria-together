import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import GenericSupportList from './GenericSupportList';
import coursesData from '../data/courses/german-learning-courses.json';
import { getGlobalText, getInformationGermanLearningText } from '../utils/languageUtils';

interface GermanCourse {
  id: string;
  title: { en: string; de: string };
  type: 'course' | 'resource' | 'exam';
  level: string[];
  location?: string;
  price: string | number;
  online: boolean;
  duration?: string;
  description: any;
  subtitle: any;
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
}

const GermanLearningList: React.FC<GermanLearningListProps> = ({
  filters,
  languageCode,
  onResetFilters,
}) => {
  const [convertedCourses, setConvertedCourses] = useState<GermanCourse[]>([]);

  useEffect(() => {
    // Convert course data to match GenericSupportList interface
    const converted: GermanCourse[] = Object.values(coursesData).map((course: any) => {
      const supportTypes: string[] = [];
      
      // Map course type to support types
      if (course.courseDetails?.type === 'course') {
        supportTypes.push('courseTypes.course');
      }
      if (course.courseDetails?.type === 'resource') {
        supportTypes.push('courseTypes.resource');
      }
      if (course.courseDetails?.type === 'exam') {
        supportTypes.push('courseTypes.exam');
      }

      // Add level as support type
      //if (course.courseDetails?.level) {
      //  const levels = course.courseDetails.level.includes('-')
      //    ? course.courseDetails.level.split('-').map((l: string) => l.trim())
      //    : [course.courseDetails.level];
      //  supportTypes.push(...levels);
      //}

      // Add additional tags
      if (course.forWomen) supportTypes.push('additionalFilters.forWomen');
      if (course.forYoungMigrants) supportTypes.push('additionalFilters.forYoungMigrants');
      if (course.childcare) supportTypes.push('additionalFilters.childcare');
      if (course.tags?.includes('Integration')) supportTypes.push('additionalFilters.integrationRequirement');
      if (course.courseDetails?.location === 'Online' || course.online) supportTypes.push('additionalFilters.onlineOnly');

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        subtitle: course.subtitle,
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
        category: course.isResource ? 'resource' : (course.courseDetails?.type === 'exam' ? 'exam' : 'course'),
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
      getTranslation={getInformationGermanLearningText}
      routePrefix="/information/german-learning-pages"
      categoryConfig={categoryConfig}
      noResultsText={getInformationGermanLearningText('filters.noResults', languageCode)}
      resetFiltersText={getGlobalText('resetFilters', languageCode)}
      resultsFoundText={getGlobalText('resultsFound', languageCode)}
      isGermanLearning={true}
    />
  );
};

export default GermanLearningList;