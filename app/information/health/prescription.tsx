import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { Pill, FileText, AlertTriangle, CreditCard, ShoppingCart, ClipboardList, HelpCircle } from 'lucide-react-native';
import SummaryPageTemplate from '../../../components/SummaryPageTemplate';

export default function PrescriptionInfo() {
  const { t } = useTranslation('prescription');
  const router = useRouter();

  const tiles = [
    {
      key: 'how_to_get',
      icon: <FileText size={24} color="#3B82F6" />,
      title: t('tiles.how_to_get_title'),
      sub: t('tiles.how_to_get_sub'),
      onPress: () => router.push('/information/health/prescription/how-to-get')
    },
    {
      key: 'required_meds',
      icon: <Pill size={24} color="#DC2626" />,
      title: t('tiles.required_meds_title'),
      sub: t('tiles.required_meds_sub'),
      onPress: () => router.push('/information/health/prescription/required-meds')
    },
    {
      key: 'pharmacy_emergency',
      icon: <AlertTriangle size={24} color="#F59E0B" />,
      title: t('tiles.pharmacy_emergency_title'),
      sub: t('tiles.pharmacy_emergency_sub'),
      onPress: () => router.push('/information/health/prescription/pharmacy-emergency')
    },
    {
      key: 'financial_support',
      icon: <CreditCard size={24} color="#059669" />,
      title: t('tiles.financial_support_title'),
      sub: t('tiles.financial_support_sub'),
      onPress: () => router.push('/information/health/prescription/financial-support')
    },
    {
      key: 'otc_vs_prescription',
      icon: <ShoppingCart size={24} color="#7C3AED" />,
      title: t('tiles.otc_vs_prescription_title'),
      sub: t('tiles.otc_vs_prescription_sub'),
      onPress: () => router.push('/information/health/prescription/otc-vs-prescription')
    },
    {
      key: 'prescription_format',
      icon: <ClipboardList size={24} color="#0891B2" />,
      title: t('tiles.prescription_format_title'),
      sub: t('tiles.prescription_format_sub'),
      onPress: () => router.push('/information/health/prescription/format')
    },
    {
      key: 'explain_prescription',
      icon: <HelpCircle size={24} color="#EA580C" />,
      title: t('tiles.explain_prescription_title'),
      sub: t('tiles.explain_prescription_sub'),
      onPress: () => router.push('/information/health/prescription/explain')
    }
  ];

  const contacts = [
    {
      name: t('trusted.pharmacy_association_name'),
      phone: t('trusted.pharmacy_association_phone'),
      url: t('trusted.pharmacy_association_url'),
      subtitle: t('trusted.pharmacy_association_sub')
    },
    {
      name: t('trusted.emergency_pharmacy_name'),
      phone: t('trusted.emergency_pharmacy_phone'),
      subtitle: t('trusted.emergency_pharmacy_sub')
    },
    {
      name: t('trusted.health_insurance_name'),
      phone: t('trusted.health_insurance_phone'),
      url: t('trusted.health_insurance_url'),
      subtitle: t('trusted.health_insurance_sub')
    },
    {
      name: t('trusted.medication_helpline_name'),
      phone: t('trusted.medication_helpline_phone'),
      subtitle: t('trusted.medication_helpline_sub')
    }
  ];

  return (
    <SummaryPageTemplate
      translationNamespace="prescription"
      videoId={t('exampleVideoId')}
      tiles={tiles}
      contacts={contacts}
      emergencyRoute="/ask/emergency"
    />
  );
}