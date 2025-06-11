
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import GenericGermanCoursePage from '../../components/GenericGermanCoursePage';
import coursesData from '../../data/courses/german-learning-courses.json';

const GermanLearningPage: React.FC = () => {
  const { courseId } = useLocalSearchParams();
  
  // Get the course ID from params, or default to the first course
  const selectedCourseId = Array.isArray(courseId) ? courseId[0] : courseId || 'ams_integration';
  
  // Get the course data from JSON
  const courseData = coursesData[selectedCourseId as keyof typeof coursesData];
  
  // If no course data found, show error or fallback
  if (!courseData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <p className="text-gray-600">The requested course could not be found.</p>
        </div>
      </div>
    );
  }

  return <GenericGermanCoursePage courseData={courseData} />;
};

export default GermanLearningPage;
