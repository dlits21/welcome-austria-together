
import React from 'react';
import GenericGermanCoursePage from '../../../components/GenericGermanCoursePage';
import coursesData from '../../../data/courses/german-learning-courses.json';

const GermanLearningIndexPage: React.FC = () => {
  // Default to showing the AMS integration course
  const defaultCourseData = coursesData.ams_integration;

  return <GenericGermanCoursePage courseData={defaultCourseData} />;
};

export default GermanLearningIndexPage;
