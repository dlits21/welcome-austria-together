import React from 'react';
import InformationPageTemplate from '../../components/InformationPageTemplate';

const PROMINENT_TOPICS = [
  {
    key: 'emergency-shelter',
    icon: 'home',
    color: '#DC2626',
    route: '/information/housing/emergency-shelter'
  },
  {
    key: 'asylum-accommodation',
    icon: 'business',
    color: '#2563EB',
    route: '/information/housing/asylum-accommodation'
  },
  {
    key: 'social-housing',
    icon: 'apartment',
    color: '#059669',
    route: '/information/housing/social-housing'
  },
    {
      key: 'temporary-rentals',
      icon: 'access-time',
      color: '#7C3AED',
      route: '/information/housing/temporary-rentals'
    },
];

const SECONDARY_TOPICS = [
  {
    key: 'eviction-prevention',
    icon: 'gavel',
    color: '#DC2626',
    route: '/information/housing/eviction-prevention'
  },
  {
    key: 'women-family-shelters',
    icon: 'family-restroom',
    color: '#EC4899',
    route: '/information/housing/women-family-shelters'
  },
  {
    key: 'housing-benefits',
    icon: 'attach-money',
    color: '#059669',
    route: '/information/housing/housing-benefits'
  },
  {
    key: 'utilities-moving',
    icon: 'build',
    color: '#EA580C',
    route: '/information/housing/utilities-moving'
  },
  {
    key: 'registration-address',
    icon: 'assignment',
    color: '#2563EB',
    route: '/information/housing/registration-address'
  },
  {
    key: 'housing-scams',
    icon: 'warning',
    color: '#DC2626',
    route: '/information/housing/housing-scams'
  },
  {
    key: 'maintenance-disputes',
    icon: 'construction',
    color: '#7C2D12',
    route: '/information/housing/maintenance-disputes'
  },
  {
    key: 'accessible-housing',
    icon: 'accessible',
    color: '#2563EB',
    route: '/information/housing/accessible-housing'
  },
  {
    key: 'storage-documents',
    icon: 'storage',
    color: '#059669',
    route: '/information/housing/storage-documents'
  },
  {
    key: 'community-housing',
    icon: 'handshake',
    color: '#7C3AED',
    route: '/information/housing/community-housing'
  },
  {
    key: 'neighborhood-info',
    icon: 'location-city',
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
      height={425}
      primaryHeight={450}
    />
  );
}