// app/everyday.tsx
import React from "react";
import InformationPageTemplate from '../../components/InformationPageTemplate';

const PROMINENT_TOPICS = [
  {
    key: 'emergency-crisis-hotlines',
    icon: 'emergency',
    color: '#FF4444',
    route: '/information/contacts/emergency-crisis-hotlines'
  },
  {
    key: 'legal-asylum-help',
    icon: 'gavel',
    color: '#2563EB',
    route: '/information/contacts/legal-asylum-help'
  },
  {
    key: 'housing-shelter-hotlines',
    icon: 'home',
    color: '#059669',
    route: '/information/contacts/housing-shelter-hotlines'
  },
  {
    key: 'healthcare-support-lines',
    icon: 'local_hospital',
    color: '#7C3AED',
    route: '/information/contacts/healthcare-support-lines'
  },
  {
    key: 'food-essentials',
    icon: 'restaurant',
    color: '#DC2626',
    route: '/information/contacts/food-essentials'
  }
];

const SECONDARY_TOPICS = [
  {
    key: 'children-family-support',
    icon: 'family_restroom',
    color: '#EA580C',
    route: '/information/contacts/children-family-support'
  },
  {
    key: 'work-exploitation',
    icon: 'work',
    color: '#0891B2',
    route: '/information/contacts/work-exploitation'
  },
  {
    key: 'everyday-life-help',
    icon: 'help',
    color: '#65A30D',
    route: '/information/contacts/everyday-life-help'
  },
  {
    key: 'community-integration-ngos',
    icon: 'groups',
    color: '#7C2D12',
    route: '/information/contacts/community-integration-ngos'
  },
  {
    key: 'directory-quick-access',
    icon: 'contact_phone',
    color: '#BE185D',
    route: '/information/contacts/directory-quick-access'
  }
];

export default function Contacts() {
  return (
    <InformationPageTemplate
      prominentTopics={PROMINENT_TOPICS}
      secondaryTopics={SECONDARY_TOPICS}
      translationNamespace="contacts"
      tutorialData="home"
      emergencyRoute="/ask/emergency"
      primaryHeight={440}
      height={370}
    />
  );
}
