import React from 'react';
import { InformationPageTemplate } from '../../components/InformationPageTemplate';

const prominentTopics = [
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

const secondaryTopics = [
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

const ContactsScreen = () => {
  return (
    <InformationPageTemplate
      prominentTopics={prominentTopics}
      secondaryTopics={secondaryTopics}
      translationNamespace="contacts"
      tutorialData={{
        title: "contacts.tutorial.title",
        description: "contacts.tutorial.description",
        steps: []
      }}
    />
  );
};

export default ContactsScreen;