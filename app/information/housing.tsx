import React from 'react';
import InformationPageTemplate from '../../components/InformationPageTemplate';

const PROMINENT_TOPICS = [
  {
    key: 'emergency-shelter',
    icon: '🏠',
    color: '#DC2626',
    route: '/information/housing/emergency-shelter'
  },
  {
    key: 'asylum-accommodation',
    icon: '🏢',
    color: '#2563EB',
    route: '/information/housing/asylum-accommodation'
  },
  {
    key: 'social-housing',
    icon: '🏘️',
    color: '#059669',
    route: '/information/housing/social-housing'
  }
];

const SECONDARY_TOPICS = [
  {
    key: 'temporary-rentals',
    icon: '🏃‍♂️',
    color: '#7C3AED',
    route: '/information/housing/temporary-rentals'
  },
  {
    key: 'eviction-prevention',
    icon: '⚖️',
    color: '#DC2626',
    route: '/information/housing/eviction-prevention'
  },
  {
    key: 'women-family-shelters',
    icon: '👪',
    color: '#EC4899',
    route: '/information/housing/women-family-shelters'
  },
  {
    key: 'housing-benefits',
    icon: '💰',
    color: '#059669',
    route: '/information/housing/housing-benefits'
  },
  {
    key: 'utilities-moving',
    icon: '🔧',
    color: '#EA580C',
    route: '/information/housing/utilities-moving'
  },
  {
    key: 'registration-address',
    icon: '📋',
    color: '#2563EB',
    route: '/information/housing/registration-address'
  },
  {
    key: 'housing-scams',
    icon: '⚠️',
    color: '#DC2626',
    route: '/information/housing/housing-scams'
  },
  {
    key: 'maintenance-disputes',
    icon: '🔨',
    color: '#7C2D12',
    route: '/information/housing/maintenance-disputes'
  },
  {
    key: 'accessible-housing',
    icon: '♿',
    color: '#2563EB',
    route: '/information/housing/accessible-housing'
  },
  {
    key: 'storage-documents',
    icon: '📦',
    color: '#059669',
    route: '/information/housing/storage-documents'
  },
  {
    key: 'community-housing',
    icon: '🤝',
    color: '#7C3AED',
    route: '/information/housing/community-housing'
  },
  {
    key: 'neighborhood-info',
    icon: '🏘️',
    color: '#EA580C',
    route: '/information/housing/neighborhood-info'
  }
];

export default function Housing() {
  return (
    <InformationPageTemplate
      prominentTopics={PROMINENT_TOPICS}
      secondaryTopics={SECONDARY_TOPICS}
      translationNamespace="housing"
      tutorialData="housing"
      emergencyRoute="/ask/emergency"
    />
  );
}