import React from 'react';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { SummaryPageTemplate } from '../../../components/SummaryPageTemplate';

export default function GenderViolence() {
  const { t } = useTranslation('genderViolence');

  const tiles = [
    {
      icon: <MaterialIcons name="shield" size={24} color="#EF4444" />,
      title: t('tiles.immediate_title'),
      subtitle: t('tiles.immediate_sub'),
      onPress: () => console.log('Immediate Safety pressed'),
    },
    {
      icon: <MaterialIcons name="assignment" size={24} color="#F59E0B" />,
      title: t('tiles.evidence_title'),
      subtitle: t('tiles.evidence_sub'),
      onPress: () => console.log('Preserve Evidence pressed'),
    },
    {
      icon: <MaterialIcons name="call" size={24} color="#DC2626" />,
      title: t('tiles.crisis_title'),
      subtitle: t('tiles.crisis_sub'),
      onPress: () => console.log('Crisis Hotlines pressed'),
    },
    {
      icon: <MaterialIcons name="gavel" size={24} color="#7C3AED" />,
      title: t('tiles.legal_title'),
      subtitle: t('tiles.legal_sub'),
      onPress: () => console.log('Legal Aid pressed'),
    },
    {
      icon: <MaterialIcons name="home" size={24} color="#059669" />,
      title: t('tiles.shelter_title'),
      subtitle: t('tiles.shelter_sub'),
      onPress: () => console.log('Safe Housing pressed'),
    },
    {
      icon: <MaterialIcons name="psychology" size={24} color="#2563EB" />,
      title: t('tiles.counseling_title'),
      subtitle: t('tiles.counseling_sub'),
      onPress: () => console.log('Trauma Counseling pressed'),
    },
    {
      icon: <MaterialIcons name="report" size={24} color="#DB2777" />,
      title: t('tiles.reporting_title'),
      subtitle: t('tiles.reporting_sub'),
      onPress: () => console.log('Reporting Options pressed'),
    },
    {
      icon: <MaterialIcons name="favorite" size={24} color="#10B981" />,
      title: t('tiles.support_title'),
      subtitle: t('tiles.support_sub'),
      onPress: () => console.log('Ongoing Support pressed'),
    },
  ];

  const contacts = [
    {
      name: t('trusted.women_shelter'),
      phone: t('trusted.women_phone'),
      url: t('trusted.women_url'),
      subtitle: t('trusted.women_sub'),
    },
    {
      name: t('trusted.legal_aid'),
      phone: t('trusted.legal_phone'),
      url: t('trusted.legal_url'),
      subtitle: t('trusted.legal_sub'),
    },
    {
      name: t('trusted.crisis_hotline'),
      phone: t('trusted.crisis_phone'),
      url: t('trusted.crisis_url'),
      subtitle: t('trusted.crisis_sub'),
    },
  ];

  return (
    <SummaryPageTemplate
      translationNamespace="genderViolence"
      videoId={t('exampleVideoId')}
      tiles={tiles}
      contacts={contacts}
      emergencyRoute="/ask/emergency"
    />
  );
}