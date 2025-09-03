import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import SummaryPageTemplate from '../../../components/SummaryPageTemplate';

export default function GenderViolence() {
  const { t } = useTranslation('genderViolence');
  const router = useRouter();

  const tiles = [
    {
      icon: <MaterialIcons name="shield" size={24} color="#EF4444" />,
      title: t('tiles.immediate_title'),
      sub: t('tiles.immediate_sub'),
      onPress: () => router.push("/information/health/genderViolence/immediate"),
    },
    {
      icon: <MaterialIcons name="assignment" size={24} color="#F59E0B" />,
      title: t('tiles.evidence_title'),
      sub: t('tiles.evidence_sub'),
      onPress: () => router.push("/information/health/genderViolence/preserve"),
    },
    {
      icon: <MaterialIcons name="call" size={24} color="#DC2626" />,
      title: t('tiles.crisis_title'),
      sub: t('tiles.crisis_sub'),
      onPress: () => router.push("/information/health/genderViolence/crisis"),
    },
    {
      icon: <MaterialIcons name="gavel" size={24} color="#7C3AED" />,
      title: t('tiles.legal_title'),
      sub: t('tiles.legal_sub'),
      onPress: () => router.push("/information/health/genderViolence/legal_aid"),
    },
    {
      icon: <MaterialIcons name="home" size={24} color="#059669" />,
      title: t('tiles.shelter_title'),
      sub: t('tiles.shelter_sub'),
      onPress: () => router.push("/information/health/genderViolence/safe_housing"),
    },
    {
      icon: <MaterialIcons name="psychology" size={24} color="#2563EB" />,
      title: t('tiles.counseling_title'),
      sub: t('tiles.counseling_sub'),
      onPress: () => router.push("/information/health/genderViolence/trauma_counseling"),
    },
    {
      icon: <MaterialIcons name="report" size={24} color="#DB2777" />,
      title: t('tiles.reporting_title'),
      sub: t('tiles.reporting_sub'),
      onPress: () => router.push("/information/health/genderViolence/reporting"),
    },
    {
      icon: <MaterialIcons name="favorite" size={24} color="#10B981" />,
      title: t('tiles.support_title'),
      sub: t('tiles.support_sub'),
      onPress: () => router.push("/information/health/genderViolence/support"),
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