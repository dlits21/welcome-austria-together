import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import SummaryPageTemplate from '../../../components/SummaryPageTemplate';

export default function VaccinationInfo() {
  const { t } = useTranslation('vaccinations');
  const router = useRouter();

  const tiles = [
    {
      key: 'child_vaccines',
      icon: <MaterialIcons name="child-care" size={24} color="#3B82F6" />,
      title: t('tiles.child_vaccines_title'),
      sub: t('tiles.child_vaccines_sub'),
      onPress: () => router.push('/information/health/vaccinations/child-vaccines')
    },
    {
      key: 'adult_vaccines',
      icon: <MaterialIcons name="person" size={24} color="#DC2626" />,
      title: t('tiles.adult_vaccines_title'),
      sub: t('tiles.adult_vaccines_sub'),
      onPress: () => router.push('/information/health/vaccinations/adult-vaccines')
    },
    {
      key: 'free_vaccines',
      icon: <MaterialIcons name="local-hospital" size={24} color="#059669" />,
      title: t('tiles.free_vaccines_title'),
      sub: t('tiles.free_vaccines_sub'),
      onPress: () => router.push('/information/health/vaccinations/free-vaccines')
    },
    {
      key: 'documentation',
      icon: <MaterialIcons name="description" size={24} color="#F59E0B" />,
      title: t('tiles.documentation_title'),
      sub: t('tiles.documentation_sub'),
      onPress: () => router.push('/information/health/vaccinations/documentation')
    },
    {
      key: 'faq',
      icon: <MaterialIcons name="help-outline" size={24} color="#7C3AED" />,
      title: t('tiles.faq_title'),
      sub: t('tiles.faq_sub'),
      onPress: () => router.push('/information/health/vaccinations/faq')
    },
    {
      key: 'travel_vaccines',
      icon: <MaterialIcons name="flight" size={24} color="#0891B2" />,
      title: t('tiles.travel_vaccines_title'),
      sub: t('tiles.travel_vaccines_sub'),
      onPress: () => router.push('/information/health/vaccinations/travel-vaccines')
    },
    {
      key: 'pregnancy_vaccines',
      icon: <MaterialIcons name="pregnant-woman" size={24} color="#EC4899" />,
      title: t('tiles.pregnancy_vaccines_title'),
      sub: t('tiles.pregnancy_vaccines_sub'),
      onPress: () => router.push('/information/health/vaccinations/pregnancy-vaccines')
    },
    {
      key: 'schedule',
      icon: <MaterialIcons name="schedule" size={24} color="#EA580C" />,
      title: t('tiles.schedule_title'),
      sub: t('tiles.schedule_sub'),
      onPress: () => router.push('/information/health/vaccinations/schedule')
    }
  ];

  const contacts = [
    {
      name: t('trusted.health_ministry'),
      phone: t('trusted.health_phone'),
      url: t('trusted.health_url'),
      subtitle: t('trusted.health_sub')
    },
    {
      name: t('trusted.vaccination_hotline'),
      phone: t('trusted.hotline_phone'),
      subtitle: t('trusted.hotline_sub')
    },
    {
      name: t('trusted.immunization_service'),
      phone: t('trusted.immunization_phone'),
      url: t('trusted.immunization_url'),
      subtitle: t('trusted.immunization_sub')
    }
  ];

  return (
    <SummaryPageTemplate
      tiles={tiles}
      contacts={contacts}
      translationNamespace="vaccinations"
      videoId={t('exampleVideoId')}
      emergencyRoute="/ask/emergency"
    />
  );
}