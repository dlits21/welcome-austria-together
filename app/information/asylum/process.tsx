import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import SummaryPageTemplate from "../../../components/SummaryPageTemplate";

export default function AsylumProcess() {
  const { t } = useTranslation("asylumProcess");
  const router = useRouter();

  // Main tiles for asylum process topics
  const tiles = [
    {
      key: "apply",
      icon: <MaterialIcons name="assignment" size={24} color="#3B82F6" />,
      title: t("tiles.apply_title"),
      sub: t("tiles.apply_sub"),
      onPress: () => router.push("/information/asylum/process/apply"),
    },
    {
      key: "rights",
      icon: <MaterialIcons name="gavel" size={24} color="#10B981" />,
      title: t("tiles.rights_title"),
      sub: t("tiles.rights_sub"),
      onPress: () => router.push("/information/asylum/process/rights"),
    },
    {
      key: "documents",
      icon: <MaterialIcons name="description" size={24} color="#F59E0B" />,
      title: t("tiles.documents_title"),
      sub: t("tiles.documents_sub"),
      onPress: () => router.push("/information/asylum/process/documents"),
    },
    {
      key: "appeals",
      icon: <MaterialIcons name="how-to-reg" size={24} color="#EF4444" />,
      title: t("tiles.appeals_title"),
      sub: t("tiles.appeals_sub"),
      onPress: () => router.push("/information/asylum/process/appeals"),
    },
  ];

  // Trusted contacts for asylum help
  const contacts = [
    {
      name: t("trusted.unhcr_name"),
      phone: t("trusted.unhcr_phone"),
      url: t("trusted.unhcr_url"),
      subtitle: t("trusted.unhcr_sub"),
    },
    {
      name: t("trusted.refugee_ngoname"),
      phone: t("trusted.refugee_phone"),
      url: t("trusted.refugee_url"),
      subtitle: t("trusted.refugee_sub"),
    },
    {
      name: t("trusted.legal_aid"),
      phone: t("trusted.legal_phone"),
      subtitle: t("trusted.legal_sub"),
    },
  ];

  return (
    <SummaryPageTemplate
      translationNamespace="asylumProcess"
      videoId={t("exampleVideoId", { defaultValue: "Q607TYRBxFU" })}
      tiles={tiles}
      contacts={contacts}
      emergencyRoute="/ask/emergency"
    />
  );
}
