import React from 'react';
import InformationPageTemplate from '../../components/InformationPageTemplate';

const PROMINENT_TOPICS = [
  {
    key: 'emergency-food',
    icon: 'restaurant',
    color: '#DC2626',
    route: '/information/food/emergency-food'
  },
  {
    key: 'food-banks',
    icon: 'local-grocery-store',
    color: '#059669',
    route: '/information/food/food-banks'
  },
  {
    key: 'payment-cards',
    icon: 'credit-card',
    color: '#2563EB',
    route: '/information/food/payment-cards'
  },
  {
    key: 'hygiene-facilities',
    icon: 'shower',
    color: '#0891B2',
    route: '/information/food/hygiene-facilities'
  },
  {
    key: 'clothing-distribution',
    icon: 'checkroom',
    color: '#7C3AED',
    route: '/information/food/clothing-distribution'
  }
];

const SECONDARY_TOPICS = [
  {
    key: 'baby-essentials',
    icon: 'child-care',
    color: '#EC4899',
    route: '/information/food/baby-essentials'
  },
  {
    key: 'menstrual-health',
    icon: 'health-and-safety',
    color: '#DB2777',
    route: '/information/food/menstrual-health'
  },
  {
    key: 'shopping-assistance',
    icon: 'shopping-cart',
    color: '#059669',
    route: '/information/food/shopping-assistance'
  },
  {
    key: 'affordable-food',
    icon: 'attach-money',
    color: '#CA8A04',
    route: '/information/food/affordable-food'
  },
  {
    key: 'nutrition-advice',
    icon: 'local-dining',
    color: '#16A34A',
    route: '/information/food/nutrition-advice'
  },
  {
    key: 'food-safety',
    icon: 'verified',
    color: '#2563EB',
    route: '/information/food/food-safety'
  },
  {
    key: 'food-delivery',
    icon: 'delivery-dining',
    color: '#EA580C',
    route: '/information/food/food-delivery'
  },
  {
    key: 'donate-volunteer',
    icon: 'volunteer-activism',
    color: '#7C3AED',
    route: '/information/food/donate-volunteer'
  },
  {
    key: 'legal-rights',
    icon: 'gavel',
    color: '#DC2626',
    route: '/information/food/legal-rights'
  }
];

export default function FoodPage() {
  return (
    <InformationPageTemplate
      prominentTopics={PROMINENT_TOPICS}
      secondaryTopics={SECONDARY_TOPICS}
      translationNamespace="food"
      tutorialData="food"
      emergencyRoute="/ask/emergency"
      primaryHeight={440}
      height={370}
    />
  );
}