import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import SummaryPageTemplate from "../../../components/SummaryPageTemplate";

export default function ChildrenHealthBasics() {
  const { t } = useTranslation("childrenHealth");
  const router = useRouter();

  // Tiles content for children's health
  const tiles = [
    {
      key: "red_flags",
      icon:  <MaterialIcons name="warning" size={24} color="#3B82F6" />,
      title: t("tiles.red_flags_title"),
      sub: t("tiles.red_flags_sub"),
      onPress: () => router.push("/information/health/children/warning-signs"),
    },
    {
      key: "clinic_finder",
      icon:  <MaterialIcons name="local-hospital" size={24} color="#DC2626" />,
      title: t("tiles.clinic_finder_title"),
      sub: t("tiles.clinic_finder_sub"),
      onPress: () => router.push("/information/health/children/clinics"),
    },
    {
      key: "immunisation",
      icon:  <MaterialIcons name="vaccines" size={24} color="#F59E0B" />,
      title: t("tiles.immunisation_title"),
      sub: t("tiles.immunisation_sub"),
      onPress: () => router.push("/information/health/vaccinations"),
    },
    {
      key: "pediatrician",
      icon:  <MaterialIcons name="medical-services" size={24} color="#059669" />,
      title: t("tiles.pediatrician_title"),
      sub: t("tiles.pediatrician_sub"),
      onPress: () => router.push("/information/health/find-doctor"),
    },
    {
      key: "development",
      icon:  <MaterialIcons name="child-care" size={24} color="#7C3AED" />,
      title: t("tiles.development_title"),
      sub: t("tiles.development_sub"),
      onPress: () => router.push("/information/health/children/development"),
    },
    {
      key: "emergency",
      icon:  <MaterialIcons name="emergency" size={24} color="#0891B2" />,
      title: t("tiles.emergency_title"),
      sub: t("tiles.emergency_sub"),
      onPress: () => router.push("/ask/emergency"),
    },
  ];

  // Contacts configuration for children's health
  const contacts = [
    {
      name: t("trusted.pediatric_hospital"),
      phone: t("trusted.pediatric_phone"),
      url: t("trusted.pediatric_url"),
      subtitle: t("trusted.pediatric_sub"),
    },
    {
      name: t("trusted.child_health_line"),
      phone: t("trusted.child_health_phone"),
      subtitle: t("trusted.child_health_sub"),
    },
    {
      name: t("trusted.family_support"),
      phone: t("trusted.family_phone"),
      url: t("trusted.family_url"),
      subtitle: t("trusted.family_sub"),
    },
  ];

  return (
    <SummaryPageTemplate
      translationNamespace="childrenHealth"
      videoId={t("exampleVideoId", { defaultValue: "Q607TYRBxFU" })}
      tiles={tiles}
      contacts={contacts}
      emergencyRoute="/ask/emergency"
    />
  );
}