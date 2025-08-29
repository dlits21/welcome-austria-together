import React from 'react';
import InformationPageTemplate from '../../components/InformationPageTemplate';

const PROMINENT_TOPICS = [
  {
    key: 'qualification-recognition',
    icon: 'verified',
    color: '#DC2626',
    route: '/information/education/qualification-recognition'
  },
  {
    key: 'school-enrollment',
    icon: 'school',
    color: '#059669',
    route: '/information/education/school-enrollment'
  },
  {
    key: 'language-integration',
    icon: 'translate',
    color: '#2563EB',
    route: '/information/education/language-integration'
  },
  {
    key: 'school-types',
    icon: 'domain',
    color: '#0891B2',
    route: '/information/education/school-types'
  },
  {
    key: 'special-education',
    icon: 'accessibility',
    color: '#7C3AED',
    route: '/information/education/special-education'
  }
];

const SECONDARY_TOPICS = [
  {
    key: 'childcare-early-education',
    icon: 'child-care',
    color: '#EC4899',
    route: '/information/education/childcare-early-education'
  },
  {
    key: 'school-costs',
    icon: 'account-balance-wallet',
    color: '#DB2777',
    route: '/information/education/school-costs'
  },
  {
    key: 'homework-support',
    icon: 'menu-book',
    color: '#059669',
    route: '/information/education/homework-support'
  },
  {
    key: 'behavior-safety',
    icon: 'shield',
    color: '#CA8A04',
    route: '/information/education/behavior-safety'
  },
  {
    key: 'parent-engagement',
    icon: 'supervisor-account',
    color: '#16A34A',
    route: '/information/education/parent-engagement'
  },
  {
    key: 'exams-certificates',
    icon: 'workspace-premium',
    color: '#2563EB',
    route: '/information/education/exams-certificates'
  },
  {
    key: 'school-calendar',
    icon: 'event',
    color: '#EA580C',
    route: '/information/education/school-calendar'
  },
  {
    key: 'mental-health-counselling',
    icon: 'psychology',
    color: '#7C3AED',
    route: '/information/education/mental-health-counselling'
  },
  {
    key: 'transport-routes',
    icon: 'directions-bus',
    color: '#DC2626',
    route: '/information/education/transport-routes'
  },
  {
    key: 'digital-access',
    icon: 'computer',
    color: '#059669',
    route: '/information/education/digital-access'
  },
  {
    key: 'scholarships-support',
    icon: 'emoji-events',
    color: '#CA8A04',
    route: '/information/education/scholarships-support'
  },
  {
    key: 'legal-rights',
    icon: 'gavel',
    color: '#DC2626',
    route: '/information/education/legal-rights'
  }
];

export default function EducationPage() {
  return (
    <InformationPageTemplate
      prominentTopics={PROMINENT_TOPICS}
      secondaryTopics={SECONDARY_TOPICS}
      translationNamespace="education"
      tutorialData="education"
      emergencyRoute="/ask/emergency"
    />
  );
}