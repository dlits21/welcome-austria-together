import React from 'react';
import GenericGermanCoursePage from '../../../components/GenericGermanCoursePage';
import coursesData from '../../../data/courses/german-learning-courses.json';

const AMSIntegrationCourse: React.FC = () => {
  const courseData = coursesData.ams_integration;

  return <GenericGermanCoursePage courseData={courseData} />;
};

export default AMSIntegrationCourse;