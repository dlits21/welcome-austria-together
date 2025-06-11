
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import GenericGermanCoursePage from '../../../components/GenericGermanCoursePage';
import coursesData from '../../../data/courses/german-learning-courses.json';

const DynamicCoursePage: React.FC = () => {
  const { courseId } = useLocalSearchParams();
  
  const selectedCourseId = Array.isArray(courseId) ? courseId[0] : courseId;
  
  if (!selectedCourseId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid course</h1>
          <p className="text-gray-600">No course ID provided.</p>
        </div>
      </div>
    );
  }
  
  const courseData = coursesData[selectedCourseId as keyof typeof coursesData];
  
  if (!courseData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <p className="text-gray-600">The course "{selectedCourseId}" could not be found.</p>
        </div>
      </div>
    );
  }

  return <GenericGermanCoursePage courseData={courseData} />;
};

export default DynamicCoursePage;
